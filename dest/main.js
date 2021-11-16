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
const room_energy_mine_routine$1 = function (source_roomName, dest_roomName, spawnName, harvester_num, transfer_num) {
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
                            if (energyCapacity >= 1250) {
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'out_Harvester_with_carry' + Game.time, { memory: { role: 'out_energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                    source_room.memory.source_harvester_states[i] += 1;
                                    source_room.memory.source_costs[i] += 1250;
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
                        if (energyCapacity >= 1600) {
                            if (Game.spawns[spawnName].spawnCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE,
                                CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], 'out_passive_transfer' + Game.time, { memory: { role: 'out_passive_transfer', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName } }) == OK) {
                                source_room.memory.source_transfer_states[i] += 1;
                                source_room.memory.source_costs[i] += 1600;
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
    // var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'out_soldier' && creep.memory.source_roomName == source_roomName);
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
    else if (hostiles.length == 0) {
        if (source_roomName == 'W47S15' || source_roomName == 'W48S14' || source_roomName == 'W47S13') {
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
            room_energy_mine_init$1(source_room);
            room_energy_mine_routine$1(source_roomName, dest_roomName, spawnName, harvester_num, transfer_num);
        }
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

const go_to_fill = function (creep, tower_first = false) {
    let target;
    if (creep.room.memory.towers_id ? creep.room.memory.towers_id.length == 1 : false ) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.4 * structure.store.getCapacity(RESOURCE_ENERGY);
            }
        });
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return;
        }
    }
    if (tower_first) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.2 * structure.store.getCapacity(RESOURCE_ENERGY);
            }
        });
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return;
        }
    }
    if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return;
        }
    }
    if (!tower_first) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.2 * structure.store.getCapacity(RESOURCE_ENERGY);
            }
        });
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return;
        }
    }
    if (creep.room.controller.my ? creep.room.controller.level >= 6 : false) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LAB) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return;
        }
    }
    if (creep.room.controller.my ? creep.room.controller.level == 8 : false) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_POWER_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return;
        }
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_NUKER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return;
        }
        else {
            return false;
        }
    }
    else {
        return false;
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
        if (go_to_fill(creep) == false) {
            creep.memory.role = 'cleaner';
        }
    }
    else {
        if (creep.room.name == 'W48S12') {
            let storage = Game.getObjectById('6185354e103ba6667086b991');
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity(RESOURCE_ENERGY)) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#808080' } });
                }
                return;
            }
            let terminal = Game.getObjectById('6173c887dc242927f66874d1');
            if (creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, { visualizePathStyle: { stroke: '#808080' } });
            }
            return;
        }
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
                if (creep.room.memory.terminal_id != undefined) {
                    console.log(Game.time, 'base_transfer_work', creep.room.name, 'terminal is null');
                }
                creep.room.memory.terminal_id = undefined;
            }
        }
        if (terminal != null) {
            if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                if (creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

global.harvest_err_code = new Map([
    [0, 'OK'],
    [-1, 'ERR_NOT_OWNER'],
    [-4, 'ERR_BUSY'],
    [-5, 'ERR_NOT_FOUND'],
    [-6, 'ERR_NOT_ENOUGH_RESOURCES'],
    [-7, 'ERR_INVALID_TARGET'],
    [-9, 'ERR_NOT_IN_RANGE'],
    [-11, 'ERR_TIRED'],
    [-12, 'ERR_NO_BODYPART']
]);
const print_err_info = errorMapper(() => {
    let e = new Error();
    throw e;
});

const go_to_harvest = function (creep, source, pos) {
    if (creep.pos.isNearTo(source)) {
        if (!creep.memory.dontPullMe) {
            creep.memory.dontPullMe = true;
        }
        let code = creep.harvest(source);
        if (code == ERR_NO_BODYPART) {
            creep.suicide();
        }
        else if (code == ERR_NOT_ENOUGH_ENERGY) {
            return code;
        }
        else if (code != OK && code != ERR_BUSY && code != ERR_NOT_OWNER) {
            // ERR_BUSY: spawning
            // ERR_NOT_ENOUGH_ENERGY
            // ERR_NOT_OWNER: controller is reserved by other player of Invader
            console.log(Game.time, global.harvest_err_code.get(code));
            print_err_info();
        }
    }
    else {
        if (!pos) {
            creep.moveTo(source);
        }
        else {
            creep.moveTo(pos);
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
        let constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        if (constructions.length > 0) {
            if (creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructions[0], { visualizePathStyle: { stroke: '#008cff' } });
            }
            return;
        }
        else {
            creep.memory.role = 'repairer';
        }
    }
    else {
        if (creep.room.name == 'W48S12') {
            // let source: Source
            // if (creep.room.memory.sources_id == undefined){
            //     let sources = creep.room.find(FIND_SOURCES)
            //     Memory.rooms[creep.room.name].sources_id = new Array(sources.length)
            //     for (let i: number = 0; i < sources.length; i++){
            //         Memory.rooms[creep.room.name].sources_id[i] = sources[i].id;
            //     }
            // }
            // source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
            // go_to_harvest(creep, source)
            let storage = Game.getObjectById('61739e3ab6a4e1f3750c4432');
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity(RESOURCE_ENERGY)) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#808080' } });
                }
                return;
            }
            let terminal = Game.getObjectById('6173c887dc242927f66874d1');
            if (creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, { visualizePathStyle: { stroke: '#808080' } });
            }
        }
        else if (creep.room.name == "W47S14") {
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
        else {
            let source = Game.getObjectById(creep.room.memory.sources_id[creep.memory.source_idx]);
            go_to_harvest(creep, source);
        }
    }
};

const carrier_W47S14_work = function (creep) {
    // creep.say('🔄 Here');
    if (creep.pos.x != 8 || creep.pos.y != 19) {
        creep.moveTo(new RoomPosition(8, 19, 'W47S14'), { visualizePathStyle: { stroke: '#00ff0e' } });
    }
    else {
        if (creep.memory.dontPullMe == undefined) {
            creep.memory.dontPullMe = true;
        }
        let link = Game.getObjectById("6159d59ae59fcf2038ecf56c");
        let upgrade_link = Game.getObjectById('615a13005237858c5056f75f');
        let storage = Game.getObjectById("6159fc1609f790175f45c6be");
        let terminal = Game.getObjectById('615ab4e746872376a3726f6f');
        if (upgrade_link.store.getUsedCapacity(RESOURCE_ENERGY) <= 30 && link.cooldown < 3) {
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
                if (storage.store.getFreeCapacity() > 1000 && storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY)) {
                    creep.transfer(terminal, RESOURCE_ENERGY);
                }
                else {
                    creep.transfer(storage, RESOURCE_ENERGY);
                }
            }
        }
        else {
            if ((terminal.store.getUsedCapacity(RESOURCE_ENERGY) <= 150000 && storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY)) ||
                (storage.store.getFreeCapacity(RESOURCE_ENERGY) < 10000)) {
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                    creep.withdraw(storage, RESOURCE_ENERGY);
                }
                else {
                    creep.transfer(terminal, RESOURCE_ENERGY);
                }
            }
            else if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 150000 && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 5000) {
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                    creep.withdraw(terminal, RESOURCE_ENERGY);
                }
                else {
                    creep.transfer(storage, RESOURCE_ENERGY);
                }
            }
            else if (terminal.store.getFreeCapacity() < 5000) {
                if (Game.time % 2 == 0) {
                    Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 20000, 'W41S11', 'free');
                    console.log(Game.time, 'send', 'W41S11', '20000');
                }
                else {
                    Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 20000, 'W39S23', 'free');
                    console.log(Game.time, 'send', 'W39S23', '20000');
                }
                // Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 20000, 'E39S51', 'free')
                // W44S2 mikumikumiku
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
    let pos = new RoomPosition(creep.memory.link_harvester_pos_x, creep.memory.link_harvester_pos_y, creep.memory.source_roomName);
    go_to_harvest(creep, source, pos);
};

const energy_harvester_no_carry_work = function (creep) {
    // creep.say('👋 Here');
    let source_room = Game.rooms[creep.memory.source_roomName];
    if (source_room == undefined) {
        console.log(Game.time, "energy_harvester_no_carry_work", creep.memory.source_roomName, ' undefined');
        return;
    }
    let source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx]);
    let pos = new RoomPosition(creep.memory.container_pos_x, creep.memory.container_pos_y, creep.memory.source_roomName);
    go_to_harvest(creep, source, pos);
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
    go_to_harvest(creep, source);
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
                if (creep.room.memory.terminal_id != undefined) {
                    console.log(Game.time, 'passive_transfer_work', dest_room.name, 'terminal is null');
                }
                dest_room.memory.terminal_id = undefined;
            }
        }
        if (terminal != null) {
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
            filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_RAMPART)
        });
        if (target) {
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return;
        }
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_WALL)
        });
        if (target) {
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return;
        }
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits < 0.9 * s.hitsMax) && (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)
        });
        if (target) {
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return;
        }
        let wall_rampart_hits_ladder = [100000, 1000000, 50000000, 100000000];
        for (let i = 0; i < wall_rampart_hits_ladder.length; i++) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.hits < 0.9 * s.hitsMax && s.hits < wall_rampart_hits_ladder[i]) && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)
            });
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
                return;
            }
        }
        if (creep.room.name == 'W48S12') {
            creep.memory.role = 'builder';
        }
    }
    else {
        let source = Game.getObjectById(creep.room.memory.sources_id[creep.memory.source_idx]);
        go_to_harvest(creep, source);
    }
};

const upgrader_link_work = function (creep) {
    creep.upgradeController(creep.room.controller);
    let link = Game.getObjectById('615a13005237858c5056f75f');
    if (link) {
        if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(link);
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
    else if (Memory.rooms[creep.memory.source_roomName].invader_died_tick == undefined || Memory.rooms[creep.memory.source_roomName].invader_died_tick <= Game.time) {
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
        go_to_harvest(creep, source);
    }
};

const out_passive_transfer_work = function (creep) {
    if (Memory.rooms[creep.memory.source_roomName].war_flag == true) {
        creep.memory.is_working = false;
        creep.moveTo(new RoomPosition(3, 36, creep.memory.dest_roomName));
    }
    else {
        if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.is_working = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
            creep.memory.is_working = true;
            creep.say('🚧 transfer');
        }
        if (creep.memory.is_working == true) {
            if (creep.memory.source_roomName == 'W47S13' || creep.memory.source_roomName == 'W46S13') {
                let storage = Game.getObjectById('6159fc1609f790175f45c6be');
                let code = creep.transfer(storage, RESOURCE_ENERGY);
                if (code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
            else {
                let link1 = Game.getObjectById('615d6e761b8f40360c7387dd');
                let link2 = Game.getObjectById('61450b41047f4458ae00790f');
                if (creep.pos.isNearTo(link1) || creep.pos.isNearTo(link2)) {
                    if (link2.store.getUsedCapacity(RESOURCE_ENERGY) < 800) {
                        let code = creep.transfer(link2, RESOURCE_ENERGY);
                        if (code == ERR_NOT_IN_RANGE) {
                            creep.moveTo(link2);
                        }
                        else if (code == OK) {
                            creep.memory.path = null;
                        }
                    }
                    else if (link1.store.getUsedCapacity(RESOURCE_ENERGY) < 800) {
                        let code = creep.transfer(link1, RESOURCE_ENERGY);
                        if (code == ERR_NOT_IN_RANGE) {
                            creep.moveTo(link1, { visualizePathStyle: { stroke: '#ffff00' }, reusePath: 30 });
                        }
                        else if (code == OK) {
                            creep.memory.path = null;
                        }
                    }
                }
                else {
                    creep.moveTo(link2);
                }
            }
        }
        else {
            let source_room = Game.rooms[creep.memory.source_roomName];
            if (source_room == undefined) {
                return;
            }
            let farm_creeps = source_room.find(FIND_MY_CREEPS, {
                filter: (cre) => {
                    return (cre.memory.role == 'out_energy_harvester_with_carry' &&
                        cre.memory.source_idx == creep.memory.source_idx &&
                        cre.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (farm_creeps.length > 0) {
                creep.moveTo(farm_creeps[0]);
                let res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                creep.pickup(res);
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
                creep.moveTo(place);
            }
        }
    }
};

const reserver_work = function (creep) {
    // creep.say('🔄 Here');
    if (Memory.rooms[creep.memory.source_roomName].war_flag == true) {
        creep.memory.is_working = false;
        creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName));
    }
    else {
        var controller = Game.getObjectById(Memory.rooms[creep.memory.source_roomName].controller_id);
        var code = creep.reserveController(controller);
        if (code == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        }
        else if (code == ERR_INVALID_TARGET) {
            creep.attackController(controller);
        }
        creep.signController(controller, '6g3y is watching you.\n——村霸3号');
        if (controller != null && controller != undefined) {
            if (controller.reservation != null && controller.reservation != undefined) {
                creep.memory.reservation_tick = controller.reservation.ticksToEnd;
            }
        }
    }
};

const attack_invader_core_work = function (creep) {
    // creep.say('🔄 attack');
    if ((creep.room.name == 'W47S14' || (creep.room.name == 'W47S13' && creep.pos.x < 45)) && creep.memory.source_roomName == 'W46S13') {
        creep.moveTo(new RoomPosition(45, 29, 'W47S13'));
        return;
    }
    if (creep.room.name != creep.memory.source_roomName) {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), { visualizePathStyle: { stroke: '#ff0000' } });
    }
    else {
        var invade_targets = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (creep.getActiveBodyparts(HEAL) > 1);
            }
        });
        creep.room.find(FIND_HOSTILE_CREEPS, { filter: (creep) => { return (creep.getActiveBodyparts(HEAL) > 1); } });
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
                        creep.moveTo(new RoomPosition(46, 24, 'W47S15'));
                    }
                    else if (creep.room.name == 'W48S14') {
                        creep.moveTo(new RoomPosition(8, 34, 'W48S14'));
                    }
                    else if (creep.room.name == 'W46S13') {
                        creep.moveTo(new RoomPosition(25, 34, 'W46S13'));
                    }
                    else if (creep.room.name == 'W47S13') {
                        creep.moveTo(new RoomPosition(3, 36, 'W47S13'));
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
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 0.3 * structure.store.getCapacity(RESOURCE_ENERGY));
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
                else {
                    let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LAB) &&
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

// Game.spawns['Spawn2'].spawnCreep([MOVE], 'scout', {memory: {role: 'scout_test'}})
const scout_test_work = function (creep) {
    if (creep.room.name != 'W41S7') {
        let target;
        if (creep.room.name == 'W48S12') {
            target = new RoomPosition(48, 41, 'W48S11');
        }
        else if (creep.room.name == 'W48S11') {
            target = new RoomPosition(32, 1, 'W47S11');
        }
        else if (creep.room.name == 'W47S11') {
            target = new RoomPosition(48, 39, 'W47S10');
        }
        else if (creep.room.name == 'W47S10') {
            target = new RoomPosition(48, 31, 'W46S10');
        }
        else if (creep.room.name == 'W46S10') {
            target = new RoomPosition(48, 31, 'W45S10');
        }
        else if (creep.room.name == 'W45S10') {
            target = new RoomPosition(48, 31, 'W44S10');
        }
        else if (creep.room.name == 'W44S10') {
            target = new RoomPosition(48, 31, 'W43S10');
        }
        else if (creep.room.name == 'W43S10') {
            target = new RoomPosition(48, 31, 'W42S10');
        }
        else if (creep.room.name == 'W42S10') {
            target = new RoomPosition(48, 7, 'W41S10');
        }
        else if (creep.room.name == 'W41S10') {
            target = new RoomPosition(6, 1, 'W40S10');
        }
        else if (creep.room.name == 'W40S10') {
            target = new RoomPosition(7, 1, 'W40S9');
        }
        else if (creep.room.name == 'W40S9') {
            target = new RoomPosition(1, 29, 'W40S8');
        }
        else if (creep.room.name == 'W40S8') {
            target = new RoomPosition(21, 1, 'W41S8');
        }
        else if (creep.room.name == 'W41S8') {
            target = new RoomPosition(11, 26, 'W41S7');
        }
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
    }
    else {
        console.log('arrive W41S7, rest tick:', creep.ticksToLive);
        // arrive W41S7, rest tick: 1004
        creep.moveTo(new RoomPosition(21, 47, 'W41S7'));
    }
};

