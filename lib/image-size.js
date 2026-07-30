// Reads the pixel dimensions of a JPEG or PNG straight out of its header,
// so .eleventy.js can emit og:image:width / og:image:height.
//
// WHY NOT A LIBRARY. Those two tags are worth having - a social platform that
// knows the dimensions can lay the card out before it has fetched the image,
// instead of reflowing or, on a first share, rendering no image at all while
// its scraper catches up. But they are worth roughly twenty lines, not a new
// runtime dependency: this repo currently ships zero `dependencies` (only
// devDependencies), and `sharp` in particular pulls prebuilt native binaries
// per platform, which is a real cost to a fork on an unusual host for two
// integers already sitting in the first few hundred bytes of every file.
//
// Scope is deliberately narrow. Only JPEG and PNG are handled, because those
// are the only formats src/images/ contains and the only ones the image
// conventions in story-bible/images.md permit. Anything else - or any file
// that cannot be read or parsed - returns null, and the caller omits the tags
// rather than guessing. A missing og:image:width is a lost optimisation; a
// wrong one makes a platform reserve the wrong box.

const fs = require("fs");

// Memoised by absolute path. A build asks for the same handful of images
// hundreds of times over (the site hero alone backs every page with no image
// of its own), and re-reading a file header per page is pure waste.
const cache = new Map();

function readJpeg(buf) {
  // Walk the marker segments looking for a Start Of Frame, which carries the
  // dimensions. SOF markers are 0xC0-0xCF except 0xC4 (define Huffman table),
  // 0xC8 (JPEG extensions) and 0xCC (define arithmetic coding conditioning) -
  // those three share the numeric range without being frame headers.
  let i = 2; // skip the SOI marker
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    const segmentLength = buf.readUInt16BE(i + 2);
    if (segmentLength < 2) return null; // malformed; refuse rather than loop
    i += 2 + segmentLength;
  }
  return null;
}

function readPng(buf) {
  // IHDR is always the first chunk, at a fixed offset: 8-byte signature,
  // 4-byte length, 4-byte type, then width and height as big-endian uint32.
  if (buf.length < 24) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/**
 * @param {string} absolutePath
 * @returns {{width: number, height: number}|null} null if unreadable,
 *   unrecognised, or parsed to a nonsense value.
 */
function imageSize(absolutePath) {
  if (cache.has(absolutePath)) return cache.get(absolutePath);

  let result = null;
  try {
    const buf = fs.readFileSync(absolutePath);
    if (buf.length >= 8 && buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
      result = readPng(buf);
    } else if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xd8) {
      result = readJpeg(buf);
    }
    // A zero or absurd dimension means the parse went wrong somewhere, and
    // emitting it would be worse than emitting nothing.
    if (result && !(result.width > 0 && result.height > 0)) result = null;
  } catch {
    result = null;
  }

  cache.set(absolutePath, result);
  return result;
}

module.exports = { imageSize };
