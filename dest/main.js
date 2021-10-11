'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sourceMapGenerator = {};

var base64Vlq = {};

var base64$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
base64$1.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
base64$1.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = base64$1;

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
base64Vlq.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var util$5 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
}(util$5));

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$4 = util$5;
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet$2() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet$2.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet$2();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet$2.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet$2.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util$4.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet$2.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util$4.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet$2.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util$4.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet$2.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet$2.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

arraySet.ArraySet = ArraySet$2;

var mappingList = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$3 = util$5;

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util$3.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList$1() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList$1.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList$1.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList$1.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util$3.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

mappingList.MappingList = MappingList$1;

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ$1 = base64Vlq;
var util$2 = util$5;
var ArraySet$1 = arraySet.ArraySet;
var MappingList = mappingList.MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator$1(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util$2.getArg(aArgs, 'file', null);
  this._sourceRoot = util$2.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util$2.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator$1.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator$1.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator$1({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util$2.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util$2.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator$1.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util$2.getArg(aArgs, 'generated');
    var original = util$2.getArg(aArgs, 'original', null);
    var source = util$2.getArg(aArgs, 'source', null);
    var name = util$2.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator$1.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util$2.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util$2.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util$2.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator$1.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util$2.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet$1();
    var newNames = new ArraySet$1();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util$2.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util$2.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util$2.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util$2.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator$1.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator$1.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = '';

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util$2.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ$1.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ$1.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ$1.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ$1.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ$1.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator$1.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util$2.relative(aSourceRoot, source);
      }
      var key = util$2.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator$1.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator$1.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

sourceMapGenerator.SourceMapGenerator = SourceMapGenerator$1;

var sourceMapConsumer = {};

var binarySearch$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
}(binarySearch$1));

var quickSort$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
quickSort$1.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$1 = util$5;
var binarySearch = binarySearch$1;
var ArraySet = arraySet.ArraySet;
var base64VLQ = base64Vlq;
var quickSort = quickSort$1.quickSort;

function SourceMapConsumer$1(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer$1.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer$1.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer$1.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer$1.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer$1.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer$1.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer$1.GENERATED_ORDER = 1;
SourceMapConsumer$1.ORIGINAL_ORDER = 2;

SourceMapConsumer$1.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer$1.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer$1.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer$1.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer$1.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer$1.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util$1.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer$1.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util$1.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util$1.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util$1.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util$1.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

sourceMapConsumer.SourceMapConsumer = SourceMapConsumer$1;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  var version = util$1.getArg(sourceMap, 'version');
  var sources = util$1.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util$1.getArg(sourceMap, 'names', []);
  var sourceRoot = util$1.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util$1.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util$1.getArg(sourceMap, 'mappings');
  var file = util$1.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util$1.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util$1.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util$1.isAbsolute(sourceRoot) && util$1.isAbsolute(source)
        ? util$1.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util$1.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer$1;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util$1.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util$1.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util$1.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util$1.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util$1.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util$1.getArg(aArgs, 'line'),
      generatedColumn: util$1.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util$1.compareByGeneratedPositionsDeflated,
      util$1.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util$1.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util$1.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util$1.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util$1.getArg(mapping, 'originalLine', null),
          column: util$1.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util$1.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util$1.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util$1.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util$1.getArg(aArgs, 'line'),
      originalColumn: util$1.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util$1.compareByOriginalPositions,
      util$1.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util$1.getArg(mapping, 'generatedLine', null),
          column: util$1.getArg(mapping, 'generatedColumn', null),
          lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  var version = util$1.getArg(sourceMap, 'version');
  var sections = util$1.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util$1.getArg(s, 'offset');
    var offsetLine = util$1.getArg(offset, 'line');
    var offsetColumn = util$1.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer$1(util$1.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer$1;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util$1.getArg(aArgs, 'line'),
      generatedColumn: util$1.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util$1.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util$1.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util$1.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util$1.compareByOriginalPositions);
  };

sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
var util = util$5;

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;

/**
 * 校正异常的堆栈信息
 * 
 * 由于 rollup 会打包所有代码到一个文件，所以异常的调用栈定位和源码的位置是不同的
 * 本模块就是用来将异常的调用栈映射至源代码位置
 * 
 * @see https://github.com/screepers/screeps-typescript-starter/blob/master/src/utils/ErrorMapper.ts
 */

// 缓存 SourceMap
let consumer = null;

// 第一次报错时创建 sourceMap
const getConsumer = function () {
    if (consumer == null) consumer = new SourceMapConsumer(require("main.js.map"));
    return consumer
};

// 缓存映射关系以提高性能
const cache = {};

/**
 * 使用源映射生成堆栈跟踪，并生成原始标志位
 * 警告 - global 重置之后的首次调用会产生很高的 cpu 消耗 (> 30 CPU)
 * 之后的每次调用会产生较低的 cpu 消耗 (~ 0.1 CPU / 次)
 *
 * @param {Error | string} error 错误或原始追踪栈
 * @returns {string} 映射之后的源代码追踪栈
 */