const move_compounds_work = function (creep) {
    // creep.say('👋 move_compounds');
    // let move_to_lab_flag = true
    // let energy_flag = false
    let target;
    let type;
    if (creep.memory.energy_flag == undefined || creep.memory.energy_flag) {
        type = RESOURCE_ENERGY;
        target = Game.getObjectById('615b67b909f7903134462c0d');
        if (target.store.getUsedCapacity(type) >= 2000) {
            target = Game.getObjectById('615b2fe7b781a147a5c49b07');
            if (target.store.getUsedCapacity(type) >= 2000) {
                target = Game.getObjectById('615bb25d94d216562f056f23');
                if (target.store.getUsedCapacity(type) >= 2000) {
                    target = Game.getObjectById('615b90d0f305b6193d5bb36b');
                    if (target.store.getUsedCapacity(type) >= 2000) {
                        creep.memory.energy_flag = false;
                        type = RESOURCE_KEANIUM_ALKALIDE;
                    }
                }
            }
        }
    }
    else {
        target = Game.getObjectById('615b67b909f7903134462c0d');
        type = RESOURCE_LEMERGIUM_ALKALIDE;
        if (target.store.getUsedCapacity(type) >= 1000) {
            target = Game.getObjectById('615b2fe7b781a147a5c49b07');
            type = RESOURCE_GHODIUM_ALKALIDE;
            if (target.store.getUsedCapacity(type) >= 1000) {
                target = Game.getObjectById('615bb25d94d216562f056f23');
                type = RESOURCE_ZYNTHIUM_ALKALIDE;
                if (target.store.getUsedCapacity(type) >= 1000) {
                    type = RESOURCE_KEANIUM_ALKALIDE;
                    target = Game.getObjectById('615b90d0f305b6193d5bb36b');
                    if (target.store.getUsedCapacity(type) >= 1000) {
                        creep.memory.energy_flag = true;
                        type = RESOURCE_ENERGY;
                    }
                }
            }
        }
    }
    if (creep.memory.is_working && creep.store[type] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        creep.say('🚧 withdraw');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在withdraw状态，且取不了了，装满了，退出withdraw状态
        creep.memory.is_working = true;
        creep.say('🔄 transfer');
    }
    if (creep.memory.move_to_lab_flag == undefined || creep.memory.move_to_lab_flag) {
        if (creep.memory.is_working) {
            if (creep.store.getUsedCapacity() > 0) {
                if (target) {
                    let code = creep.transfer(target, type);
                    if (code == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00' } });
                    }
                }
            }
        }
        else {
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
                    console.log(Game.time, 'move_compounds_work', creep.room.name, 'terminal is null');
                    creep.room.memory.terminal_id = undefined;
                }
            }
            if (terminal.store.getUsedCapacity(type) > 0) {
                if (creep.withdraw(terminal, type) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
    else {
        if (creep.memory.is_working) {
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
                    console.log(Game.time, 'move_compounds_work', creep.room.name, 'terminal is null');
                    creep.room.memory.terminal_id = undefined;
                }
            }
            if (terminal.store.getUsedCapacity(type) > 0) {
                if (creep.transfer(terminal, type) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            if (creep.store.getUsedCapacity() > 0) {
                if (target) {
                    let code = creep.withdraw(target, type);
                    if (code == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00' } });
                    }
                }
            }
        }
    }
};

// Game.spawns['Spawn2'].spawnCreep([MOVE, CLAIM], 'claim_controller', {memory: {role: 'claim_controller'}})
const claim_controller_work = function (creep) {
    if (creep.room.name != 'W41S6') {
        let target;
        if (creep.room.name == 'W48S12') {
            target = new RoomPosition(48, 41, 'W48S11');
        }
        else if (creep.room.name == 'W48S11') {
            target = new RoomPosition(32, 1, 'W47S11');
        }
        else if (creep.room.name == 'W47S11') {
            target = new RoomPosition(48, 39, 'W47S10');
        }
        else if (creep.room.name == 'W47S10') {
            target = new RoomPosition(48, 31, 'W46S10');
        }
        else if (creep.room.name == 'W46S10') {
            target = new RoomPosition(48, 31, 'W45S10');
        }
        else if (creep.room.name == 'W45S10') {
            target = new RoomPosition(48, 31, 'W44S10');
        }
        else if (creep.room.name == 'W44S10') {
            target = new RoomPosition(48, 31, 'W43S10');
        }
        else if (creep.room.name == 'W43S10') {
            target = new RoomPosition(48, 31, 'W42S10');
        }
        else if (creep.room.name == 'W42S10') {
            target = new RoomPosition(48, 7, 'W41S10');
        }
        else if (creep.room.name == 'W41S10') {
            target = new RoomPosition(6, 1, 'W40S10');
        }
        else if (creep.room.name == 'W40S10') {
            target = new RoomPosition(7, 1, 'W40S9');
        }
        else if (creep.room.name == 'W40S9') {
            target = new RoomPosition(1, 29, 'W40S8');
        }
        else if (creep.room.name == 'W40S8') {
            target = new RoomPosition(21, 1, 'W41S8');
        }
        else if (creep.room.name == 'W41S8') {
            target = new RoomPosition(17, 1, 'W41S7');
        }
        else if (creep.room.name == 'W41S7') {
            target = new RoomPosition(29, 28, 'W41S6');
        }
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
    }
    else {
        console.log('arrive W41S6, rest tick:', creep.ticksToLive);
        if (creep.claimController(creep.room.controller) != OK) {
            creep.moveTo(creep.room.controller);
        }
    }
};

const tmp_attack_work = function (creep) {
    let li = ['616e6d0b97ea7d5db42ac364', '614081fb89c2b92bc5d8fb0c', '616e0a9f3efa916c4444a917', '60e851e11355bb3427f59129', '60e851acb70212468a3d8f82',
        '60e851af38cd424870154809', '60e89163f37d59c7c3913b10', '60e8915c3597e052baba860c',
        '60e891523bd3cc1722dc41dd', '60e8914fd6c6514db335116f', '60e8914c0487c775ad8144ce', '60e890be45a2b4d207116bb2',
        '60e851338f4a09f7f98a0233', '60e8512667103a56494943ef', '60e890954c1e9d49b40cef32',
        '60e890914cc4c139855824cd'];
    for (let i in li) {
        let wall = Game.getObjectById(li[i]);
        if (wall != undefined) {
            if (creep.attack(wall) != OK) {
                creep.moveTo(wall);
            }
            break;
        }
    }
};

const carrier_W48S12_work = function (creep) {
    // creep.say('🔄 Here');
    if (creep.memory.dontPullMe == undefined) {
        creep.memory.dontPullMe = true;
    }
    if (creep.pos.x != 16 || creep.pos.y != 42) {
        creep.moveTo(new RoomPosition(16, 42, 'W48S12'), { visualizePathStyle: { stroke: '#00ff0e' } });
    }
    else {
        let link = Game.getObjectById("61739e3ab6a4e1f3750c4432");
        // let storage: StructureStorage = Game.getObjectById("")
        let terminal = Game.getObjectById('6173c887dc242927f66874d1');
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.withdraw(link, RESOURCE_ENERGY);
        }
        else {
            creep.transfer(terminal, RESOURCE_ENERGY);
        }
    }
};

/*
function:
harvest, transfer, upgrade

spawnCreep reqiure:bodys, name
creep.memory.role:'hu'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id
creep.room.controller
 */
const harvest_upgrade_work$1 = function (creep) {
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 采');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.memory.dontPullMe = false;
        creep.say('🚧 升');
    }
    if (creep.memory.is_working) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#4fcf30' } });
        }
    }
    else {
        let source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        if (go_to_harvest(creep, source) == ERR_NOT_ENOUGH_ENERGY) {
            if (creep.memory.source_idx == 1)
                creep.memory.source_idx = 0;
            else
                creep.memory.source_idx = 1;
        }
    }
};

/*
function:
harvest, transfer, fill extension, spawn, tower

spawnCreep reqiure:bodys, name
creep.memory.role:'hf'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id
 */
const harvest_fill_work$1 = function (creep) {
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 采');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.memory.dontPullMe = false;
        creep.say('🚧 填');
    }
    if (creep.memory.is_working) {
        if (creep.room.energyCapacityAvailable == creep.room.energyAvailable || creep.room.memory.war_flag) {
            go_to_fill(creep, true);
        }
        else {
            go_to_fill(creep);
        }
    }
    else {
        let source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        if (go_to_harvest(creep, source) == ERR_NOT_ENOUGH_ENERGY) {
            if (creep.memory.source_idx == 1)
                creep.memory.source_idx = 0;
            else
                creep.memory.source_idx = 1;
        }
    }
};

// Game.spawns['Spawn4'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'help' + Game.time, {memory: {role: 'help', source_idx: 1}})
const help_work = function (creep) {
    if (creep.room.name != 'W41S6') {
        if (creep.room.name == 'W47S14')
            creep.moveTo(new RoomPosition(25, 25, 'W47S13'));
        else if (creep.room.name == 'W47S13')
            creep.moveTo(new RoomPosition(25, 25, 'W47S12'));
        else if (creep.room.name == 'W47S12')
            creep.moveTo(new RoomPosition(25, 25, 'W47S11'));
        else if (creep.room.name == 'W47S11')
            creep.moveTo(new RoomPosition(25, 25, 'W47S10'));
        else if (creep.room.name == 'W47S10')
            creep.moveTo(new RoomPosition(25, 25, 'W46S10'));
        else if (creep.room.name == 'W46S10')
            creep.moveTo(new RoomPosition(25, 25, 'W45S10'));
        else if (creep.room.name == 'W45S10')
            creep.moveTo(new RoomPosition(25, 25, 'W44S10'));
        else if (creep.room.name == 'W44S10')
            creep.moveTo(new RoomPosition(25, 25, 'W43S10'));
        else if (creep.room.name == 'W43S10')
            creep.moveTo(new RoomPosition(25, 25, 'W43S9'));
        else
            creep.moveTo(new RoomPosition(25, 25, 'W41S6'));
    }
    else {
        if ((creep.pos.x < 2 || creep.pos.y < 2 || creep.pos.x > 47 || creep.pos.y > 47) && creep.room.name == 'W41S6')
            creep.moveTo(new RoomPosition(25, 25, 'W41S6'));
        else {
            // creep.memory.role = 'builder'
            creep.memory.role = 'hu';
        }
    }
};

const go_to_repair = function (creep, wall_rampart_hits, filter) {
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_RAMPART)
    });
    if (target) {
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return;
    }
    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_WALL)
    });
    if (target) {
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return;
    }
    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (s.hits < 0.9 * s.hitsMax) && (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)
    });
    if (target) {
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return;
    }
    if (filter == undefined) {
        let wall_rampart_hits_ladder = [100000, 1000000, 50000000, 100000000];
        for (let i = 0; i < wall_rampart_hits_ladder.length; i++) {
            if (wall_rampart_hits != undefined) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.hits < wall_rampart_hits && s.hits < 0.9 * s.hitsMax && s.hits < wall_rampart_hits_ladder[i]) && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)
                });
            }
            else {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.hits < 0.9 * s.hitsMax && s.hits < wall_rampart_hits_ladder[i]) && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)
                });
            }
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
                return;
            }
        }
    }
    else {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, filter);
        if (target) {
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return;
        }
    }
    creep.memory.role = 'hb';
};

/*
function:
harvest, transfer, repair

spawnCreep reqiure:bodys, name
creep.memory.role:'hr'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id

other:
harvest_build_work
*/
const harvest_repair_work$1 = function (creep) {
    let priority = 15;
    let minTicksToLive = 150;
    if (creep.ticksToLive <= minTicksToLive) {
        const data = {
            role: creep.memory.role,
            memory: {
                role: creep.memory.role,
                source_idx: creep.memory.source_idx
            }
        };
        creep.room.addSpawnTask(priority, data);
    }
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 采');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 修');
    }
    if (creep.memory.is_working) {
        go_to_repair(creep, 1000000);
    }
    else {
        let source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        if (go_to_harvest(creep, source) == ERR_NOT_ENOUGH_ENERGY) {
            if (creep.memory.source_idx == 1)
                creep.memory.source_idx = 0;
            else
                creep.memory.source_idx = 1;
        }
    }
};

// Game.spawns['Spawn3'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], '简单一体机', {memory: {role: 'simple_one_machine'}})
const simple_one_machine_work = function (creep) {
    // if (true){
    //     if (creep.pos.x != 11 && creep.pos.y != 16){
    //         creep.moveTo(new RoomPosition(11, 16, 'W47S14'))
    //     }
    //     else{
    //         let lab_lho2: StructureLab = Game.getObjectById('615b67b909f7903134462c0d')
    //         lab_lho2.boostCreep(creep)
    //         let lab_zho2: StructureLab = Game.getObjectById('615bb25d94d216562f056f23')
    //         lab_zho2.boostCreep(creep)
    //         let lab_gho2: StructureLab = Game.getObjectById('615b2fe7b781a147a5c49b07')
    //         lab_gho2.boostCreep(creep)
    //         let lab_kho2: StructureLab = Game.getObjectById('615b90d0f305b6193d5bb36b')
    //         lab_kho2.boostCreep(creep)
    //     }
    // }
    // else
    // if (creep.room.name != 'W41S7'){
    //     let target
    //     if (creep.room.name == 'W47S14'){
    //         target = new RoomPosition(21, 1, 'W47S13')
    //     }
    //     else if (creep.room.name == 'W47S13'){
    //         target = new RoomPosition(23, 1, 'W47S12')
    //     }
    //     else if (creep.room.name == 'W47S12'){
    //         target = new RoomPosition(31, 1, 'W47S11')
    //     }
    //     else if (creep.room.name == 'W47S11'){
    //         target = new RoomPosition(48, 39, 'W47S10')
    //     }
    //     else if (creep.room.name == 'W47S10'){
    //         target = new RoomPosition(48, 31, 'W46S10')
    //     }
    //     else if (creep.room.name == 'W46S10'){
    //         target = new RoomPosition(48, 31, 'W45S10')
    //     }
    //     else if (creep.room.name == 'W45S10'){
    //         target = new RoomPosition(48, 31, 'W44S10')
    //     }
    //     else if (creep.room.name == 'W44S10'){
    //         target = new RoomPosition(48, 31, 'W43S10')
    //     }
    //     else if (creep.room.name == 'W43S10'){
    //         target = new RoomPosition(48, 31, 'W42S10')
    //     }
    //     else if (creep.room.name == 'W42S10'){
    //         target = new RoomPosition(48, 7, 'W41S10')
    //     }
    //     else if (creep.room.name == 'W41S10'){
    //         target = new RoomPosition(6, 1, 'W40S10')
    //     }
    //     else if (creep.room.name == 'W40S10'){
    //         target = new RoomPosition(7, 1, 'W40S9')
    //     }
    //     else if (creep.room.name == 'W40S9'){
    //         target = new RoomPosition(1, 29, 'W40S8')
    //     }
    //     else if (creep.room.name == 'W40S8'){
    //         target = new RoomPosition(21, 1, 'W41S8')
    //     }
    //     else if (creep.room.name == 'W41S8'){
    //         target = new RoomPosition(11, 26, 'W41S7')
    //     }
    //     if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
    //         // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
    //         creep.memory.path = creep.pos.findPathTo(target);
    //     }
    //     let code = creep.moveByPath(creep.memory.path)
    //     if (code == ERR_NOT_FOUND){
    //         if (creep.pos.isNearTo(target)){
    //             creep.memory.path = null
    //         }
    //         else{
    //             // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
    //             creep.memory.path = creep.pos.findPathTo(target);
    //         }
    //     }
    // }
    // else{
    //     console.log('simple one machine arrive W41S7, rest tick:', creep.ticksToLive)
    //     let tower: StructureTower = Game.getObjectById('613c0f1489c2b91d60d79c59')
    //     if (tower != undefined){
    //         if (creep.rangedAttack(tower) != OK){
    //             creep.moveTo(tower)
    //         }
    //     }
    //     else{
    //         let spawn: StructureSpawn = Game.getObjectById('613a5db4e886cf3cabe6bce3')
    //         if (spawn != undefined){
    //             if (creep.rangedAttack(spawn) != OK){
    //                 creep.moveTo(spawn)
    //             }
    //         }
    //         else{
    //             let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //             if (target){
    //                 if (creep.rangedAttack(target) != OK){
    //                     creep.moveTo(target)
    //                 }
    //             }
    //         }
    //     }
    // }
    // creep.heal(creep)
    // if (creep.room.name != 'W41S6'){
    //     creep.moveTo(new RoomPosition(25, 25, 'W41S6'))
    // }
    // else{
    //     let spawn: StructureSpawn = Game.getObjectById('6151a89e7cdaa18f445cc825')
    //     if (spawn != undefined){
    //         if (creep.rangedAttack(spawn) != OK){
    //             creep.moveTo(spawn)
    //         }
    //     }
    //     else{
    //         let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //         if (target){
    //             if (creep.rangedAttack(target) != OK){
    //                 creep.moveTo(target)
    //             }
    //         }
    //         else{
    //             let rampart: StructureRampart = Game.getObjectById('6161687edc24290bf662ca63')
    //             if (rampart != undefined){
    //                 if (creep.rangedAttack(rampart) != OK){
    //                     creep.moveTo(rampart)
    //                 }
    //             }
    //             else{
    //                 let tower: StructureTower = Game.getObjectById('6152b9a0683d7e64014af701')
    //                 if (tower != undefined){
    //                     if (creep.rangedAttack(tower) != OK){
    //                         creep.moveTo(tower)
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    // creep.heal(creep)
    if (creep.room.name != 'W47S14') {
        creep.moveTo(new RoomPosition(25, 25, 'W47S14'));
    }
    else {
        creep.moveTo(new RoomPosition(25, 25, 'W47S14'));
    }
};

// Game.spawns['Spawn3'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], '简单硬', {memory: {role: 'simple_one_harder'}})
const simple_one_harder_work = function (creep) {
    // creep.moveTo(new RoomPosition(11, 16, 'W47S14'))
    // if (true){
    //     if (creep.pos.x == 11 && creep.pos.y == 16){
    //         creep.moveTo(new RoomPosition(11, 16, 'W47S14'))
    //     }
    //     else{
    //         let lab_lho2: StructureLab = Game.getObjectById('615b67b909f7903134462c0d')
    //         lab_lho2.boostCreep(creep)
    //         let lab_zho2: StructureLab = Game.getObjectById('615bb25d94d216562f056f23')
    //         lab_zho2.boostCreep(creep)
    //     }
    // }
    // else
    // if (creep.room.name != 'W41S7'){
    //     creep.heal(creep)
    //     let target
    //     if (creep.room.name == 'W47S14'){
    //         target = new RoomPosition(21, 1, 'W47S13')
    //     }
    //     else if (creep.room.name == 'W47S13'){
    //         target = new RoomPosition(23, 1, 'W47S12')
    //     }
    //     else if (creep.room.name == 'W47S12'){
    //         target = new RoomPosition(31, 1, 'W47S11')
    //     }
    //     else if (creep.room.name == 'W47S11'){
    //         target = new RoomPosition(48, 39, 'W47S10')
    //     }
    //     else if (creep.room.name == 'W47S10'){
    //         target = new RoomPosition(48, 31, 'W46S10')
    //     }
    //     else if (creep.room.name == 'W46S10'){
    //         target = new RoomPosition(48, 31, 'W45S10')
    //     }
    //     else if (creep.room.name == 'W45S10'){
    //         target = new RoomPosition(48, 31, 'W44S10')
    //     }
    //     else if (creep.room.name == 'W44S10'){
    //         target = new RoomPosition(48, 31, 'W43S10')
    //     }
    //     else if (creep.room.name == 'W43S10'){
    //         target = new RoomPosition(48, 31, 'W42S10')
    //     }
    //     else if (creep.room.name == 'W42S10'){
    //         target = new RoomPosition(48, 7, 'W41S10')
    //     }
    //     else if (creep.room.name == 'W41S10'){
    //         target = new RoomPosition(6, 1, 'W40S10')
    //     }
    //     else if (creep.room.name == 'W40S10'){
    //         target = new RoomPosition(7, 1, 'W40S9')
    //     }
    //     else if (creep.room.name == 'W40S9'){
    //         target = new RoomPosition(1, 29, 'W40S8')
    //     }
    //     else if (creep.room.name == 'W40S8'){
    //         target = new RoomPosition(21, 1, 'W41S8')
    //     }
    //     else if (creep.room.name == 'W41S8'){
    //         target = new RoomPosition(11, 26, 'W41S7')
    //     }
    //     if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
    //         // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
    //         creep.memory.path = creep.pos.findPathTo(target);
    //     }
    //     let code = creep.moveByPath(creep.memory.path)
    //     if (code == ERR_NOT_FOUND){
    //         if (creep.pos.isNearTo(target)){
    //             creep.memory.path = null
    //         }
    //         else{
    //             // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
    //             creep.memory.path = creep.pos.findPathTo(target);
    //         }
    //     }
    // }
    // else{
    //     if (creep.pos.y >= 48){
    //         console.log('simple one harder arrive W41S7, rest tick:', creep.ticksToLive)
    //     }
    //     if (creep.hits < creep.hitsMax){
    //         creep.heal(creep)
    //     }
    //     else{
    //         let tower: StructureTower = Game.getObjectById('613c0f1489c2b91d60d79c59')
    //         if (tower != undefined){
    //             if (creep.attack(tower) != OK){
    //                 creep.moveTo(tower)
    //             }
    //         }
    //         else{
    //             let spawn: StructureSpawn = Game.getObjectById('613a5db4e886cf3cabe6bce3')
    //             if (spawn != undefined){
    //                 if (creep.attack(spawn) != OK){
    //                     creep.moveTo(spawn)
    //                 }
    //             }
    //             else{
    //                 let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //                 if (target){
    //                     if (creep.attack(target) != OK){
    //                         creep.moveTo(target)
    //                     }
    //                 }
    //                 else{
    //                 }
    //             }
    //         }
    //     }
    // }
    // if (creep.room.name != 'W41S6'){
    //     creep.moveTo(new RoomPosition(25, 25, 'W41S6'))
    // }
    // else{
    //     if (creep.hits < creep.hitsMax){
    //         creep.heal(creep)
    //     }
    //     else{
    //         let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //         if (target){
    //             if (creep.attack(target) != OK){
    //                 creep.moveTo(target)
    //             }
    //         }
    //         else{
    //             let spawn: StructureSpawn = Game.getObjectById('6151a89e7cdaa18f445cc825')
    //             if (spawn != undefined){
    //                 if (creep.attack(spawn) != OK){
    //                     creep.moveTo(spawn)
    //                 }
    //             }
    //             else{
    //                 let rampart: StructureRampart = Game.getObjectById('6161687edc24290bf662ca63')
    //                 if (rampart != undefined){
    //                     if (creep.attack(rampart) != OK){
    //                         creep.moveTo(rampart)
    //                     }
    //                 }
    //                 else{
    //                     let tower: StructureTower = Game.getObjectById('6152b9a0683d7e64014af701')
    //                     if (tower != undefined){
    //                         if (creep.attack(tower) != OK){
    //                             creep.moveTo(tower)
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    if (creep.room.name != 'W47S14') {
        creep.moveTo(new RoomPosition(25, 25, 'W47S14'));
    }
    else {
        creep.moveTo(new RoomPosition(25, 25, 'W47S14'));
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
        // else if (creep.memory.role == 'carrier1_W48S12'){
        //     carrier1_W48S12_work(creep)
        // }
        else if (creep.memory.role == 'carrier_W48S12') {
            carrier_W48S12_work(creep);
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
        // else if (creep.memory.role == 'sign'){
        //     sign_work(creep)
        // }
        else if (creep.memory.role == 'help') {
            help_work(creep);
        }
        // else if (creep.memory.role == 'new_room_help'){
        //     new_room_help_work(creep)
        // }
        else if (creep.memory.role == 'miner') {
            miner_work(creep);
        }
        else if (creep.memory.role == 'mine_transfer') {
            mine_transfer_work(creep);
        }
        // low level
        else if (creep.memory.role == 'hu') {
            harvest_upgrade_work$1(creep);
        }
        else if (creep.memory.role == 'hf') {
            harvest_fill_work$1(creep);
        }
        else if (creep.memory.role == 'hr') {
            harvest_repair_work$1(creep);
        }
        // else if (creep.memory.role == 'test'){
        //     test_work(creep)
        // }
        // war 4 W41S7
        else if (creep.memory.role == 'scout_test') {
            scout_test_work(creep);
        }
        else if (creep.memory.role == 'simple_one_machine') {
            simple_one_machine_work(creep);
        }
        else if (creep.memory.role == 'simple_one_harder') {
            simple_one_harder_work(creep);
        }
        else if (creep.memory.role == 'move_compounds') {
            move_compounds_work(creep);
        }
        else if (creep.memory.role == 'claim_controller') {
            claim_controller_work(creep);
        }
        // tmp
        else if (creep.memory.role == 'tmp_attack') {
            tmp_attack_work(creep);
        }
    }
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
const room_energy_mine_routine = function (source_roomName, dest_roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys) {
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
    if (source_roomName == 'W48S12') {
        source_room.memory.energy_mine_chain_ok = true;
    }
    else {
        source_room.memory.energy_mine_chain_ok = false;
    }
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
    room_energy_mine_init(source_room);
    room_energy_mine_routine(source_roomName, dest_roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys);
};

const tower_work$1 = function (roomName) {
    if (Game.rooms[roomName] == undefined) {
        console.log('tower work 23 room seems undefined');
        return;
    }
    // Tower防御及safe mode的激活
    let tower_list;
    let spawn_list;
    if (roomName == 'W47S14') {
        tower_list = ['6159d77e4f3a51396dd2fcfe', '615a15ea8e77705c01ebc303', '615bec8f3d8c500c57d69377',
            '617804aef64f5ec49c53815c', '6177f52de45f2bc4bc185170', '61779f21b96f375a682351c3'];
        spawn_list = ['Spawn1', 'Spawn3'];
    }
    else if (roomName == 'W48S12') {
        tower_list = ['6159ce743a785c3da4b22def', '617439daae86fb256a426b47'];
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
    let ramparts;
    let structures;
    let ramparts_walls;
    if (closestHostiles.length == 0) {
        if (roomName == 'W48S12') {
            structures = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < 0.9 * structure.hitsMax
                    && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) ||
                    (structure.hits < 10000 && structure.pos.x >= 9 && structure.pos.x <= 26 && structure.pos.y > 32 && (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART))
            });
        }
        else {
            structures = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < 0.9 * structure.hitsMax
                    && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART
            });
        }
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
                else if (!(tower.store.getUsedCapacity(RESOURCE_ENERGY) < 0.6 * tower.store.getCapacity(RESOURCE_ENERGY))) {
                    tower.room.memory.war_flag = false;
                    if (structures.length > 0) {
                        tower.repair(structures[0]);
                    }
                    else if (roomName == 'W47S14') {
                        let storage = Game.getObjectById("6159fc1609f790175f45c6be");
                        let terminal = Game.getObjectById('615ab4e746872376a3726f6f');
                        if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 140000 && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 500000) {
                            ramparts = Game.rooms[roomName].find(FIND_STRUCTURES, {
                                filter: (structure) => structure.hits < 1000000 && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)
                                    && structure.id != '6144f713fac820efe7cd23bc'
                            });
                            if (ramparts.length == 0) {
                                structures = Game.rooms[roomName].find(FIND_STRUCTURES, {
                                    filter: (structure) => structure.hits < structure.hitsMax
                                        && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART
                                });
                                if (structures.length == 0) {
                                    ramparts_walls = Game.rooms[roomName].find(FIND_STRUCTURES, {
                                        filter: (structure) => structure.hits < structure.hitsMax
                                            && structure.structureType != STRUCTURE_WALL
                                            && structure.structureType != STRUCTURE_RAMPART
                                    });
                                }
                            }
                            if (ramparts.length > 0) {
                                tower.repair(ramparts[0]);
                            }
                            else {
                                if (structures.length > 0) {
                                    tower.repair(structures[0]);
                                }
                                else {
                                    if (ramparts_walls.length > 0) {
                                        tower.repair(ramparts_walls[0]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

[
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
        tower_work$1(roomName);
        spawnName = 'Spawn1';
        // let storage = Game.getObjectById(Memory.rooms[roomName].storage_id)
        // if (storage){
        //     if (storage.store.getFreeCapacity() < 50000 && Game.time%100 == 0){
        //         Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY})
        //     }
        // }
        let cleaners_base_transfers = _.filter(Game.creeps, (creep) => ((creep.memory.role == 'base_transfer' || creep.memory.role == 'cleaner') && creep.room.name == 'W47S14') && creep.ticksToLive > 200);
        let base_transferNum = 2;
        let room = Game.rooms[roomName];
        // let energyAvailable: number = room.energyAvailable;
        let carriersNum = 1;
        let tower_transfersNum = 1;
        let upgradersNum = 1;
        let repairersNum = 1;
        let buildersNum = 1;
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
        if (room.controller.level == 8) {
            upgradersNum = 1;
        }
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
            if (upgraders.length < upgradersNum) {
                let newName = 'Upgrader_link' + Game.time;
                if (room.controller.level == 8) {
                    Game.spawns[spawnName].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        WORK, WORK, WORK, WORK, CARRY], newName, { memory: { role: 'upgrader_link' } });
                }
                else {
                    Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader_link' } });
                }
            }
            else if (repairers.length < repairersNum) {
                let newName = 'Repairer' + Game.time;
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'repairer' } });
            }
            else if (builders.length < buildersNum) {
                let newName = 'Builder' + Game.time;
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder' } });
            }
            if (cleaners_base_transfers.length < base_transferNum) {
                let newName = 'Base_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, { memory: { role: 'base_transfer' } });
            }
            else if (carriers.length < carriersNum) {
                let newName = 'Carrier' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, { memory: { role: 'carrier_W47S14' } });
            }
            else if (tower_transfers.length < tower_transfersNum) {
                let newName = 'Tower_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, { memory: { role: 'tower_transfer' } });
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
        let transfer_num = [1, 1];
        let harvester_num = [1, 1];
        let link_harvester_pos_xs = [,];
        let link_harvester_pos_ys = [,];
        room_energy_mine(roomName, roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys);
    }
    // switch (room.controller.level){
    //     // case 0:
    //     //     // claimController即可升级, road 5个container
    //     //     // 预留，已经是自己的房间不会进入到这个逻辑
    //     //     break
    //     case 1:
    //         // 升级
    //         // 1能量升1 controller
    //         // 1能量升Downgrade 100, 多余不返还
    //         // 200能量到2级, energy capacity max 300
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

const room_W48S12_running = function (roomName) {
    tower_work$1('W48S12');
    let spawn_name = 'Spawn2';
    // let home: Room = Game.rooms[roomName]
    let upgradersNum = 2;
    let harvester0sNum = 0;
    let harvester1sNum = 0;
    let buildersNum = 2;
    let base_transferNum = 1;
    // let carrier1sNum: number = 1
    let carriersNum = 1;
    // if (Game.rooms['W48S12'].find(FIND_CONSTRUCTION_SITES).length == 0){
    //     buildersNum = 0
    // }
    let repairersNum = 0;
    // let carrier1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier1_W48S12' && creep.ticksToLive > 80);
    let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier_W48S12' && creep.ticksToLive > 80);
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'hu' && creep.room.name == 'W48S12');
    let builders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'builder' || creep.memory.role == 'repairer') && creep.room.name == 'W48S12');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    let base_transfers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'base_transfer' || creep.memory.role == 'cleaner') && creep.room.name == 'W48S12');
    let harvester0s = _.filter(Game.creeps, (creep) => creep.memory.role == 'hf' && creep.memory.source_idx == 0);
    let harvester1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'hf' && creep.memory.source_idx == 1);
    if (Game.spawns[spawn_name].spawning) {
        let spawningCreep = Game.creeps[Game.spawns[spawn_name].spawning.name];
        Game.spawns[spawn_name].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawn_name].pos.x + 1, Game.spawns[spawn_name].pos.y, { align: 'left', opacity: 0.8 });
    }
    else if (upgraders.length < upgradersNum) {
        let newName = 'Upgrader' + Game.time;
        Game.spawns[spawn_name].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY], newName, { memory: { role: 'hu', source_idx: 0 } });
    }
    else if (harvester0s.length < harvester0sNum) {
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'hf', source_idx: 0 } });
    }
    else if (harvester1s.length < harvester1sNum) {
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'hf', source_idx: 1 } });
    }
    else if (builders.length < buildersNum) {
        let newName = 'Builder' + Game.time;
        // Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder', source_idx: 1}});
        // Game.spawns[spawn_name].spawnCreep([WORK, CARRY, WORK, CARRY, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder', source_idx: 1}});
        Game.spawns[spawn_name].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', source_idx: 1 } });
    }
    else if (repairers.length < repairersNum) {
        let newName = 'Repairer' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'repairer', source_idx: 1 } });
    }
    else if (carriers.length < carriersNum) {
        let newName = 'Carrier' + Game.time;
        Game.spawns[spawn_name].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, { memory: { role: 'carrier_W48S12' } });
    }
    // else if(carrier1s.length < carrier1sNum) {
    //     let newName = 'Carrier1' + Game.time;
    //     Game.spawns[spawn_name].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, {memory: {role: 'carrier1_W48S12'}});
    // }
    else if (base_transfers.length < base_transferNum) {
        let newName = 'Base_transfer' + Game.time;
        Game.spawns[spawn_name].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, { memory: { role: 'base_transfer' } });
    }
    let source_link = Game.getObjectById('61696ef057b6d60ae7c5968c');
    let dest_link = Game.getObjectById('61739e3ab6a4e1f3750c4432');
    source_link.transferEnergy(dest_link);
    let transfer_num = [0, 0];
    let harvester_num = [0, 1];
    let link_harvester_pos_xs = [, 31];
    let link_harvester_pos_ys = [, 38];
    room_energy_mine(roomName, roomName, spawn_name, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys);
};

/**
 * FlatQueue - Original Implementation by mourner: https://github.com/mourner/flatqueue
 *
 * Quoting the author, this is "A very fast binary heap priority queue in JavaScript."
 *
 * I changed the queue, so the data and priority arrays have the actual elements removed,
 * when pop() is called. A small trade off between speed and memory: A bit slower, but
 * better memory efficiency - Which is a must in Screeps.
 *
 * Something else I changed as well is the initialization of the data structure.
 * To be able to make it persistent in Screeps, we need to address the global Memory
 * object. It is not a pretty adaptation, but it works.
 */