const sourceMappedStackTrace = function (error) {
    const stack = error instanceof Error ? error.stack : error;
    // 有缓存直接用
    if (cache.hasOwnProperty(stack)) return cache[stack]

    const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm;
    let match;
    let outStack = error.toString();
    console.log("ErrorMapper -> sourceMappedStackTrace -> outStack", outStack);

    while ((match = re.exec(stack))) {
        // 解析完成
        if (match[2] !== "main") break
        
        // 获取追踪定位
        const pos = getConsumer().originalPositionFor({
            column: parseInt(match[4], 10),
            line: parseInt(match[3], 10)
        });

        // 无法定位
        if (!pos.line) break
        
        // 解析追踪栈
        if (pos.name) outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`;
        else {
            // 源文件没找到对应文件名，采用原始追踪名
            if (match[1]) outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`;
            // 源文件没找到对应文件名并且原始追踪栈里也没有，直接省略
            else outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`;
        }
    }

    cache[stack] = outStack;
    return outStack
};

/**
 * 错误追踪包装器
 * 用于把报错信息通过 source-map 解析成源代码的错误位置
 * 和原本 wrapLoop 的区别是，wrapLoop 会返回一个新函数，而这个会直接执行
 * 
 * @param next 玩家代码
 */
const errorMapper = function (next) {
    return () => {
        try {
            // 执行玩家代码
            next();
        }
        catch (e) {
            if (e instanceof Error) {
                // 渲染报错调用栈，沙盒模式用不了这个
                const errorMessage = Game.rooms.sim ?
                    `沙盒模式无法使用 source-map - 显示原始追踪栈<br>${_.escape(e.stack)}` :
                    `${_.escape(sourceMappedStackTrace(e))}`;
                
                console.log(`<text style="color:#ef9a9a">${errorMessage}</text>`);
            }
            // 处理不了，直接抛出
            else throw e
        }
    }
};

const room_energy_mine_init$1 = function (source_room) {
    /*
    需要建好storage
    
    如果没开启自动挖矿, 则进行初始化操作
    初始化的值有:
    是否初始化, 初始化之后只能手动变化
    room.memory.auto_energy_mine
    初始化之后永不变化
    room.memory.sources_id
    room.memory.sources_num

    需要从配置中读取
    room.memory.source_harvester_num
    room.memory.source_transfer_num
    常规流程中每一次都需要更新
    room.memory.source_harvester_states
    room.memory.source_transfer_states
    container相关状态量, 需要检查是否有变更并及时修改
    room.memory.container_ids
    room.memory.source_container_ids

    其他状态量
    room.memory.source_distance
    room.memory.source_gets
    room.memory.source_costs*/
    var sources_num;
    var containers_num;
    var links_num;
    if (source_room.memory.auto_energy_mine != true) {
        var source;
        var sources;
        var container;
        var containers;
        var link;
        var links;
        // 如果没有存source_ids, 找到该房间所有能量source并存id
        if (source_room.memory.sources_id == undefined) {
            sources = source_room.find(FIND_SOURCES);
            source_room.memory.sources_num = sources.length;
            sources_num = source_room.memory.sources_num;
            source_room.memory.sources_id = new Array(sources_num);
            for (var i = 0; i < sources_num; i++) {
                source_room.memory.sources_id[i] = sources[i].id;
            }
        }
        else {
            sources_num = source_room.memory.sources_num;
        }
        // 数量设置状态量
        source_room.memory.source_harvester_num = new Array(sources_num);
        source_room.memory.source_transfer_num = new Array(sources_num);
        // harvester和transfer的数量记录
        source_room.memory.source_harvester_states = new Array(sources_num);
        source_room.memory.source_transfer_states = new Array(sources_num);
        // 初始化harvester和transfer的数量记录以及gets和costs状态量
        for (var i = 0; i < sources_num; i++) {
            source_room.memory.source_harvester_states[i] = 0;
            source_room.memory.source_transfer_states[i] = 0;
        }
        // 其他状态量
        if (source_room.memory.source_distance == undefined) {
            source_room.memory.source_distance = new Array(sources_num);
            source_room.memory.source_gets = new Array(sources_num);
            source_room.memory.source_costs = new Array(sources_num);
            for (var i = 0; i < sources_num; i++) {
                source_room.memory.source_gets[i] = 0;
                source_room.memory.source_costs[i] = 0;
            }
        }
        // source对应的container id
        source_room.memory.source_container_ids = new Array(sources_num);
        // 初始化, 找到该房间所有container并存id
        containers = source_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        containers_num = containers.length;
        source_room.memory.containers_num = containers_num;
        source_room.memory.containers_id = new Array(containers_num);
        for (var i = 0; i < containers_num; i++) {
            source_room.memory.containers_id[i] = containers[i].id;
        }
        // 遍历所有source 找到source旁边的container, 初始化source_container_ids
        for (var i = 0; i < sources_num; i++) {
            source = Game.getObjectById(source_room.memory.sources_id[i]);
            // 遍历所有container
            for (var j = 0; j < containers_num; j++) {
                container = Game.getObjectById(source_room.memory.containers_id[j]);
                if (container) {
                    // judge source是否有container, 只考虑source周围8个格子中最先扫描到的那一个
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 &&
                        (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1) {
                        source_room.memory.source_container_ids[i] = container.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
        // source对应的link id
        source_room.memory.source_link_ids = new Array(sources_num);
        // 初始化, 找到该房间所有link并存id
        links = source_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });
        links_num = links.length;
        source_room.memory.links_num = links_num;
        source_room.memory.links_id = new Array(links_num);
        for (var i = 0; i < links_num; i++) {
            source_room.memory.links_id[i] = links[i].id;
        }
        // 遍历所有source 找到source旁边的link, 初始化source_link_ids
        for (var i = 0; i < sources_num; i++) {
            source = Game.getObjectById(source_room.memory.sources_id[i]);
            // 遍历所有link
            for (var j = 0; j < links_num; j++) {
                link = Game.getObjectById(source_room.memory.links_id[j]);
                if (link) {
                    // judge source是否有link, 只考虑source周围2距离的格子中最先扫描到的那一个
                    if ((link.pos.x - source.pos.x) >= -2 && (link.pos.x - source.pos.x) <= 2 &&
                        (link.pos.y - source.pos.y) >= -2 && (link.pos.y - source.pos.y) <= 2) {
                        source_room.memory.source_link_ids[i] = link.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
        source_room.memory.auto_energy_mine = true;
    }
}; // 初始化结束
const room_energy_mine_routine$1 = function (source_roomName, dest_roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys) {
    var source_room = Game.rooms[source_roomName];
    var dest_room = Game.rooms[dest_roomName];
    // room空值检查
    if (source_room == undefined) {
        console.log(Game.time, "room_energy_mine_routine", ' source_room:', source_roomName, ' undefined');
        return;
    }
    if (dest_room == undefined) {
        console.log(Game.time, "room_energy_mine_routine", 'dest_room:', dest_roomName, 'undefined');
        return;
    }
    var source;
    var sources_num;
    var container;
    var containers;
    var containers_num;
    var link;
    var links;
    var links_num;
    var energyCapacity = dest_room.energyCapacityAvailable;
    containers_num = source_room.memory.containers_num;
    sources_num = source_room.memory.sources_num;
    links_num = source_room.memory.links_num;
    source_room.memory.energy_mine_chain_ok = false;
    // 读取creep个数配置并更新creep个数状态
    for (var i = 0; i < sources_num; i++) {
        source_room.memory.source_transfer_num[i] = transfer_num[i];
        source_room.memory.source_harvester_num[i] = harvester_num[i];
        if (source_room.memory.source_link_ids[i] == undefined) {
            var energy_harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'energy_harvester_no_carry'
                || creep.memory.role == 'energy_harvester_with_carry')
                && creep.memory.source_idx == i
                && creep.memory.source_roomName == source_roomName
                && creep.ticksToLive > 100);
            source_room.memory.source_harvester_states[i] = energy_harvesters.length;
            var transfers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'active_transfer' && creep.memory.source_container_idx == i)
                || (creep.memory.role == 'passive_transfer' && creep.memory.source_idx == i)
                    && creep.memory.source_roomName == source_roomName
                    && creep.memory.dest_roomName == dest_roomName
                    && creep.ticksToLive > 100);
            source_room.memory.source_transfer_states[i] = transfers.length;
            if (source_room.memory.source_harvester_states[i] >= 1 && source_room.memory.source_transfer_states[i] >= 1) {
                source_room.memory.energy_mine_chain_ok = true;
            }
        }
        else {
            var energy_harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'energy_harvester_link')
                && creep.memory.source_idx == i
                && creep.memory.source_roomName == source_roomName
                && creep.ticksToLive > 100);
            source_room.memory.source_harvester_states[i] = energy_harvesters.length;
            if (source_room.memory.source_harvester_states[i] >= 1) {
                source_room.memory.energy_mine_chain_ok = true;
            }
        }
    }
    // 根据配置决定是否更新containers信息
    if (source_room.memory.check_containers_state == true) {
        // 初始化, 找到该房间所有container并存id
        containers = source_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        containers_num = containers.length;
        source_room.memory.containers_num = containers_num;
        source_room.memory.containers_id = new Array(containers_num);
        for (var i = 0; i < containers_num; i++) {
            source_room.memory.containers_id[i] = containers[i].id;
        }
        source_room.memory.check_containers_state = false;
    }
    // 是否新增container或原有的对应source的container有变化
    for (var i = 0; i < sources_num; i++) {
        source = Game.getObjectById(source_room.memory.sources_id[i]);
        // source旁原来没有container现在是否新建了
        if (source_room.memory.source_container_ids[i] == undefined) {
            for (var j = 0; j < containers_num; j++) {
                container = Game.getObjectById(source_room.memory.containers_id[j]);
                if (container) {
                    // judge source是否有container, 只考虑source周围8个格子中最先扫描到的那一个
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 &&
                        (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1) {
                        source_room.memory.source_container_ids[i] = container.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
        // source原有的container是否有变化
        else if (Game.getObjectById(source_room.memory.source_container_ids[i]) == undefined) {
            source_room.memory.source_container_ids[i] = undefined;
            for (var j = 0; j < containers_num; j++) {
                container = Game.getObjectById(source_room.memory.containers_id[j]);
                if (container) {
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 &&
                        (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1) {
                        source_room.memory.source_container_ids[i] = container.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
    }
    // 根据配置决定是否更新links信息
    if (source_room.memory.check_links_state == true) {
        // 初始化, 找到该房间所有link并存id
        links = source_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });
        links_num = links.length;
        source_room.memory.links_num = links_num;
        source_room.memory.links_id = new Array(links_num);
        for (var i = 0; i < links_num; i++) {
            source_room.memory.links_id[i] = links[i].id;
        }
        source_room.memory.check_links_state = false;
    }
    // 是否新增link或原有的对应source的link有变化
    for (var i = 0; i < sources_num; i++) {
        source = Game.getObjectById(source_room.memory.sources_id[i]);
        // source旁原来没有link现在是否新建了
        if (source_room.memory.source_link_ids[i] == undefined) {
            for (var j = 0; j < links_num; j++) {
                link = Game.getObjectById(source_room.memory.links_id[j]);
                if (link) {
                    // judge source是否有link, 只考虑source周围2距离的格子中最先扫描到的那一个
                    if ((link.pos.x - source.pos.x) >= -2 && (link.pos.x - source.pos.x) <= 2 &&
                        (link.pos.y - source.pos.y) >= -2 && (link.pos.y - source.pos.y) <= 2) {
                        source_room.memory.source_link_ids[i] = link.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
        // source原有的link是否有变化
        else if (Game.getObjectById(source_room.memory.source_link_ids[i]) == undefined) {
            source_room.memory.source_link_ids[i] = undefined;
            for (var j = 0; j < links_num; j++) {
                link = Game.getObjectById(source_room.memory.links_id[j]);
                if (link) {
                    if ((link.pos.x - source.pos.x) >= -1 && (link.pos.x - source.pos.x) <= 1 &&
                        (link.pos.y - source.pos.y) >= -1 && (link.pos.y - source.pos.y) <= 1) {
                        source_room.memory.source_link_ids[i] = link.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
    }
    // 为每个source生成creep
    for (var i = 0; i < sources_num; i++) {
        // spawn需要在空闲状态
        if (!Game.spawns[spawnName].spawning) {
            if (source_room.memory.source_harvester_states[i] < source_room.memory.source_harvester_num[i]) {
                source = Game.getObjectById(source_room.memory.sources_id[i]);
                if (source_room.memory.source_link_ids[i] == undefined || source_room.memory.source_link_ids[i] == null) { // 没有link
                    if (source_room.memory.source_container_ids[i] == undefined) { // 没有container
                        // 暂时不支持4000的source
                        if (source.energyCapacity == 3000) {
                            if (source_room.memory.energy_mine_chain_ok) {
                                if (energyCapacity >= 950) {
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Harvester_with_carry' + Game.time, { memory: { role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName } }) == OK) {
                                        source_room.memory.source_harvester_states[i] += 1;
                                        source_room.memory.source_costs[i] += 950;
                                        break;
                                    }
                                }
                                else if (energyCapacity >= 500) {
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_with_carry' + Game.time, { memory: { role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName } }) == OK) {
                                        source_room.memory.source_harvester_states[i] += 1;
                                        source_room.memory.source_costs[i] += 500;
                                        break;
                                    }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_with_carry' + Game.time, { memory: { role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName } }) == OK) {
                                source_room.memory.source_harvester_states[i] += 1;
                                source_room.memory.source_costs[i] += 300;
                                break;
                            }
                        }
                        else if (source.energyCapacity == 1500) {
                            if (source_room.memory.energy_mine_chain_ok) {
                                if (energyCapacity >= 500) {
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_with_carry' + Game.time, { memory: { role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName } }) == OK) {
                                        source_room.memory.source_harvester_states[i] += 1;
                                        source_room.memory.source_costs[i] += 500;
                                        break;
                                    }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_with_carry' + Game.time, { memory: { role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName } }) == OK) {
                                source_room.memory.source_harvester_states[i] += 1;
                                source_room.memory.source_costs[i] += 300;
                                break;
                            }
                        }
                    }
                    else { // 含有container
                        container = Game.getObjectById(source_room.memory.source_container_ids[i]);
                        if (source.energyCapacity == 3000) {
                            if (source_room.memory.energy_mine_chain_ok) {
                                if (energyCapacity >= 650) {
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_no_carry' + Game.time, { memory: { role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                                        source_room.memory.source_harvester_states[i] += 1;
                                        source_room.memory.source_costs[i] += 650;
                                        break;
                                    }
                                }
                                else if (energyCapacity >= 400) {
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE], 'Harvester_no_carry' + Game.time, { memory: { role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                                        source_room.memory.source_harvester_states[i] += 1;
                                        source_room.memory.source_costs[i] += 400;
                                        break;
                                    }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, MOVE], 'Harvester_no_carry' + Game.time, { memory: { role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                                source_room.memory.source_harvester_states[i] += 1;
                                source_room.memory.source_costs[i] += 250;
                                break;
                            }
                        }
                        else if (source.energyCapacity == 1500) {
                            if (source_room.memory.energy_mine_chain_ok) {
                                if (energyCapacity >= 450) {
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_no_carry' + Game.time, { memory: { role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                                        source_room.memory.source_harvester_states[i] += 1;
                                        source_room.memory.source_costs[i] += 450;
                                        break;
                                    }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_no_carry' + Game.time, { memory: { role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                                source_room.memory.source_harvester_states[i] += 1;
                                source_room.memory.source_costs[i] += 300;
                                break;
                            }
                        }
                    }
                }
                else { // 含有link
                    link = Game.getObjectById(source_room.memory.source_link_ids[i]);
                    if (link_harvester_pos_xs[i] == undefined || link_harvester_pos_ys[i] == undefined) {
                        console.log(Game.time, "room_energy_mine_routine link_harvester_pos_x/ys undefined room:", source_roomName, 'i:', i);
                    }
                    // 暂时不支持4000的source
                    if (source.energyCapacity == 3000) {
                        if (source_room.memory.energy_mine_chain_ok) {
                            if (energyCapacity >= 950) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Harvester_link' + Game.time, { memory: { role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName,
                                        link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i] } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 950;
                                    break;
                                }
                            }
                            else if (energyCapacity >= 500) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_link' + Game.time, { memory: { role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName,
                                        link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i] } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 500;
                                    break;
                                }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_link' + Game.time, { memory: { role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName,
                                link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i] } }) == OK) {
                            source_room.memory.source_harvester_states[i] += 1;
                            source_room.memory.source_costs[i] += 300;
                            break;
                        }
                    }
                    else if (source.energyCapacity == 1500) {
                        if (source_room.memory.energy_mine_chain_ok) {
                            if (energyCapacity >= 500) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_link' + Game.time, { memory: { role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName,
                                        link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i] } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 500;
                                    break;
                                }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_link' + Game.time, { memory: { role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName,
                                link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i] } }) == OK) {
                            source_room.memory.source_harvester_states[i] += 1;
                            source_room.memory.source_costs[i] += 300;
                            break;
                        }
                    }
                }
            }
            // 有harvester且没有link才会生成对应的transfer
            if (source_room.memory.source_harvester_states[i] != 0 && source_room.memory.source_link_ids[i] == undefined && (source_room.memory.source_transfer_states[i] < source_room.memory.source_transfer_num[i])) {
                if (source_room.memory.source_container_ids[i] == undefined) { // 没有container
                    if (source_room.memory.energy_mine_chain_ok) {
                        if (energyCapacity >= 1050) {
                            if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'passive_transfer' + Game.time, { memory: { role: 'passive_transfer', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                source_room.memory.source_transfer_states[i] += 1;
                                source_room.memory.source_costs[i] += 600;
                                break;
                            }
                        }
                    }
                    else if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'passive_transfer' + Game.time, { memory: { role: 'passive_transfer', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                        source_room.memory.source_transfer_states[i] += 1;
                        source_room.memory.source_costs[i] += 300;
                        break;
                    }
                }
                else { // 含有container
                    if (source_room.memory.energy_mine_chain_ok) {
                        if (energyCapacity >= 600) {
                            if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'active_transfer' + Game.time, { memory: { role: 'active_transfer', source_container_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                source_room.memory.source_transfer_states[i] += 1;
                                source_room.memory.source_costs[i] += 600;
                                break;
                            }
                        }
                    }
                    else if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'active_transfer' + Game.time, { memory: { role: 'active_transfer', source_container_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                        source_room.memory.source_transfer_states[i] += 1;
                        source_room.memory.source_costs[i] += 300;
                        break;
                    }
                }
            }
        }
    }
}; // 常规流程结束
const room_energy_mine = function (source_roomName, dest_roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys) {
    /*
    自己控制的房间的能量采集逻辑
    找到能量采集点，并存储在RoomMemory中，如果有Container配合，存储对应的pos
    根据相关配置生成Creep
    */
    var source_room = Game.rooms[source_roomName];
    var dest_room = Game.rooms[dest_roomName];
    // room空值检查
    if (source_room == undefined) {
        console.log(Game.time, 'room_energy_mine source_room', source_roomName, ' undefined');
        return;
    }
    if (dest_room == undefined) {
        console.log(Game.time, "room_energy_mine dest_room", dest_roomName, ' undefined');
        return;
    }
    room_energy_mine_init$1(source_room);
    room_energy_mine_routine$1(source_roomName, dest_roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys);
};

const tower_work = function (roomName) {
    if (Game.rooms[roomName] == undefined) {
        console.log('tower work 23 room seems undefined');
        return;
    }
    // Tower防御及safe mode的激活
    let tower_list;
    let spawn_list;
    if (roomName == 'W47S14') {
        tower_list = ['6159d77e4f3a51396dd2fcfe', '615a15ea8e77705c01ebc303', '615bec8f3d8c500c57d69377'];
        spawn_list = ['Spawn1', 'Spawn3'];
    }
    else if (roomName == 'W48S12') {
        tower_list = ['6159ce743a785c3da4b22def'];
        spawn_list = ['Spawn2'];
    }
    for (let spawn_id in spawn_list) {
        if (Game.spawns[spawn_list[spawn_id]]) {
            if (Game.spawns['Spawn3'].hits <= 0.5 * Game.spawns['Spawn3'].hitsMax) {
                Game.rooms[roomName].controller.activateSafeMode();
            }
        }
    }
    let closestHostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    // let ramparts: StructureRampart[]
    let structures;
    // let ramparts_walls: Structure[]
    if (closestHostiles.length == 0) {
        structures = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
                && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART
        });
    }
    // if(closestHostiles.length == 0){
    //     ramparts = Game.rooms[roomName].find(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < 1000000  && (structure.structureType == STRUCTURE_RAMPART)
    //     });
    //     if(ramparts.length == 0) {
    //         structures = Game.rooms[roomName].find(FIND_STRUCTURES, {
    //             filter: (structure) => structure.hits < structure.hitsMax  
    //             && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART
    //         });
    //         if (structures.length == 0){
    //             ramparts_walls = Game.rooms[roomName].find(FIND_STRUCTURES, {
    //                 filter: (structure) => structure.hits < structure.hitsMax  
    //                 && structure.structureType != STRUCTURE_WALL
    //                 && structure.structureType != STRUCTURE_RAMPART
    //             });
    //         }
    //     }
    // }
    for (let tower_id in tower_list) {
        let tower = Game.getObjectById(tower_list[tower_id]);
        if (tower) {
            if (tower.hits <= 0.5 * tower.hitsMax) {
                Game.rooms[roomName].controller.activateSafeMode();
            }
            if (tower) {
                if (closestHostiles.length > 0) {
                    if (tower.room.memory.war_flag == false) {
                        console.log(Game.time, roomName, ' 发现敌军' + closestHostiles.length + closestHostiles[0].owner.username);
                    }
                    tower.room.memory.war_flag = true;
                    tower.attack(closestHostiles[0]);
                }
                else if (!(tower.store.getUsedCapacity(RESOURCE_ENERGY) < 0.7 * tower.store.getCapacity(RESOURCE_ENERGY))) {
                    tower.room.memory.war_flag = false;
                    if (structures.length > 0) {
                        tower.repair(structures[0]);
                    }
                    // if(ramparts.length > 0) {
                    //     tower.repair(ramparts[0]);
                    // }
                    // else{
                    //     if(structures.length > 0) {
                    //         tower.repair(structures[0]);
                    //     }
                    //     else{
                    //         if(ramparts_walls.length > 0) {
                    //             tower.repair(ramparts_walls[0]);
                    //         }
                    //     }
                    // }
                }
            }
        }
    }
};

const body_list = [
    [WORK, WORK, CARRY, MOVE],
    [WORK, WORK, CARRY, MOVE, MOVE],
    [WORK, WORK, CARRY, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], // 800
];
const room_base_running = function (roomName) {
    let spawnName;
    if (roomName == 'W47S14') {
        tower_work(roomName);
        spawnName = 'Spawn3';
        let cleaners_base_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'base_transfer' || creep.memory.role == 'cleaner');
        let base_transferNum = 2;
        let transfer_num = [1, 1];
        let harvester_num = [1, 1];
        let link_harvester_pos_xs = [,];
        let link_harvester_pos_ys = [,];
        room_energy_mine(roomName, roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys);
        let room = Game.rooms[roomName];
        let energyAvailable = room.energyAvailable;
        let carriersNum = 1;
        let tower_transfersNum = 1;
        let upgradersNum = 3;
        let repairersNum = 0;
        let buildersNum = 0;
        // let cleanerNum: number = 0;
        // let minersNum: number = 0;
        // let miner_transfersNum: number = 0;
        let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier_W47S14' && creep.ticksToLive > 80);
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader_link');
        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        // let miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        // let miner_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mine_transfer');
        let tower_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tower_transfer');
        let constructions = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
        if (constructions.length == 0) {
            buildersNum = 0;
        }
        (room.storage.store.getUsedCapacity() - 200000) / 100000;
        if (room.storage.store.getUsedCapacity() < 50000) {
            upgradersNum = 0;
        }
        if (Game.spawns[spawnName].spawning) {
            let spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
        }
        else {
            // if(miner_transfers.length < miner_transfersNum) {
            //     let newName = 'Miner_transfer' + Game.time;
            //     Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'mine_transfer', source_roomName: 'W47S14', dest_roomName: 'W47S14', mine_type: RESOURCE_HYDROGEN}});
            // }
            // else if(miners.length < minersNum) {
            //     let newName = 'Miner' + Game.time;
            //     Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'miner', source_roomName: 'W47S14', dest_roomName: 'W47S14', mine_idx: 0}});
            // }
            if (upgraders.length < upgradersNum) {
                let newName = 'Upgrader_link' + Game.time;
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader_link' } });
            }
            else if (repairers.length < repairersNum) {
                let newName = 'Repairer' + Game.time;
                let idx = Math.floor((energyAvailable - 300) / 50);
                if (idx > 10) {
                    idx = 10;
                }
                Game.spawns[spawnName].spawnCreep(body_list[idx], newName, { memory: { role: 'repairer' } });
            }
            else if (builders.length < buildersNum) {
                let newName = 'Builder' + Game.time;
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder' } });
            }
            // else if (cleaners_base_transfers.length < cleanerNum){
            //     let newName = 'Cleaner' + Game.time;
            //     Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE], newName, {memory: {role: 'cleaner'}})
            // }
            if (carriers.length < carriersNum) {
                let newName = 'Carrier' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, { memory: { role: 'carrier_W47S14' } });
            }
            if (tower_transfers.length < tower_transfersNum) {
                let newName = 'Tower_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, { memory: { role: 'tower_transfer' } });
            }
            if (cleaners_base_transfers.length < base_transferNum) {
                let newName = 'Base_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, { memory: { role: 'base_transfer' } });
            }
        }
        let source1_link = Game.getObjectById('615d6e761b8f40360c7387dd');
        let source2_link = Game.getObjectById('61450b41047f4458ae00790f');
        let dest_link = Game.getObjectById('6159d59ae59fcf2038ecf56c');
        let upgrade_link = Game.getObjectById('615a13005237858c5056f75f');
        source1_link.transferEnergy(dest_link);
        if (source2_link.store.getUsedCapacity(RESOURCE_ENERGY) > 600) {
            source2_link.transferEnergy(upgrade_link);
        }
        if (dest_link.store.getUsedCapacity(RESOURCE_ENERGY) > 600) {
            dest_link.transferEnergy(upgrade_link);
        }
    }
    // switch (room.controller.level){
    //     // case 0:
    //     //     // claimController即可升级, road 5个container
    //     //     // 预留，已经是自己的房间不会进入到这个逻辑
    //     //     break
    //     case 1:
    //         // 200能量到2级, energy capacity max 300
    //         // 升级
    //         break
    //     case 2:
    //         // 45,000能量到3级 5个extension Rampart, Wall, energy capacity max 550
    //         // 建造extension, 给Spawn套上Rampart, 升级
    //         break
    //     case 3:
    //         // 135,000到4级 10个extension, energy capacity max 800
    //         // 建造extension, Tower, 升级
    //         break
    //     case 4:
    //         // 405,000到5级 20个extension Storage, energy capacity max 1300
    //         // 建造extension, 建造Storage, 升级
    //         break
    //     case 5:
    //         // 1,215,000到6级  30个extension, energy capacity max 1800
    //         // 建造extension, 建造Tower, 建造link, 升级
    //         break
    //     case 6:
    //         break
    // }
};

const room_energy_mine_init = function (source_room) {
    /*
    需要建好storage
    
    如果没开启自动挖矿, 则进行初始化操作
    初始化的值有:
    是否初始化, 初始化之后只能手动变化
    room.memory.auto_energy_mine
    初始化之后永不变化
    room.memory.sources_id
    room.memory.sources_num

    需要从配置中读取
    room.memory.source_harvester_num
    room.memory.source_transfer_num
    常规流程中每一次都需要更新
    room.memory.source_harvester_states
    room.memory.source_transfer_states
    container相关状态量, 需要检查是否有变更并及时修改
    room.memory.container_ids
    room.memory.source_container_ids

    其他状态量
    room.memory.source_distance
    room.memory.source_gets
    room.memory.source_costs*/
    var sources_num;
    var containers_num;
    if (source_room.memory.auto_energy_mine != true) {
        var source;
        var sources;
        var container;
        var containers;
        // 如果没有存source_ids, 找到该房间所有能量source并存id
        if (source_room.memory.sources_id == undefined) {
            sources = source_room.find(FIND_SOURCES);
            source_room.memory.sources_num = sources.length;
            sources_num = source_room.memory.sources_num;
            source_room.memory.sources_id = new Array(sources_num);
            for (var i = 0; i < sources_num; i++) {
                source_room.memory.sources_id[i] = sources[i].id;
            }
        }
        else {
            sources_num = source_room.memory.sources_num;
        }
        // 数量设置状态量
        source_room.memory.source_harvester_num = new Array(sources_num);
        source_room.memory.source_transfer_num = new Array(sources_num);
        // harvester和transfer的数量记录
        source_room.memory.source_harvester_states = new Array(sources_num);
        source_room.memory.source_transfer_states = new Array(sources_num);
        // 初始化harvester和transfer的数量记录以及gets和costs状态量
        for (var i = 0; i < sources_num; i++) {
            source_room.memory.source_harvester_states[i] = 0;
            source_room.memory.source_transfer_states[i] = 0;
        }
        // 其他状态量
        if (source_room.memory.source_distance == undefined) {
            source_room.memory.source_distance = new Array(sources_num);
            source_room.memory.source_gets = new Array(sources_num);
            source_room.memory.room_harvester_energy_total = 0;
            source_room.memory.source_costs = new Array(sources_num);
            for (var i = 0; i < sources_num; i++) {
                source_room.memory.source_gets[i] = 0;
                source_room.memory.source_costs[i] = 0;
            }
        }
        // source对应的container id
        source_room.memory.source_container_ids = new Array(sources_num);
        // 初始化, 找到该房间所有container并存id
        containers = source_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        containers_num = containers.length;
        source_room.memory.containers_num = containers_num;
        source_room.memory.containers_id = new Array(containers_num);
        for (var i = 0; i < containers_num; i++) {
            source_room.memory.containers_id[i] = containers[i].id;
        }
        // 遍历所有source 找到source旁边的container, 初始化source_container_ids
        for (var i = 0; i < sources_num; i++) {
            source = Game.getObjectById(source_room.memory.sources_id[i]);
            // 遍历所有container
            for (var j = 0; j < containers_num; j++) {
                container = Game.getObjectById(source_room.memory.containers_id[j]);
                if (container) {
                    // judge source是否有container, 只考虑source周围8个格子中最先扫描到的那一个
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 &&
                        (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1) {
                        source_room.memory.source_container_ids[i] = container.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
        source_room.memory.auto_energy_mine = true;
    }
}; // 初始化结束
const room_energy_mine_routine = function (source_roomName, dest_roomName, spawnName, harvester_num, transfer_num) {
    var source_room = Game.rooms[source_roomName];
    var dest_room = Game.rooms[dest_roomName];
    // room空值检查
    if (source_room == undefined) {
        console.log(Game.time, "room_energy_mine_routine", source_roomName, ' undefined');
        return;
    }
    if (dest_room == undefined) {
        console.log(Game.time, 'room_energy_mine_routine', " ", dest_roomName, ' undefined');
        return;
    }
    var source;
    var sources_num;
    var container;
    var containers;
    var containers_num;
    var energyCapacity = dest_room.energyCapacityAvailable;
    containers_num = source_room.memory.containers_num;
    sources_num = source_room.memory.sources_num;
    source_room.memory.energy_mine_chain_ok = false;
    // 读取creep个数配置并更新creep个数状态
    for (var i = 0; i < sources_num; i++) {
        source_room.memory.source_transfer_num[i] = transfer_num[i];
        source_room.memory.source_harvester_num[i] = harvester_num[i];
        var energy_harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'out_energy_harvester_no_carry'
            || creep.memory.role == 'out_energy_harvester_with_carry')
            && creep.memory.source_idx == i
            && creep.memory.source_roomName == source_roomName
            && creep.ticksToLive > 100);
        source_room.memory.source_harvester_states[i] = energy_harvesters.length;
        var transfers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'out_active_transfer' && creep.memory.source_container_idx == i)
            || (creep.memory.role == 'out_passive_transfer' && creep.memory.source_idx == i)
                && creep.memory.source_roomName == source_roomName
                && creep.memory.dest_roomName == dest_roomName
                && creep.ticksToLive > 100);
        source_room.memory.source_transfer_states[i] = transfers.length;
        if (source_room.memory.source_harvester_states[i] >= 1 && source_room.memory.source_transfer_states[i] >= 1) {
            source_room.memory.energy_mine_chain_ok = true;
        }
    }
    // 根据配置决定是否更新containers信息
    if (source_room.memory.check_containers_state == true) {
        // 初始化, 找到该房间所有container并存id
        containers = source_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        containers_num = containers.length;
        source_room.memory.containers_num = containers_num;
        source_room.memory.containers_id = new Array(containers_num);
        for (var i = 0; i < containers_num; i++) {
            source_room.memory.containers_id[i] = containers[i].id;
        }
        source_room.memory.check_containers_state = false;
    }
    // 是否新增container或原有的对应source的container有变化
    for (var i = 0; i < sources_num; i++) {
        source = Game.getObjectById(source_room.memory.sources_id[i]);
        // source旁原来没有container现在是否新建了
        if (source_room.memory.source_container_ids[i] == undefined) {
            for (var j = 0; j < containers_num; j++) {
                container = Game.getObjectById(source_room.memory.containers_id[j]);
                if (container) {
                    // judge source是否有container, 只考虑source周围8个格子中最先扫描到的那一个
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 &&
                        (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1) {
                        source_room.memory.source_container_ids[i] = container.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
        // source原有的container是否有变化
        else if (Game.getObjectById(source_room.memory.source_container_ids[i]) == undefined) {
            source_room.memory.source_container_ids[i] = undefined;
            for (var j = 0; j < containers_num; j++) {
                container = Game.getObjectById(source_room.memory.containers_id[j]);
                if (container) {
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 &&
                        (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1) {
                        source_room.memory.source_container_ids[i] = container.id;
                        source_room.memory.source_costs[i] += 5000;
                        break;
                    }
                }
            }
        }
    }
    // 为每个source生成creep
    for (var i = 0; i < sources_num; i++) {
        // spawn需要在空闲状态
        if (Game.spawns[spawnName].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
        }
        else {
            if (source_room.memory.source_harvester_states[i] < source_room.memory.source_harvester_num[i]) {
                source = Game.getObjectById(source_room.memory.sources_id[i]);
                if (source_room.memory.source_container_ids[i] == undefined) { // 没有container
                    // 暂时不支持4000的source
                    if (source.energyCapacity == 3000) {
                        if (source_room.memory.energy_mine_chain_ok) {
                            if (energyCapacity >= 950) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'out_Harvester_with_carry' + Game.time, { memory: { role: 'out_energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 950;
                                    break;
                                }
                            }
                            else if (energyCapacity >= 500) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'out_Harvester_with_carry' + Game.time, { memory: { role: 'out_energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 500;
                                    break;
                                }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'out_Harvester_with_carry' + Game.time, { memory: { role: 'out_energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) { // 测试OK
                            source_room.memory.source_harvester_states[i] += 1;
                            source_room.memory.source_costs[i] += 300;
                            break;
                        }
                    }
                    else if (source.energyCapacity == 1500) {
                        if (source_room.memory.energy_mine_chain_ok) {
                            if (energyCapacity >= 500) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'out_Harvester_with_carry' + Game.time, { memory: { role: 'out_energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 500;
                                    break;
                                }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'out_Harvester_with_carry' + Game.time, { memory: { role: 'out_energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                            source_room.memory.source_harvester_states[i] += 1;
                            source_room.memory.source_costs[i] += 300;
                            break;
                        }
                    }
                }
                else { // 含有container
                    container = Game.getObjectById(source_room.memory.source_container_ids[i]);
                    if (source.energyCapacity == 3000) {
                        if (source_room.memory.energy_mine_chain_ok) {
                            if (energyCapacity >= 650) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], 'out_Harvester_no_carry' + Game.time, { memory: { role: 'out_energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 650;
                                    break;
                                }
                            }
                            else if (energyCapacity >= 400) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE], 'out_Harvester_no_carry' + Game.time, { memory: { role: 'out_energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 400;
                                    break;
                                }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, MOVE], 'out_Harvester_no_carry' + Game.time, { memory: { role: 'out_energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                            source_room.memory.source_harvester_states[i] += 1;
                            source_room.memory.source_costs[i] += 250;
                            break;
                        }
                    }
                    else if (source.energyCapacity == 1500) {
                        if (source_room.memory.energy_mine_chain_ok) {
                            if (energyCapacity >= 450) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], 'out_Harvester_no_carry' + Game.time, { memory: { role: 'out_energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 450;
                                    break;
                                }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'out_Harvester_no_carry' + Game.time, { memory: { role: 'out_energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y } }) == OK) {
                            source_room.memory.source_harvester_states[i] += 1;
                            source_room.memory.source_costs[i] += 300;
                            break;
                        }
                    }
                }
            }
            // 有harvester才会生成对应的transfer
            if (source_room.memory.source_harvester_states[i] != 0 && (source_room.memory.source_transfer_states[i] < source_room.memory.source_transfer_num[i])) {
                if (source_room.memory.source_container_ids[i] == undefined) { // 没有container
                    if (source_room.memory.energy_mine_chain_ok) {
                        if (energyCapacity >= 800) {
                            if (Game.spawns[spawnName].spawnCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], 'out_passive_transfer' + Game.time, { memory: { role: 'out_passive_transfer', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                source_room.memory.source_transfer_states[i] += 1;
                                source_room.memory.source_costs[i] += 800;
                                break;
                            }
                        }
                    }
                    else if (Game.spawns[spawnName].spawnCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], 'out_passive_transfer' + Game.time, { memory: { role: 'out_passive_transfer', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                        source_room.memory.source_transfer_states[i] += 1;
                        source_room.memory.source_costs[i] += 300;
                        break;
                    }
                }
                else { // 含有container
                    if (source_room.memory.energy_mine_chain_ok) {
                        if (energyCapacity >= 600) {
                            if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'out_active_transfer' + Game.time, { memory: { role: 'out_active_transfer', source_container_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                source_room.memory.source_transfer_states[i] += 1;
                                source_room.memory.source_costs[i] += 600;
                                break;
                            }
                        }
                    }
                    else if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'out_active_transfer' + Game.time, { memory: { role: 'out_active_transfer', source_container_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                        source_room.memory.source_transfer_states[i] += 1;
                        source_room.memory.source_costs[i] += 300;
                        break;
                    }
                }
            }
        }
    }
}; // 常规流程结束
const out_room_energy_mine = function (source_roomName, dest_roomName, spawnName, harvester_num, transfer_num) {
    /*
    source_roomName: source所在room
    dest_roomName: 能量运输目的room
    外矿房间能量采集逻辑
    找到能量采集点，并存储在RoomMemory中，如果有Container配合，存储对应的pos
    根据相关配置生成Creep
    */
    var source_room = Game.rooms[source_roomName];
    var dest_room = Game.rooms[dest_roomName];
    // room空值检查
    if (source_room == undefined) {
        if (Game.spawns[spawnName].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
        }
        else {
            var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'out_scout' && creep.memory.source_roomName == source_roomName);
            if (scouts.length < 1) {
                var newName = 'out_Scout' + Game.time;
                Game.spawns[spawnName].spawnCreep([MOVE], newName, { memory: { role: 'out_scout', source_roomName: source_roomName, dest_roomName: dest_roomName } });
            }
        }
        return;
    }
    if (dest_room == undefined) {
        console.log(Game.time, 'out_room_energy_mine', dest_roomName, ' undefined');
        return;
    }
    var hostiles = source_room.find(FIND_HOSTILE_CREEPS);
    _.filter(Game.creeps, (creep) => creep.memory.role == 'out_soldier' && creep.memory.source_roomName == source_roomName);
    var invader_cores = source_room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_INVADER_CORE; } });
    if (invader_cores.length > 0) {
        source_room.memory.invader_core_id = invader_cores[0].id;
        var controller = Game.getObjectById(source_room.memory.controller_id);
        if (Game.spawns[spawnName].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
        }
        else {
            if (hostiles.length <= 2) {
                var attack_invader_cores = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack_invader_core' && creep.memory.source_roomName == source_roomName && creep.ticksToLive > 80);
                if (attack_invader_cores.length < 2 + hostiles.length) {
                    var newName = 'attack_invader_core' + Game.time;
                    Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'attack_invader_core', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                }
            }
            else {
                var attack_invader_cores = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack_invader_core' && creep.memory.source_roomName == source_roomName && creep.ticksToLive > 80);
                if (attack_invader_cores.length < 2 + 2 * hostiles.length) {
                    var newName = 'attack_invader_core' + Game.time;
                    Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'attack_invader_core', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                }
            }
            var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.source_roomName == source_roomName && creep.ticksToLive > 80);
            if (controller.reservation == undefined) {
                if (reservers.length < 1) {
                    var newName = 'reserver' + Game.time;
                    Game.spawns[spawnName].spawnCreep([CLAIM, CLAIM, CLAIM, MOVE, MOVE, MOVE], newName, { memory: { role: 'reserver', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                }
            }
            else {
                if (controller.reservation.ticksToEnd < 4000 && reservers.length < 1) {
                    var newName = 'reserver' + Game.time;
                    Game.spawns[spawnName].spawnCreep([CLAIM, CLAIM, CLAIM, MOVE, MOVE, MOVE], newName, { memory: { role: 'reserver', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                }
            }
        }
    }
    if (hostiles.length > 2) {
        source_room.memory.enemy_num = hostiles.length;
        if (source_room.memory.war_flag == false) {
            console.log(Game.time + source_roomName + ' 发现敌军: ', hostiles.length, ' owner:', hostiles[0].owner.username, 'room_harvester_energy_total', Memory.rooms[source_roomName].room_harvester_energy_total);
            source_room.memory.war_flag = true;
            source_room.memory.room_harvester_energy_total = 0;
        }
        if (hostiles[0].owner.username == 'Invader') {
            source_room.memory.invader_died_tick = Game.time + hostiles[0].ticksToLive;
        }
    }
    else if (hostiles.length == 1) {
        source_room.memory.enemy_num = hostiles.length;
        if (source_room.memory.war_flag == false) {
            console.log(Game.time + source_roomName + ' 发现敌军: ', hostiles.length, ' owner:', hostiles[0].owner.username, 'room_harvester_energy_total', Memory.rooms[source_roomName].room_harvester_energy_total);
            source_room.memory.war_flag = true;
            source_room.memory.room_harvester_energy_total = 0;
        }
        if (hostiles[0].owner.username == 'Invader') {
            if (Game.spawns[spawnName].spawning) {
                var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
                Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
            }
            else {
                var attack_invader_cores = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack_invader_core' && creep.memory.source_roomName == source_roomName && creep.ticksToLive > 80);
                if (attack_invader_cores.length < 2) {
                    var newName = 'attack_invader_core' + Game.time;
                    Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'attack_invader_core', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                }
            }
        }
    }
    else {
        source_room.memory.controller_id = source_room.controller.id;
        var controller = Game.getObjectById(source_room.memory.controller_id);
        if (controller == null || controller == undefined) {
            console.log(Game.time, 'out_room_energy_mine', dest_roomName, 'controller null or undefined');
        }
        else {
            if (Game.spawns[spawnName].spawning) {
                var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
                Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
            }
            else {
                var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.source_roomName == source_roomName && creep.ticksToLive > 80);
                if (controller.reservation == undefined) {
                    if (reservers.length < 1) {
                        var newName = 'reserver' + Game.time;
                        Game.spawns[spawnName].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], newName, { memory: { role: 'reserver', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                    }
                }
                else {
                    if (controller.reservation.ticksToEnd < 4000 && reservers.length < 1) {
                        var newName = 'reserver' + Game.time;
                        Game.spawns[spawnName].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], newName, { memory: { role: 'reserver', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                    }
                }
            }
        }
        source_room.memory.war_flag = false;
        source_room.memory.enemy_num = 0;
        room_energy_mine_init(source_room);
        room_energy_mine_routine(source_roomName, dest_roomName, spawnName, harvester_num, transfer_num);
    }
    if (source_roomName == 'W47S15' || source_roomName == 'W48S14') {
        if (source_roomName == 'W47S15') {
            Game.rooms['W47S15'].memory.war_flag == false;
        }
        else if (source_roomName == 'W48S14') {
            Game.rooms['W48S14'].memory.war_flag == false;
        }
        if (Game.spawns[spawnName].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
        }
        else {
            if (hostiles.length <= 2) {
                var attack_invader_cores = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack_invader_core' && creep.memory.source_roomName == source_roomName && creep.ticksToLive > 150);
                if (attack_invader_cores.length < 2 + hostiles.length) {
                    var newName = 'attack_invader_core' + Game.time;
                    Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'attack_invader_core', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                }
            }
            else {
                var attack_invader_cores = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack_invader_core' && creep.memory.source_roomName == source_roomName && creep.ticksToLive > 150);
                if (attack_invader_cores.length < 2 + 2 * hostiles.length) {
                    var newName = 'attack_invader_core' + Game.time;
                    Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'attack_invader_core', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                }
            }
        }
        source_room.memory.controller_id = source_room.controller.id;
        var controller = Game.getObjectById(source_room.memory.controller_id);
        if (controller == null || controller == undefined) {
            console.log(Game.time, 'out_room_energy_mine', dest_roomName, 'controller null or undefined');
        }
        else {
            if (Game.spawns[spawnName].spawning) {
                var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
                Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
            }
            else {
                var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.source_roomName == source_roomName && creep.ticksToLive > 150);
                if (controller.reservation == undefined) {
                    if (reservers.length < 1) {
                        var newName = 'reserver' + Game.time;
                        Game.spawns[spawnName].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], newName, { memory: { role: 'reserver', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                    }
                }
                else {
                    if (controller.reservation.ticksToEnd < 4000 && reservers.length < 1) {
                        var newName = 'reserver' + Game.time;
                        Game.spawns[spawnName].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], newName, { memory: { role: 'reserver', dest_roomName: dest_roomName, source_roomName: source_roomName } });
                    }
                }
            }
        }
        source_room.memory.war_flag = false;
        source_room.memory.enemy_num = 0;
        room_energy_mine_init(source_room);
        room_energy_mine_routine(source_roomName, dest_roomName, spawnName, harvester_num, transfer_num);
    }
};

const active_transfer_work = function (creep) {
    // creep.say('👋 active transfer');
    let source_room = Game.rooms[creep.memory.source_roomName];
    let dest_room = Game.rooms[creep.memory.dest_roomName];
    // room空值检查
    if (source_room == undefined) {
        console.log(Game.time, " ", creep.memory.source_roomName, 'undefined');
        return;
    }
    if (dest_room == undefined) {
        console.log(Game.time, " ", creep.memory.dest_roomName, 'undefined');
        return;
    }
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        creep.say('🚧 withdraw');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在withdraw状态，且取不了了，装满了，退出withdraw状态
        creep.memory.is_working = true;
        creep.say('🔄 transfer');
    }
    if (creep.memory.is_working) {
        let flag = true;
        if (dest_room.memory.storage_id == undefined) {
            let targets = dest_room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            if (targets.length > 0) {
                dest_room.memory.storage_id = targets[0].id;
            }
            else {
                flag = false;
            }
        }
        if (flag) {
            let storage = Game.getObjectById(dest_room.memory.storage_id);
            if (storage == null) {
                let targets = dest_room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }
                });
                if (targets.length > 0) {
                    dest_room.memory.storage_id = targets[0].id;
                }
                else {
                    console.log(Game.time, 'active_transfer_work', dest_room.name, 'storage is null');
                    dest_room.memory.storage_id = undefined;
                }
            }
            if (storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                let code = creep.transfer(storage, RESOURCE_ENERGY);
                if (code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
                    return;
                }
                else if (code == OK) {
                    source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY);
                }
                else if (code != ERR_BUSY) {
                    console.log(Game.time, 'active_transfer_work', code);
                }
            }
        }
        if (dest_room.memory.terminal_id == undefined) {
            let targets = dest_room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if (targets.length > 0) {
                dest_room.memory.terminal_id = targets[0].id;
            }
        }
        let terminal = Game.getObjectById(dest_room.memory.terminal_id);
        if (terminal == null) {
            let targets = dest_room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if (targets.length > 0) {
                dest_room.memory.terminal_id = targets[0].id;
            }
            else {
                console.log(Game.time, 'active_transfer_work', dest_room.name, 'terminal is null');
                dest_room.memory.terminal_id = undefined;
            }
        }
        if (terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            let code = creep.transfer(terminal, RESOURCE_ENERGY);
            if (code == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
                return;
            }
            else if (code == OK) {
                source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY);
            }
            else if (code != ERR_BUSY) {
                console.log(Game.time, 'active_transfer_work', code, 'need new energy destination');
            }
        }
    }
    else {
        let container = Game.getObjectById(source_room.memory.source_container_ids[creep.memory.source_container_idx]);
        let code = creep.withdraw(container, RESOURCE_ENERGY);
        if (code == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        else if (code != OK) {
            let res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (res != null) {
                if (creep.pickup(res) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(res, { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
        }
    }
};

const base_transfer_work = function (creep) {
    // creep.say('👋 base transfer');
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        creep.say('🚧 withdraw');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在withdraw状态，且取不了了，装满了，退出withdraw状态
        creep.memory.is_working = true;
        creep.say('🔄 transfer');
    }
    if (creep.memory.is_working) {
        if (creep.store.getUsedCapacity() > 0) {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (target) {
                let code = creep.transfer(target, RESOURCE_ENERGY);
                if (code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
            else {
                creep.memory.role = 'cleaner';
            }
        }
    }
    else {
        let flag = true;
        if (creep.room.memory.storage_id == undefined) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            if (targets.length > 0) {
                creep.room.memory.storage_id = targets[0].id;
            }
            else {
                flag = false;
            }
        }
        if (flag) {
            let storage = Game.getObjectById(creep.room.memory.storage_id);
            if (storage == null) {
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }
                });
                if (targets.length > 0) {
                    creep.room.memory.storage_id = targets[0].id;
                }
                else {
                    console.log(Game.time, 'base_transfer_work', creep.room.name, 'storage is null');
                    creep.room.memory.storage_id = undefined;
                }
            }
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
                    return;
                }
            }
        }
        if (creep.room.memory.terminal_id == undefined) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if (targets.length > 0) {
                creep.room.memory.terminal_id = targets[0].id;
            }
        }
        let terminal = Game.getObjectById(creep.room.memory.terminal_id);
        if (terminal == null) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if (targets.length > 0) {
                creep.room.memory.terminal_id = targets[0].id;
            }
            else {
                console.log(Game.time, 'base_transfer_work', creep.room.name, 'terminal is null');
                creep.room.memory.terminal_id = undefined;
            }
        }
        if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

const builder_work = function (creep) {
    // creep.say('🔄 Here');
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.memory.path = null;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.memory.path = null;
        creep.say('🚧 build');
    }
    if (creep.memory.is_working) {
        let construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD);
            }
        });
        if (construction) {
            if (creep.build(construction) == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction, { visualizePathStyle: { stroke: '#008cff' } });
            }
        }
        else {
            let constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if (constructions.length > 0) {
                if (creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructions[0], { visualizePathStyle: { stroke: '#008cff' } });
                }
            }
            else {
                creep.memory.role = 'repairer';
            }
        }
    }
    else {
        if (creep.room.name == 'W48S12') {
            let source;
            if (creep.room.memory.sources_id == undefined) {
                let sources = creep.room.find(FIND_SOURCES);
                Memory.rooms[creep.room.name].sources_id = new Array(sources.length);
                for (let i = 0; i < sources.length; i++) {
                    Memory.rooms[creep.room.name].sources_id[i] = sources[i].id;
                }
            }
            source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
            let code = creep.harvest(source);
            if (code == ERR_NOT_IN_RANGE) {
                code = creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#808080' } });
            }
            else if (code != ERR_BUSY && code != OK) {
                console.log(Game.time, 'builder_work', code);
            }
        }
        else {
            let storage = Game.getObjectById('6159fc1609f790175f45c6be');
            if (storage) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#808080' } });
                }
            }
            else {
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TERMINAL);
                    }
                });
                if (targets.length > 0) {
                    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                else {
                    let targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if (targets.length > 0) {
                        if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
            }
        }
    }
};

const carrier_W47S14_work = function (creep) {
    // creep.say('🔄 Here');
    if (creep.memory.dontPullMe == undefined) {
        creep.memory.dontPullMe = true;
    }
    if (creep.pos.x != 8 || creep.pos.y != 19) {
        creep.moveTo(new RoomPosition(8, 19, 'W47S14'), { visualizePathStyle: { stroke: '#00ff0e' } });
    }
    else {
        let link = Game.getObjectById("6159d59ae59fcf2038ecf56c");
        let upgrade_link = Game.getObjectById('615a13005237858c5056f75f');
        let storage = Game.getObjectById("6159fc1609f790175f45c6be");
        let terminal = Game.getObjectById('615ab4e746872376a3726f6f');
        if (upgrade_link.store.getUsedCapacity(RESOURCE_ENERGY) < 300 && link.cooldown < 3) {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.withdraw(storage, RESOURCE_ENERGY);
            }
            else {
                creep.transfer(link, RESOURCE_ENERGY);
            }
        }
        else if (link.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.withdraw(link, RESOURCE_ENERGY);
            }
            else {
                creep.transfer(storage, RESOURCE_ENERGY);
            }
        }
        else if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) <= 100000 && storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY)) {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.withdraw(storage, RESOURCE_ENERGY);
            }
            else {
                creep.transfer(terminal, RESOURCE_ENERGY);
            }
        }
        else if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 200000) {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.withdraw(terminal, RESOURCE_ENERGY);
            }
            else {
                creep.transfer(storage, RESOURCE_ENERGY);
            }
        }
    }
};

const cleaner_work = function (creep) {
    // creep.say('🔄 Here');
    creep.memory.dontPullMe = false;
    if (creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        // 如果在捡东西状态，装满了，那么退出工作状态
        creep.memory.is_working = false;
        creep.say('🔄 transfer');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == creep.store.getCapacity()) {
        // if(!creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        //如果在运东西状态，且没有能量了，退出运输状态
        creep.memory.is_working = true;
        creep.say('🚧 pickup');
    }
    if (creep.memory.is_working) {
        let res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (res != null) {
            if (creep.pickup(res) == ERR_NOT_IN_RANGE) {
                creep.moveTo(res, { visualizePathStyle: { stroke: '#ffff00' } });
            }
        }
        else {
            let tomb = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                filter: (structure) => {
                    return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (tomb != null) {
                if (creep.withdraw(tomb, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tomb, { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
            else {
                let ruin = creep.pos.findClosestByRange(FIND_RUINS, {
                    filter: (structure) => {
                        return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
                if (ruin != null) {
                    if (creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ruin, { visualizePathStyle: { stroke: '#ffff00' } });
                    }
                }
                else {
                    creep.memory.role = 'base_transfer';
                }
            }
        }
    }
    else {
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && creep.store.getUsedCapacity() != 0) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (creep.transfer(targets[0], RESOURCE_ZYNTHIUM_HYDRIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (creep.transfer(targets[0], RESOURCE_KEANIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (creep.transfer(targets[0], RESOURCE_UTRIUM_HYDRIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (creep.transfer(targets[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
            else {
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TERMINAL);
                    }
                });
                if (creep.transfer(targets[0], RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (creep.transfer(targets[0], RESOURCE_ZYNTHIUM_HYDRIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (creep.transfer(targets[0], RESOURCE_KEANIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (creep.transfer(targets[0], RESOURCE_UTRIUM_HYDRIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (creep.transfer(targets[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
            else {
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                    }
                }
                else {
                    let targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                        }
                    });
                    if (targets.length > 0) {
                        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                        }
                    }
                }
            }
        }
    }
};

const energy_harvester_link_work = function (creep) {
    // creep.say('🔄 Here');
    let link = Game.getObjectById(creep.room.memory.source_link_ids[creep.memory.source_idx]);
    if (link == undefined) {
        console.log(Game.time, "energy_harvester_link_work source link id:", creep.room.memory.source_link_ids[creep.memory.source_idx], 'index:', creep.memory.source_idx, 'undefined');
        return;
    }
    creep.transfer(link, RESOURCE_ENERGY);
    let source_room = Game.rooms[creep.memory.source_roomName];
    if (source_room == undefined) {
        console.log(Game.time, "energy_harvester_link_work", creep.memory.source_roomName, 'undefined');
        return;
    }
    let source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx]);
    if (creep.memory.is_working == undefined) {
        creep.moveTo(new RoomPosition(creep.memory.link_harvester_pos_x, creep.memory.link_harvester_pos_y, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#00ff0e' } });
        if (creep.pos.x == creep.memory.link_harvester_pos_x && creep.pos.y == creep.memory.link_harvester_pos_y && creep.room.name == creep.memory.source_roomName) {
            creep.memory.is_working = true;
        }
    }
    else {
        let code = creep.harvest(source);
        if (code == ERR_NOT_IN_RANGE) {
            code = creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#808080' } });
        }
        else if (code != ERR_BUSY && code != OK) {
            console.log(Game.time, 'energy_harvester_link_work', code);
        }
    }
};

const energy_harvester_no_carry_work = function (creep) {
    // creep.say('👋 Here');
    let source_room = Game.rooms[creep.memory.source_roomName];
    if (source_room == undefined) {
        console.log(Game.time, "energy_harvester_no_carry_work", creep.memory.source_roomName, ' undefined');
        return;
    }
    if (creep.memory.is_working == true) {
        let source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx]);
        let code = creep.harvest(source);
        if (code == ERR_NOT_IN_RANGE) {
            code = creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#808080' } });
        }
        else if (code != ERR_BUSY && code != OK && code != ERR_NOT_ENOUGH_RESOURCES) {
            console.log(Game.time, 'energy_harvester_no_carry_work', code);
        }
    }
    else {
        if (creep.pos.x == creep.memory.container_pos_x && creep.pos.y == creep.memory.container_pos_y) {
            creep.memory.is_working = true;
        }
        creep.moveTo(new RoomPosition(creep.memory.container_pos_x, creep.memory.container_pos_y, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#808080' } });
    }
};

const energy_harvester_with_carry_work = function (creep) {
    // creep.say('🔄 Here');
    if (creep.store.getCapacity() >= 50) {
        let transfer_creep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (cre) => {
                return (cre.memory.role == 'passive_transfer' &&
                    cre.memory.source_idx == creep.memory.source_idx &&
                    cre.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        creep.transfer(transfer_creep, RESOURCE_ENERGY);
    }
    let source_room = Game.rooms[creep.memory.source_roomName];
    if (source_room == undefined) {
        console.log(Game.time, "energy_harvester_with_carry_work", creep.memory.source_roomName, ' undefined');
        return;
    }
    let source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx]);
    if (creep.memory.is_working == undefined) {
        creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#00ff0e' } });
        if (creep.pos.isNearTo(source)) {
            creep.memory.is_working = true;
        }
    }
    else {
        let code = creep.harvest(source);
        if (code == ERR_NOT_IN_RANGE) {
            code = creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#808080' } });
        }
        else if (code != ERR_BUSY && code != OK && code != ERR_NOT_ENOUGH_RESOURCES) {
            console.log(Game.time, 'energy_harvester_with_carry_work', code);
        }
    }
};

const passive_transfer_work = function (creep) {
    creep.memory.dontPullMe = false;
    let source_room = Game.rooms[creep.memory.source_roomName];
    let dest_room = Game.rooms[creep.memory.dest_roomName];
    // room空值检查
    if (source_room == undefined) {
        console.log(Game.time, "passive_transfer_work", creep.memory.source_roomName, 'undefined');
        return;
    }
    if (dest_room == undefined) {
        console.log(Game.time, 'passive_transfer_work', creep.memory.dest_roomName, "undefined");
        return;
    }
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在采集状态，且采集不了了，装满了，退出采集状态
        creep.memory.is_working = true;
        creep.say('🚧 transfer');
    }
    if (creep.memory.is_working) {
        let flag = true;
        if (dest_room.memory.storage_id == undefined) {
            let targets = dest_room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            if (targets.length > 0) {
                dest_room.memory.storage_id = targets[0].id;
            }
            else {
                flag = false;
            }
        }
        if (flag) {
            let storage = Game.getObjectById(dest_room.memory.storage_id);
            if (storage == null) {
                let targets = dest_room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }
                });
                if (targets.length > 0) {
                    dest_room.memory.storage_id = targets[0].id;
                }
                else {
                    console.log(Game.time, 'passive_transfer_work', dest_room.name, 'storage is null');
                    dest_room.memory.storage_id = undefined;
                }
            }
            if (storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                let code = creep.transfer(storage, RESOURCE_ENERGY);
                if (code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
                    return;
                }
                else if (code == OK) {
                    source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY);
                }
                else if (code != ERR_BUSY) {
                    console.log(Game.time, 'passive_transfer_work', code);
                }
            }
        }
        if (dest_room.memory.terminal_id == undefined) {
            let targets = dest_room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if (targets.length > 0) {
                dest_room.memory.terminal_id = targets[0].id;
            }
        }
        let terminal = Game.getObjectById(dest_room.memory.terminal_id);
        if (terminal == null) {
            let targets = dest_room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if (targets.length > 0) {
                dest_room.memory.terminal_id = targets[0].id;
            }
            else {
                console.log(Game.time, 'passive_transfer_work', dest_room.name, 'terminal is null');
                dest_room.memory.terminal_id = undefined;
            }
        }
        if (terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            let code = creep.transfer(terminal, RESOURCE_ENERGY);
            if (code == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
                return;
            }
            else if (code == OK) {
                source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY);
            }
            else if (code != ERR_BUSY) {
                console.log(Game.time, 'passive_transfer_work', code, 'need new energy destination');
            }
        }
    }
    else {
        let farm_creeps = source_room.find(FIND_MY_CREEPS, {
            filter: (cre) => {
                return ((cre.memory.role == 'energy_harvester_with_carry' || cre.memory.role == 'energy_harvester_no_carry') &&
                    cre.memory.source_idx == creep.memory.source_idx &&
                    cre.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if (farm_creeps.length > 0) {
            creep.moveTo(farm_creeps[0], { visualizePathStyle: { stroke: '#008cff' } });
        }
        else {
            let source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx]);
            let place;
            if (source.pos.x >= 25) {
                if (source.pos.y >= 25) {
                    place = new RoomPosition(source.pos.x - 8, source.pos.y - 8, creep.memory.source_roomName);
                }
                else {
                    place = new RoomPosition(source.pos.x - 8, source.pos.y + 8, creep.memory.source_roomName);
                }
            }
            else {
                if (source.pos.y >= 25) {
                    place = new RoomPosition(source.pos.x + 8, source.pos.y - 8, creep.memory.source_roomName);
                }
                else {
                    place = new RoomPosition(source.pos.x + 8, source.pos.y + 8, creep.memory.source_roomName);
                }
            }
            creep.moveTo(place, { visualizePathStyle: { stroke: '#008cff' } });
        }
    }
};

const repairer_work = function (creep) {
    // creep.say('🔄 Here');
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 repair');
    }
    if (creep.memory.is_working) {
        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits < 1000 && s.hits < s.hitsMax) && (s.structureType != STRUCTURE_LAB && s.structureType != STRUCTURE_EXTRACTOR)
        });
        if (target) {
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            let ramparts = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax && structure.hits < 1000000) && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)
            });
            if (ramparts.length > 0) {
                let code = creep.repair(ramparts[0]);
                if (code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ramparts[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else {
                if (creep.room.name == 'W48S12') {
                    creep.memory.role = 'builder';
                }
            }
        }
    }
};

const upgrader_link_work = function (creep) {
    creep.upgradeController(creep.room.controller);
    let link = Game.getObjectById('615a13005237858c5056f75f');
    if (link) {
        if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            let target = link;
            if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
            }
            let code = creep.moveByPath(creep.memory.path);
            if (code == ERR_NOT_FOUND) {
                if (creep.pos.isNearTo(target)) {
                    creep.memory.path = null;
                }
                else {
                    creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
                }
            }
        }
    }
};

const out_soldier_work = function (creep) {
    if (creep.hits < 2 / 3 * creep.hitsMax) {
        if (creep.room.name != creep.memory.dest_roomName) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.dest_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
        }
        else {
            var doctors = creep.room.find(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return (creep.getActiveBodyparts(HEAL) > 1);
                }
            });
            if (doctors.length > 0) {
                creep.moveTo(doctors[0]);
            }
        }
    }
    else {
        if (creep.room.name != creep.memory.source_roomName) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
        }
        else {
            if (creep.pos.x > 47 || creep.pos.x < 2 || creep.pos.y < 2 || creep.pos.y > 47) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
            }
            var invade_targets = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: (creep) => {
                    return (creep.getActiveBodyparts(HEAL) > 1);
                }
            });
            if (invade_targets.length > 0) {
                creep.room.memory.war_flag = true;
                creep.room.memory.enemy_num = invade_targets.length;
                if (creep.rangedAttack(invade_targets[0]) != OK) {
                    creep.moveTo(invade_targets[0]);
                }
            }
            else {
                var invade_targets = creep.room.find(FIND_HOSTILE_CREEPS);
                if (invade_targets.length > 0) {
                    creep.room.memory.war_flag = true;
                    creep.room.memory.enemy_num = invade_targets.length;
                    if (creep.rangedAttack(invade_targets[0]) != OK) {
                        creep.moveTo(invade_targets[0]);
                    }
                }
                else {
                    creep.room.memory.war_flag = false;
                    creep.room.memory.enemy_num = 0;
                    if (creep.memory.dest_roomName == 'W47S15') {
                        creep.moveTo(new RoomPosition(26, 21, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
                    }
                    else {
                        creep.moveTo(new RoomPosition(25, 22, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
                    }
                }
            }
        }
    }
};

const out_scout_work = function (creep) {
    if (Memory.rooms[creep.memory.source_roomName] == undefined) {
        if (creep.room.name != creep.memory.source_roomName) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
        }
        else {
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if (hostiles.length > 0) {
                creep.room.memory.war_flag = true;
                creep.room.memory.enemy_num = hostiles.length;
                creep.moveTo(new RoomPosition(25, 25, creep.memory.dest_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
            }
            else {
                creep.room.memory.war_flag = false;
                creep.room.memory.enemy_num = 0;
                if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47) {
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
                }
            }
        }
    }
    else if (Memory.rooms[creep.memory.source_roomName].invader_died_tick <= Game.time) {
        // else{
        if (creep.room.name != creep.memory.source_roomName) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
        }
        else {
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if (hostiles.length > 0) {
                creep.room.memory.war_flag = true;
                creep.room.memory.enemy_num = hostiles.length;
                creep.moveTo(new RoomPosition(25, 25, creep.memory.dest_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
            }
            else {
                creep.room.memory.war_flag = false;
                creep.room.memory.enemy_num = 0;
                if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47) {
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
                }
            }
        }
    }
};

const out_energy_harvester_with_carry_work = function (creep) {
    // creep.say('🔄 Here');
    let source_room = Game.rooms[creep.memory.source_roomName];
    if (source_room == undefined) {
        return;
    }
    if (Game.rooms[creep.memory.source_roomName].memory.war_flag == true) {
        creep.memory.is_working = false;
        creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName), { visualizePathStyle: { stroke: '#808080' } });
    }
    else {
        if (creep.store.getCapacity() >= 50) {
            let transfer_creep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (cre) => {
                    return (cre.memory.role == 'out_passive_transfer' &&
                        cre.memory.source_idx == creep.memory.source_idx &&
                        cre.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            source_room.memory.room_harvester_energy_total += creep.store.getUsedCapacity();
            creep.transfer(transfer_creep, RESOURCE_ENERGY);
        }
        let source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx]);
        if (creep.memory.is_working == undefined) {
            creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#00ff0e' } });
            if (creep.pos.isNearTo(source)) {
                creep.memory.is_working = true;
            }
        }
        else {
            let code = creep.harvest(source);
            if (code == ERR_NOT_IN_RANGE) {
                code = creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#808080' } });
            }
            else if (code != ERR_BUSY && code != OK && code != ERR_NOT_ENOUGH_RESOURCES && code != ERR_NOT_OWNER) {
                console.log(Game.time, 'out_energy_harvester_with_carry_work', code);
            }
        }
    }
};

const out_passive_transfer_work = function (creep) {
    if (Game.rooms[creep.memory.source_roomName].memory.war_flag == true) {
        creep.memory.is_working = false;
        let target = new RoomPosition(5, 34, creep.memory.dest_roomName);
        if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
            // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
            creep.memory.path = creep.pos.findPathTo(target);
        }
        let code = creep.moveByPath(creep.memory.path);
        if (code == ERR_NOT_FOUND) {
            if (creep.pos.isNearTo(target)) {
                creep.memory.path = null;
            }
            else {
                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                creep.memory.path = creep.pos.findPathTo(target);
            }
        }
        // creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName))
    }
    else {
        if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.is_working = false;
            creep.memory.path = null;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
            creep.memory.is_working = true;
            creep.memory.path = null;
            creep.say('🚧 transfer');
        }
        if (creep.memory.is_working == true) {
            let link1 = Game.getObjectById('615d6e761b8f40360c7387dd');
            let link2 = Game.getObjectById('61450b41047f4458ae00790f');
            if (creep.pos.isNearTo(link1) || creep.pos.isNearTo(link2)) {
                if (link2.store.getUsedCapacity(RESOURCE_ENERGY) < 800) {
                    let code = creep.transfer(link2, RESOURCE_ENERGY);
                    if (code == ERR_NOT_IN_RANGE) {
                        let target = link2;
                        if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                            // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                        let code = creep.moveByPath(creep.memory.path);
                        if (code == ERR_NOT_FOUND) {
                            if (creep.pos.isNearTo(target)) {
                                creep.memory.path = null;
                            }
                            else {
                                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                                creep.memory.path = creep.pos.findPathTo(target);
                            }
                        }
                        // creep.moveTo(link2)
                    }
                    else if (code == OK) {
                        creep.memory.path = null;
                    }
                }
                else if (link1.store.getUsedCapacity(RESOURCE_ENERGY) < 800) {
                    let code = creep.transfer(link1, RESOURCE_ENERGY);
                    if (code == ERR_NOT_IN_RANGE) {
                        let target = link1;
                        if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                            // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                        let code = creep.moveByPath(creep.memory.path);
                        if (code == ERR_NOT_FOUND) {
                            if (creep.pos.isNearTo(target)) {
                                creep.memory.path = null;
                            }
                            else {
                                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                                creep.memory.path = creep.pos.findPathTo(target);
                            }
                        }
                        // creep.moveTo(link1, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 30});
                    }
                    else if (code == OK) {
                        creep.memory.path = null;
                    }
                }
            }
            else {
                let target = link2;
                if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    creep.memory.path = creep.pos.findPathTo(target);
                }
                let code = creep.moveByPath(creep.memory.path);
                if (code == ERR_NOT_FOUND) {
                    if (creep.pos.isNearTo(target)) {
                        creep.memory.path = null;
                    }
                    else {
                        // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                }
                // creep.moveTo(link2)
            }
        }
        else {
            let source_room = Game.rooms[creep.memory.source_roomName];
            let farm_creeps = source_room.find(FIND_MY_CREEPS, {
                filter: (cre) => {
                    return (cre.memory.role == 'out_energy_harvester_with_carry' &&
                        cre.memory.source_idx == creep.memory.source_idx &&
                        cre.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (farm_creeps.length > 0) {
                let target = farm_creeps[0];
                if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    creep.memory.path = creep.pos.findPathTo(target);
                }
                let code = creep.moveByPath(creep.memory.path);
                if (code == ERR_NOT_FOUND) {
                    if (creep.pos.isNearTo(target)) {
                        creep.memory.path = null;
                    }
                    else {
                        // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                }
                // creep.moveTo(farm_creeps[0])
            }
            else {
                let source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx]);
                let place;
                if (source.pos.x >= 25) {
                    if (source.pos.y >= 25) {
                        place = new RoomPosition(source.pos.x - 8, source.pos.y - 8, creep.memory.source_roomName);
                    }
                    else {
                        place = new RoomPosition(source.pos.x - 8, source.pos.y + 8, creep.memory.source_roomName);
                    }
                }
                else {
                    if (source.pos.y >= 25) {
                        place = new RoomPosition(source.pos.x + 8, source.pos.y - 8, creep.memory.source_roomName);
                    }
                    else {
                        place = new RoomPosition(source.pos.x + 8, source.pos.y + 8, creep.memory.source_roomName);
                    }
                }
                let target = place;
                if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    creep.memory.path = creep.pos.findPathTo(target);
                }
                let code = creep.moveByPath(creep.memory.path);
                if (code == ERR_NOT_FOUND) {
                    if (creep.pos.isNearTo(target)) {
                        creep.memory.path = null;
                    }
                    else {
                        // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                }
                // creep.moveTo(place)
            }
        }
    }
};

const reserver_work = function (creep) {
    // creep.say('🔄 Here');
    if (Memory.rooms[creep.memory.source_roomName].war_flag == true) {
        creep.memory.is_working = false;
        let target = new RoomPosition(8, 34, creep.memory.dest_roomName);
        if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
            creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
        }
        let code = creep.moveByPath(creep.memory.path);
        if (code == ERR_NOT_FOUND) {
            if (creep.pos.isNearTo(target)) {
                creep.memory.path = null;
            }
            else {
                creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
            }
        }
    }
    else {
        var controller = Game.getObjectById(Memory.rooms[creep.memory.source_roomName].controller_id);
        var code = creep.reserveController(controller);
        if (code == ERR_NOT_IN_RANGE) {
            let target = controller;
            if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
            }
            let code = creep.moveByPath(creep.memory.path);
            if (code == ERR_NOT_FOUND) {
                if (creep.pos.isNearTo(target)) {
                    creep.memory.path = null;
                }
                else {
                    creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
                }
            }
        }
        else if (code == ERR_INVALID_TARGET) {
            creep.attackController(controller);
        }
        // creep.signController(controller, '喵呜')
        if (controller != null && controller != undefined) {
            if (controller.reservation != null && controller.reservation != undefined) {
                creep.memory.reservation_tick = controller.reservation.ticksToEnd;
            }
        }
    }
};

const attack_invader_core_work = function (creep) {
    // creep.say('🔄 attack');
    if (creep.room.name != creep.memory.source_roomName) {
        let target = new RoomPosition(24, 47, creep.memory.source_roomName);
        if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
            creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
        }
        let code = creep.moveByPath(creep.memory.path);
        if (code == ERR_NOT_FOUND) {
            if (creep.pos.isNearTo(target)) {
                creep.memory.path = null;
            }
            else {
                creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
            }
        }
        // creep.moveTo(new RoomPosition(24, 47, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
    }
    else {
        var invade_targets = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (creep.getActiveBodyparts(HEAL) > 1);
            }
        });
        if (invade_targets.length > 0) {
            creep.room.memory.war_flag = true;
            creep.room.memory.enemy_num = invade_targets.length;
            if (creep.attack(invade_targets[0]) != OK) {
                creep.moveTo(invade_targets[0]);
            }
        }
        else {
            var invade_targets = creep.room.find(FIND_HOSTILE_CREEPS);
            if (invade_targets.length > 0) {
                creep.room.memory.war_flag = true;
                creep.room.memory.enemy_num = invade_targets.length;
                if (creep.attack(invade_targets[0]) != OK) {
                    creep.moveTo(invade_targets[0]);
                }
            }
            else {
                var invader = Game.getObjectById(Memory.rooms[creep.memory.source_roomName].invader_core_id);
                if (invader != undefined) {
                    if (creep.attack(invader) != OK) {
                        creep.moveTo(invader);
                    }
                }
                else {
                    if (creep.room.name == 'W47S15') {
                        let target = new RoomPosition(46, 24, 'W47S15');
                        if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                            creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
                        }
                        let code = creep.moveByPath(creep.memory.path);
                        if (code == ERR_NOT_FOUND) {
                            if (creep.pos.isNearTo(target)) {
                                creep.memory.path = null;
                            }
                            else {
                                creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
                            }
                        }
                    }
                    else if (creep.room.name == 'W48S14') {
                        let target = new RoomPosition(8, 34, 'W48S14');
                        if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                            creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
                        }
                        let code = creep.moveByPath(creep.memory.path);
                        if (code == ERR_NOT_FOUND) {
                            if (creep.pos.isNearTo(target)) {
                                creep.memory.path = null;
                            }
                            else {
                                creep.memory.path = creep.pos.findPathTo(target, { ignoreCreeps: true });
                            }
                        }
                    }
                }
            }
        }
    }
};

const miner_work = function (creep) {
    if (Game.rooms[creep.memory.source_roomName]) {
        var mine = Game.getObjectById(Game.rooms[creep.memory.source_roomName].memory.mines_id[creep.memory.mine_idx]);
    }
    else {
        console.log(Game.time, 'miner_work', 'source_roomName', creep.memory.source_roomName, 'undefined');
        return;
    }
    if (creep.memory.is_working == true) {
        creep.memory.mine_idx = 0;
        if (Game.rooms[creep.memory.source_roomName].memory.mines_id == undefined) {
            var mines = creep.room.find(FIND_MINERALS);
            Game.rooms[creep.memory.source_roomName].memory.mines_id = new Array(mines.length);
            for (var i = 0; i < mines.length; i++) {
                Game.rooms[creep.memory.source_roomName].memory.mines_id[i] = mines[i].id;
            }
        }
        if (!mine) {
            console.log('can not find the mine in ', creep.memory.source_roomName);
        }
        if (creep.harvest(mine) == ERR_NOT_IN_RANGE) {
            creep.moveTo(mine, { visualizePathStyle: { stroke: '#808080' } });
        }
    }
    else {
        if (creep.pos.x == 32 && creep.pos.y == 40) {
            creep.memory.is_working = true;
        }
        creep.moveTo(new RoomPosition(32, 40, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#808080' } });
    }
};

const mine_transfer_work = function (creep) {
    creep.memory.mine_type = RESOURCE_HYDROGEN;
    // creep.say('👋 active transfer');
    var source_room = Game.rooms[creep.memory.source_roomName];
    var dest_room = Game.rooms[creep.memory.dest_roomName];
    // room空值检查
    // creep.memory.source_roomName = 'W47S14'
    // creep.memory.dest_roomName = 'W47S14'
    if (source_room == undefined) {
        console.log(Game.time, " ", creep.memory.source_roomName, ' undefined');
        return;
    }
    if (dest_room == undefined) {
        console.log(Game.time, " ", creep.memory.dest_roomName, ' undefined');
        return;
    }
    if (creep.memory.is_working && creep.store[creep.memory.mine_type] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        creep.say('🚧 withdraw');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在withdraw状态，且取不了了，装满了，退出withdraw状态
        creep.memory.is_working = true;
        creep.say('🔄 transfer');
    }
    // console.log(creep.memory.is_working)
    if (creep.memory.is_working) {
        if (creep.store.getUsedCapacity() > 0) {
            var targets = source_room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL) &&
                        structure.store.getFreeCapacity(creep.memory.mine_type) > 0;
                }
            });
            if (targets.length > 0) {
                let code = creep.transfer(targets[0], creep.memory.mine_type);
                if (code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
            else {
                var targets = source_room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(creep.memory.mine_type) > 0;
                    }
                });
                if (targets.length > 0) {
                    let code = creep.transfer(targets[0], creep.memory.mine_type);
                    if (code == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                    }
                }
            }
        }
    }
    else {
        var container = Game.getObjectById('61506d65d8dc480c9535823c');
        let code = creep.withdraw(container, creep.memory.mine_type);
        if (code == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        else if (code != OK) {
            var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (res != null) {
                if (creep.pickup(res) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(res, { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
        }
    }
};

const tower_transfer_work = function (creep) {
    // creep.say('👋 base transfer');
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        creep.say('🚧 withdraw');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在withdraw状态，且取不了了，装满了，退出withdraw状态
        creep.memory.is_working = true;
        creep.say('🔄 transfer');
    }
    if (creep.memory.is_working) {
        if (creep.store.getUsedCapacity() > 0) {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 0.2 * structure.store.getCapacity(RESOURCE_ENERGY));
                }
            });
            if (target) {
                let code = creep.transfer(target, RESOURCE_ENERGY);
                if (code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
            else {
                let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (target) {
                    let code = creep.transfer(target, RESOURCE_ENERGY);
                    if (code == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00' } });
                    }
                }
            }
        }
    }
    else {
        let tmp_flag = true;
        if (creep.room.memory.storage_id == undefined) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            if (targets.length > 0) {
                creep.room.memory.storage_id = targets[0].id;
            }
            else {
                tmp_flag = false;
            }
        }
        if (tmp_flag) {
            let storage = Game.getObjectById(creep.room.memory.storage_id);
            if (storage == null) {
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }
                });
                if (targets.length > 0) {
                    creep.room.memory.storage_id = targets[0].id;
                }
                else {
                    console.log(Game.time, 'tower_transfer_work', creep.room.name, 'storage is null');
                    creep.room.memory.storage_id = undefined;
                }
            }
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
                    return;
                }
            }
        }
        if (creep.room.memory.terminal_id == undefined) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if (targets.length > 0) {
                creep.room.memory.terminal_id = targets[0].id;
            }
        }
        let terminal = Game.getObjectById(creep.room.memory.terminal_id);
        if (terminal == null) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if (targets.length > 0) {
                creep.room.memory.terminal_id = targets[0].id;
            }
            else {
                console.log(Game.time, 'tower_transfer_work', creep.room.name, 'terminal is null');
                creep.room.memory.terminal_id = undefined;
            }
        }
        if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
                return;
            }
        }
    }
};

const upgrader_work = function (creep) {
    // creep.say('🔄 Here');
    // 如果在升级且没能量了，那退出升级状态
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    // 如果在采集能量且满了，那退出采集状态
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 upgrade');
    }
    if (creep.memory.is_working) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { //距离够则升级控制器
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#4fcf30' } });
        }
    }
    else {
        let source;
        if (creep.room.memory.sources_id == undefined) {
            let sources = creep.room.find(FIND_SOURCES);
            Memory.rooms[creep.room.name].sources_id = new Array(sources.length);
            for (let i = 0; i < sources.length; i++) {
                Memory.rooms[creep.room.name].sources_id[i] = sources[i].id;
            }
        }
        source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        let code = creep.harvest(source);
        if (code == ERR_NOT_IN_RANGE) {
            code = creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#808080' } });
        }
        else if (code != ERR_BUSY && code != OK) {
            console.log(Game.time, 'upgrader_work', code);
        }
    }
};

const harvester_work = function (creep) {
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 transfer');
    }
    if (creep.memory.is_working) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
        }
    }
    else {
        let source;
        if (creep.room.memory.sources_id == undefined) {
            let sources = creep.room.find(FIND_SOURCES);
            Memory.rooms[creep.room.name].sources_id = new Array(sources.length);
            for (let i = 0; i < sources.length; i++) {
                Memory.rooms[creep.room.name].sources_id[i] = sources[i].id;
            }
        }
        source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        let code = creep.harvest(source);
        if (code == ERR_NOT_IN_RANGE) {
            code = creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#808080' } });
        }
        else if (code != ERR_BUSY && code != OK) {
            console.log(Game.time, 'harvester_work', code);
        }
    }
};

const test_work = function (creep) {
    // console.log('run out')
    let target = new RoomPosition(17, 40, 'W47S14');
    if ((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
        console.log('find');
        creep.memory.path = creep.pos.findPathTo(target);
    }
    let code = creep.moveByPath(creep.memory.path);
    if (code == ERR_NOT_FOUND) {
        if (creep.pos.isNearTo(target)) {
            creep.memory.path = null;
        }
        else {
            creep.memory.path = creep.pos.findPathTo(target);
        }
    }
    if (creep.pos.isNearTo(target)) {
        creep.memory.path = null;
    }
    console.log(code);
};

const new_room_help_work = function (creep) {
    // creep.say('🔄 Here');
    if (creep.room.name != "W48S12") {
        creep.moveTo(new RoomPosition(8, 34, "W48S12"), { visualizePathStyle: { stroke: '#808080' } });
    }
    else {
        if (creep.pos.x >= 47) {
            creep.moveTo(new RoomPosition(25, 25, "W48S12"), { visualizePathStyle: { stroke: '#808080' } });
        }
        else {
            // console.log(creep.memory.is_working)
            // console.log(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0)
            // console.log(!creep.memory.is_working && creep.store.getFreeCapacity() == 0)
            if (creep.memory.is_working == undefined) {
                creep.memory.is_working = false;
            }
            if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.is_working = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
                creep.memory.is_working = true;
                creep.say('🚧 build');
            }
            if (creep.memory.is_working) {
                // if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {//距离够则升级控制器
                //     creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
                // }
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ||
                            (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.2 * structure.store.getCapacity(RESOURCE_ENERGY));
                    }
                });
                if (targets.length > 0) {
                    var code = creep.transfer(targets[0], RESOURCE_ENERGY);
                    if (code == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffff00' } });
                    }
                }
                else {
                    var construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                    if (construction) {
                        if (creep.build(construction) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(construction, { visualizePathStyle: { stroke: '#008cff' } });
                        }
                    }
                    else {
                        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { //距离够则升级控制器
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#4fcf30' } });
                        }
                    }
                }
            }
            else {
                let sources = creep.room.find(FIND_SOURCES);
                // console.log(sources.length)
                if (sources.length > 0) {
                    if (creep.memory.source_idx == undefined || creep.memory.source_idx == 0) {
                        let code = creep.harvest(sources[0]);
                        // console.log('code', code)
                        if (code == ERR_NOT_IN_RANGE) {
                            let code1 = creep.moveTo(sources[0]);
                            if (code1 == ERR_NO_PATH) {
                                creep.memory.source_idx = 1;
                            }
                        }
                    }
                    else {
                        let code = creep.harvest(sources[1]);
                        // console.log('code', code)
                        if (code == ERR_NOT_IN_RANGE) {
                            let code1 = creep.moveTo(sources[1]);
                            if (code1 == ERR_NO_PATH) {
                                creep.memory.source_idx = 0;
                            }
                        }
                        if (code == ERR_NOT_ENOUGH_RESOURCES) {
                            let container = Game.getObjectById("615a2a4846d6c263b42bfee6");
                            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(container);
                            }
                        }
                    }
                }
                var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                creep.pickup(res);
            }
        }
    }
};

const different_role_work = function () {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        // base running
        if (creep.memory.role == 'base_transfer') {
            base_transfer_work(creep);
        }
        if (creep.memory.role == 'tower_transfer') {
            tower_transfer_work(creep);
        }
        // 挖运分离
        else if (creep.memory.role == 'energy_harvester_with_carry') {
            energy_harvester_with_carry_work(creep);
        }
        else if (creep.memory.role == 'passive_transfer') {
            passive_transfer_work(creep);
        }
        else if (creep.memory.role == 'energy_harvester_no_carry') {
            energy_harvester_no_carry_work(creep);
        }
        else if (creep.memory.role == 'active_transfer') {
            active_transfer_work(creep);
        }
        else if (creep.memory.role == 'energy_harvester_link') {
            energy_harvester_link_work(creep);
        }
        else if (creep.memory.role == 'carrier_W47S14') {
            carrier_W47S14_work(creep);
        }
        // basic function
        else if (creep.memory.role == 'upgrader_link') {
            upgrader_link_work(creep);
        }
        else if (creep.memory.role == 'repairer') {
            repairer_work(creep); // later use tower
        }
        else if (creep.memory.role == 'builder') {
            builder_work(creep);
        }
        else if (creep.memory.role == 'cleaner') {
            cleaner_work(creep); // adjustment depend the conditon
        }
        // out energy
        else if (creep.memory.role == 'out_scout') {
            out_scout_work(creep);
        }
        else if (creep.memory.role == 'reserver') {
            reserver_work(creep);
        }
        else if (creep.memory.role == 'out_energy_harvester_with_carry') {
            out_energy_harvester_with_carry_work(creep);
        }
        else if (creep.memory.role == 'out_passive_transfer') {
            out_passive_transfer_work(creep);
        }
        // defense
        else if (creep.memory.role == 'attack_invader_core') {
            attack_invader_core_work(creep);
        }
        else if (creep.memory.role == 'out_soldier') {
            out_soldier_work(creep);
        }
        else if (creep.memory.role == 'new_room_help') {
            new_room_help_work(creep);
        }
        else if (creep.memory.role == 'miner') {
            miner_work(creep);
        }
        else if (creep.memory.role == 'mine_transfer') {
            mine_transfer_work(creep);
        }
        // low level
        else if (creep.memory.role == 'upgrader') {
            upgrader_work(creep);
        }
        else if (creep.memory.role == 'harvester') {
            harvester_work(creep);
        }
        else if (creep.memory.role == 'test') {
            test_work(creep);
        }
    }
};

const room_W48S12_running = function (roomName) {
    tower_work('W48S12');
    let spawn_name = 'Spawn2';
    // let home: Room = Game.rooms[roomName]
    let upgradersNum = 4;
    let harvester0sNum = 2;
    let harvester1sNum = 2;
    let buildersNum = 4;
    if (Game.rooms['W48S12'].find(FIND_CONSTRUCTION_SITES).length == 0) {
        buildersNum = 0;
    }
    let repairersNum = 1;
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    let harvester0s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.source_idx == 0);
    let harvester1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.source_idx == 1);
    if (Game.spawns[spawn_name].spawning) {
        let spawningCreep = Game.creeps[Game.spawns[spawn_name].spawning.name];
        Game.spawns[spawn_name].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawn_name].pos.x + 1, Game.spawns[spawn_name].pos.y, { align: 'left', opacity: 0.8 });
    }
    else if (upgraders.length < upgradersNum) {
        let newName = 'Upgrader' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader', source_idx: 0 } });
    }
    else if (harvester0s.length < harvester0sNum) {
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', source_idx: 0 } });
    }
    else if (harvester1s.length < harvester1sNum) {
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', source_idx: 1 } });
    }
    else if (builders.length < buildersNum) {
        let newName = 'Builder' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'builder', source_idx: 1 } });
    }
    else if (repairers.length < repairersNum) {
        let newName = 'Repairer' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'repairer', source_idx: 1 } });
    }
};

// 引入外部依赖
console.log('new push');
const main = function () {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    different_role_work();
    room_W48S12_running();
    let spawnName = 'Spawn1';
    let transfer_num = [3, 2];
    let harvester_num = [1, 1];
    out_room_energy_mine('W48S14', 'W47S14', spawnName, harvester_num, transfer_num);
    spawnName = spawnName;
    transfer_num = [4, 5];
    harvester_num = [1, 1];
    out_room_energy_mine('W47S15', 'W47S14', spawnName, harvester_num, transfer_num);
    spawnName = 'Spawn3';
    transfer_num = [3, 4];
    harvester_num = [1, 1];
    out_room_energy_mine('W48S15', 'W47S14', spawnName, harvester_num, transfer_num);
    let rooms = ['W47S14'];
    for (let idx in rooms) {
        room_base_running(rooms[idx]);
    }
};
const loop = errorMapper(() => {
    main();
});

exports.loop = loop;
exports.main = main;
//# sourceMappingURL=main.js.map