class FlatQueue
 {
     /**
      * Creates a Priority queue.
      * To avoid future frustration, I added a trap if the memory_structure param is undefined.
      * You must pass either an empty object - i.e.: let queue = new FlatQueue({});
      * or a Screeps memory object - i.e.: let queue = new FlatQueue(Memory.test).
      *
      * IMPORTANT: When using a Screeps memory object, make sure to initialize it first!
      * i.e.: Memory.test = {}
      *
      * @param memory_structure {Object} Empty object or Screeps memory object
      */
     constructor(memory_structure)
     {
         if (memory_structure === undefined)
         {
             console.log('Memory structure is undefined! Initialize the memory first!\n' + Error().stack);
 
             // This will abort code execution, forcing us to look at the code
             throw 'Memory structure is undefined! Initialize the memory first!';
         }
 
         // If we're storing in a Screeps memory object, initialize for the first use.
         if (memory_structure.data === undefined ||
             memory_structure.priority === undefined ||
             memory_structure.length === undefined)
         {
             memory_structure.data = [];
             memory_structure.priority = [];
             memory_structure.length = 0;
         }
 
         // Since javascript can't pass by reference when we want, there is
         // no way to bind "length" (a number) to a member variable. So, we
         // store the entire data structure in a member variable.
         this.memory_structure = memory_structure;
     }
 
     /**
      * Empties the priority queue
      */
     clear()
     {
         this.memory_structure.data = [];
         this.memory_structure.priority = [];
         this.memory_structure.length = 0;
     }
 
     /**
      * Return the size of the priority queue
      * @return {number}
      */
     getLength()
     {
         return this.memory_structure.length;
     }
 
     /**
      * Add a new element to the priority queue
      *
      * @param priorityNum {Number} This is the priority number of the data added. Smaller elements have higher priority.
      * @param data {*} Data to be stored. It can be of any type.
      */
     push(priorityNum, data)
     {
         let pos = this.memory_structure.length++;
         this.memory_structure.data[pos] = data;
         this.memory_structure.priority[pos] = priorityNum;
 
         while (pos > 0)
         {
             const parent = (pos - 1) >> 1;
             const parentValue = this.memory_structure.priority[parent];
 
             if (priorityNum >= parentValue)
                 break;
 
             this.memory_structure.data[pos] = this.memory_structure.data[parent];
             this.memory_structure.priority[pos] = parentValue;
             pos = parent;
         }
 
         this.memory_structure.data[pos] = data;
         this.memory_structure.priority[pos] = priorityNum;
     }
 
     /**
      * Removes and returns the highest priority element of the queue.
      * If the queue is empty, undefined is returned.
      *
      * @return {undefined|*} The highest priority element of the queue. If the queue is empty, undefined is returned.
      */
     pop()
     {
         if (this.memory_structure.length === 0)
             return undefined;
 
         const top = this.memory_structure.data[0];
         this.memory_structure.length--;
 
         if (this.memory_structure.length > 0)
         {
             const id = this.memory_structure.data[0] = this.memory_structure.data[this.memory_structure.length];
             const value = this.memory_structure.priority[0] = this.memory_structure.priority[this.memory_structure.length];
             const halfLength = this.memory_structure.length >> 1;
             let pos = 0;
 
             while (pos < halfLength)
             {
                 let left = (pos << 1) + 1;
                 const right = left + 1;
                 let bestIndex = this.memory_structure.data[left];
                 let bestValue = this.memory_structure.priority[left];
                 const rightValue = this.memory_structure.priority[right];
 
                 if (right < this.memory_structure.length && rightValue < bestValue)
                 {
                     left = right;
                     bestIndex = this.memory_structure.data[right];
                     bestValue = rightValue;
                 }
                 if (bestValue >= value) break;
 
                 this.memory_structure.data[pos] = bestIndex;
                 this.memory_structure.priority[pos] = bestValue;
                 pos = left;
             }
 
             this.memory_structure.data[pos] = id;
             this.memory_structure.priority[pos] = value;
         }

        // Lose some speed to use less memory
        //  this.memory_structure.data.pop();
        //  this.memory_structure.priority.pop();

         return top;
     }
 
     /**
      * Look at the top element of the priority queue, without removing it.
      *
      * @return {undefined|*} The top element. If there isn't one, undefined is returned.
      */
     peek()
     {
         if (this.memory_structure.length === 0)
             return undefined;
         return this.memory_structure.data[0];
     }
 
     /**
      * Take a peek at the priority number for the top element of the priority queue.
      *
      * @return {undefined|*} Priority of the top element. If there isn't one, undefined is returned.
      */
     peekPriority()
     {
         if (this.memory_structure.length === 0)
             return undefined;
         return this.memory_structure.priority[0];
     }
 
     /**
      * Dumps the contents of the priority queue.
      * Hint: Use an external text editor to sort it ;)
      *
      * @return {string} output text data
      */
     dumpNicely()
     {
         let output = "";
         for (let i = 0; i < this.memory_structure.length; ++i)
         {
             output += this.memory_structure.priority[i];
             output += ", ";
             output += JSON.stringify(this.memory_structure.data[i]);
             output += "\n";
         }
 
         return output;
     }
 }
 
 var FlatQueue_1 = FlatQueue;

const clear_spawn_queue = function (roomName) {
    Memory.rooms[roomName].spawnQueue = {};
    new FlatQueue_1(Game.rooms[roomName].memory.spawnQueue);
};
const get_role_workers = function (role, roomName, min_ticksToLive, role_1) {
    if (role_1 == undefined) {
        if (min_ticksToLive == undefined)
            return _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.room.name == roomName);
        else
            return _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.room.name == roomName && creep.ticksToLive >= min_ticksToLive);
    }
    else {
        if (min_ticksToLive == undefined)
            return _.filter(Game.creeps, (creep) => (creep.memory.role == role || creep.memory.role == role_1) && creep.room.name == roomName);
        else
            return _.filter(Game.creeps, (creep) => (creep.memory.role == role || creep.memory.role == role_1) && creep.room.name == roomName && creep.ticksToLive >= min_ticksToLive);
    }
};
const check_one_role = function (room, role, priority, source_idx, roleNum, role_workers_length) {
    for (let i = roleNum - role_workers_length; i > 0; i--) {
        let data = {
            name: (i == 1 ? role : role + i),
            memory: {
                role: role,
                source_idx: source_idx,
            }
        };
        room.addSpawnTask(priority, data);
    }
};

const room_config = {
    'W14N12': {
        'level1': {
            'hu_priority': 10,
            'huNum': 5,
            'hu_source_idx': 1,
            'hu_ticksToLive': 150
        },
        'level2': {
            'hf_priority': 0,
            'hfNum': 3,
            'hf_source_idx': 0,
            'hf_ticksToLive': 200,
            'hu_priority': 10,
            'huNum': 7,
            'hu_source_idx': 1,
            'hu_ticksToLive': 150,
            'hb_priority': 20,
            'hbNum': 2,
            'hb_source_idx': 0,
            'hb_ticksToLive': 150,
            'hr_priority': 15,
            'hrNum': 1,
            'hr_source_idx': 0,
            'hr_ticksToLive': 150,
        },
        'level3': {
            'hf_priority': 0,
            'hfNum': 3,
            'hf_source_idx': 0,
            'hf_ticksToLive': 200,
            'hu_priority': 10,
            'huNum': 5,
            'hu_source_idx': 1,
            'hu_ticksToLive': 150,
            'hb_priority': 20,
            'hbNum': 3,
            'hb_source_idx': 0,
            'hb_ticksToLive': 150,
            'hr_priority': 15,
            'hrNum': 1,
            'hr_source_idx': 0,
            'hr_ticksToLive': 150,
        }
    },
    'W9N11': {
        'level1': {
            'huNum': 3,
            'hu_source_idx': 1
        },
        'level2': {
            'hf_priority': 0,
            'hfNum': 4,
            'hf_source_idx': 0,
            'hf_ticksToLive': 200,
            'hu_priority': 10,
            'huNum': 10,
            'hu_source_idx': 1,
            'hu_ticksToLive': 150,
            'hb_priority': 20,
            'hbNum': 2,
            'hb_source_idx': 0,
            'hb_ticksToLive': 150,
            'hr_priority': 15,
            'hrNum': 1,
            'hr_source_idx': 0,
            'hr_ticksToLive': 150,
        },
        'level3': {
            'hf_priority': 0,
            'hfNum': 6,
            'hf_source_idx': 0,
            'hf_ticksToLive': 200,
            'hu_priority': 10,
            'huNum': 8,
            'hu_source_idx': 1,
            'hu_ticksToLive': 150,
            'hb_priority': 20,
            'hbNum': 2,
            'hb_source_idx': 0,
            'hb_ticksToLive': 150,
            'hr_priority': 15,
            'hrNum': 1,
            'hr_source_idx': 0,
            'hr_ticksToLive': 150,
        },
    },
    'W41S6': {
        'level1': {
            'hu_priority': 10,
            'huNum': 5,
            'hu_source_idx': 1,
            'hu_ticksToLive': 150
        },
        'level2': {
            'hf_priority': 0,
            'hfNum': 3,
            'hf_source_idx': 0,
            'hf_ticksToLive': 200,
            'hu_priority': 10,
            'huNum': 7,
            'hu_source_idx': 1,
            'hu_ticksToLive': 150,
            'hb_priority': 20,
            'hbNum': 2,
            'hb_source_idx': 0,
            'hb_ticksToLive': 150,
            'hr_priority': 15,
            'hrNum': 1,
            'hr_source_idx': 0,
            'hr_ticksToLive': 150,
        },
        'level3': {
            'hf_priority': 0,
            'hfNum': 2,
            'hf_source_idx': 0,
            'hf_ticksToLive': 200,
            'hu_priority': 10,
            'huNum': 6,
            'hu_source_idx': 1,
            'hu_ticksToLive': 150,
            'hb_priority': 20,
            'hbNum': 1,
            'hb_source_idx': 0,
            'hb_ticksToLive': 150,
            'hr_priority': 15,
            'hrNum': 1,
            'hr_source_idx': 0,
            'hr_ticksToLive': 150,
        },
    }
};

const level1_check_spawn_queue = function (roomName) {
    let hu_priority = 10;
    let huNum = 3;
    let hu_source_idx = 1;
    let hu_ticksToLive = 150;
    if (room_config[roomName] != undefined) {
        hu_priority = room_config[roomName]['hu_priority'];
        huNum = room_config[roomName]['huNum'];
        hu_source_idx = room_config[roomName]['hu_source_idx'];
        hu_ticksToLive = room_config[roomName]['hu_ticksToLive'];
    }
    clear_spawn_queue(roomName);
    let harvest_upgrade_workers = get_role_workers('hu', roomName, hu_ticksToLive);
    check_one_role(Game.rooms[roomName], 'hu', hu_priority, hu_source_idx, huNum, harvest_upgrade_workers.length);
};

/*
function:
harvest, transfer, upgrade

spawnCreep reqiure:bodys, name
creep.memory.role:'hu'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id
creep.room.controller
 */
const harvest_upgrade_work = function (creep) {
    let priority = 10;
    let minTicksToLive = 150;
    if (creep.ticksToLive == minTicksToLive) {
        const data = {
            name: creep.memory.role,
            memory: {
                role: creep.memory.role,
                source_idx: creep.memory.source_idx
            }
        };
        creep.room.addSpawnTask(priority, data);
    }
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 采');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        delete creep.memory.dontPullMe;
        creep.say('🚧 升');
    }
    if (creep.memory.is_working) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#4fcf30' } });
        }
    }
    else {
        let source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        go_to_harvest(creep, source);
    }
};

const level1_logic = function (roomName) {
    for (let name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name];
        }
        else {
            if (creep.memory.role == 'hu') {
                harvest_upgrade_work(creep);
            }
        }
    }
    let room = Game.rooms[roomName];
    if (room.memory.check_spawn_queue_flag ||
        (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName)) {
        level1_check_spawn_queue(roomName);
        if (room.memory.check_spawn_queue_flag)
            delete room.memory.check_spawn_queue_flag;
        if (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName) {
            Game.flags.check_spawn_queue_flag.remove();
        }
    }
};

const level2_check_spawn_queue = function (roomName) {
    let hf_priority = 0;
    let hfNum = 3;
    let hf_source_idx = 0;
    let hf_ticksToLive = 200;
    let hu_priority = 10;
    let huNum = 5;
    let hu_source_idx = 1;
    let hu_ticksToLive = 150;
    let hb_priority = 20;
    let hbNum = 2;
    let hb_source_idx = 0;
    let hb_ticksToLive = 150;
    let hr_priority = 15;
    let hrNum = 1;
    let hr_source_idx = 0;
    let hr_ticksToLive = 150;
    if (room_config[roomName] != undefined ? room_config[roomName]['level2'] != undefined : false) {
        let config = room_config[roomName]['level2'];
        hf_priority = config['hf_priority'];
        hfNum = config['hfNum'];
        hf_source_idx = config['hf_source_idx'];
        hf_ticksToLive = config['hf_ticksToLive'];
        hu_priority = config['hu_priority'];
        huNum = config['huNum'];
        hu_source_idx = config['hu_source_idx'];
        hu_ticksToLive = config['hu_ticksToLive'];
        hb_priority = config['hb_priority'];
        hbNum = config['hbNum'];
        hb_source_idx = config['hb_source_idx'];
        hb_ticksToLive = config['hb_ticksToLive'];
        hr_priority = config['hb_priority'];
        hrNum = config['hrNum'];
        hr_source_idx = config['hr_source_idx'];
        hr_ticksToLive = config['hb_ticksToLive'];
    }
    let room = Game.rooms[roomName];
    clear_spawn_queue(roomName);
    let harvest_fill_workers = get_role_workers('hf', roomName, hf_ticksToLive);
    if (harvest_fill_workers.length == 0) {
        global.restart_flag = true;
    }
    else {
        global.restart_flag = false;
    }
    let harvest_upgrade_workers = get_role_workers('hu', roomName, hu_ticksToLive);
    let harvest_build_workers = [];
    let harvest_repair_workers;
    if (room.find(FIND_MY_CONSTRUCTION_SITES).length == 0) {
        hbNum = 0;
        harvest_repair_workers = get_role_workers('hb', roomName, hr_ticksToLive, 'hr');
    }
    else {
        harvest_build_workers = get_role_workers('hb', roomName, hb_ticksToLive);
        harvest_repair_workers = get_role_workers('hr', roomName, hr_ticksToLive);
    }
    check_one_role(room, 'hf', hf_priority, hf_source_idx, hfNum, harvest_fill_workers.length);
    check_one_role(room, 'hu', hu_priority, hu_source_idx, huNum, harvest_upgrade_workers.length);
    check_one_role(room, 'hb', hb_priority, hb_source_idx, hbNum, harvest_build_workers.length);
    check_one_role(room, 'hr', hr_priority, hr_source_idx, hrNum, harvest_repair_workers.length);
};

const go_to_build = function (creep, type) {
    if (type != undefined) {
        let construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == type);
            }
        });
        if (construction) {
            if (creep.build(construction) == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction, { visualizePathStyle: { stroke: '#008cff' } });
            }
            return;
        }
    }
    let constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (constructions.length > 0) {
        if (creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(constructions[0], { visualizePathStyle: { stroke: '#008cff' } });
        }
        return;
    }
    creep.memory.role = 'hr';
};

/*
function:
harvest, transfer, build

spawnCreep reqiure:bodys, name
creep.memory.role:'hb'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id

other:
harvest_repair_worker
*/
const harvest_build_work = function (creep) {
    let priority = 20;
    let minTicksToLive = 150;
    if (creep.ticksToLive == minTicksToLive) {
        const data = {
            name: creep.memory.role,
            memory: {
                role: creep.memory.role,
                source_idx: creep.memory.source_idx
            }
        };
        creep.room.addSpawnTask(priority, data);
    }
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 采');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        delete creep.memory.dontPullMe;
        creep.say('🚧 建');
    }
    if (creep.memory.is_working) {
        go_to_build(creep);
    }
    else {
        let source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        go_to_harvest(creep, source);
    }
};

/*
function:
harvest, transfer, fill extension, spawn, tower

spawnCreep reqiure:bodys, name
creep.memory.role:'hf'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id
 */
const harvest_fill_work = function (creep) {
    let priority = 0;
    let minTicksToLive = 200;
    if (creep.ticksToLive == minTicksToLive) {
        const data = {
            name: creep.memory.role,
            memory: {
                role: creep.memory.role,
                source_idx: creep.memory.source_idx
            }
        };
        creep.room.addSpawnTask(priority, data);
    }
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 采');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        delete creep.memory.dontPullMe;
        creep.say('🚧 填');
    }
    if (creep.memory.is_working) {
        if (creep.room.energyCapacityAvailable == creep.room.energyAvailable || creep.room.memory.war_flag) {
            go_to_fill(creep, true);
        }
        else {
            go_to_fill(creep);
        }
    }
    else {
        let source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        go_to_harvest(creep, source);
    }
};

/*
function:
harvest, transfer, repair

spawnCreep reqiure:bodys, name
creep.memory.role:'hr'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id

other:
harvest_build_work
*/
const harvest_repair_work = function (creep) {
    let priority = 15;
    let minTicksToLive = 150;
    if (creep.ticksToLive == minTicksToLive) {
        const data = {
            name: creep.memory.role,
            memory: {
                role: creep.memory.role,
                source_idx: creep.memory.source_idx
            }
        };
        creep.room.addSpawnTask(priority, data);
    }
    if (creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 采');
    }
    if (!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        delete creep.memory.dontPullMe;
        creep.say('🚧 修');
    }
    if (creep.memory.is_working) {
        go_to_repair(creep);
    }
    else {
        let source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx]);
        go_to_harvest(creep, source);
    }
};

const level2_logic = function (roomName) {
    for (let name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name];
        }
        else {
            if (creep.memory.role == 'hu') {
                harvest_upgrade_work(creep);
            }
            else if (creep.memory.role == 'hb') {
                harvest_build_work(creep);
            }
            else if (creep.memory.role == 'hf') {
                harvest_fill_work(creep);
            }
            else if (creep.memory.role == 'hr') {
                harvest_repair_work(creep);
            }
        }
    }
    let room = Game.rooms[roomName];
    if (room.memory.check_spawn_queue_flag || Game.time % 100 == 0 ||
        (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName)) {
        level2_check_spawn_queue(roomName);
        if (room.memory.check_spawn_queue_flag) {
            delete room.memory.check_spawn_queue_flag;
        }
        if (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName) {
            Game.flags.check_spawn_queue_flag.remove();
        }
    }
};

/*
reqiure:
room
room.memory.towers.id

set:
room.memory.war_flag

action:
notifyWhenAttacked tower
activateSafeMode
*/
const tower_work = function (roomName) {
    let room = Game.rooms[roomName];
    let tower_list = room.memory.towers_id;
    let closestHostiles = room.find(FIND_HOSTILE_CREEPS);
    let structures;
    if (closestHostiles.length == 0) {
        structures = room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
                && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART
        });
    }
    // Tower防御及safe mode的激活
    for (let tower_id in tower_list) {
        let tower = Game.getObjectById(tower_list[tower_id]);
        if (tower) {
            if (tower.notifyWhenAttacked(true) == OK && tower.hits <= 0.6 * tower.hitsMax) {
                room.controller.activateSafeMode();
            }
            if (tower) {
                if (closestHostiles.length > 0) {
                    if (tower.room.memory.war_flag == false) {
                        console.log(Game.time, roomName, '发现敌军' + closestHostiles.length + closestHostiles[0].owner.username);
                    }
                    tower.room.memory.war_flag = true;
                    tower.attack(closestHostiles[0]);
                }
                else if (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 0.7 * tower.store.getCapacity(RESOURCE_ENERGY)) {
                    tower.room.memory.war_flag = false;
                    if (structures.length > 0) {
                        tower.repair(structures[0]);
                    }
                }
            }
        }
    }
};

const level3_check_spawn_queue = function (roomName) {
    let hf_priority = 0;
    let hfNum = 3;
    let hf_source_idx = 0;
    let hf_ticksToLive = 200;
    let hu_priority = 10;
    let huNum = 5;
    let hu_source_idx = 1;
    let hu_ticksToLive = 150;
    let hb_priority = 20;
    let hbNum = 3;
    let hb_source_idx = 0;
    let hb_ticksToLive = 150;
    let hr_priority = 15;
    let hrNum = 1;
    let hr_source_idx = 0;
    let hr_ticksToLive = 150;
    if (room_config[roomName] != undefined ? room_config[roomName]['level3'] != undefined : false) {
        let config = room_config[roomName]['level3'];
        hf_priority = config['hf_priority'];
        hfNum = config['hfNum'];
        hf_source_idx = config['hf_source_idx'];
        hf_ticksToLive = config['hf_ticksToLive'];
        hu_priority = config['hu_priority'];
        huNum = config['huNum'];
        hu_source_idx = config['hu_source_idx'];
        hu_ticksToLive = config['hu_ticksToLive'];
        hb_priority = config['hb_priority'];
        hbNum = config['hbNum'];
        hb_source_idx = config['hb_source_idx'];
        hb_ticksToLive = config['hb_ticksToLive'];
        hr_priority = config['hb_priority'];
        hrNum = config['hrNum'];
        hr_source_idx = config['hr_source_idx'];
        hr_ticksToLive = config['hb_ticksToLive'];
    }
    let room = Game.rooms[roomName];
    clear_spawn_queue(roomName);
    let harvest_fill_workers = get_role_workers('hf', roomName, hf_ticksToLive);
    if (harvest_fill_workers.length == 0) {
        global.restart_flag = true;
    }
    else {
        global.restart_flag = false;
    }
    let harvest_upgrade_workers = get_role_workers('hu', roomName, hu_ticksToLive);
    let harvest_build_workers = [];
    let harvest_repair_workers;
    if (room.find(FIND_MY_CONSTRUCTION_SITES).length == 0) {
        hbNum = 0;
        harvest_repair_workers = get_role_workers('hb', roomName, hr_ticksToLive, 'hr');
    }
    else {
        harvest_build_workers = get_role_workers('hb', roomName, hb_ticksToLive);
        harvest_repair_workers = get_role_workers('hr', roomName, hr_ticksToLive);
    }
    check_one_role(room, 'hf', hf_priority, hf_source_idx, hfNum, harvest_fill_workers.length);
    check_one_role(room, 'hu', hu_priority, hu_source_idx, huNum, harvest_upgrade_workers.length);
    check_one_role(room, 'hb', hb_priority, hb_source_idx, hbNum, harvest_build_workers.length);
    check_one_role(room, 'hr', hr_priority, hr_source_idx, hrNum, harvest_repair_workers.length);
};

/*
room controller is my
need spawn, extension, road, tower site

place flag: Game.flags.check_towers_id_flag, in this room to update the towers_id of this room

level3 todo:
harvester place is not enough
tower attack priority and judge
*/
const check_towers_id$1 = function (room) {
    let towers = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    if (towers.length > 0) {
        Memory.rooms[room.name].towers_id = new Array(towers.length);
        for (let i = 0; i < towers.length; i++) {
            Memory.rooms[room.name].towers_id[i] = towers[i].id;
        }
    }
};
const level3_logic = function (roomName) {
    let room = Game.rooms[roomName];
    if (room.memory.towers_id == undefined) {
        if (Game.time % 100 == 0) {
            check_towers_id$1(room);
        }
    }
    else {
        if (Game.flags.check_towers_id_flag && Game.flags.check_towers_id_flag.room.name == roomName) {
            check_towers_id$1(room);
            Game.flags.check_towers_id_flag.remove();
        }
        tower_work(roomName);
    }
    for (let name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name];
        }
        else {
            if (creep.memory.role == 'hu') {
                harvest_upgrade_work(creep);
            }
            else if (creep.memory.role == 'hb') {
                harvest_build_work(creep);
            }
            else if (creep.memory.role == 'hf') {
                harvest_fill_work(creep);
            }
            else if (creep.memory.role == 'hr') {
                harvest_repair_work(creep);
            }
        }
    }
    if (room.memory.check_spawn_queue_flag || Game.time % 100 == 0 ||
        (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName)) {
        level3_check_spawn_queue(roomName);
        if (room.memory.check_spawn_queue_flag)
            delete room.memory.check_spawn_queue_flag;
        if (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName) {
            Game.flags.check_spawn_queue_flag.remove();
        }
    }
};

/*
room controller is my
need spawn, extension site or road site

place flag: Game.flags.check_towers_id_flag, in this room to update the towers_id of this room

level4 todo:
judge room road state-->determine the bodys
restart harvester bodys auto adjustment
harvester and transfer separate
 */
const check_towers_id = function (room) {
    let towers = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    Memory.rooms[room.name].towers_id = new Array(towers.length);
    for (let i = 0; i < towers.length; i++) {
        Memory.rooms[room.name].towers_id[i] = towers[i].id;
    }
};
const level4_logic = function (roomName) {
    let room = Game.rooms[roomName];
    if (room.memory.towers_id == undefined) {
        if (Game.time % 100 == 0) {
            check_towers_id(room);
        }
    }
    else {
        if (Game.flags.check_towers_id_flag && Game.flags.check_towers_id_flag.room.name == roomName) {
            check_towers_id(room);
            Game.flags.check_towers_id_flag.remove();
        }
        tower_work(roomName);
    }
    for (let name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name];
        }
        else {
            if (creep.memory.role == 'hu') {
                harvest_upgrade_work(creep);
            }
            else if (creep.memory.role == 'hb') {
                harvest_build_work(creep);
            }
            else if (creep.memory.role == 'hf') {
                harvest_fill_work(creep);
            }
            else if (creep.memory.role == 'hr') {
                harvest_repair_work(creep);
            }
        }
    }
    if (room.memory.check_spawn_queue_flag || Game.time % 100 == 0 ||
        (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName)) {
        level3_check_spawn_queue(roomName);
        if (room.memory.check_spawn_queue_flag)
            delete room.memory.check_spawn_queue_flag;
        if (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName) {
            Game.flags.check_spawn_queue_flag.remove();
        }
    }
};

const room_init = function (roomName) {
    let room = Game.rooms[roomName];
    if (Memory.rooms == undefined) {
        Memory.rooms = {};
    }
    if (Memory.rooms[roomName] == undefined) {
        Memory.rooms[roomName] = {};
    }
    if (room.memory.sources_id == undefined) {
        let sources = room.find(FIND_SOURCES);
        room.memory.sources_id = new Array(sources.length);
        for (let i = 0; i < sources.length; i++) {
            room.memory.sources_id[i] = sources[i].id;
        }
    }
};

// creep 生成主要实现
Spawn.prototype.mainSpawn = function (data) {
    let bodys = [WORK, CARRY, MOVE, MOVE];
    if (data.memory.role == 'hf' || data.memory.role == 'hu' || data.memory.role == 'hr' || data.memory.role == 'hb') {
        if (!global.restart_flag) {
            {
                switch (this.room.energyCapacityAvailable) {
                    case 300:
                    case 350:
                        bodys = [WORK, CARRY, MOVE];
                        break;
                    case 400:
                    case 450:
                    case 500:
                    case 550:
                        bodys = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
                        break;
                    case 600:
                    case 650:
                    case 700:
                    case 750:
                    case 800:
                        bodys = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                        break;
                    default:
                        bodys = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                }
            }
        }
    }
    let raw_name = data.name;
    data.name = '' + data.name + Game.time;
    const code = this.spawnCreep(bodys, data.name, { memory: data.memory });
    if (code != OK) {
        data.name = raw_name;
    }
    return code;
};
// 检查任务队列
Spawn.prototype.work = function () {
    // spawn safe mode
    if (this.notifyWhenAttacked(true) == OK && this.hits < 0.6 * this.hitsMax) {
        this.room.controller.activateSafeMode();
    }
    if (Memory.rooms[this.room.name].spawnQueue == undefined) {
        Memory.rooms[this.room.name].spawnQueue = {};
    }
    let spawnQueue = new FlatQueue_1(Memory.rooms[this.room.name].spawnQueue);
    // 自己已经在生成了 / 生产队列为空 就啥都不干
    if (this.spawning || Memory.rooms[this.room.name].spawnQueue.length == 0)
        return;
    // 进行生成
    let code = this.mainSpawn(spawnQueue.peek());
    // 生成成功后移除任务
    if (code == OK)
        spawnQueue.pop();
};
// 所有spawns执行工作
// doing(Game.spawns)
/**
 * author: hoho
 * 执行 Hash Map 中子元素对象的 work 方法
 *
 * @param hashMap 游戏对象的 hash map。如 Game.creeps、Game.spawns 等
 */
function doing(...hashMaps) {
    hashMaps.forEach((obj, index) => {
        let startCost = Game.cpu.getUsed();
        // 遍历执行 work
        Object.values(obj).forEach(item => {
            if (item.work)
                item.work();
        });
        // 如果有需求的话就显示 cpu 消耗
        if (Game.flags.showCost)
            console.log(`消耗 ${Game.cpu.getUsed() - startCost}`, [`[${index}]`]);
    });
}
// const data = {
//     bodyParts: staticHarvesterParts,
//     name: newStaticHarvesterName, // Maybe move this to the actual spawning function?
//     memory: {
//         role: constants.ROLE_STATIC_HARVESTER,
//         source: i,
//         room: room.name
//     }
// }
// const code = targetSpawn.spawnCreep(spawnData.bodyParts,
//     spawnData.name,
//     {memory: spawnData.memory});
// 将生成任务推入队列
Room.prototype.addSpawnTask = function (priority, data) {
    if (Memory.rooms[this.name].spawnQueue == undefined) {
        Memory.rooms[this.name].spawnQueue = {};
    }
    // 任务加入队列
    let spawnQueue = new FlatQueue_1(Memory.rooms[this.name].spawnQueue);
    spawnQueue.push(priority, data);
    return spawnQueue.length;
};

const room_logic = function (roomName) {
    if (Game.rooms[roomName]) {
        if (Game.rooms[roomName].controller) {
            if (Game.rooms[roomName].controller.my) {
                room_init(roomName);
                switch (Game.rooms[roomName].controller.level) {
                    case 1:
                        level1_logic(roomName);
                        break;
                    case 2:
                        level2_logic(roomName);
                        break;
                    case 3:
                        level3_logic(roomName);
                        break;
                    case 4:
                        level4_logic(roomName);
                        break;
                    default:
                        level4_logic(roomName);
                }
                doing(Game.spawns);
            }
            else {
                console.log(Game.time, 'room_logic', roomName, 'controller is not my');
            }
        }
        else {
            console.log(Game.time, 'room_logic', roomName, 'without controller');
        }
    }
    else {
        console.log(Game.time, 'room_logic', roomName, 'undefined');
    }
};

if (Game.flags.Sokranotes) {
    console.log(Game.time, 'Sokranotes new push');
}
const Sokranotes = function () {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    different_role_work();
    if (Memory.rooms['W47S14'] == undefined)
        Memory.rooms['W47S14'] = {};
    if (Memory.rooms['W48S12'] == undefined)
        Memory.rooms['W48S12'] = {};
    let rooms = ['W41S6'];
    for (let idx in rooms) {
        Memory.rooms[rooms[idx]].check_spawn_queue_flag = true;
    }
    room_logic('W41S6');
    rooms = ['W47S14'];
    for (let idx in rooms) {
        room_base_running(rooms[idx]);
    }
    room_W48S12_running('W48S12');
    let spawnName = 'Spawn4';
    let transfer_num = [1, 1];
    let harvester_num = [1, 1];
    out_room_energy_mine('W48S14', 'W47S14', spawnName, harvester_num, transfer_num);
    spawnName = 'Spawn1';
    transfer_num = [2, 2];
    harvester_num = [1, 1];
    out_room_energy_mine('W47S13', 'W47S14', spawnName, harvester_num, transfer_num);
    // spawnName = 'Spawn1'
    // transfer_num = [1, 2]
    // harvester_num = [1, 1]
    // out_room_energy_mine('W47S15', 'W47S14', spawnName, harvester_num, transfer_num)
    // spawnName = 'Spawn4'
    // transfer_num = [1, 2]
    // harvester_num = [1, 1]
    // out_room_energy_mine('W48S15', 'W47S14', spawnName, harvester_num, transfer_num)
    // spawnName = 'Spawn3'
    // transfer_num = [2, 2]
    // harvester_num = [1, 1]
    // out_room_energy_mine('W46S13', 'W47S14', spawnName, harvester_num, transfer_num)
    // Game.spawns['Spawn3'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], '简单一体机', {memory: {role: 'simple_one_machine'}})
};

/*
creep对穿+跨房间寻路+寻路缓存 
跑的比香港记者还快从你做起
应用此模块会导致creep.moveTo可选参数中这些项失效：reusePath、serializeMemory、noPathFinding、ignore、avoid、serialize
保留creep.moveTo中其他全部可选参数如visualizePathStyle、range、ignoreDestructibleStructures、ignoreCreeps、ignoreRoad等
新增creep.moveTo中可选参数ignoreSwamps，会无视swamp与road的移动力损耗差异，一律与plain相同处理，用于方便pc和眼，默认false
例：creep.moveTo(controller, {ignoreSwamps: true});
新增creep.moveTo中可选参数bypassHostileCreeps，被creep挡路时若此项为true则绕过别人的creep，默认为true，设为false用于近战攻击
例：creep.moveTo(controller, {bypassHostileCreeps: false});
新增creep.moveTo中可选参数bypassRange，被creep挡路准备绕路时的绕路半径，默认为5
例：creep.moveTo(controller, {bypassRange: 10});
新增creep.moveTo中可选参数noPathDelay，寻得的路是不完全路径时的再次寻路延迟，默认为10
例：creep.moveTo(controller, {noPathDelay: 5});
新增返回值ERR_INVALID_ARGS，表示range或者bypassRange类型错误

遇到己方creep自动进行对穿，遇到自己设置了不想被对穿的creep（或bypassHostileCreeps设为true时遇到他人creep）会自动绕过
会将新手墙和部署中的invaderCore处理为无法通过
会绕过非终点的portal，不影响creep.moveTo(portal)
不使用Memory及global，不会因此干扰外部代码
不会在Creep.prototype、PowerCreep.prototype上增加官方未有的键值，不会因此干扰外部代码
本模块不可用于sim，在sim会因为房间名格式不对返回ERR_INVALID_TARGET
模块参数见代码头部，模块接口见代码尾部
版本号规则：alpha test = 0.1.x，beta test = 0.9.x，publish >= 1.0.0

author: Scorpior
debug helpers: fangxm, czc
inspired by: Yuandiaodiaodiao
date: 2020/3/30
version: 0.9.4(beta test)

Usage:
module :main

require('超级移动优化');
module.exports.loop=function() {

    //your codes go here

}

changelog:
0.1.0:  maybe not runnable
0.1.1： still maybe not runnable，修了一些typo，完成正向移动，修改isObstacleStructure
0.1.2： maybe runnable，some bugs are fixed
0.1.3:  修正工地位置寻路错误，调整打印格式
0.1.4:  补充pc对穿，打印中增加cache hits统计
0.9.0:  启用自动清理缓存，保留ignoreCreeps参数，调整对穿顺序+增加在storage附近检查对穿，
        正确识别敌对rampart，正确查询带range路径，打印中增加对穿频率统计
0.9.1:  增加正常逻辑开销统计，修改cache搜索开销统计为cache miss开销统计，绕路bugfix，跨房检测bugfix，other bugfix
0.9.2:  修改缓存策略减少查找耗时增加命中率，增加核心区对穿次数统计，对穿bugfix，other bugfix
0.9.3： 取消路径反向复用避免偶发的复用非最优路径的情况，改进识别被新手墙封闭的房间，增加avoidRooms设置，
        增加远距离跨房寻路成功率，房间出口处对穿bug fix
0.9.4:  优化路径复用避免偶发的复用非最优路径的情况，删除运行时参数中neutralCostMatrixClearDelay，
        自动根据挡路建筑情况设置中立房间costMatrix过期时间，增加ob寻路（检查房间是否可走），
        提供deletePathInRoom接口（使用方式见下方ps），print()中增加平均每次查找缓存时检查的路径数量统计，
        findRoute遇到过道新手墙时bugfix，偏移路径bugfix
0.9.5： TODO：ignoreSwamp避开路，提供deletePathFromRoom、deletePathToRoom接口，增加自动visual，betterMove


ps:
1.默认ignoreCreeps为true，主动设置ignoreCreeps为false会在撞到creep时重新寻路
2.对于不想被对穿的creep（比如没有脚的中央搬运工）, 设置memory：
creep.memory.dontPullMe = true;
3.修路后希望手动更新房间内路径，可执行如下代码：
require('超级移动优化').deletePathInRoom(roomName);
4.战斗中遇到敌方pc不断产生新rampart挡路的情况，目前是撞上建筑物才重新寻路（原版moveTo撞上也继续撞），如果觉得需要手动提前激活重新寻路则联系我讨论
5.在控制台输入require('超级移动优化').print()获取性能信息，鼓励发给作者用于优化
*/
// 运行时参数 
let pathClearDelay = 5000;  // 清理相应时间内都未被再次使用的路径，同时清理死亡creep的缓存，设为undefined表示不清除缓存
let hostileCostMatrixClearDelay = 500; // 自动清理相应时间前创建的其他玩家房间的costMatrix
let coreLayoutRange = 3; // 核心布局半径，在离storage这个范围内频繁检查对穿（减少堵路的等待
// let avoidRooms = ['E18S8', 'E19S9', 'E21S9', 'E24S8', 'E35N6', 'E25S9',
//     'E19N2', 'E18N3', 'E29N5', 'E29N3', 'E28N8', 'E33N9', 'E34N8',
//     'E37N6', 'E41N8', 'E39N11', 'E39N12', 'E39N13', 'E17S9']      // 永不踏入这些房间
let avoidRooms = ['W46S14', 'W45S13', 'W46S11', 'W47S9', 'W46S9', 'W45S9', 'W44S9'];      // 永不踏入这些房间
/** @type {{id:string, roomName:string, taskQueue:{path:MyPath, idx:number, roomName:string}[]}[]} */
// let observers = ['5e3646219c6dc78024fd7097', '5e55e9b8673548d9468a2d3d', '5e36372d00fab883d281d95e'];  // 如果想用ob寻路，把ob的id放这里
let observers = ['617ab31dd8dc485dfd4310d7'];  // 如果想用ob寻路，把ob的id放这里
/***************************************
 *  局部缓存
 */
/** @type {{ [time: number]:{path:MyPath, idx:number, roomName:string}[] }} */
let obTimer = {};   // 【未启用】用于登记ob调用，在相应的tick查看房间对象
let obTick = Game.time;
/** @type {Paths} */
let globalPathCache = {};     // 缓存path
/** @type {MoveTimer} */
let pathCacheTimer = {}; // 用于记录path被使用的时间，清理长期未被使用的path
/** @type {CreepPaths} */
let creepPathCache = {};    // 缓存每个creep使用path的情况
let creepMoveCache = {};    // 缓存每个creep最后一次移动的tick
let emptyCostMatrix = new PathFinder.CostMatrix;
/** @type {CMs} */
let costMatrixCache = {};    // true存ignoreDestructibleStructures==true的，false同理
/** @type {{ [time: number]:{roomName:string, avoids:string[]}[] }} */
let costMatrixCacheTimer = {}; // 用于记录costMatrix的创建时间，清理过期costMatrix
let autoClearTick = Game.time;  // 用于避免重复清理缓存

const obstacles = new Set(OBSTACLE_OBJECT_TYPES);
const originMove = Creep.prototype.move;
Creep.prototype.moveTo;
RoomPosition.prototype.findClosestByPath;

// 统计变量
let startTime;
let endTime;
let startCacheSearch;
let analyzeCPU = { // 统计相关函数总耗时
    move: { sum: 0, calls: 0 },
    moveTo: { sum: 0, calls: 0 },
    findClosestByPath: { sum: 0, calls: 0 }
};
let cacheHitCost = 0;
let cacheMissCost = 0;

/***************************************
 *  util functions
 */
let reg1 = /^([WE])([0-9]+)([NS])([0-9]+)$/;    // parse得到['E28N7','E','28','N','7']
/**
 *  统一到大地图坐标，平均单次开销0.00005
 * @param {RoomPosition} pos 
 */
function formalize(pos) {
    let splited = reg1.exec(pos.roomName);
    if (splited && splited.length == 5) {
        return { // 如果这里出现类型错误，那么意味着房间名字不是正确格式但通过了parse，小概率事件
            x: (splited[1] === 'W' ? -splited[2] : +splited[2] + 1) * 50 + pos.x,
            y: (splited[3] === 'N' ? -splited[4] : +splited[4] + 1) * 50 + pos.y
        }
    } // else 房间名字不是正确格式
    return {}
}

/**
 *  阉割版isEqualTo，提速
 * @param {RoomPosition} pos1 
 * @param {RoomPosition} pos2 
 */
function isEqual(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y && pos1.roomName == pos2.roomName;
}

/**
 *  兼容房间边界
 *  参数具有x和y属性就行
 * @param {RoomPosition} pos1 
 * @param {RoomPosition} pos2 
 */
function isNear(pos1, pos2) {
    if (pos1.roomName == pos2.roomName) {    // undefined == undefined 也成立
        return -1 <= pos1.x - pos2.x && pos1.x - pos2.x <= 1 && -1 <= pos1.y - pos2.y && pos1.y - pos2.y <= 1;
    } else if (pos1.roomName && pos2.roomName) {    // 是完整的RoomPosition
        if (pos1.x + pos2.x != 49 && pos1.y + pos2.y != 49) return false;    // 肯定不是两个边界点, 0.00003 cpu
        // start
        let splited1 = reg1.exec(pos1.roomName);
        let splited2 = reg1.exec(pos2.roomName);
        if (splited1 && splited1.length == 5 && splited2 && splited2.length == 5) {
            // 统一到大地图坐标
            let formalizedEW = (splited1[1] === 'W' ? -splited1[2] : +splited1[2] + 1) * 50 + pos1.x - (splited2[1] === 'W' ? -splited2[2] : +splited2[2] + 1) * 50 - pos2.x;
            let formalizedNS = (splited1[3] === 'N' ? -splited1[4] : +splited1[4] + 1) * 50 + pos1.y - (splited2[3] === 'N' ? -splited2[4] : +splited2[4] + 1) * 50 - pos2.y;
            return -1 <= formalizedEW && formalizedEW <= 1 && -1 <= formalizedNS && formalizedNS <= 1;
        }
        // end - start = 0.00077 cpu
    }
    return false
}

/** 
* @param {RoomPosition} pos1 
* @param {RoomPosition} pos2 
*/
function inRange(pos1, pos2, range) {
    if (pos1.roomName == pos2.roomName) {
        return -range <= pos1.x - pos2.x && pos1.x - pos2.x <= range && -range <= pos1.y - pos2.y && pos1.y - pos2.y <= range;
    } else {
        pos1 = formalize(pos1);
        pos2 = formalize(pos2);
        return pos1.x && pos2.x && inRange(pos1, pos2);
    }
}

/**
 *  fromPos和toPos是pathFinder寻出的路径上的，只可能是同房相邻点或者跨房边界点
 * @param {RoomPosition} fromPos 
 * @param {RoomPosition} toPos 
 */
function getDirection(fromPos, toPos) {
    if (fromPos.roomName == toPos.roomName) {
        if (toPos.x > fromPos.x) {    // 下一步在右边
            if (toPos.y > fromPos.y) {    // 下一步在下面
                return BOTTOM_RIGHT;
            } else if (toPos.y == fromPos.y) { // 下一步在正右
                return RIGHT;
            }
            return TOP_RIGHT;   // 下一步在上面
        } else if (toPos.x == fromPos.x) { // 横向相等
            if (toPos.y > fromPos.y) {    // 下一步在下面
                return BOTTOM;
            } else if (toPos.y < fromPos.y) {
                return TOP;
            }
        } else {  // 下一步在左边
            if (toPos.y > fromPos.y) {    // 下一步在下面
                return BOTTOM_LEFT;
            } else if (toPos.y == fromPos.y) {
                return LEFT;
            }
            return TOP_LEFT;
        }
    } else {  // 房间边界点
        if (fromPos.x == 0 || fromPos.x == 49) {  // 左右相邻的房间，只需上下移动（左右边界会自动弹过去）
            if (toPos.y > fromPos.y) {   // 下一步在下面
                return BOTTOM;
            } else if (toPos.y < fromPos.y) { // 下一步在上
                return TOP
            } // else 正左正右
            return fromPos.x ? RIGHT : LEFT;
        } else if (fromPos.y == 0 || fromPos.y == 49) {    // 上下相邻的房间，只需左右移动（上下边界会自动弹过去）
            if (toPos.x > fromPos.x) {    // 下一步在右边
                return RIGHT;
            } else if (toPos.x < fromPos.x) {
                return LEFT;
            }// else 正上正下
            return fromPos.y ? BOTTOM : TOP;
        }
    }
}
let isHighWay = (roomName) => {
        // E0 || E10 || E1S0 || [E10S0|E1S10] || [E10S10] 比正则再除快
        return roomName[1] == 0 || roomName[2] == 0 || roomName[3] == 0 || roomName[4] == 0 || roomName[5] == 0;
    };

/**
 *  缓存的路径和当前moveTo参数相同
 * @param {MyPath} path 
 * @param {*} ops 
 */
function isSameOps(path, ops) {
    return path.ignoreRoads == !!ops.ignoreRoads &&
        path.ignoreSwamps == !!ops.ignoreSwamps &&
        path.ignoreStructures == !!ops.ignoreDestructibleStructures;
}

function hasActiveBodypart(body, type) {
    if (!body) {
        return true;
    }

    for (var i = body.length - 1; i >= 0; i--) {
        if (body[i].hits <= 0)
            break;
        if (body[i].type === type)
            return true;
    }

    return false;

}

function isClosedRampart(structure) {
    return structure.structureType == STRUCTURE_RAMPART && !structure.my && !structure.isPublic;
}

/**
 *  查看是否有挡路建筑
 * @param {Room} room
 * @param {RoomPosition} pos 
 * @param {boolean} ignoreStructures
 */
function isObstacleStructure(room, pos, ignoreStructures) {
    let consSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos);
    if (0 in consSite && consSite[0].my && obstacles.has(consSite[0].structureType)) {  // 工地会挡路
        return true;
    }
    for (let s of room.lookForAt(LOOK_STRUCTURES, pos)) {
        if (!s.hits || s.ticksToDeploy) {     // 是新手墙或者无敌中的invaderCore
            return true;
        } else if (!ignoreStructures && (obstacles.has(s.structureType) || isClosedRampart(s))) {
            return true
        }
    }
    return false;
    // let possibleStructures = room.lookForAt(LOOK_STRUCTURES, pos);  // room.lookForAt比pos.lookFor快
    // 万一有人把路修在extension上，导致需要每个建筑都判断，最多重叠3个建筑（rap+road+其他）
    // return obstacles.has(possibleStructures[0]) || obstacles.has(possibleStructures[1]) || obstacles.has(possibleStructures[2]);    // 条件判断平均每次0.00013cpu
}

/**
 *  登记ob需求
 * @param {MyPath} path 
 * @param {number} idx 
 */
function addObTask(path, idx) {
    let roomName = path.posArray[idx].roomName;
    //console.log('准备ob ' + roomName);
    for (let obData of observers) {
        if (Game.map.getRoomLinearDistance(obData.roomName, roomName) <= 10) {
            obData.taskQueue.push({ path: path, idx: idx, roomName: roomName });
            break;
        }
    }
}

/**
 *  尝试用ob检查路径
 */
function doObTask() {
    for (let obData of observers) { // 遍历所有ob
        let queue = obData.taskQueue;
        while (queue.length) {  // 没有task就pass
            let task = queue[queue.length - 1];
            let roomName = task.roomName;
            if (roomName in costMatrixCache) {  // 有过视野不用再ob
                if (!task.path.directionArray[task.idx]) {
                    //console.log(roomName + ' 有视野了无需ob');
                    checkRoom({ name: roomName }, task.path, task.idx - 1);
                }
                queue.pop();
                continue;
            }
            /** @type {StructureObserver} */
            let ob = Game.getObjectById(obData.id);
            if (ob) {
                //console.log('ob ' + roomName);
                ob.observeRoom(roomName);
                if (!(Game.time + 1 in obTimer)) {
                    obTimer[Game.time + 1] = [];
                }
                obTimer[Game.time + 1].push({ path: task.path, idx: task.idx, roomName: roomName });    // idx位置无direction
            } else {
                observers.splice(observers.indexOf(obData), 1);
            }
            break;
        }
    }
}

/**
 *  查看ob得到的房间
 */
function checkObResult() {
    for (let tick in obTimer) {
        if (tick < Game.time) {
            delete obTimer[tick];
            continue;   // 后面可能还有要检查的
        } else if (tick == Game.time) {
            for (let result of obTimer[tick]) {
                if (result.roomName in Game.rooms) {
                    //console.log('ob得到 ' + result.roomName);
                    checkRoom(Game.rooms[result.roomName], result.path, result.idx - 1);    // checkRoom要传有direction的idx
                }
            }
            delete obTimer[tick];
        } // else 没有要检查的
        break;  // 检查完了或者没有要检查的
    }
}

/**
 *  为房间保存costMatrix，ignoreDestructibleStructures这个参数的两种情况各需要一个costMatrix
 *  设置costMatrix缓存的过期时间
 * @param {Room} room 
 * @param {RoomPosition} pos
 */
function generateCostMatrix(room, pos) {
    let noStructureCostMat = new PathFinder.CostMatrix; // 不考虑可破坏的建筑，但是要考虑墙上资源点和无敌的3种建筑，可能还有其他不能走的？
    let structureCostMat = new PathFinder.CostMatrix;   // 在noStructrue的基础上加上所有不可行走的建筑
    let totalStructures = room.find(FIND_STRUCTURES);
    let 修路也没用的墙点 = [].concat(room.find(FIND_SOURCES), room.find(FIND_MINERALS), room.find(FIND_DEPOSITS));
    let x, y, noviceWall, deployingCore, centralPortal;
    let clearDelay = Infinity;
    for (let object of 修路也没用的墙点) {
        x = object.pos.x; y = object.pos.y;
        noStructureCostMat.set(x, y, 255);
    }
    if (room.controller && (room.controller.my || room.controller.safeMode)) {  // 自己的工地不能踩
        for (let consSite of room.find(FIND_CONSTRUCTION_SITES)) {
            if (obstacles.has(consSite.structureType)) {
                x = consSite.pos.x; y = consSite.pos.y;
                noStructureCostMat.set(x, y, 255);
                structureCostMat.set(x, y, 255);
            }
        }
    }
    for (let s of totalStructures) {
        if (s.structureType == STRUCTURE_INVADER_CORE) {  // 第1种可能无敌的建筑
            if (s.ticksToDeploy) {
                deployingCore = true;
                clearDelay = clearDelay > s.ticksToDeploy ? s.ticksToDeploy : clearDelay;
                noStructureCostMat.set(s.pos.x, s.pos.y, 255);
            }
            structureCostMat.set(s.pos.x, s.pos.y, 255);
        } else if (s.structureType == STRUCTURE_PORTAL) {  // 第2种无敌建筑
            if (!isHighWay(room.name)) {
                centralPortal = true;
                clearDelay = clearDelay > s.ticksToDecay ? s.ticksToDecay : clearDelay;
            }
            x = s.pos.x; y = s.pos.y;
            structureCostMat.set(x, y, 255);
            noStructureCostMat.set(x, y, 255);
        } else if (s.structureType == STRUCTURE_WALL) {    // 第3种可能无敌的建筑
            if (!s.hits) {
                noviceWall = true;
                noStructureCostMat.set(s.pos.x, s.pos.y, 255);
            }
            structureCostMat.set(s.pos.x, s.pos.y, 255);
        } else if (s.structureType == STRUCTURE_ROAD) {    // 路的移动力损耗是1，此处设置能寻到墙上的路
            x = s.pos.x; y = s.pos.y;
            if (noStructureCostMat.get(x, y) == 0) {  // 不是在3种无敌建筑或墙中资源上
                noStructureCostMat.set(x, y, 1);
                if (structureCostMat.get(x, y) == 0) {     // 不是在不可行走的建筑上
                    structureCostMat.set(x, y, 1);
                }
            }
        } else if (obstacles.has(s.structureType) || isClosedRampart(s)) {   // HELP：有没有遗漏其他应该设置 noStructureCostMat 的点
            structureCostMat.set(s.pos.x, s.pos.y, 255);
        }
    }

    costMatrixCache[room.name] = {
        roomName: room.name,
        true: noStructureCostMat,   // 对应 ignoreDestructibleStructures = true
        false: structureCostMat     // 对应 ignoreDestructibleStructures = false
    };

    let avoids = [];
    if (room.controller && room.controller.owner && !room.controller.my && hostileCostMatrixClearDelay) {  // 他人房间，删除costMat才能更新被拆的建筑位置
        if (!(Game.time + hostileCostMatrixClearDelay in costMatrixCacheTimer)) {
            costMatrixCacheTimer[Game.time + hostileCostMatrixClearDelay] = [];
        }
        costMatrixCacheTimer[Game.time + hostileCostMatrixClearDelay].push({
            roomName: room.name,
            avoids: avoids
        });   // 记录清理时间
    } else if (noviceWall || deployingCore || centralPortal) { // 如果遇到可能消失的挡路建筑，这3种情况下clearDelay才可能被赋值为非Infinity
        if (noviceWall) {    // 如果看见新手墙
            let neighbors = Game.map.describeExits(room.name);
            for (let direction in neighbors) {
                let status = Game.map.getRoomStatus(neighbors[direction]);
                if (status.status == 'closed') {
                    avoidRooms[neighbors[direction]] = 1;
                } else if (status.status != 'normal' && status.timestamp != null) {
                    let estimateTickToChange = (status.timestamp - new Date().getTime()) / 10000; // 10s per tick
                    clearDelay = clearDelay > estimateTickToChange ? Math.ceil(estimateTickToChange) : clearDelay;
                }
            }
            if (pos) {  // 如果知道自己的pos
                for (let direction in neighbors) {
                    if (!(neighbors[direction] in avoidRooms)) {
                        let exits = room.find(+direction);
                        if (PathFinder.search(pos, exits, { maxRooms: 1, roomCallback: () => noStructureCostMat }).incomplete) {    // 此路不通
                            avoidRooms[neighbors[direction]] = 1;
                            avoids.push(neighbors[direction]);
                        }
                    }
                }
            }
        }
        //console.log(room.name + ' costMat 设置清理 ' + clearDelay);
        if (!(Game.time + clearDelay in costMatrixCacheTimer)) {
            costMatrixCacheTimer[Game.time + clearDelay] = [];
        }
        costMatrixCacheTimer[Game.time + clearDelay].push({
            roomName: room.name,
            avoids: avoids  // 因新手墙导致的avoidRooms需要更新
        });   // 记录清理时间
    }
    //console.log('生成costMat ' + room.name);

}

/**
 *  把路径上有视野的位置的正向移动方向拿到，只有在找新路时调用，找新路时会把有视野房间都缓存进costMatrixCache
 * @param {MyPath} path 
 */
function generateDirectionArray(path) {
    let posArray = path.posArray;
    let directionArray = new Array(posArray.length);
    let incomplete = false;
    for (let idx = 1; idx in posArray; idx++) {
        if (posArray[idx - 1].roomName in costMatrixCache) {    // 有costMat，是准确路径，否则需要在有视野时checkRoom()
            directionArray[idx] = getDirection(posArray[idx - 1], posArray[idx]);
        } else if (!incomplete) {   // 记录第一个缺失准确路径的位置
            incomplete = idx;
        }
    }
    if (observers.length && incomplete) {
        addObTask(path, incomplete); // 这格没有direction
    }
    path.directionArray = directionArray;
}

/**
 *  第一次拿到该room视野，startIdx是新房中唯一有direction的位置
 * @param {Room} room 
 * @param {MyPath} path 
 * @param {number} startIdx 
 */
function checkRoom(room, path, startIdx) {
    if (!(room.name in costMatrixCache)) {
        generateCostMatrix(room, path.posArray[startIdx]);
    }
    let thisRoomName = room.name;
    /** @type {CostMatrix} */
    let costMat = costMatrixCache[thisRoomName][path.ignoreStructures];
    let posArray = path.posArray;
    let directionArray = path.directionArray;
    let i;
    for (i = startIdx; i + 1 in posArray && posArray[i].roomName == thisRoomName; i++) {
        if (costMat.get(posArray[i].x, posArray[i].y) == 255) {   // 路上有东西挡路
            return false;
        }
        directionArray[i + 1] = getDirection(posArray[i], posArray[i + 1]);
    }
    if (observers.length && i + 1 in posArray) {
        while (i + 1 in posArray) {
            if (!directionArray[i + 1]) {
                addObTask(path, i + 1);     // 这格没有direction
                break;
            }
            i += 1;
        }
    }
    return true;
}

/**
 *  尝试对穿，有2种不可穿情况
 * @param {Creep} creep 
 * @param {RoomPosition} pos  
 * @param {boolean} bypassHostileCreeps
 */
function trySwap(creep, pos, bypassHostileCreeps, ignoreCreeps) {     // ERR_NOT_FOUND开销0.00063，否则开销0.0066
    let obstacleCreeps = creep.room.lookForAt(LOOK_CREEPS, pos).concat(creep.room.lookForAt(LOOK_POWER_CREEPS, pos));
    if (obstacleCreeps.length) {
        if (!ignoreCreeps) {
            return ERR_INVALID_TARGET;
        }
        for (let c of obstacleCreeps) {
            if (c.my) {
                if (c.memory.dontPullMe) {    // 第1种不可穿情况：挡路的creep设置了不对穿
                    return ERR_INVALID_TARGET;
                }
                if (creepMoveCache[c.name] != Game.time && originMove.call(c, getDirection(pos, creep.pos)) == ERR_NO_BODYPART && creep.pull) {
                    creep.pull(c);
                    originMove.call(c, creep);
                }
            } else if (bypassHostileCreeps && (!c.room.controller || !c.room.controller.my || !c.room.controller.safeMode)) {  // 第二种不可穿情况：希望绕过敌对creep
                return ERR_INVALID_TARGET;
            }
        }
        return OK;    // 或者全部操作成功
    }
    return ERR_NOT_FOUND // 没有creep
}

let temporalAvoidFrom, temporalAvoidTo;
function routeCallback(nextRoomName, fromRoomName) {    // 避开avoidRooms设置了的
    if (nextRoomName in avoidRooms) {
        //console.log('Infinity at ' + nextRoomName);
        return Infinity;
    }
    return isHighWay(nextRoomName) ? 1 : 1.15;
}
function bypassRouteCallback(nextRoomName, fromRoomName) {
    if (fromRoomName == temporalAvoidFrom && nextRoomName == temporalAvoidTo) {
        //console.log(`Infinity from ${fromRoomName} to ${nextRoomName}`);
        return Infinity;
    }
    return routeCallback(nextRoomName);
}
/**
 *  遇到跨房寻路，先以房间为单位寻route，再寻精细的path
 * @param {string} fromRoomName 
 * @param {string} toRoomName 
 * @param {boolean} bypass
 */
function findRoute(fromRoomName, toRoomName, bypass) {  // TODO 以后跨shard寻路也放在这个函数里
    //console.log('findRoute', fromRoomName, toRoomName, bypass);
    return Game.map.findRoute(fromRoomName, toRoomName, { routeCallback: bypass ? bypassRouteCallback : routeCallback });
}

/**
 * @param {RoomPosition} pos
 * @param {Room} room 
 * @param {CostMatrix} costMat 
 */
function checkTemporalAvoidExit(pos, room, costMat) {    // 用于记录因creep堵路导致的房间出口临时封闭
    let neighbors = Game.map.describeExits(room.name);
    temporalAvoidFrom = temporalAvoidTo = '';   // 清空旧数据
    for (let direction in neighbors) {
        if (!(neighbors[direction] in avoidRooms)) {
            for (let direction in neighbors) {
                let exits = room.find(+direction);
                if (PathFinder.search(pos, exits, {
                    maxRooms: 1,
                    roomCallback: () => costMat
                }).incomplete) {    // 此路不通
                    temporalAvoidFrom = room.name;
                    temporalAvoidTo = neighbors[direction];
                }
            }
        }
    }
}
function routeReduce(temp, item) {
    temp[item.room] = 1;
    return temp;
}
function bypassHostile(creep) {
    return !creep.my || creep.memory.dontPullMe;
}
function bypassMy(creep) {
    return creep.my && creep.memory.dontPullMe;
}
let bypassRoomName, bypassCostMat, bypassIgnoreCondition, userCostCallback, costMat, route;
function bypassRoomCallback(roomName) {
    if (roomName in avoidRooms) {
        return false;
    }
    if (roomName == bypassRoomName) {     // 在findTemporalRoute函数里刚刚建立了costMatrix
        costMat = bypassCostMat;
    } else {
        costMat = roomName in costMatrixCache ? costMatrixCache[roomName][findPathIgnoreCondition] : emptyCostMatrix;
    }

    if (userCostCallback) {
        let resultCostMat = userCostCallback(roomName, roomName in costMatrixCache ? costMat.clone() : new PathFinder.CostMatrix);
        if (resultCostMat instanceof PathFinder.CostMatrix) {
            costMat = resultCostMat;
        }
    }
    return costMat;
}
function bypassRoomCallbackWithRoute(roomName) {
    if (roomName in route) {
        if (roomName == bypassRoomName) {     // 在findTemporalRoute函数里刚刚建立了costMatrix
            costMat = bypassCostMat;
        } else {
            costMat = roomName in costMatrixCache ? costMatrixCache[roomName][findPathIgnoreCondition] : emptyCostMatrix;
        }

        if (userCostCallback) {
            let resultCostMat = userCostCallback(roomName, roomName in costMatrixCache ? costMat.clone() : new PathFinder.CostMatrix);
            if (resultCostMat instanceof PathFinder.CostMatrix) {
                costMat = resultCostMat;
            }
        }
        return costMat;
    }
    return false;
}
/**
 *  影响参数：bypassHostileCreeps, ignoreRoads, ignoreDestructibleStructures, ignoreSwamps, costCallback, range, bypassRange
 *  及所有PathFinder参数：plainCost, SwampCost, masOps, maxRooms, maxCost, heuristicWeight
 * @param {Creep} creep 
 * @param {RoomPosition} toPos 
 * @param {MoveToOpts} ops 
 */
function findTemporalPath(creep, toPos, ops) {
    let nearbyCreeps;
    if (ops.ignoreCreeps) { // 有ignoreCreep，只绕过无法对穿的creep
        nearbyCreeps = creep.pos.findInRange(FIND_CREEPS, ops.bypassRange, {
            filter: ops.bypassHostileCreeps ? bypassHostile : bypassMy
        }).concat(creep.pos.findInRange(FIND_POWER_CREEPS, ops.bypassRange, {
            filter: ops.bypassHostileCreeps ? bypassHostile : bypassMy
        }));
    } else {    // 绕过所有creep
        nearbyCreeps = creep.pos.findInRange(FIND_CREEPS, ops.bypassRange).concat(
            creep.pos.findInRange(FIND_POWER_CREEPS, ops.bypassRange)
        );
    }
    if (!(creep.room.name in costMatrixCache)) { // 这个房间的costMatrix已经被删了
        generateCostMatrix(creep.room, creep.pos);
    }
    bypassIgnoreCondition = !!ops.ignoreDestructibleStructures;
    /** @type {CostMatrix} */
    bypassCostMat = costMatrixCache[creep.room.name][bypassIgnoreCondition].clone();
    for (let c of nearbyCreeps) {
        bypassCostMat.set(c.pos.x, c.pos.y, 255);
    }
    bypassRoomName = creep.room.name;
    userCostCallback = typeof ops.costCallback == 'function' ? ops.costCallback : undefined;

    /**@type {PathFinderOpts} */
    let PathFinderOpts = {
        maxRooms: ops.maxRooms,
        maxCost: ops.maxCost,
        heuristicWeight: ops.heuristicWeight || 1.2
    };
    if (ops.ignoreSwamps) {   // HELP 这里有没有什么不增加计算量的简短写法
        PathFinderOpts.plainCost = ops.plainCost;
        PathFinderOpts.swampCost = ops.swampCost || 1;
    } else if (ops.ignoreRoads) {
        PathFinderOpts.plainCost = ops.plainCost;
        PathFinderOpts.swampCost = ops.swampCost || 5;
    } else {
        PathFinderOpts.plainCost = ops.plainCost || 2;
        PathFinderOpts.swampCost = ops.swampCost || 10;
    }

    if (creep.pos.roomName != toPos.roomName) { // findRoute会导致非最优path的问题
        checkTemporalAvoidExit(creep.pos, creep.room, bypassCostMat);   // 因为creep挡路导致的无法通行的出口
        route = findRoute(creep.pos.roomName, toPos.roomName, true);
        if (route == ERR_NO_PATH) {
            return false;
        }
        PathFinderOpts.maxRooms = PathFinderOpts.maxRooms || route.length + 1;
        PathFinderOpts.maxOps = ops.maxOps || 2000 + route.length ** 2 * 100;  // 跨10room则有2000+10*10*100=12000
        route = route.reduce(routeReduce, { [creep.pos.roomName]: 1 });     // 因为 key in Object 比 Array.includes(value) 快，但不知道值不值得reduce
        PathFinderOpts.roomCallback = bypassRoomCallbackWithRoute;
    } else {
        PathFinderOpts.maxOps = ops.maxOps;
        PathFinderOpts.roomCallback = bypassRoomCallback;
    }

    let result = PathFinder.search(creep.pos, { pos: toPos, range: ops.range }, PathFinderOpts).path;
    if (result.length) {
        let creepCache = creepPathCache[creep.name];
        creepCache.path = {     // 弄个新的自己走，不修改公用的缓存路，只会用于正向走所以也不需要start属性，idx属性会在startRoute中设置
            end: formalize(result[result.length - 1]),
            posArray: result,
            ignoreStructures: !!ops.ignoreDestructibleStructures
        };
        generateDirectionArray(creepCache.path);
        return true;
    }
    return false;
}

let findPathIgnoreCondition;
/**
 * @param {{[roomName:string]:1}} temp 
 * @param {{room:string}} item 
 * @returns {{[roomName:string]:1}}
 */
function roomCallback(roomName) {
    if (roomName in avoidRooms) {
        return false;
    }

    costMat = roomName in costMatrixCache ? costMatrixCache[roomName][findPathIgnoreCondition] : emptyCostMatrix;
    if (userCostCallback) {
        let resultCostMat = userCostCallback(roomName, roomName in costMatrixCache ? costMat.clone() : new PathFinder.CostMatrix);
        if (resultCostMat instanceof PathFinder.CostMatrix) {
            costMat = resultCostMat;
        }
    }
    return costMat;
}
function roomCallbackWithRoute(roomName) {
    if (roomName in route) {
        costMat = roomName in costMatrixCache ? costMatrixCache[roomName][findPathIgnoreCondition] : emptyCostMatrix;
        //console.log('in route ' + roomName);
        if (userCostCallback) {
            let resultCostMat = userCostCallback(roomName, roomName in costMatrixCache ? costMat.clone() : new PathFinder.CostMatrix);
            if (resultCostMat instanceof PathFinder.CostMatrix) {
                costMat = resultCostMat;
            }
        }
        return costMat;
    }
    //console.log('out route ' + roomName);
    return false;   // 不在route上的不搜索
}
/**
 *  影响参数：ignoreRoads, ignoreDestructibleStructures, ignoreSwamps, costCallback, range
 *  及所有PathFinder参数：plainCost, SwampCost, masOps, maxRooms, maxCost, heuristicWeight
 * @param {RoomPosition} fromPos 
 * @param {RoomPosition} toPos 
 * @param {MoveToOpts} ops 
 */
function findPath(fromPos, toPos, ops) {

    if (!(fromPos.roomName in costMatrixCache) && fromPos.roomName in Game.rooms) {   // 有视野没costMatrix
        generateCostMatrix(Game.rooms[fromPos.roomName], fromPos);
    }

    findPathIgnoreCondition = !!ops.ignoreDestructibleStructures;
    userCostCallback = typeof ops.costCallback == 'function' ? ops.costCallback : undefined;

    /**@type {PathFinderOpts} */
    let PathFinderOpts = {
        maxRooms: ops.maxRooms,
        maxCost: ops.maxCost,
        heuristicWeight: ops.heuristicWeight || 1.2
    };
    if (ops.ignoreSwamps) {   // HELP 这里有没有什么不增加计算量的简短写法
        PathFinderOpts.plainCost = ops.plainCost;
        PathFinderOpts.swampCost = ops.swampCost || 1;
    } else if (ops.ignoreRoads) {
        PathFinderOpts.plainCost = ops.plainCost;
        PathFinderOpts.swampCost = ops.swampCost || 5;
    } else {
        PathFinderOpts.plainCost = ops.plainCost || 2;
        PathFinderOpts.swampCost = ops.swampCost || 10;
    }

    if (fromPos.roomName != toPos.roomName) {   // findRoute会导致非最优path的问题
        route = findRoute(fromPos.roomName, toPos.roomName);
        if (route == ERR_NO_PATH) {
            return { path: [] };
        }
        PathFinderOpts.maxOps = ops.maxOps || 2000 + route.length ** 2 * 100;  // 跨10room则有2000+10*10*50=7000
        PathFinderOpts.maxRooms = PathFinderOpts.maxRooms || route.length + 1;
        route = route.reduce(routeReduce, { [fromPos.roomName]: 1 });   // 因为 key in Object 比 Array.includes(value) 快，但不知道值不值得reduce
        //console.log(fromPos + ' using route ' + JSON.stringify(route));
        PathFinderOpts.roomCallback = roomCallbackWithRoute;
    } else {
        PathFinderOpts.maxOps = ops.maxOps;
        PathFinderOpts.roomCallback = roomCallback;
    }

    return PathFinder.search(fromPos, { pos: toPos, range: ops.range }, PathFinderOpts);
}

let combinedX, combinedY;
/**
 * @param {MyPath} newPath 
 */
function addPathIntoCache(newPath) {
    combinedX = newPath.start.x + newPath.start.y;
    combinedY = newPath.end.x + newPath.end.y;
    if (!(combinedX in globalPathCache)) {
        globalPathCache[combinedX] = {
            [combinedY]: []  // 数组里放不同ops的及其他start、end与此对称的
        };
    } else if (!(combinedY in globalPathCache[combinedX])) {
        globalPathCache[combinedX][combinedY] = [];      // 数组里放不同ops的及其他start、end与此对称的
    }
    globalPathCache[combinedX][combinedY].push(newPath);
}

function invalidate() {
    return 0;
}
/**
 * @param {MyPath} path 
 */
function deletePath(path) {
    if (path.start) {     // 有start属性的不是临时路
        let pathArray = globalPathCache[path.start.x + path.start.y][path.end.x + path.end.y];
        pathArray.splice(pathArray.indexOf(path), 1);
        path.posArray = path.posArray.map(invalidate);
    }
}

let minX, maxX, minY, maxY;
/**
 *  寻找房内缓存路径，起始位置两步限制避免复用非最优路径
 * @param {RoomPosition} formalFromPos 
 * @param {RoomPosition} formalToPos
 * @param {RoomPosition} fromPos
 * @param {CreepPaths} creepCache 
 * @param {MoveToOpts} ops 
 */
function findShortPathInCache(formalFromPos, formalToPos, fromPos, creepCache, ops) {     // ops.range设置越大找的越慢
    startCacheSearch = Game.cpu.getUsed();
    minX = formalFromPos.x + formalFromPos.y - 2;
    maxX = formalFromPos.x + formalFromPos.y + 2;
    minY = formalToPos.x + formalToPos.y - 1 - ops.range;
    maxY = formalToPos.x + formalToPos.y + 1 + ops.range;
    for (combinedX = minX; combinedX <= maxX; combinedX++) {
        if (combinedX in globalPathCache) {
            for (combinedY = minY; combinedY <= maxY; combinedY++) {
                if (combinedY in globalPathCache[combinedX]) {
                    for (let path of globalPathCache[combinedX][combinedY]) {     // 这个数组应该会很短
                        if (isNear(path.start, formalFromPos) && isNear(fromPos, path.posArray[1]) && inRange(path.end, formalToPos, ops.range) && isSameOps(path, ops)) {     // 找到路了
                            creepCache.path = path;
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

/**
 *  寻找跨房缓存路径，允许起始位置少量的误差
 * @param {RoomPosition} formalFromPos
 * @param {RoomPosition} formalToPos
 * @param {CreepPaths} creepCache
 * @param {MoveToOpts} ops
 */
function findLongPathInCache(formalFromPos, formalToPos, creepCache, ops) {     // ops.range设置越大找的越慢
    startCacheSearch = Game.cpu.getUsed();
    minX = formalFromPos.x + formalFromPos.y - 2;
    maxX = formalFromPos.x + formalFromPos.y + 2;
    minY = formalToPos.x + formalToPos.y - 1 - ops.range;
    maxY = formalToPos.x + formalToPos.y + 1 + ops.range;
    for (combinedX = minX; combinedX <= maxX; combinedX++) {
        if (combinedX in globalPathCache) {
            for (combinedY = minY; combinedY <= maxY; combinedY++) {
                if (combinedY in globalPathCache[combinedX]) {
                    for (let path of globalPathCache[combinedX][combinedY]) {     // 这个数组应该会很短
                        if (isNear(path.start, formalFromPos) && inRange(path.end, formalToPos, ops.range) && isSameOps(path, ops)) {     // 找到路了
                            creepCache.path = path;
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

let startRoomName, endRoomName;
/**
 *  起止点都在自己房间的路不清理
 * @param {CreepPaths['name']} creepCache 
 */
function setPathTimer(creepCache) {
    {
        let posArray = creepCache.path.posArray;
        startRoomName = posArray[0].roomName;
        endRoomName = posArray[posArray.length - 1].roomName;
        if (startRoomName != endRoomName || (startRoomName in Game.rooms && Game.rooms[startRoomName].controller && !Game.rooms[startRoomName].controller.my)) {    // 跨房路或者敌方房间路
            if (!(Game.time + pathClearDelay in pathCacheTimer)) {
                pathCacheTimer[Game.time + pathClearDelay] = [];
            }
            pathCacheTimer[Game.time + pathClearDelay].push(creepCache.path);
            creepCache.path.lastTime = Game.time;
        }
    }
}

/**@type {RoomPosition[]} */
let tempArray = [];
/**
 *  
 * @param {Creep} creep 
 * @param {RoomPosition} toPos 
 * @param {RoomPosition[]} posArray 
 * @param {number} startIdx 
 * @param {number} idxStep 
 * @param {PolyStyle} visualStyle 
 */
function showVisual(creep, toPos, posArray, startIdx, idxStep, visualStyle) {
    tempArray.length = 0;
    tempArray.push(creep.pos);
    let thisRoomName = creep.room.name;
    _.defaults(visualStyle, defaultVisualizePathStyle);
    for (let i = startIdx; i in posArray && posArray[i].roomName == thisRoomName; i += idxStep) {
        tempArray.push(posArray[i]);
    }
    if (toPos.roomName == thisRoomName) {
        tempArray.push(toPos);
    }
    creep.room.visual.poly(tempArray, visualStyle);
}

/**
 *  按缓存路径移动
 * @param {Creep} creep 
 * @param {PolyStyle} visualStyle 
 * @param {RoomPosition} toPos 
 */
function moveOneStep(creep, visualStyle, toPos) {
    let creepCache = creepPathCache[creep.name];
    if (visualStyle) {
        showVisual(creep, toPos, creepCache.path.posArray, creepCache.idx, 1, visualStyle);
    }
    if (creep.fatigue) {
        return ERR_TIRED;
    }
    creepCache.idx++;
    creepMoveCache[creep.name] = Game.time;
    Game.cpu.getUsed() - startTime;
    //creep.room.visual.circle(creepCache.path.posArray[creepCache.idx]);
    return originMove.call(creep, creepCache.path.directionArray[creepCache.idx]);
}

/**
 * 
 * @param {Creep} creep 
 * @param {{
        path: MyPath,
        dst: RoomPosition,
        idx: number
    }} pathCache 
 * @param {PolyStyle} visualStyle 
 * @param {RoomPosition} toPos 
 * @param {boolean} ignoreCreeps
 */
function startRoute(creep, pathCache, visualStyle, toPos, ignoreCreeps) {
    let posArray = pathCache.path.posArray;

    let idx = 0;
    while (idx in posArray && isNear(creep.pos, posArray[idx])) {
        idx += 1;
    }
    idx -= 1;
    pathCache.idx = idx;

    if (visualStyle) {
        showVisual(creep, toPos, posArray, idx, 1, visualStyle);
    }
    creepMoveCache[creep.name] = Game.time;

    let nextStep = posArray[idx];
    if (ignoreCreeps) {
        trySwap(creep, nextStep, false, true);
    }
    return originMove.call(creep, getDirection(creep.pos, posArray[idx]));
}

/**
 * @param {Function} fn 
 */
function wrapFn(fn, name) {
    return function () {
        startTime = Game.cpu.getUsed();     // 0.0015cpu
        if (obTick < Game.time) {
            obTick = Game.time;
            checkObResult();
            doObTask();
        }
        let code = fn.apply(this, arguments);
        endTime = Game.cpu.getUsed();
        if (endTime - startTime >= 0.2) {
            analyzeCPU[name].sum += endTime - startTime;
            analyzeCPU[name].calls++;
        }
        return code;
    }
}

function clearUnused() {
    if (Game.time % pathClearDelay == 0) { // 随机清一次已死亡creep
        for (let name in creepPathCache) {
            if (!(name in Game.creeps)) {
                delete creepPathCache[name];
            }
        }
    }
    for (let time in pathCacheTimer) {
        if (time > Game.time) {
            break;
        }
        //console.log('clear path');
        for (let path of pathCacheTimer[time]) {
            if (path.lastTime == time - pathClearDelay) {
                deletePath(path);
            }
        }
        delete pathCacheTimer[time];
    }
    for (let time in costMatrixCacheTimer) {
        if (time > Game.time) {
            break;
        }
        //console.log('clear costMat');
        for (let data of costMatrixCacheTimer[time]) {
            delete costMatrixCache[data.roomName];
            for (let avoidRoomName of data.avoids) {
                delete avoidRooms[avoidRoomName];
            }
        }
        delete costMatrixCacheTimer[time];
    }
}

/***************************************
 *  功能实现
 */

const defaultVisualizePathStyle = { fill: 'transparent', stroke: '#fff', lineStyle: 'dashed', strokeWidth: .15, opacity: .1 };
/**@type {[MoveToOpts, RoomPosition, CreepPaths['1'], MyPath, number, RoomPosition[], boolean]}
*/
let [ops, toPos, creepCache, path, idx, posArray, found] = [];
/**
 *  把moveTo重写一遍
 * @param {Creep} this
 * @param {number | RoomObject} firstArg 
 * @param {number | MoveToOpts} secondArg 
 * @param {MoveToOpts} opts 
 */
function betterMoveTo(firstArg, secondArg, opts) {
    if (!this.my) {
        return ERR_NOT_OWNER;
    }

    if (this.spawning) {
        return ERR_BUSY;
    }

    if (typeof firstArg == 'object') {
        toPos = firstArg.pos || firstArg;
        ops = secondArg || {};
    } else {
        toPos = { x: firstArg, y: secondArg, roomName: this.room.name };
        ops = opts || {};
    }
    ops.bypassHostileCreeps = ops.bypassHostileCreeps === undefined || ops.bypassHostileCreeps;    // 设置默认值为true
    ops.ignoreCreeps = ops.ignoreCreeps === undefined || ops.ignoreCreeps;

    if (typeof toPos.x != "number" || typeof toPos.y != "number") {   // 房名无效或目的坐标不是数字，不合法
        //this.say('no tar');
        return ERR_INVALID_TARGET;
    } else if (inRange(this.pos, toPos, ops.range || 1)) {   // 已到达
        if (isEqual(toPos, this.pos) || ops.range) {  // 已到达
            return OK;
        } // else 走一步
        if (this.pos.roomName == toPos.roomName && ops.ignoreCreeps) {    // 同房间考虑一下对穿
            trySwap(this, toPos, false, true);
        }
        creepMoveCache[this.name] = Game.time;      // 用于防止自己移动后被误对穿
        Game.cpu.getUsed() - startTime;
        return originMove.call(this, getDirection(this.pos, toPos));
    }
    ops.range = ops.range || 1;

    if (!hasActiveBodypart(this.body, MOVE)) {
        return ERR_NO_BODYPART;
    }

    if (this.fatigue) {
        if (!ops.visualizePathStyle) {    // 不用画路又走不动，直接return
            return ERR_TIRED;
        } // else 要画路，画完再return
    }

    // HELP：感兴趣的帮我检查这里的核心逻辑orz
    creepCache = creepPathCache[this.name];
    if (creepCache) {  // 有缓存
        path = creepCache.path;
        idx = creepCache.idx;
        if (path && idx in path.posArray && path.ignoreStructures == !!ops.ignoreDestructibleStructures) {  // 缓存路条件相同
            posArray = path.posArray;
            if (isEqual(toPos, creepCache.dst) || inRange(posArray[posArray.length - 1], toPos, ops.range)) {   // 正向走，目的地没变
                if (isEqual(this.pos, posArray[idx])) {    // 正常
                    if ('storage' in this.room && inRange(this.room.storage.pos, this.pos, coreLayoutRange) && ops.ignoreCreeps) {
                        if (trySwap(this, posArray[idx + 1], false, true) == OK) ;
                    }
                    //this.say('正常');
                    return moveOneStep(this, ops.visualizePathStyle, toPos);
                } else if (idx + 1 in posArray && idx + 2 in posArray && isEqual(this.pos, posArray[idx + 1])) {  // 跨房了
                    creepCache.idx++;
                    if (!path.directionArray[idx + 2]) {  // 第一次见到该房则检查房间
                        if (checkRoom(this.room, path, creepCache.idx)) {   // 传creep所在位置的idx
                            //this.say('新房 可走');
                            //console.log(`${Game.time}: ${this.name} check room ${this.pos.roomName} OK`);
                            return moveOneStep(this, ops.visualizePathStyle, toPos);  // 路径正确，继续走
                        }   // else 检查中发现房间里有建筑挡路，重新寻路
                        //console.log(`${Game.time}: ${this.name} check room ${this.pos.roomName} failed`);
                        deletePath(path);
                    } else {
                        //this.say('这个房间见过了');
                        return moveOneStep(this, ops.visualizePathStyle, toPos);  // 路径正确，继续走
                    }
                } else if (isNear(this.pos, posArray[idx])) {  // 堵路了
                    let code = trySwap(this, posArray[idx], ops.bypassHostileCreeps, ops.ignoreCreeps);  // 检查挡路creep
                    if (code == OK) {
                        let posString = posArray[idx].roomName + '-' + posArray[idx].x + '-' + posArray[idx].y;
                        if (creepCache.jamPos[0] == posString) {
                            creepCache.jamPos[1]++;
                            if (creepCache.jamPos[1] > 3) { // 异常堵路，一律绕行
                                ops.bypassRange = ops.bypassRange || 5; // 默认值
                                ops.ignoreCreeps = false;   // 强制绕路
                                if (typeof ops.bypassRange != "number" || typeof ops.range != 'number') {
                                    return ERR_INVALID_ARGS;
                                }
                                if (findTemporalPath(this, toPos, ops)) { // 有路，creepCache的内容会被这个函数更新
                                    this.say('强制绕路');
                                    return startRoute(this, creepCache, ops.visualizePathStyle, toPos, ops.ignoreCreeps);
                                } else {  // 没路
                                    //this.say('没路啦');
                                    return ERR_NO_PATH;
                                }
                            }
                        } else {
                            creepCache.jamPos = [posString, 1];
                        }
                        // 让这个逻辑掉下去，正常对穿
                    } else if (code == ERR_INVALID_TARGET) {   // 是被设置了不可对穿的creep或者敌对creep挡路，临时绕路
                        ops.bypassRange = ops.bypassRange || 5; // 默认值
                        if (typeof ops.bypassRange != "number" || typeof ops.range != 'number') {
                            return ERR_INVALID_ARGS;
                        }
                        if (findTemporalPath(this, toPos, ops)) { // 有路，creepCache的内容会被这个函数更新
                            //this.say('开始绕路');
                            return startRoute(this, creepCache, ops.visualizePathStyle, toPos, ops.ignoreCreeps);
                        } else {  // 没路
                            //this.say('没路啦');
                            return ERR_NO_PATH;
                        }
                    } else if (code == ERR_NOT_FOUND && isObstacleStructure(this.room, posArray[idx], ops.ignoreDestructibleStructures)) {   // 发现出现新建筑物挡路，删除costMatrix和path缓存，重新寻路
                        //console.log(`${Game.time}: ${this.name} find obstacles at ${this.pos}`);
                        delete costMatrixCache[this.pos.roomName];
                        deletePath(path);
                    } // else 上tick移动失败但也不是建筑物和creep/pc挡路。有2个情况：1.下一格路本来是穿墙路并碰巧消失了；2.下一格是房间出口，有另一个creep抢路了然后它被传送到隔壁了。不处理第1个情况，按第2个情况对待。
                    //this.say('对穿' + getDirection(this.pos, posArray[idx]) + '-' + originMove.call(this, getDirection(this.pos, posArray[idx])));
                    if (ops.visualizePathStyle) {
                        showVisual(this, toPos, posArray, idx, 1, ops.visualizePathStyle);
                    }
                    creepMoveCache[this.name] = Game.time;
                    return originMove.call(this, getDirection(this.pos, posArray[idx]));  // 有可能是第一步就没走上路or通过略过moveTo的move操作偏离路线，直接call可兼容
                } else if (idx - 1 >= 0 && isNear(this.pos, posArray[idx - 1])) {  // 因为堵路而被自动传送反向跨房了
                    //this.say('偏离一格');
                    if (this.pos.roomName == posArray[idx - 1].roomName && ops.ignoreCreeps) {    // 不是跨房而是偏离，检查对穿
                        trySwap(this, posArray[idx - 1], false, true);
                    }
                    if (ops.visualizePathStyle) {
                        showVisual(this, toPos, posArray, idx, 1, ops.visualizePathStyle);
                    }
                    creepMoveCache[this.name] = Game.time;
                    return originMove.call(this, getDirection(this.pos, posArray[idx - 1]));    // 同理兼容略过moveTo的move
                } // else 彻底偏离，重新寻路
            } // else 目的地变了
        } // else 缓存中没路或者条件变了
    } // else 需要重新寻路，先找缓存路，找不到就寻路

    if (!creepCache) {    // 初始化cache
        creepCache = {
            dst: { x: NaN, y: NaN },
            path: undefined,
            idx: 0,
            jamPos: []
        };
        creepPathCache[this.name] = creepCache;
    } else {
        creepCache.path = undefined;
    }

    if (typeof ops.range != 'number') {
        return ERR_INVALID_ARGS
    }

    found = this.pos.roomName == toPos.roomName ? findShortPathInCache(formalize(this.pos), formalize(toPos), this.pos, creepCache, ops) : findLongPathInCache(formalize(this.pos), formalize(toPos), creepCache, ops);
    if (found) ; else {  // 没找到缓存路

        if (autoClearTick < Game.time) {  // 自动清理
            autoClearTick = Game.time;
            clearUnused();
        }

        let result = findPath(this.pos, toPos, ops);
        if (!result.path.length || (result.incomplete && result.path.length == 1)) {     // 一步也动不了了
            //this.say('no path')
            return ERR_NO_PATH;
        }
        result = result.path;
        result.unshift(this.pos);

        //this.say('start new');
        let newPath = {
            start: formalize(result[0]),
            end: formalize(result[result.length - 1]),
            posArray: result,
            ignoreRoads: !!ops.ignoreRoads,
            ignoreStructures: !!ops.ignoreDestructibleStructures,
            ignoreSwamps: !!ops.ignoreSwamps
        };
        generateDirectionArray(newPath);
        addPathIntoCache(newPath);
        //console.log(this, this.pos, 'miss');
        creepCache.path = newPath;
    }

    creepCache.dst = toPos;
    setPathTimer(creepCache);

    found ? cacheHitCost += Game.cpu.getUsed() - startCacheSearch : cacheMissCost += Game.cpu.getUsed() - startCacheSearch;

    return startRoute(this, creepCache, ops.visualizePathStyle, toPos, ops.ignoreCreeps);
}

/***************************************
 *  初始化
 *  Creep.prototype.move()将在v0.9.x版本加入
 *  ob寻路、自动visual将在v0.9.x或v1.0.x版本加入
 *  RoomPosition.prototype.findClosestByPath()将在v1.1加入
 *  Creep.prototype.flee()、RoomPosition.prototype.findSquadPathTo()函数将在v1.1或v1.2加入
 *  checkSquadPath()有小概率会写
 */
avoidRooms = avoidRooms.reduce((temp, roomName) => {
    temp[roomName] = 1;
    return temp;
}, {});

observers = observers.reduce((temp, id) => {
    let ob = Game.getObjectById(id);
    if (ob && ob.observeRoom && ob.my) {
        temp.push({ id, roomName: ob.room.name, taskQueue: [] });
    }
    return temp;
}, []);

// Creep.prototype.move = wrapFn(config.changeMove? betterMove : originMove, 'move');
Creep.prototype.moveTo = wrapFn(betterMoveTo , 'moveTo');

const loop = errorMapper(() => {
    Sokranotes();
    // for(let name in Memory.creeps) {
    //     if(!Game.creeps[name]) {
    //         delete Memory.creeps[name];
    //     }
    //     else{
    //         Game.creeps[name].suicide()
    //     }
    // }
    // for(let name in Memory.rooms) {
    //     delete Memory.rooms[name];
    // }
    // if (Game.flags.test){
    //     // todo
    //     for (let idx in Game.market.incomingTransactions){
    //         if (Game.market.incomingTransactions[idx].order == undefined){
    //             let tmp = Game.market.incomingTransactions[idx]
    //             console.log(tmp.time, tmp.sender.username, tmp.resourceType, tmp.amount, tmp.from, tmp.to, tmp.description)
    //         }
    //     }
    //     Game.flags.test.remove()
    // }
});

exports.loop = loop;
//# sourceMappingURL=main.js.map
