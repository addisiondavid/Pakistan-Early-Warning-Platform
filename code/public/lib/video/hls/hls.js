typeof window !== "undefined" &&
(function webpackUniversalModuleDefinition(root, factory) {
               if(typeof exports === 'object' && typeof module === 'object')
                              module.exports = factory();
               else if(typeof define === 'function' && define.amd)
                              define([], factory);
               else if(typeof exports === 'object')
                              exports["Hls"] = factory();
               else
                              root["Hls"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/                // The module cache
/******/                var installedModules = {};
/******/
/******/                // The require function
/******/                function __webpack_require__(moduleId) {
/******/
/******/                               // Check if module is in cache
/******/                               if(installedModules[moduleId]) {
/******/                                              return installedModules[moduleId].exports;
/******/                               }
/******/                               // Create a new module (and put it into the cache)
/******/                               var module = installedModules[moduleId] = {
/******/                                              i: moduleId,
/******/                                              l: false,
/******/                                              exports: {}
/******/                               };
/******/
/******/                               // Execute the module function
/******/                               modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/                               // Flag the module as loaded
/******/                               module.l = true;
/******/
/******/                               // Return the exports of the module
/******/                               return module.exports;
/******/                }
/******/
/******/
/******/                // expose the modules object (__webpack_modules__)
/******/                __webpack_require__.m = modules;
/******/
/******/                // expose the module cache
/******/                __webpack_require__.c = installedModules;
/******/
/******/                // define getter function for harmony exports
/******/                __webpack_require__.d = function(exports, name, getter) {
/******/                               if(!__webpack_require__.o(exports, name)) {
/******/                                              Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/                               }
/******/                };
/******/
/******/                // define __esModule on exports
/******/                __webpack_require__.r = function(exports) {
/******/                               if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/                                              Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/                               }
/******/                               Object.defineProperty(exports, '__esModule', { value: true });
/******/                };
/******/
/******/                // create a fake namespace object
/******/                // mode & 1: value is a module id, require it
/******/                // mode & 2: merge all properties of value into the ns
/******/                // mode & 4: return value when already ns object
/******/                // mode & 8|1: behave like require
/******/                __webpack_require__.t = function(value, mode) {
/******/                               if(mode & 1) value = __webpack_require__(value);
/******/                               if(mode & 8) return value;
/******/                               if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/                               var ns = Object.create(null);
/******/                               __webpack_require__.r(ns);
/******/                               Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/                               if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/                               return ns;
/******/                };
/******/
/******/                // getDefaultExport function for compatibility with non-harmony modules
/******/                __webpack_require__.n = function(module) {
/******/                               var getter = module && module.__esModule ?
/******/                                              function getDefault() { return module['default']; } :
/******/                                              function getModuleExports() { return module; };
/******/                               __webpack_require__.d(getter, 'a', getter);
/******/                               return getter;
/******/                };
/******/
/******/                // Object.prototype.hasOwnProperty.call
/******/                __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/                // __webpack_public_path__
/******/                __webpack_require__.p = "/dist/";
/******/
/******/
/******/                // Load entry module and return exports
/******/                return __webpack_require__(__webpack_require__.s = "./src/hls.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/url-toolkit/src/url-toolkit.js":
/*!*****************************************************!*\
  !*** ./node_modules/url-toolkit/src/url-toolkit.js ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// see https://tools.ietf.org/html/rfc1808

(function (root) {
  var URL_REGEX = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#.*)?$/;
  var FIRST_SEGMENT_REGEX = /^([^\/?#]*)(.*)$/;
  var SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g;
  var SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g;

  var URLToolkit = {
    // If opts.alwaysNormalize is true then the path will always be normalized even when it starts with / or //
    // E.g
    // With opts.alwaysNormalize = false (default, spec compliant)
    // http://a.com/b/cd + /e/f/../g => http://a.com/e/f/../g
    // With opts.alwaysNormalize = true (not spec compliant)
    // http://a.com/b/cd + /e/f/../g => http://a.com/e/g
    buildAbsoluteURL: function (baseURL, relativeURL, opts) {
      opts = opts || {};
      // remove any remaining space and CRLF
      baseURL = baseURL.trim();
      relativeURL = relativeURL.trim();
      if (!relativeURL) {
        // 2a) If the embedded URL is entirely empty, it inherits the
        // entire base URL (i.e., is set equal to the base URL)
        // and we are done.
        if (!opts.alwaysNormalize) {
          return baseURL;
        }
        var basePartsForNormalise = URLToolkit.parseURL(baseURL);
        if (!basePartsForNormalise) {
          throw new Error('Error trying to parse base URL.');
        }
        basePartsForNormalise.path = URLToolkit.normalizePath(
          basePartsForNormalise.path
        );
        return URLToolkit.buildURLFromParts(basePartsForNormalise);
      }
      var relativeParts = URLToolkit.parseURL(relativeURL);
      if (!relativeParts) {
        throw new Error('Error trying to parse relative URL.');
      }
      if (relativeParts.scheme) {
        // 2b) If the embedded URL starts with a scheme name, it is
        // interpreted as an absolute URL and we are done.
        if (!opts.alwaysNormalize) {
          return relativeURL;
        }
        relativeParts.path = URLToolkit.normalizePath(relativeParts.path);
        return URLToolkit.buildURLFromParts(relativeParts);
      }
      var baseParts = URLToolkit.parseURL(baseURL);
      if (!baseParts) {
        throw new Error('Error trying to parse base URL.');
      }
      if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== '/') {
        // If netLoc missing and path doesn't start with '/', assume everthing before the first '/' is the netLoc
        // This causes 'example.com/a' to be handled as '//example.com/a' instead of '/example.com/a'
        var pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path);
        baseParts.netLoc = pathParts[1];
        baseParts.path = pathParts[2];
      }
      if (baseParts.netLoc && !baseParts.path) {
        baseParts.path = '/';
      }
      var builtParts = {
        // 2c) Otherwise, the embedded URL inherits the scheme of
        // the base URL.
        scheme: baseParts.scheme,
        netLoc: relativeParts.netLoc,
        path: null,
        params: relativeParts.params,
        query: relativeParts.query,
        fragment: relativeParts.fragment,
      };
      if (!relativeParts.netLoc) {
        // 3) If the embedded URL's <net_loc> is non-empty, we skip to
        // Step 7.  Otherwise, the embedded URL inherits the <net_loc>
        // (if any) of the base URL.
        builtParts.netLoc = baseParts.netLoc;
        // 4) If the embedded URL path is preceded by a slash "/", the
        // path is not relative and we skip to Step 7.
        if (relativeParts.path[0] !== '/') {
          if (!relativeParts.path) {
            // 5) If the embedded URL path is empty (and not preceded by a
            // slash), then the embedded URL inherits the base URL path
            builtParts.path = baseParts.path;
            // 5a) if the embedded URL's <params> is non-empty, we skip to
            // step 7; otherwise, it inherits the <params> of the base
            // URL (if any) and
            if (!relativeParts.params) {
              builtParts.params = baseParts.params;
              // 5b) if the embedded URL's <query> is non-empty, we skip to
              // step 7; otherwise, it inherits the <query> of the base
              // URL (if any) and we skip to step 7.
              if (!relativeParts.query) {
                builtParts.query = baseParts.query;
              }
            }
          } else {
            // 6) The last segment of the base URL's path (anything
            // following the rightmost slash "/", or the entire path if no
            // slash is present) is removed and the embedded URL's path is
            // appended in its place.
            var baseURLPath = baseParts.path;
            var newPath =
              baseURLPath.substring(0, baseURLPath.lastIndexOf('/') + 1) +
              relativeParts.path;
            builtParts.path = URLToolkit.normalizePath(newPath);
          }
        }
      }
      if (builtParts.path === null) {
        builtParts.path = opts.alwaysNormalize
          ? URLToolkit.normalizePath(relativeParts.path)
          : relativeParts.path;
      }
      return URLToolkit.buildURLFromParts(builtParts);
    },
    parseURL: function (url) {
      var parts = URL_REGEX.exec(url);
      if (!parts) {
        return null;
      }
      return {
        scheme: parts[1] || '',
        netLoc: parts[2] || '',
        path: parts[3] || '',
        params: parts[4] || '',
        query: parts[5] || '',
        fragment: parts[6] || '',
      };
    },
    normalizePath: function (path) {
      // The following operations are
      // then applied, in order, to the new path:
      // 6a) All occurrences of "./", where "." is a complete path
      // segment, are removed.
      // 6b) If the path ends with "." as a complete path segment,
      // that "." is removed.
      path = path.split('').reverse().join('').replace(SLASH_DOT_REGEX, '');
      // 6c) All occurrences of "<segment>/../", where <segment> is a
      // complete path segment not equal to "..", are removed.
      // Removal of these path segments is performed iteratively,
      // removing the leftmost matching pattern on each iteration,
      // until no matching pattern remains.
      // 6d) If the path ends with "<segment>/..", where <segment> is a
      // complete path segment not equal to "..", that
      // "<segment>/.." is removed.
      while (
        path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, '')).length
      ) {}
      return path.split('').reverse().join('');
    },
    buildURLFromParts: function (parts) {
      return (
        parts.scheme +
        parts.netLoc +
        parts.path +
        parts.params +
        parts.query +
        parts.fragment
      );
    },
  };

  if (true)
    module.exports = URLToolkit;
  else {}
})(this);


/***/ }),

/***/ "./node_modules/webworkify-webpack/index.js":
/*!**************************************************!*\
  !*** ./node_modules/webworkify-webpack/index.js ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

function webpackBootstrapFunc (modules) {
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.l = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }

/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // identity function for calling harmony imports with the correct context
/******/  __webpack_require__.i = function(value) { return value; };

/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, {
/******/        configurable: false,
/******/        enumerable: true,
/******/        get: getter
/******/      });
/******/    }
/******/  };

/******/  // define __esModule on exports
/******/  __webpack_require__.r = function(exports) {
/******/    Object.defineProperty(exports, '__esModule', { value: true });
/******/  };

/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };

/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "/";

/******/  // on error function for async loading
/******/  __webpack_require__.oe = function(err) { console.error(err); throw err; };

  var f = __webpack_require__(__webpack_require__.s = ENTRY_MODULE)
  return f.default || f // try to call default if defined to also support babel esmodule exports
}

var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+'
var dependencyRegExp = '\\(\\s*(\/\\*.*?\\*\/)?\\s*.*?(' + moduleNameReqExp + ').*?\\)' // additional chars when output.pathinfo is true

// http://stackoverflow.com/a/2593661/130442
function quoteRegExp (str) {
  return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
}

function isNumeric(n) {
  return !isNaN(1 * n); // 1 * n converts integers, integers as string ("123"), 1e3 and "1e3" to integers and strings to NaN
}

function getModuleDependencies (sources, module, queueName) {
  var retval = {}
  retval[queueName] = []

  var fnString = module.toString()
  var wrapperSignature = fnString.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/)
  if (!wrapperSignature) return retval
  var webpackRequireName = wrapperSignature[1]

  // main bundle deps
  var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g')
  var match
  while ((match = re.exec(fnString))) {
    if (match[3] === 'dll-reference') continue
    retval[queueName].push(match[3])
  }

  // dll deps
  re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g')
  while ((match = re.exec(fnString))) {
    if (!sources[match[2]]) {
      retval[queueName].push(match[1])
      sources[match[2]] = __webpack_require__(match[1]).m
    }
    retval[match[2]] = retval[match[2]] || []
    retval[match[2]].push(match[4])
  }

  // convert 1e3 back to 1000 - this can be important after uglify-js converted 1000 to 1e3
  var keys = Object.keys(retval);
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < retval[keys[i]].length; j++) {
      if (isNumeric(retval[keys[i]][j])) {
        retval[keys[i]][j] = 1 * retval[keys[i]][j];
      }
    }
  }

  return retval
}

function hasValuesInQueues (queues) {
  var keys = Object.keys(queues)
  return keys.reduce(function (hasValues, key) {
    return hasValues || queues[key].length > 0
  }, false)
}

function getRequiredModules (sources, moduleId) {
  var modulesQueue = {
    main: [moduleId]
  }
  var requiredModules = {
    main: []
  }
  var seenModules = {
    main: {}
  }

  while (hasValuesInQueues(modulesQueue)) {
    var queues = Object.keys(modulesQueue)
    for (var i = 0; i < queues.length; i++) {
      var queueName = queues[i]
      var queue = modulesQueue[queueName]
      var moduleToCheck = queue.pop()
      seenModules[queueName] = seenModules[queueName] || {}
      if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck]) continue
      seenModules[queueName][moduleToCheck] = true
      requiredModules[queueName] = requiredModules[queueName] || []
      requiredModules[queueName].push(moduleToCheck)
      var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName)
      var newModulesKeys = Object.keys(newModules)
      for (var j = 0; j < newModulesKeys.length; j++) {
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || []
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]])
      }
    }
  }

  return requiredModules
}

module.exports = function (moduleId, options) {
  options = options || {}
  var sources = {
    main: __webpack_require__.m
  }

  var requiredModules = options.all ? { main: Object.keys(sources.main) } : getRequiredModules(sources, moduleId)

  var src = ''

  Object.keys(requiredModules).filter(function (m) { return m !== 'main' }).forEach(function (module) {
    var entryModule = 0
    while (requiredModules[module][entryModule]) {
      entryModule++
    }
    requiredModules[module].push(entryModule)
    sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })'
    src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) { return '' + JSON.stringify(id) + ': ' + sources[module][id].toString() }).join(',') + '});\n'
  })

  src = src + 'new ((' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) { return '' + JSON.stringify(id) + ': ' + sources.main[id].toString() }).join(',') + '}))(self);'

  var blob = new window.Blob([src], { type: 'text/javascript' })
  if (options.bare) { return blob }

  var URL = window.URL || window.webkitURL || window.mozURL || window.msURL

  var workerUrl = URL.createObjectURL(blob)
  var worker = new window.Worker(workerUrl)
  worker.objectURL = workerUrl

  return worker
}


/***/ }),

/***/ "./src/crypt/decrypter.js":
/*!********************************************!*\
  !*** ./src/crypt/decrypter.js + 3 modules ***!
  \********************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./src/errors.ts because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/events.js because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/get-self-scope.js because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/logger.js because of ./src/hls.ts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/crypt/aes-crypto.js
var AESCrypto = /*#__PURE__*/function () {
  function AESCrypto(subtle, iv) {
    this.subtle = subtle;
    this.aesIV = iv;
  }

  var _proto = AESCrypto.prototype;

  _proto.decrypt = function decrypt(data, key) {
    return this.subtle.decrypt({
      name: 'AES-CBC',
      iv: this.aesIV
    }, key, data);
  };

  return AESCrypto;
}();


// CONCATENATED MODULE: ./src/crypt/fast-aes-key.js
var FastAESKey = /*#__PURE__*/function () {
  function FastAESKey(subtle, key) {
    this.subtle = subtle;
    this.key = key;
  }

  var _proto = FastAESKey.prototype;

  _proto.expandKey = function expandKey() {
    return this.subtle.importKey('raw', this.key, {
      name: 'AES-CBC'
    }, false, ['encrypt', 'decrypt']);
  };

  return FastAESKey;
}();

/* harmony default export */ var fast_aes_key = (FastAESKey);
// CONCATENATED MODULE: ./src/crypt/aes-decryptor.js
// PKCS7
function removePadding(buffer) {
  var outputBytes = buffer.byteLength;
  var paddingBytes = outputBytes && new DataView(buffer).getUint8(outputBytes - 1);

  if (paddingBytes) {
    return buffer.slice(0, outputBytes - paddingBytes);
  } else {
    return buffer;
  }
}

var AESDecryptor = /*#__PURE__*/function () {
  function AESDecryptor() {
    // Static after running initTable
    this.rcon = [0x0, 0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
    this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
    this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
    this.sBox = new Uint32Array(256);
    this.invSBox = new Uint32Array(256); // Changes during runtime

    this.key = new Uint32Array(0);
    this.initTable();
  } // Using view.getUint32() also swaps the byte order.


  var _proto = AESDecryptor.prototype;

  _proto.uint8ArrayToUint32Array_ = function uint8ArrayToUint32Array_(arrayBuffer) {
    var view = new DataView(arrayBuffer);
    var newArray = new Uint32Array(4);

    for (var i = 0; i < 4; i++) {
      newArray[i] = view.getUint32(i * 4);
    }

    return newArray;
  };

  _proto.initTable = function initTable() {
    var sBox = this.sBox;
    var invSBox = this.invSBox;
    var subMix = this.subMix;
    var subMix0 = subMix[0];
    var subMix1 = subMix[1];
    var subMix2 = subMix[2];
    var subMix3 = subMix[3];
    var invSubMix = this.invSubMix;
    var invSubMix0 = invSubMix[0];
    var invSubMix1 = invSubMix[1];
    var invSubMix2 = invSubMix[2];
    var invSubMix3 = invSubMix[3];
    var d = new Uint32Array(256);
    var x = 0;
    var xi = 0;
    var i = 0;

    for (i = 0; i < 256; i++) {
      if (i < 128) {
        d[i] = i << 1;
      } else {
        d[i] = i << 1 ^ 0x11b;
      }
    }

    for (i = 0; i < 256; i++) {
      var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
      sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
      sBox[x] = sx;
      invSBox[sx] = x; // Compute multiplication

      var x2 = d[x];
      var x4 = d[x2];
      var x8 = d[x4]; // Compute sub/invSub bytes, mix columns tables

      var t = d[sx] * 0x101 ^ sx * 0x1010100;
      subMix0[x] = t << 24 | t >>> 8;
      subMix1[x] = t << 16 | t >>> 16;
      subMix2[x] = t << 8 | t >>> 24;
      subMix3[x] = t; // Compute inv sub bytes, inv mix columns tables

      t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
      invSubMix0[sx] = t << 24 | t >>> 8;
      invSubMix1[sx] = t << 16 | t >>> 16;
      invSubMix2[sx] = t << 8 | t >>> 24;
      invSubMix3[sx] = t; // Compute next counter

      if (!x) {
        x = xi = 1;
      } else {
        x = x2 ^ d[d[d[x8 ^ x2]]];
        xi ^= d[d[xi]];
      }
    }
  };

  _proto.expandKey = function expandKey(keyBuffer) {
    // convert keyBuffer to Uint32Array
    var key = this.uint8ArrayToUint32Array_(keyBuffer);
    var sameKey = true;
    var offset = 0;

    while (offset < key.length && sameKey) {
      sameKey = key[offset] === this.key[offset];
      offset++;
    }

    if (sameKey) {
      return;
    }

    this.key = key;
    var keySize = this.keySize = key.length;

    if (keySize !== 4 && keySize !== 6 && keySize !== 8) {
      throw new Error('Invalid aes key size=' + keySize);
    }

    var ksRows = this.ksRows = (keySize + 6 + 1) * 4;
    var ksRow;
    var invKsRow;
    var keySchedule = this.keySchedule = new Uint32Array(ksRows);
    var invKeySchedule = this.invKeySchedule = new Uint32Array(ksRows);
    var sbox = this.sBox;
    var rcon = this.rcon;
    var invSubMix = this.invSubMix;
    var invSubMix0 = invSubMix[0];
    var invSubMix1 = invSubMix[1];
    var invSubMix2 = invSubMix[2];
    var invSubMix3 = invSubMix[3];
    var prev;
    var t;

    for (ksRow = 0; ksRow < ksRows; ksRow++) {
      if (ksRow < keySize) {
        prev = keySchedule[ksRow] = key[ksRow];
        continue;
      }

      t = prev;

      if (ksRow % keySize === 0) {
        // Rot word
        t = t << 8 | t >>> 24; // Sub word

        t = sbox[t >>> 24] << 24 | sbox[t >>> 16 & 0xff] << 16 | sbox[t >>> 8 & 0xff] << 8 | sbox[t & 0xff]; // Mix Rcon

        t ^= rcon[ksRow / keySize | 0] << 24;
      } else if (keySize > 6 && ksRow % keySize === 4) {
        // Sub word
        t = sbox[t >>> 24] << 24 | sbox[t >>> 16 & 0xff] << 16 | sbox[t >>> 8 & 0xff] << 8 | sbox[t & 0xff];
      }

      keySchedule[ksRow] = prev = (keySchedule[ksRow - keySize] ^ t) >>> 0;
    }

    for (invKsRow = 0; invKsRow < ksRows; invKsRow++) {
      ksRow = ksRows - invKsRow;

      if (invKsRow & 3) {
        t = keySchedule[ksRow];
      } else {
        t = keySchedule[ksRow - 4];
      }

      if (invKsRow < 4 || ksRow <= 4) {
        invKeySchedule[invKsRow] = t;
      } else {
        invKeySchedule[invKsRow] = invSubMix0[sbox[t >>> 24]] ^ invSubMix1[sbox[t >>> 16 & 0xff]] ^ invSubMix2[sbox[t >>> 8 & 0xff]] ^ invSubMix3[sbox[t & 0xff]];
      }

      invKeySchedule[invKsRow] = invKeySchedule[invKsRow] >>> 0;
    }
  } // Adding this as a method greatly improves performance.
  ;

  _proto.networkToHostOrderSwap = function networkToHostOrderSwap(word) {
    return word << 24 | (word & 0xff00) << 8 | (word & 0xff0000) >> 8 | word >>> 24;
  };

  _proto.decrypt = function decrypt(inputArrayBuffer, offset, aesIV, removePKCS7Padding) {
    var nRounds = this.keySize + 6;
    var invKeySchedule = this.invKeySchedule;
    var invSBOX = this.invSBox;
    var invSubMix = this.invSubMix;
    var invSubMix0 = invSubMix[0];
    var invSubMix1 = invSubMix[1];
    var invSubMix2 = invSubMix[2];
    var invSubMix3 = invSubMix[3];
    var initVector = this.uint8ArrayToUint32Array_(aesIV);
    var initVector0 = initVector[0];
    var initVector1 = initVector[1];
    var initVector2 = initVector[2];
    var initVector3 = initVector[3];
    var inputInt32 = new Int32Array(inputArrayBuffer);
    var outputInt32 = new Int32Array(inputInt32.length);
    var t0, t1, t2, t3;
    var s0, s1, s2, s3;
    var inputWords0, inputWords1, inputWords2, inputWords3;
    var ksRow, i;
    var swapWord = this.networkToHostOrderSwap;

    while (offset < inputInt32.length) {
      inputWords0 = swapWord(inputInt32[offset]);
      inputWords1 = swapWord(inputInt32[offset + 1]);
      inputWords2 = swapWord(inputInt32[offset + 2]);
      inputWords3 = swapWord(inputInt32[offset + 3]);
      s0 = inputWords0 ^ invKeySchedule[0];
      s1 = inputWords3 ^ invKeySchedule[1];
      s2 = inputWords2 ^ invKeySchedule[2];
      s3 = inputWords1 ^ invKeySchedule[3];
      ksRow = 4; // Iterate through the rounds of decryption

      for (i = 1; i < nRounds; i++) {
        t0 = invSubMix0[s0 >>> 24] ^ invSubMix1[s1 >> 16 & 0xff] ^ invSubMix2[s2 >> 8 & 0xff] ^ invSubMix3[s3 & 0xff] ^ invKeySchedule[ksRow];
        t1 = invSubMix0[s1 >>> 24] ^ invSubMix1[s2 >> 16 & 0xff] ^ invSubMix2[s3 >> 8 & 0xff] ^ invSubMix3[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
        t2 = invSubMix0[s2 >>> 24] ^ invSubMix1[s3 >> 16 & 0xff] ^ invSubMix2[s0 >> 8 & 0xff] ^ invSubMix3[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
        t3 = invSubMix0[s3 >>> 24] ^ invSubMix1[s0 >> 16 & 0xff] ^ invSubMix2[s1 >> 8 & 0xff] ^ invSubMix3[s2 & 0xff] ^ invKeySchedule[ksRow + 3]; // Update state

        s0 = t0;
        s1 = t1;
        s2 = t2;
        s3 = t3;
        ksRow = ksRow + 4;
      } // Shift rows, sub bytes, add round key


      t0 = invSBOX[s0 >>> 24] << 24 ^ invSBOX[s1 >> 16 & 0xff] << 16 ^ invSBOX[s2 >> 8 & 0xff] << 8 ^ invSBOX[s3 & 0xff] ^ invKeySchedule[ksRow];
      t1 = invSBOX[s1 >>> 24] << 24 ^ invSBOX[s2 >> 16 & 0xff] << 16 ^ invSBOX[s3 >> 8 & 0xff] << 8 ^ invSBOX[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
      t2 = invSBOX[s2 >>> 24] << 24 ^ invSBOX[s3 >> 16 & 0xff] << 16 ^ invSBOX[s0 >> 8 & 0xff] << 8 ^ invSBOX[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
      t3 = invSBOX[s3 >>> 24] << 24 ^ invSBOX[s0 >> 16 & 0xff] << 16 ^ invSBOX[s1 >> 8 & 0xff] << 8 ^ invSBOX[s2 & 0xff] ^ invKeySchedule[ksRow + 3];
      ksRow = ksRow + 3; // Write

      outputInt32[offset] = swapWord(t0 ^ initVector0);
      outputInt32[offset + 1] = swapWord(t3 ^ initVector1);
      outputInt32[offset + 2] = swapWord(t2 ^ initVector2);
      outputInt32[offset + 3] = swapWord(t1 ^ initVector3); // reset initVector to last 4 unsigned int

      initVector0 = inputWords0;
      initVector1 = inputWords1;
      initVector2 = inputWords2;
      initVector3 = inputWords3;
      offset = offset + 4;
    }

    return removePKCS7Padding ? removePadding(outputInt32.buffer) : outputInt32.buffer;
  };

  _proto.destroy = function destroy() {
    this.key = undefined;
    this.keySize = undefined;
    this.ksRows = undefined;
    this.sBox = undefined;
    this.invSBox = undefined;
    this.subMix = undefined;
    this.invSubMix = undefined;
    this.keySchedule = undefined;
    this.invKeySchedule = undefined;
    this.rcon = undefined;
  };

  return AESDecryptor;
}();

/* harmony default export */ var aes_decryptor = (AESDecryptor);
// EXTERNAL MODULE: ./src/errors.ts
var errors = __webpack_require__("./src/errors.ts");

// EXTERNAL MODULE: ./src/utils/logger.js
var logger = __webpack_require__("./src/utils/logger.js");

// EXTERNAL MODULE: ./src/events.js
var events = __webpack_require__("./src/events.js");

// EXTERNAL MODULE: ./src/utils/get-self-scope.js
var get_self_scope = __webpack_require__("./src/utils/get-self-scope.js");

// CONCATENATED MODULE: ./src/crypt/decrypter.js






 // see https://stackoverflow.com/a/11237259/589493

var global = Object(get_self_scope["getSelfScope"])(); // safeguard for code that might run both on worker and main thread

var decrypter_Decrypter = /*#__PURE__*/function () {
  function Decrypter(observer, config, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$removePKCS7Paddi = _ref.removePKCS7Padding,
        removePKCS7Padding = _ref$removePKCS7Paddi === void 0 ? true : _ref$removePKCS7Paddi;

    this.logEnabled = true;
    this.observer = observer;
    this.config = config;
    this.removePKCS7Padding = removePKCS7Padding; // built in decryptor expects PKCS7 padding

    if (removePKCS7Padding) {
      try {
        var browserCrypto = global.crypto;

        if (browserCrypto) {
          this.subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
        }
      } catch (e) {}
    }

    this.disableWebCrypto = !this.subtle;
  }

  var _proto = Decrypter.prototype;

  _proto.isSync = function isSync() {
    return this.disableWebCrypto && this.config.enableSoftwareAES;
  };

  _proto.decrypt = function decrypt(data, key, iv, callback) {
    var _this = this;

    if (this.disableWebCrypto && this.config.enableSoftwareAES) {
      if (this.logEnabled) {
        logger["logger"].log('JS AES decrypt');
        this.logEnabled = false;
      }

      var decryptor = this.decryptor;

      if (!decryptor) {
        this.decryptor = decryptor = new aes_decryptor();
      }

      decryptor.expandKey(key);
      callback(decryptor.decrypt(data, 0, iv, this.removePKCS7Padding));
    } else {
      if (this.logEnabled) {
        logger["logger"].log('WebCrypto AES decrypt');
        this.logEnabled = false;
      }

      var subtle = this.subtle;

      if (this.key !== key) {
        this.key = key;
        this.fastAesKey = new fast_aes_key(subtle, key);
      }

      this.fastAesKey.expandKey().then(function (aesKey) {
        // decrypt using web crypto
        var crypto = new AESCrypto(subtle, iv);
        crypto.decrypt(data, aesKey).catch(function (err) {
          _this.onWebCryptoError(err, data, key, iv, callback);
        }).then(function (result) {
          callback(result);
        });
      }).catch(function (err) {
        _this.onWebCryptoError(err, data, key, iv, callback);
      });
    }
  };

  _proto.onWebCryptoError = function onWebCryptoError(err, data, key, iv, callback) {
    if (this.config.enableSoftwareAES) {
      logger["logger"].log('WebCrypto Error, disable WebCrypto API');
      this.disableWebCrypto = true;
      this.logEnabled = true;
      this.decrypt(data, key, iv, callback);
    } else {
      logger["logger"].error("decrypting error : " + err.message);
      this.observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].FRAG_DECRYPT_ERROR,
        fatal: true,
        reason: err.message
      });
    }
  };

  _proto.destroy = function destroy() {
    var decryptor = this.decryptor;

    if (decryptor) {
      decryptor.destroy();
      this.decryptor = undefined;
    }
  };

  return Decrypter;
}();

/* harmony default export */ var decrypter = __webpack_exports__["default"] = (decrypter_Decrypter);

/***/ }),

/***/ "./src/demux/demuxer-inline.js":
/*!**************************************************!*\
  !*** ./src/demux/demuxer-inline.js + 12 modules ***!
  \**************************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./src/crypt/decrypter.js because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/id3.js because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/mp4demuxer.js because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/errors.ts because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/events.js because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/polyfills/number.js because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/get-self-scope.js because of ./src/hls.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/logger.js because of ./src/hls.ts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/events.js
var events = __webpack_require__("./src/events.js");

// EXTERNAL MODULE: ./src/errors.ts
var errors = __webpack_require__("./src/errors.ts");

// EXTERNAL MODULE: ./src/crypt/decrypter.js + 3 modules
var crypt_decrypter = __webpack_require__("./src/crypt/decrypter.js");

// EXTERNAL MODULE: ./src/polyfills/number.js
var number = __webpack_require__("./src/polyfills/number.js");

// EXTERNAL MODULE: ./src/utils/logger.js
var logger = __webpack_require__("./src/utils/logger.js");

// EXTERNAL MODULE: ./src/utils/get-self-scope.js
var get_self_scope = __webpack_require__("./src/utils/get-self-scope.js");

// CONCATENATED MODULE: ./src/demux/adts.js
/**
 * ADTS parser helper
 * @link https://wiki.multimedia.cx/index.php?title=ADTS
 */




function getAudioConfig(observer, data, offset, audioCodec) {
  var adtsObjectType,
      // :int
  adtsSampleingIndex,
      // :int
  adtsExtensionSampleingIndex,
      // :int
  adtsChanelConfig,
      // :int
  config,
      userAgent = navigator.userAgent.toLowerCase(),
      manifestCodec = audioCodec,
      adtsSampleingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350]; // byte 2

  adtsObjectType = ((data[offset + 2] & 0xC0) >>> 6) + 1;
  adtsSampleingIndex = (data[offset + 2] & 0x3C) >>> 2;

  if (adtsSampleingIndex > adtsSampleingRates.length - 1) {
    observer.trigger(events["default"].ERROR, {
      type: errors["ErrorTypes"].MEDIA_ERROR,
      details: errors["ErrorDetails"].FRAG_PARSING_ERROR,
      fatal: true,
      reason: "invalid ADTS sampling index:" + adtsSampleingIndex
    });
    return;
  }

  adtsChanelConfig = (data[offset + 2] & 0x01) << 2; // byte 3

  adtsChanelConfig |= (data[offset + 3] & 0xC0) >>> 6;
  logger["logger"].log("manifest codec:" + audioCodec + ",ADTS data:type:" + adtsObjectType + ",sampleingIndex:" + adtsSampleingIndex + "[" + adtsSampleingRates[adtsSampleingIndex] + "Hz],channelConfig:" + adtsChanelConfig); // firefox: freq less than 24kHz = AAC SBR (HE-AAC)

  if (/firefox/i.test(userAgent)) {
    if (adtsSampleingIndex >= 6) {
      adtsObjectType = 5;
      config = new Array(4); // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
      // there is a factor 2 between frame sample rate and output sample rate
      // multiply frequency by 2 (see table below, equivalent to substract 3)

      adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
    } else {
      adtsObjectType = 2;
      config = new Array(2);
      adtsExtensionSampleingIndex = adtsSampleingIndex;
    } // Android : always use AAC

  } else if (userAgent.indexOf('android') !== -1) {
    adtsObjectType = 2;
    config = new Array(2);
    adtsExtensionSampleingIndex = adtsSampleingIndex;
  } else {
    /*  for other browsers (Chrome/Vivaldi/Opera ...)
        always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
    */
    adtsObjectType = 5;
    config = new Array(4); // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)

    if (audioCodec && (audioCodec.indexOf('mp4a.40.29') !== -1 || audioCodec.indexOf('mp4a.40.5') !== -1) || !audioCodec && adtsSampleingIndex >= 6) {
      // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
      // there is a factor 2 between frame sample rate and output sample rate
      // multiply frequency by 2 (see table below, equivalent to substract 3)
      adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
    } else {
      // if (manifest codec is AAC) AND (frequency less than 24kHz AND nb channel is 1) OR (manifest codec not specified and mono audio)
      // Chrome fails to play back with low frequency AAC LC mono when initialized with HE-AAC.  This is not a problem with stereo.
      if (audioCodec && audioCodec.indexOf('mp4a.40.2') !== -1 && (adtsSampleingIndex >= 6 && adtsChanelConfig === 1 || /vivaldi/i.test(userAgent)) || !audioCodec && adtsChanelConfig === 1) {
        adtsObjectType = 2;
        config = new Array(2);
      }

      adtsExtensionSampleingIndex = adtsSampleingIndex;
    }
  }
  /* refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
      ISO 14496-3 (AAC).pdf - Table 1.13 — Syntax of AudioSpecificConfig()
    Audio Profile / Audio Object Type
    0: Null
    1: AAC Main
    2: AAC LC (Low Complexity)
    3: AAC SSR (Scalable Sample Rate)
    4: AAC LTP (Long Term Prediction)
    5: SBR (Spectral Band Replication)
    6: AAC Scalable
   sampling freq
    0: 96000 Hz
    1: 88200 Hz
    2: 64000 Hz
    3: 48000 Hz
    4: 44100 Hz
    5: 32000 Hz
    6: 24000 Hz
    7: 22050 Hz
    8: 16000 Hz
    9: 12000 Hz
    10: 11025 Hz
    11: 8000 Hz
    12: 7350 Hz
    13: Reserved
    14: Reserved
    15: frequency is written explictly
    Channel Configurations
    These are the channel configurations:
    0: Defined in AOT Specifc Config
    1: 1 channel: front-center
    2: 2 channels: front-left, front-right
  */
  // audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1


  config[0] = adtsObjectType << 3; // samplingFrequencyIndex

  config[0] |= (adtsSampleingIndex & 0x0E) >> 1;
  config[1] |= (adtsSampleingIndex & 0x01) << 7; // channelConfiguration

  config[1] |= adtsChanelConfig << 3;

  if (adtsObjectType === 5) {
    // adtsExtensionSampleingIndex
    config[1] |= (adtsExtensionSampleingIndex & 0x0E) >> 1;
    config[2] = (adtsExtensionSampleingIndex & 0x01) << 7; // adtsObjectType (force to 2, chrome is checking that object type is less than 5 ???
    //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc

    config[2] |= 2 << 2;
    config[3] = 0;
  }

  return {
    config: config,
    samplerate: adtsSampleingRates[adtsSampleingIndex],
    channelCount: adtsChanelConfig,
    codec: 'mp4a.40.' + adtsObjectType,
    manifestCodec: manifestCodec
  };
}
function isHeaderPattern(data, offset) {
  return data[offset] === 0xff && (data[offset + 1] & 0xf6) === 0xf0;
}
function getHeaderLength(data, offset) {
  return data[offset + 1] & 0x01 ? 7 : 9;
}
function getFullFrameLength(data, offset) {
  return (data[offset + 3] & 0x03) << 11 | data[offset + 4] << 3 | (data[offset + 5] & 0xE0) >>> 5;
}
function isHeader(data, offset) {
  // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
  // Layer bits (position 14 and 15) in header should be always 0 for ADTS
  // More info https://wiki.multimedia.cx/index.php?title=ADTS
  if (offset + 1 < data.length && isHeaderPattern(data, offset)) {
    return true;
  }

  return false;
}
function adts_probe(data, offset) {
  // same as isHeader but we also check that ADTS frame follows last ADTS frame
  // or end of data is reached
  if (isHeader(data, offset)) {
    // ADTS header Length
    var headerLength = getHeaderLength(data, offset);

    if (offset + headerLength >= data.length) {
      return false;
    } // ADTS frame Length


    var frameLength = getFullFrameLength(data, offset);

    if (frameLength <= headerLength) {
      return false;
    }

    var newOffset = offset + frameLength;

    if (newOffset === data.length || newOffset + 1 < data.length && isHeaderPattern(data, newOffset)) {
      return true;
    }
  }

  return false;
}
function initTrackConfig(track, observer, data, offset, audioCodec) {
  if (!track.samplerate) {
    var config = getAudioConfig(observer, data, offset, audioCodec);
    track.config = config.config;
    track.samplerate = config.samplerate;
    track.channelCount = config.channelCount;
    track.codec = config.codec;
    track.manifestCodec = config.manifestCodec;
    logger["logger"].log("parsed codec:" + track.codec + ",rate:" + config.samplerate + ",nb channel:" + config.channelCount);
  }
}
function getFrameDuration(samplerate) {
  return 1024 * 90000 / samplerate;
}
function parseFrameHeader(data, offset, pts, frameIndex, frameDuration) {
  var headerLength, frameLength, stamp;
  var length = data.length; // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header

  headerLength = getHeaderLength(data, offset); // retrieve frame size

  frameLength = getFullFrameLength(data, offset);
  frameLength -= headerLength;

  if (frameLength > 0 && offset + headerLength + frameLength <= length) {
    stamp = pts + frameIndex * frameDuration; // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);

    return {
      headerLength: headerLength,
      frameLength: frameLength,
      stamp: stamp
    };
  }

  return undefined;
}
function appendFrame(track, data, offset, pts, frameIndex) {
  var frameDuration = getFrameDuration(track.samplerate);
  var header = parseFrameHeader(data, offset, pts, frameIndex, frameDuration);

  if (header) {
    var stamp = header.stamp;
    var headerLength = header.headerLength;
    var frameLength = header.frameLength; // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);

    var aacSample = {
      unit: data.subarray(offset + headerLength, offset + headerLength + frameLength),
      pts: stamp,
      dts: stamp
    };
    track.samples.push(aacSample);
    return {
      sample: aacSample,
      length: frameLength + headerLength
    };
  }

  return undefined;
}
// EXTERNAL MODULE: ./src/demux/id3.js
var id3 = __webpack_require__("./src/demux/id3.js");

// CONCATENATED MODULE: ./src/demux/aacdemuxer.js


/**
 * AAC demuxer
 */




var aacdemuxer_AACDemuxer = /*#__PURE__*/function () {
  function AACDemuxer(observer, remuxer, config) {
    this.observer = observer;
    this.config = config;
    this.remuxer = remuxer;
  }

  var _proto = AACDemuxer.prototype;

  _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, duration) {
    this._audioTrack = {
      container: 'audio/adts',
      type: 'audio',
      id: 0,
      sequenceNumber: 0,
      isAAC: true,
      samples: [],
      len: 0,
      manifestCodec: audioCodec,
      duration: duration,
      inputTimeScale: 90000
    };
  };

  _proto.resetTimeStamp = function resetTimeStamp() {};

  AACDemuxer.probe = function probe(data) {
    if (!data) {
      return false;
    } // Check for the ADTS sync word
    // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
    // Layer bits (position 14 and 15) in header should be always 0 for ADTS
    // More info https://wiki.multimedia.cx/index.php?title=ADTS


    var id3Data = id3["default"].getID3Data(data, 0) || [];
    var offset = id3Data.length;

    for (var length = data.length; offset < length; offset++) {
      if (adts_probe(data, offset)) {
        logger["logger"].log('ADTS sync word found !');
        return true;
      }
    }

    return false;
  } // feed incoming data to the front of the parsing pipeline
  ;

  _proto.append = function append(data, timeOffset, contiguous, accurateTimeOffset) {
    var track = this._audioTrack;
    var id3Data = id3["default"].getID3Data(data, 0) || [];
    var timestamp = id3["default"].getTimeStamp(id3Data);
    var pts = Object(number["isFiniteNumber"])(timestamp) ? timestamp * 90 : timeOffset * 90000;
    var frameIndex = 0;
    var stamp = pts;
    var length = data.length;
    var offset = id3Data.length;
    var id3Samples = [{
      pts: stamp,
      dts: stamp,
      data: id3Data
    }];

    while (offset < length - 1) {
      if (isHeader(data, offset) && offset + 5 < length) {
        initTrackConfig(track, this.observer, data, offset, track.manifestCodec);
        var frame = appendFrame(track, data, offset, pts, frameIndex);

        if (frame) {
          offset += frame.length;
          stamp = frame.sample.pts;
          frameIndex++;
        } else {
          logger["logger"].log('Unable to parse AAC frame');
          break;
        }
      } else if (id3["default"].isHeader(data, offset)) {
        id3Data = id3["default"].getID3Data(data, offset);
        id3Samples.push({
          pts: stamp,
          dts: stamp,
          data: id3Data
        });
        offset += id3Data.length;
      } else {
        // nothing found, keep looking
        offset++;
      }
    }

    this.remuxer.remux(track, {
      samples: []
    }, {
      samples: id3Samples,
      inputTimeScale: 90000
    }, {
      samples: []
    }, timeOffset, contiguous, accurateTimeOffset);
  };

  _proto.destroy = function destroy() {};

  return AACDemuxer;
}();

/* harmony default export */ var aacdemuxer = (aacdemuxer_AACDemuxer);
// EXTERNAL MODULE: ./src/demux/mp4demuxer.js
var mp4demuxer = __webpack_require__("./src/demux/mp4demuxer.js");

// CONCATENATED MODULE: ./src/demux/mpegaudio.js
/**
 *  MPEG parser helper
 */
var MpegAudio = {
  BitratesMap: [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
  SamplingRateMap: [44100, 48000, 32000, 22050, 24000, 16000, 11025, 12000, 8000],
  SamplesCoefficients: [// MPEG 2.5
  [0, // Reserved
  72, // Layer3
  144, // Layer2
  12 // Layer1
  ], // Reserved
  [0, // Reserved
  0, // Layer3
  0, // Layer2
  0 // Layer1
  ], // MPEG 2
  [0, // Reserved
  72, // Layer3
  144, // Layer2
  12 // Layer1
  ], // MPEG 1
  [0, // Reserved
  144, // Layer3
  144, // Layer2
  12 // Layer1
  ]],
  BytesInSlot: [0, // Reserved
  1, // Layer3
  1, // Layer2
  4 // Layer1
  ],
  appendFrame: function appendFrame(track, data, offset, pts, frameIndex) {
    // Using http://www.datavoyage.com/mpgscript/mpeghdr.htm as a reference
    if (offset + 24 > data.length) {
      return undefined;
    }

    var header = this.parseHeader(data, offset);

    if (header && offset + header.frameLength <= data.length) {
      var frameDuration = header.samplesPerFrame * 90000 / header.sampleRate;
      var stamp = pts + frameIndex * frameDuration;
      var sample = {
        unit: data.subarray(offset, offset + header.frameLength),
        pts: stamp,
        dts: stamp
      };
      track.config = [];
      track.channelCount = header.channelCount;
      track.samplerate = header.sampleRate;
      track.samples.push(sample);
      return {
        sample: sample,
        length: header.frameLength
      };
    }

    return undefined;
  },
  parseHeader: function parseHeader(data, offset) {
    var headerB = data[offset + 1] >> 3 & 3;
    var headerC = data[offset + 1] >> 1 & 3;
    var headerE = data[offset + 2] >> 4 & 15;
    var headerF = data[offset + 2] >> 2 & 3;
    var headerG = data[offset + 2] >> 1 & 1;

    if (headerB !== 1 && headerE !== 0 && headerE !== 15 && headerF !== 3) {
      var columnInBitrates = headerB === 3 ? 3 - headerC : headerC === 3 ? 3 : 4;
      var bitRate = MpegAudio.BitratesMap[columnInBitrates * 14 + headerE - 1] * 1000;
      var columnInSampleRates = headerB === 3 ? 0 : headerB === 2 ? 1 : 2;
      var sampleRate = MpegAudio.SamplingRateMap[columnInSampleRates * 3 + headerF];
      var channelCount = data[offset + 3] >> 6 === 3 ? 1 : 2; // If bits of channel mode are `11` then it is a single channel (Mono)

      var sampleCoefficient = MpegAudio.SamplesCoefficients[headerB][headerC];
      var bytesInSlot = MpegAudio.BytesInSlot[headerC];
      var samplesPerFrame = sampleCoefficient * 8 * bytesInSlot;
      var frameLength = parseInt(sampleCoefficient * bitRate / sampleRate + headerG, 10) * bytesInSlot;
      return {
        sampleRate: sampleRate,
        channelCount: channelCount,
        frameLength: frameLength,
        samplesPerFrame: samplesPerFrame
      };
    }

    return undefined;
  },
  isHeaderPattern: function isHeaderPattern(data, offset) {
    return data[offset] === 0xff && (data[offset + 1] & 0xe0) === 0xe0 && (data[offset + 1] & 0x06) !== 0x00;
  },
  isHeader: function isHeader(data, offset) {
    // Look for MPEG header | 1111 1111 | 111X XYZX | where X can be either 0 or 1 and Y or Z should be 1
    // Layer bits (position 14 and 15) in header should be always different from 0 (Layer I or Layer II or Layer III)
    // More info http://www.mp3-tech.org/programmer/frame_header.html
    if (offset + 1 < data.length && this.isHeaderPattern(data, offset)) {
      return true;
    }

    return false;
  },
  probe: function probe(data, offset) {
    // same as isHeader but we also check that MPEG frame follows last MPEG frame
    // or end of data is reached
    if (offset + 1 < data.length && this.isHeaderPattern(data, offset)) {
      // MPEG header Length
      var headerLength = 4; // MPEG frame Length

      var header = this.parseHeader(data, offset);
      var frameLength = headerLength;

      if (header && header.frameLength) {
        frameLength = header.frameLength;
      }

      var newOffset = offset + frameLength;

      if (newOffset === data.length || newOffset + 1 < data.length && this.isHeaderPattern(data, newOffset)) {
        return true;
      }
    }

    return false;
  }
};
/* harmony default export */ var mpegaudio = (MpegAudio);
// CONCATENATED MODULE: ./src/demux/exp-golomb.js
/**
 * Parser for exponential Golomb codes, a variable-bitwidth number encoding scheme used by h264.
*/


var exp_golomb_ExpGolomb = /*#__PURE__*/function () {
  function ExpGolomb(data) {
    this.data = data; // the number of bytes left to examine in this.data

    this.bytesAvailable = data.byteLength; // the current word being examined

    this.word = 0; // :uint
    // the number of bits left to examine in the current word

    this.bitsAvailable = 0; // :uint
  } // ():void


  var _proto = ExpGolomb.prototype;

  _proto.loadWord = function loadWord() {
    var data = this.data,
        bytesAvailable = this.bytesAvailable,
        position = data.byteLength - bytesAvailable,
        workingBytes = new Uint8Array(4),
        availableBytes = Math.min(4, bytesAvailable);

    if (availableBytes === 0) {
      throw new Error('no bytes available');
    }

    workingBytes.set(data.subarray(position, position + availableBytes));
    this.word = new DataView(workingBytes.buffer).getUint32(0); // track the amount of this.data that has been processed

    this.bitsAvailable = availableBytes * 8;
    this.bytesAvailable -= availableBytes;
  } // (count:int):void
  ;

  _proto.skipBits = function skipBits(count) {
    var skipBytes; // :int

    if (this.bitsAvailable > count) {
      this.word <<= count;
      this.bitsAvailable -= count;
    } else {
      count -= this.bitsAvailable;
      skipBytes = count >> 3;
      count -= skipBytes >> 3;
      this.bytesAvailable -= skipBytes;
      this.loadWord();
      this.word <<= count;
      this.bitsAvailable -= count;
    }
  } // (size:int):uint
  ;

  _proto.readBits = function readBits(size) {
    var bits = Math.min(this.bitsAvailable, size),
        // :uint
    valu = this.word >>> 32 - bits; // :uint

    if (size > 32) {
      logger["logger"].error('Cannot read more than 32 bits at a time');
    }

    this.bitsAvailable -= bits;

    if (this.bitsAvailable > 0) {
      this.word <<= bits;
    } else if (this.bytesAvailable > 0) {
      this.loadWord();
    }

    bits = size - bits;

    if (bits > 0 && this.bitsAvailable) {
      return valu << bits | this.readBits(bits);
    } else {
      return valu;
    }
  } // ():uint
  ;

  _proto.skipLZ = function skipLZ() {
    var leadingZeroCount; // :uint

    for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
      if ((this.word & 0x80000000 >>> leadingZeroCount) !== 0) {
        // the first bit of working word is 1
        this.word <<= leadingZeroCount;
        this.bitsAvailable -= leadingZeroCount;
        return leadingZeroCount;
      }
    } // we exhausted word and still have not found a 1


    this.loadWord();
    return leadingZeroCount + this.skipLZ();
  } // ():void
  ;

  _proto.skipUEG = function skipUEG() {
    this.skipBits(1 + this.skipLZ());
  } // ():void
  ;

  _proto.skipEG = function skipEG() {
    this.skipBits(1 + this.skipLZ());
  } // ():uint
  ;

  _proto.readUEG = function readUEG() {
    var clz = this.skipLZ(); // :uint

    return this.readBits(clz + 1) - 1;
  } // ():int
  ;

  _proto.readEG = function readEG() {
    var valu = this.readUEG(); // :int

    if (0x01 & valu) {
      // the number is odd if the low order bit is set
      return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
    } else {
      return -1 * (valu >>> 1); // divide by two then make it negative
    }
  } // Some convenience functions
  // :Boolean
  ;

  _proto.readBoolean = function readBoolean() {
    return this.readBits(1) === 1;
  } // ():int
  ;

  _proto.readUByte = function readUByte() {
    return this.readBits(8);
  } // ():int
  ;

  _proto.readUShort = function readUShort() {
    return this.readBits(16);
  } // ():int
  ;

  _proto.readUInt = function readUInt() {
    return this.readBits(32);
  }
  /**
   * Advance the ExpGolomb decoder past a scaling list. The scaling
   * list is optionally transmitted as part of a sequence parameter
   * set and is not relevant to transmuxing.
   * @param count {number} the number of entries in this scaling list
   * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
   */
  ;

  _proto.skipScalingList = function skipScalingList(count) {
    var lastScale = 8,
        nextScale = 8,
        j,
        deltaScale;

    for (j = 0; j < count; j++) {
      if (nextScale !== 0) {
        deltaScale = this.readEG();
        nextScale = (lastScale + deltaScale + 256) % 256;
      }

      lastScale = nextScale === 0 ? lastScale : nextScale;
    }
  }
  /**
   * Read a sequence parameter set and return some interesting video
   * properties. A sequence parameter set is the H264 metadata that
   * describes the properties of upcoming video frames.
   * @param data {Uint8Array} the bytes of a sequence parameter set
   * @return {object} an object with configuration parsed from the
   * sequence parameter set, including the dimensions of the
   * associated video frames.
   */
  ;

  _proto.readSPS = function readSPS() {
    var frameCropLeftOffset = 0,
        frameCropRightOffset = 0,
        frameCropTopOffset = 0,
        frameCropBottomOffset = 0,
        profileIdc,
        profileCompat,
        levelIdc,
        numRefFramesInPicOrderCntCycle,
        picWidthInMbsMinus1,
        picHeightInMapUnitsMinus1,
        frameMbsOnlyFlag,
        scalingListCount,
        i,
        readUByte = this.readUByte.bind(this),
        readBits = this.readBits.bind(this),
        readUEG = this.readUEG.bind(this),
        readBoolean = this.readBoolean.bind(this),
        skipBits = this.skipBits.bind(this),
        skipEG = this.skipEG.bind(this),
        skipUEG = this.skipUEG.bind(this),
        skipScalingList = this.skipScalingList.bind(this);
    readUByte();
    profileIdc = readUByte(); // profile_idc

    profileCompat = readBits(5); // constraint_set[0-4]_flag, u(5)

    skipBits(3); // reserved_zero_3bits u(3),

    levelIdc = readUByte(); // level_idc u(8)

    skipUEG(); // seq_parameter_set_id
    // some profiles have more optional data we don't need

    if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128) {
      var chromaFormatIdc = readUEG();

      if (chromaFormatIdc === 3) {
        skipBits(1);
      } // separate_colour_plane_flag


      skipUEG(); // bit_depth_luma_minus8

      skipUEG(); // bit_depth_chroma_minus8

      skipBits(1); // qpprime_y_zero_transform_bypass_flag

      if (readBoolean()) {
        // seq_scaling_matrix_present_flag
        scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;

        for (i = 0; i < scalingListCount; i++) {
          if (readBoolean()) {
            // seq_scaling_list_present_flag[ i ]
            if (i < 6) {
              skipScalingList(16);
            } else {
              skipScalingList(64);
            }
          }
        }
      }
    }

    skipUEG(); // log2_max_frame_num_minus4

    var picOrderCntType = readUEG();

    if (picOrderCntType === 0) {
      readUEG(); // log2_max_pic_order_cnt_lsb_minus4
    } else if (picOrderCntType === 1) {
      skipBits(1); // delta_pic_order_always_zero_flag

      skipEG(); // offset_for_non_ref_pic

      skipEG(); // offset_for_top_to_bottom_field

      numRefFramesInPicOrderCntCycle = readUEG();

      for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
        skipEG();
      } // offset_for_ref_frame[ i ]

    }

    skipUEG(); // max_num_ref_frames

    skipBits(1); // gaps_in_frame_num_value_allowed_flag

    picWidthInMbsMinus1 = readUEG();
    picHeightInMapUnitsMinus1 = readUEG();
    frameMbsOnlyFlag = readBits(1);

    if (frameMbsOnlyFlag === 0) {
      skipBits(1);
    } // mb_adaptive_frame_field_flag


    skipBits(1); // direct_8x8_inference_flag

    if (readBoolean()) {
      // frame_cropping_flag
      frameCropLeftOffset = readUEG();
      frameCropRightOffset = readUEG();
      frameCropTopOffset = readUEG();
      frameCropBottomOffset = readUEG();
    }

    var pixelRatio = [1, 1];

    if (readBoolean()) {
      // vui_parameters_present_flag
      if (readBoolean()) {
        // aspect_ratio_info_present_flag
        var aspectRatioIdc = readUByte();

        switch (aspectRatioIdc) {
          case 1:
            pixelRatio = [1, 1];
            break;

          case 2:
            pixelRatio = [12, 11];
            break;

          case 3:
            pixelRatio = [10, 11];
            break;

          case 4:
            pixelRatio = [16, 11];
            break;

          case 5:
            pixelRatio = [40, 33];
            break;

          case 6:
            pixelRatio = [24, 11];
            break;

          case 7:
            pixelRatio = [20, 11];
            break;

          case 8:
            pixelRatio = [32, 11];
            break;

          case 9:
            pixelRatio = [80, 33];
            break;

          case 10:
            pixelRatio = [18, 11];
            break;

          case 11:
            pixelRatio = [15, 11];
            break;

          case 12:
            pixelRatio = [64, 33];
            break;

          case 13:
            pixelRatio = [160, 99];
            break;

          case 14:
            pixelRatio = [4, 3];
            break;

          case 15:
            pixelRatio = [3, 2];
            break;

          case 16:
            pixelRatio = [2, 1];
            break;

          case 255:
            {
              pixelRatio = [readUByte() << 8 | readUByte(), readUByte() << 8 | readUByte()];
              break;
            }
        }
      }
    }

    return {
      width: Math.ceil((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2),
      height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset),
      pixelRatio: pixelRatio
    };
  };

  _proto.readSliceType = function readSliceType() {
    // skip NALu type
    this.readUByte(); // discard first_mb_in_slice

    this.readUEG(); // return slice_type

    return this.readUEG();
  };

  return ExpGolomb;
}();

/* harmony default export */ var exp_golomb = (exp_golomb_ExpGolomb);
// CONCATENATED MODULE: ./src/demux/sample-aes.js
/**
 * SAMPLE-AES decrypter
*/


var sample_aes_SampleAesDecrypter = /*#__PURE__*/function () {
  function SampleAesDecrypter(observer, config, decryptdata, discardEPB) {
    this.decryptdata = decryptdata;
    this.discardEPB = discardEPB;
    this.decrypter = new crypt_decrypter["default"](observer, config, {
      removePKCS7Padding: false
    });
  }

  var _proto = SampleAesDecrypter.prototype;

  _proto.decryptBuffer = function decryptBuffer(encryptedData, callback) {
    this.decrypter.decrypt(encryptedData, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, callback);
  } // AAC - encrypt all full 16 bytes blocks starting from offset 16
  ;

  _proto.decryptAacSample = function decryptAacSample(samples, sampleIndex, callback, sync) {
    var curUnit = samples[sampleIndex].unit;
    var encryptedData = curUnit.subarray(16, curUnit.length - curUnit.length % 16);
    var encryptedBuffer = encryptedData.buffer.slice(encryptedData.byteOffset, encryptedData.byteOffset + encryptedData.length);
    var localthis = this;
    this.decryptBuffer(encryptedBuffer, function (decryptedData) {
      decryptedData = new Uint8Array(decryptedData);
      curUnit.set(decryptedData, 16);

      if (!sync) {
        localthis.decryptAacSamples(samples, sampleIndex + 1, callback);
      }
    });
  };

  _proto.decryptAacSamples = function decryptAacSamples(samples, sampleIndex, callback) {
    for (;; sampleIndex++) {
      if (sampleIndex >= samples.length) {
        callback();
        return;
      }

      if (samples[sampleIndex].unit.length < 32) {
        continue;
      }

      var sync = this.decrypter.isSync();
      this.decryptAacSample(samples, sampleIndex, callback, sync);

      if (!sync) {
        return;
      }
    }
  } // AVC - encrypt one 16 bytes block out of ten, starting from offset 32
  ;

  _proto.getAvcEncryptedData = function getAvcEncryptedData(decodedData) {
    var encryptedDataLen = Math.floor((decodedData.length - 48) / 160) * 16 + 16;
    var encryptedData = new Int8Array(encryptedDataLen);
    var outputPos = 0;

    for (var inputPos = 32; inputPos <= decodedData.length - 16; inputPos += 160, outputPos += 16) {
      encryptedData.set(decodedData.subarray(inputPos, inputPos + 16), outputPos);
    }

    return encryptedData;
  };

  _proto.getAvcDecryptedUnit = function getAvcDecryptedUnit(decodedData, decryptedData) {
    decryptedData = new Uint8Array(decryptedData);
    var inputPos = 0;

    for (var outputPos = 32; outputPos <= decodedData.length - 16; outputPos += 160, inputPos += 16) {
      decodedData.set(decryptedData.subarray(inputPos, inputPos + 16), outputPos);
    }

    return decodedData;
  };

  _proto.decryptAvcSample = function decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit, sync) {
    var decodedData = this.discardEPB(curUnit.data);
    var encryptedData = this.getAvcEncryptedData(decodedData);
    var localthis = this;
    this.decryptBuffer(encryptedData.buffer, function (decryptedData) {
      curUnit.data = localthis.getAvcDecryptedUnit(decodedData, decryptedData);

      if (!sync) {
        localthis.decryptAvcSamples(samples, sampleIndex, unitIndex + 1, callback);
      }
    });
  };

  _proto.decryptAvcSamples = function decryptAvcSamples(samples, sampleIndex, unitIndex, callback) {
    for (;; sampleIndex++, unitIndex = 0) {
      if (sampleIndex >= samples.length) {
        callback();
        return;
      }

      var curUnits = samples[sampleIndex].units;

      for (;; unitIndex++) {
        if (unitIndex >= curUnits.length) {
          break;
        }

        var curUnit = curUnits[unitIndex];

        if (curUnit.data.length <= 48 || curUnit.type !== 1 && curUnit.type !== 5) {
          continue;
        }

        var sync = this.decrypter.isSync();
        this.decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit, sync);

        if (!sync) {
          return;
        }
      }
    }
  };

  return SampleAesDecrypter;
}();

/* harmony default export */ var sample_aes = (sample_aes_SampleAesDecrypter);
// CONCATENATED MODULE: ./src/demux/tsdemuxer.js
/**
 * highly optimized TS demuxer:
 * parse PAT, PMT
 * extract PES packet from audio and video PIDs
 * extract AVC/H264 NAL units and AAC/ADTS samples from PES packet
 * trigger the remuxer upon parsing completion
 * it also tries to workaround as best as it can audio codec switch (HE-AAC to AAC and vice versa), without having to restart the MediaSource.
 * it also controls the remuxing process :
 * upon discontinuity or level switch detection, it will also notifies the remuxer so that it can reset its state.
*/




 // import Hex from '../utils/hex';



 // We are using fixed track IDs for driving the MP4 remuxer
// instead of following the TS PIDs.
// There is no reason not to do this and some browsers/SourceBuffer-demuxers
// may not like if there are TrackID "switches"
// See https://github.com/video-dev/hls.js/issues/1331
// Here we are mapping our internal track types to constant MP4 track IDs
// With MSE currently one can only have one track of each, and we are muxing
// whatever video/audio rendition in them.

var RemuxerTrackIdConfig = {
  video: 1,
  audio: 2,
  id3: 3,
  text: 4
};

var tsdemuxer_TSDemuxer = /*#__PURE__*/function () {
  function TSDemuxer(observer, remuxer, config, typeSupported) {
    this.observer = observer;
    this.config = config;
    this.typeSupported = typeSupported;
    this.remuxer = remuxer;
    this.sampleAes = null;
    this.pmtUnknownTypes = {};
  }

  var _proto = TSDemuxer.prototype;

  _proto.setDecryptData = function setDecryptData(decryptdata) {
    if (decryptdata != null && decryptdata.key != null && decryptdata.method === 'SAMPLE-AES') {
      this.sampleAes = new sample_aes(this.observer, this.config, decryptdata, this.discardEPB);
    } else {
      this.sampleAes = null;
    }
  };

  TSDemuxer.probe = function probe(data) {
    var syncOffset = TSDemuxer._syncOffset(data);

    if (syncOffset < 0) {
      return false;
    } else {
      if (syncOffset) {
        logger["logger"].warn("MPEG2-TS detected but first sync word found @ offset " + syncOffset + ", junk ahead ?");
      }

      return true;
    }
  };

  TSDemuxer._syncOffset = function _syncOffset(data) {
    // scan 1000 first bytes
    var scanwindow = Math.min(1000, data.length - 3 * 188);
    var i = 0;

    while (i < scanwindow) {
      // a TS fragment should contain at least 3 TS packets, a PAT, a PMT, and one PID, each starting with 0x47
      if (data[i] === 0x47 && data[i + 188] === 0x47 && data[i + 2 * 188] === 0x47) {
        return i;
      } else {
        i++;
      }
    }

    return -1;
  }
  /**
   * Creates a track model internal to demuxer used to drive remuxing input
   *
   * @param {string} type 'audio' | 'video' | 'id3' | 'text'
   * @param {number} duration
   * @return {object} TSDemuxer's internal track model
   */
  ;

  TSDemuxer.createTrack = function createTrack(type, duration) {
    return {
      container: type === 'video' || type === 'audio' ? 'video/mp2t' : undefined,
      type: type,
      id: RemuxerTrackIdConfig[type],
      pid: -1,
      inputTimeScale: 90000,
      sequenceNumber: 0,
      samples: [],
      dropped: type === 'video' ? 0 : undefined,
      isAAC: type === 'audio' ? true : undefined,
      duration: type === 'audio' ? duration : undefined
    };
  }
  /**
   * Initializes a new init segment on the demuxer/remuxer interface. Needed for discontinuities/track-switches (or at stream start)
   * Resets all internal track instances of the demuxer.
   *
   * @override Implements generic demuxing/remuxing interface (see DemuxerInline)
   * @param {object} initSegment
   * @param {string} audioCodec
   * @param {string} videoCodec
   * @param {number} duration (in TS timescale = 90kHz)
   */
  ;

  _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, duration) {
    this.pmtParsed = false;
    this._pmtId = -1;
    this.pmtUnknownTypes = {};
    this._avcTrack = TSDemuxer.createTrack('video', duration);
    this._audioTrack = TSDemuxer.createTrack('audio', duration);
    this._id3Track = TSDemuxer.createTrack('id3', duration);
    this._txtTrack = TSDemuxer.createTrack('text', duration); // flush any partial content

    this.aacOverFlow = null;
    this.aacLastPTS = null;
    this.avcSample = null;
    this.audioCodec = audioCodec;
    this.videoCodec = videoCodec;
    this._duration = duration;
  }
  /**
   *
   * @override
   */
  ;

  _proto.resetTimeStamp = function resetTimeStamp() {} // feed incoming data to the front of the parsing pipeline
  ;

  _proto.append = function append(data, timeOffset, contiguous, accurateTimeOffset) {
    var start,
        len = data.length,
        stt,
        pid,
        atf,
        offset,
        pes,
        unknownPIDs = false;
    this.pmtUnknownTypes = {};
    this.contiguous = contiguous;

    var pmtParsed = this.pmtParsed,
        avcTrack = this._avcTrack,
        audioTrack = this._audioTrack,
        id3Track = this._id3Track,
        avcId = avcTrack.pid,
        audioId = audioTrack.pid,
        id3Id = id3Track.pid,
        pmtId = this._pmtId,
        avcData = avcTrack.pesData,
        audioData = audioTrack.pesData,
        id3Data = id3Track.pesData,
        parsePAT = this._parsePAT,
        parsePMT = this._parsePMT.bind(this),
        parsePES = this._parsePES,
        parseAVCPES = this._parseAVCPES.bind(this),
        parseAACPES = this._parseAACPES.bind(this),
        parseMPEGPES = this._parseMPEGPES.bind(this),
        parseID3PES = this._parseID3PES.bind(this);

    var syncOffset = TSDemuxer._syncOffset(data); // don't parse last TS packet if incomplete


    len -= (len + syncOffset) % 188; // loop through TS packets

    for (start = syncOffset; start < len; start += 188) {
      if (data[start] === 0x47) {
        stt = !!(data[start + 1] & 0x40); // pid is a 13-bit field starting at the last bit of TS[1]

        pid = ((data[start + 1] & 0x1f) << 8) + data[start + 2];
        atf = (data[start + 3] & 0x30) >> 4; // if an adaption field is present, its length is specified by the fifth byte of the TS packet header.

        if (atf > 1) {
          offset = start + 5 + data[start + 4]; // continue if there is only adaptation field

          if (offset === start + 188) {
            continue;
          }
        } else {
          offset = start + 4;
        }

        switch (pid) {
          case avcId:
            if (stt) {
              if (avcData && (pes = parsePES(avcData))) {
                parseAVCPES(pes, false);
              }

              avcData = {
                data: [],
                size: 0
              };
            }

            if (avcData) {
              avcData.data.push(data.subarray(offset, start + 188));
              avcData.size += start + 188 - offset;
            }

            break;

          case audioId:
            if (stt) {
              if (audioData && (pes = parsePES(audioData))) {
                if (audioTrack.isAAC) {
                  parseAACPES(pes);
                } else {
                  parseMPEGPES(pes);
                }
              }

              audioData = {
                data: [],
                size: 0
              };
            }

            if (audioData) {
              audioData.data.push(data.subarray(offset, start + 188));
              audioData.size += start + 188 - offset;
            }

            break;

          case id3Id:
            if (stt) {
              if (id3Data && (pes = parsePES(id3Data))) {
                parseID3PES(pes);
              }

              id3Data = {
                data: [],
                size: 0
              };
            }

            if (id3Data) {
              id3Data.data.push(data.subarray(offset, start + 188));
              id3Data.size += start + 188 - offset;
            }

            break;

          case 0:
            if (stt) {
              offset += data[offset] + 1;
            }

            pmtId = this._pmtId = parsePAT(data, offset);
            break;

          case pmtId:
            if (stt) {
              offset += data[offset] + 1;
            }

            var parsedPIDs = parsePMT(data, offset, this.typeSupported.mpeg === true || this.typeSupported.mp3 === true, this.sampleAes != null); // only update track id if track PID found while parsing PMT
            // this is to avoid resetting the PID to -1 in case
            // track PID transiently disappears from the stream
            // this could happen in case of transient missing audio samples for example
            // NOTE this is only the PID of the track as found in TS,
            // but we are not using this for MP4 track IDs.

            avcId = parsedPIDs.avc;

            if (avcId > 0) {
              avcTrack.pid = avcId;
            }

            audioId = parsedPIDs.audio;

            if (audioId > 0) {
              audioTrack.pid = audioId;
              audioTrack.isAAC = parsedPIDs.isAAC;
            }

            id3Id = parsedPIDs.id3;

            if (id3Id > 0) {
              id3Track.pid = id3Id;
            }

            if (unknownPIDs && !pmtParsed) {
              logger["logger"].log('reparse from beginning');
              unknownPIDs = false; // we set it to -188, the += 188 in the for loop will reset start to 0

              start = syncOffset - 188;
            }

            pmtParsed = this.pmtParsed = true;
            break;

          case 17:
          case 0x1fff:
            break;

          default:
            unknownPIDs = true;
            break;
        }
      } else {
        this.observer.trigger(events["default"].ERROR, {
          type: errors["ErrorTypes"].MEDIA_ERROR,
          details: errors["ErrorDetails"].FRAG_PARSING_ERROR,
          fatal: false,
          reason: 'TS packet did not start with 0x47'
        });
      }
    } // try to parse last PES packets


    if (avcData && (pes = parsePES(avcData))) {
      parseAVCPES(pes, true);
      avcTrack.pesData = null;
    } else {
      // either avcData null or PES truncated, keep it for next frag parsing
      avcTrack.pesData = avcData;
    }

    if (audioData && (pes = parsePES(audioData))) {
      if (audioTrack.isAAC) {
        parseAACPES(pes);
      } else {
        parseMPEGPES(pes);
      }

      audioTrack.pesData = null;
    } else {
      if (audioData && audioData.size) {
        logger["logger"].log('last AAC PES packet truncated,might overlap between fragments');
      } // either audioData null or PES truncated, keep it for next frag parsing


      audioTrack.pesData = audioData;
    }

    if (id3Data && (pes = parsePES(id3Data))) {
      parseID3PES(pes);
      id3Track.pesData = null;
    } else {
      // either id3Data null or PES truncated, keep it for next frag parsing
      id3Track.pesData = id3Data;
    }

    if (this.sampleAes == null) {
      this.remuxer.remux(audioTrack, avcTrack, id3Track, this._txtTrack, timeOffset, contiguous, accurateTimeOffset);
    } else {
      this.decryptAndRemux(audioTrack, avcTrack, id3Track, this._txtTrack, timeOffset, contiguous, accurateTimeOffset);
    }
  };

  _proto.decryptAndRemux = function decryptAndRemux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset) {
    if (audioTrack.samples && audioTrack.isAAC) {
      var localthis = this;
      this.sampleAes.decryptAacSamples(audioTrack.samples, 0, function () {
        localthis.decryptAndRemuxAvc(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset);
      });
    } else {
      this.decryptAndRemuxAvc(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset);
    }
  };

  _proto.decryptAndRemuxAvc = function decryptAndRemuxAvc(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset) {
    if (videoTrack.samples) {
      var localthis = this;
      this.sampleAes.decryptAvcSamples(videoTrack.samples, 0, 0, function () {
        localthis.remuxer.remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset);
      });
    } else {
      this.remuxer.remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset);
    }
  };

  _proto.destroy = function destroy() {
    this._initPTS = this._initDTS = undefined;
    this._duration = 0;
  };

  _proto._parsePAT = function _parsePAT(data, offset) {
    // skip the PSI header and parse the first PMT entry
    return (data[offset + 10] & 0x1F) << 8 | data[offset + 11]; // logger.log('PMT PID:'  + this._pmtId);
  };

  _proto._trackUnknownPmt = function _trackUnknownPmt(type, logLevel, message) {
    // Only log unknown and unsupported stream types once per append or stream (by resetting this.pmtUnknownTypes)
    // For more information on elementary stream types see:
    // https://en.wikipedia.org/wiki/Program-specific_information#Elementary_stream_types
    var result = this.pmtUnknownTypes[type] || 0;

    if (result === 0) {
      this.pmtUnknownTypes[type] = 0;
      logLevel.call(logger["logger"], message);
    }

    this.pmtUnknownTypes[type]++;
    return result;
  };

  _proto._parsePMT = function _parsePMT(data, offset, mpegSupported, isSampleAes) {
    var sectionLength,
        tableEnd,
        programInfoLength,
        pid,
        result = {
      audio: -1,
      avc: -1,
      id3: -1,
      isAAC: true
    };
    sectionLength = (data[offset + 1] & 0x0f) << 8 | data[offset + 2];
    tableEnd = offset + 3 + sectionLength - 4; // to determine where the table is, we have to figure out how
    // long the program info descriptors are

    programInfoLength = (data[offset + 10] & 0x0f) << 8 | data[offset + 11]; // advance the offset to the first entry in the mapping table

    offset += 12 + programInfoLength;

    while (offset < tableEnd) {
      pid = (data[offset + 1] & 0x1F) << 8 | data[offset + 2];

      switch (data[offset]) {
        case 0xcf:
          // SAMPLE-AES AAC
          if (!isSampleAes) {
            this._trackUnknownPmt(data[offset], logger["logger"].warn, 'ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream');

            break;
          }

        /* falls through */
        // ISO/IEC 13818-7 ADTS AAC (MPEG-2 lower bit-rate audio)

        case 0x0f:
          // logger.log('AAC PID:'  + pid);
          if (result.audio === -1) {
            result.audio = pid;
          }

          break;
        // Packetized metadata (ID3)

        case 0x15:
          // logger.log('ID3 PID:'  + pid);
          if (result.id3 === -1) {
            result.id3 = pid;
          }

          break;

        case 0xdb:
          // SAMPLE-AES AVC
          if (!isSampleAes) {
            this._trackUnknownPmt(data[offset], logger["logger"].warn, 'H.264 with AES-128-CBC slice encryption found in unencrypted stream');

            break;
          }

        /* falls through */
        // ITU-T Rec. H.264 and ISO/IEC 14496-10 (lower bit-rate video)

        case 0x1b:
          // logger.log('AVC PID:'  + pid);
          if (result.avc === -1) {
            result.avc = pid;
          }

          break;
        // ISO/IEC 11172-3 (MPEG-1 audio)
        // or ISO/IEC 13818-3 (MPEG-2 halved sample rate audio)

        case 0x03:
        case 0x04:
          // logger.log('MPEG PID:'  + pid);
          if (!mpegSupported) {
            this._trackUnknownPmt(data[offset], logger["logger"].warn, 'MPEG audio found, not supported in this browser');
          } else if (result.audio === -1) {
            result.audio = pid;
            result.isAAC = false;
          }

          break;

        case 0x24:
          this._trackUnknownPmt(data[offset], logger["logger"].warn, 'Unsupported HEVC stream type found');

          break;

        default:
          this._trackUnknownPmt(data[offset], logger["logger"].log, 'Unknown stream type:' + data[offset]);

          break;
      } // move to the next table entry
      // skip past the elementary stream descriptors, if present


      offset += ((data[offset + 3] & 0x0F) << 8 | data[offset + 4]) + 5;
    }

    return result;
  };

  _proto._parsePES = function _parsePES(stream) {
    var i = 0,
        frag,
        pesFlags,
        pesPrefix,
        pesLen,
        pesHdrLen,
        pesData,
        pesPts,
        pesDts,
        payloadStartOffset,
        data = stream.data; // safety check

    if (!stream || stream.size === 0) {
      return null;
    } // we might need up to 19 bytes to read PES header
    // if first chunk of data is less than 19 bytes, let's merge it with following ones until we get 19 bytes
    // usually only one merge is needed (and this is rare ...)


    while (data[0].length < 19 && data.length > 1) {
      var newData = new Uint8Array(data[0].length + data[1].length);
      newData.set(data[0]);
      newData.set(data[1], data[0].length);
      data[0] = newData;
      data.splice(1, 1);
    } // retrieve PTS/DTS from first fragment


    frag = data[0];
    pesPrefix = (frag[0] << 16) + (frag[1] << 8) + frag[2];

    if (pesPrefix === 1) {
      pesLen = (frag[4] << 8) + frag[5]; // if PES parsed length is not zero and greater than total received length, stop parsing. PES might be truncated
      // minus 6 : PES header size

      if (pesLen && pesLen > stream.size - 6) {
        return null;
      }

      pesFlags = frag[7];

      if (pesFlags & 0xC0) {
        /* PES header described here : http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
            as PTS / DTS is 33 bit we cannot use bitwise operator in JS,
            as Bitwise operators treat their operands as a sequence of 32 bits */
        pesPts = (frag[9] & 0x0E) * 536870912 + // 1 << 29
        (frag[10] & 0xFF) * 4194304 + // 1 << 22
        (frag[11] & 0xFE) * 16384 + // 1 << 14
        (frag[12] & 0xFF) * 128 + // 1 << 7
        (frag[13] & 0xFE) / 2;

        if (pesFlags & 0x40) {
          pesDts = (frag[14] & 0x0E) * 536870912 + // 1 << 29
          (frag[15] & 0xFF) * 4194304 + // 1 << 22
          (frag[16] & 0xFE) * 16384 + // 1 << 14
          (frag[17] & 0xFF) * 128 + // 1 << 7
          (frag[18] & 0xFE) / 2;

          if (pesPts - pesDts > 60 * 90000) {
            logger["logger"].warn(Math.round((pesPts - pesDts) / 90000) + "s delta between PTS and DTS, align them");
            pesPts = pesDts;
          }
        } else {
          pesDts = pesPts;
        }
      }

      pesHdrLen = frag[8]; // 9 bytes : 6 bytes for PES header + 3 bytes for PES extension

      payloadStartOffset = pesHdrLen + 9;

      if (stream.size <= payloadStartOffset) {
        return null;
      }

      stream.size -= payloadStartOffset; // reassemble PES packet

      pesData = new Uint8Array(stream.size);

      for (var j = 0, dataLen = data.length; j < dataLen; j++) {
        frag = data[j];
        var len = frag.byteLength;

        if (payloadStartOffset) {
          if (payloadStartOffset > len) {
            // trim full frag if PES header bigger than frag
            payloadStartOffset -= len;
            continue;
          } else {
            // trim partial frag if PES header smaller than frag
            frag = frag.subarray(payloadStartOffset);
            len -= payloadStartOffset;
            payloadStartOffset = 0;
          }
        }

        pesData.set(frag, i);
        i += len;
      }

      if (pesLen) {
        // payload size : remove PES header + PES extension
        pesLen -= pesHdrLen + 3;
      }

      return {
        data: pesData,
        pts: pesPts,
        dts: pesDts,
        len: pesLen
      };
    } else {
      return null;
    }
  };

  _proto.pushAccesUnit = function pushAccesUnit(avcSample, avcTrack) {
    if (avcSample.units.length && avcSample.frame) {
      var samples = avcTrack.samples;
      var nbSamples = samples.length; // if sample does not have PTS/DTS, patch with last sample PTS/DTS

      if (isNaN(avcSample.pts)) {
        if (nbSamples) {
          var lastSample = samples[nbSamples - 1];
          avcSample.pts = lastSample.pts;
          avcSample.dts = lastSample.dts;
        } else {
          // dropping samples, no timestamp found
          avcTrack.dropped++;
          return;
        }
      } // only push AVC sample if starting with a keyframe is not mandatory OR
      //    if keyframe already found in this fragment OR
      //       keyframe found in last fragment (track.sps) AND
      //          samples already appended (we already found a keyframe in this fragment) OR fragment is contiguous


      if (!this.config.forceKeyFrameOnDiscontinuity || avcSample.key === true || avcTrack.sps && (nbSamples || this.contiguous)) {
        avcSample.id = nbSamples;
        samples.push(avcSample);
      } else {
        // dropped samples, track it
        avcTrack.dropped++;
      }
    }

    if (avcSample.debug.length) {
      logger["logger"].log(avcSample.pts + '/' + avcSample.dts + ':' + avcSample.debug);
    }
  };

  _proto._parseAVCPES = function _parseAVCPES(pes, last) {
    var _this = this;

    // logger.log('parse new PES');
    var track = this._avcTrack,
        units = this._parseAVCNALu(pes.data),
        debug = false,
        expGolombDecoder,
        avcSample = this.avcSample,
        push,
        spsfound = false,
        i,
        pushAccesUnit = this.pushAccesUnit.bind(this),
        createAVCSample = function createAVCSample(key, pts, dts, debug) {
      return {
        key: key,
        pts: pts,
        dts: dts,
        units: [],
        debug: debug
      };
    }; // free pes.data to save up some memory


    pes.data = null; // if new NAL units found and last sample still there, let's push ...
    // this helps parsing streams with missing AUD (only do this if AUD never found)

    if (avcSample && units.length && !track.audFound) {
      pushAccesUnit(avcSample, track);
      avcSample = this.avcSample = createAVCSample(false, pes.pts, pes.dts, '');
    }

    units.forEach(function (unit) {
      switch (unit.type) {
        // NDR
        case 1:
          push = true;

          if (!avcSample) {
            avcSample = _this.avcSample = createAVCSample(true, pes.pts, pes.dts, '');
          }

          if (debug) {
            avcSample.debug += 'NDR ';
          }

          avcSample.frame = true;
          var data = unit.data; // only check slice type to detect KF in case SPS found in same packet (any keyframe is preceded by SPS ...)

          if (spsfound && data.length > 4) {
            // retrieve slice type by parsing beginning of NAL unit (follow H264 spec, slice_header definition) to detect keyframe embedded in NDR
            var sliceType = new exp_golomb(data).readSliceType(); // 2 : I slice, 4 : SI slice, 7 : I slice, 9: SI slice
            // SI slice : A slice that is coded using intra prediction only and using quantisation of the prediction samples.
            // An SI slice can be coded such that its decoded samples can be constructed identically to an SP slice.
            // I slice: A slice that is not an SI slice that is decoded using intra prediction only.
            // if (sliceType === 2 || sliceType === 7) {

            if (sliceType === 2 || sliceType === 4 || sliceType === 7 || sliceType === 9) {
              avcSample.key = true;
            }
          }

          break;
        // IDR

        case 5:
          push = true; // handle PES not starting with AUD

          if (!avcSample) {
            avcSample = _this.avcSample = createAVCSample(true, pes.pts, pes.dts, '');
          }

          if (debug) {
            avcSample.debug += 'IDR ';
          }

          avcSample.key = true;
          avcSample.frame = true;
          break;
        // SEI

        case 6:
          push = true;

          if (debug && avcSample) {
            avcSample.debug += 'SEI ';
          }

          expGolombDecoder = new exp_golomb(_this.discardEPB(unit.data)); // skip frameType

          expGolombDecoder.readUByte();
          var payloadType = 0;
          var payloadSize = 0;
          var endOfCaptions = false;
          var b = 0;

          while (!endOfCaptions && expGolombDecoder.bytesAvailable > 1) {
            payloadType = 0;

            do {
              b = expGolombDecoder.readUByte();
              payloadType += b;
            } while (b === 0xFF); // Parse payload size.


            payloadSize = 0;

            do {
              b = expGolombDecoder.readUByte();
              payloadSize += b;
            } while (b === 0xFF); // TODO: there can be more than one payload in an SEI packet...
            // TODO: need to read type and size in a while loop to get them all


            if (payloadType === 4 && expGolombDecoder.bytesAvailable !== 0) {
              endOfCaptions = true;
              var countryCode = expGolombDecoder.readUByte();

              if (countryCode === 181) {
                var providerCode = expGolombDecoder.readUShort();

                if (providerCode === 49) {
                  var userStructure = expGolombDecoder.readUInt();

                  if (userStructure === 0x47413934) {
                    var userDataType = expGolombDecoder.readUByte(); // Raw CEA-608 bytes wrapped in CEA-708 packet

                    if (userDataType === 3) {
                      var firstByte = expGolombDecoder.readUByte();
                      var secondByte = expGolombDecoder.readUByte();
                      var totalCCs = 31 & firstByte;
                      var byteArray = [firstByte, secondByte];

                      for (i = 0; i < totalCCs; i++) {
                        // 3 bytes per CC
                        byteArray.push(expGolombDecoder.readUByte());
                        byteArray.push(expGolombDecoder.readUByte());
                        byteArray.push(expGolombDecoder.readUByte());
                      }

                      _this._insertSampleInOrder(_this._txtTrack.samples, {
                        type: 3,
                        pts: pes.pts,
                        bytes: byteArray
                      });
                    }
                  }
                }
              }
            } else if (payloadType === 5 && expGolombDecoder.bytesAvailable !== 0) {
              endOfCaptions = true;

              if (payloadSize > 16) {
                var uuidStrArray = [];

                for (i = 0; i < 16; i++) {
                  uuidStrArray.push(expGolombDecoder.readUByte().toString(16));

                  if (i === 3 || i === 5 || i === 7 || i === 9) {
                    uuidStrArray.push('-');
                  }
                }

                var length = payloadSize - 16;
                var userDataPayloadBytes = new Uint8Array(length);

                for (i = 0; i < length; i++) {
                  userDataPayloadBytes[i] = expGolombDecoder.readUByte();
                }

                _this._insertSampleInOrder(_this._txtTrack.samples, {
                  pts: pes.pts,
                  payloadType: payloadType,
                  uuid: uuidStrArray.join(''),
                  userDataBytes: userDataPayloadBytes,
                  userData: Object(id3["utf8ArrayToStr"])(userDataPayloadBytes.buffer)
                });
              }
            } else if (payloadSize < expGolombDecoder.bytesAvailable) {
              for (i = 0; i < payloadSize; i++) {
                expGolombDecoder.readUByte();
              }
            }
          }

          break;
        // SPS

        case 7:
          push = true;
          spsfound = true;

          if (debug && avcSample) {
            avcSample.debug += 'SPS ';
          }

          if (!track.sps) {
            expGolombDecoder = new exp_golomb(unit.data);
            var config = expGolombDecoder.readSPS();
            track.width = config.width;
            track.height = config.height;
            track.pixelRatio = config.pixelRatio;
            track.sps = [unit.data];
            track.duration = _this._duration;
            var codecarray = unit.data.subarray(1, 4);
            var codecstring = 'avc1.';

            for (i = 0; i < 3; i++) {
              var h = codecarray[i].toString(16);

              if (h.length < 2) {
                h = '0' + h;
              }

              codecstring += h;
            }

            track.codec = codecstring;
          }

          break;
        // PPS

        case 8:
          push = true;

          if (debug && avcSample) {
            avcSample.debug += 'PPS ';
          }

          if (!track.pps) {
            track.pps = [unit.data];
          }

          break;
        // AUD

        case 9:
          push = false;
          track.audFound = true;

          if (avcSample) {
            pushAccesUnit(avcSample, track);
          }

          avcSample = _this.avcSample = createAVCSample(false, pes.pts, pes.dts, debug ? 'AUD ' : '');
          break;
        // Filler Data

        case 12:
          push = false;
          break;

        default:
          push = false;

          if (avcSample) {
            avcSample.debug += 'unknown NAL ' + unit.type + ' ';
          }

          break;
      }

      if (avcSample && push) {
        var _units = avcSample.units;

        _units.push(unit);
      }
    }); // if last PES packet, push samples

    if (last && avcSample) {
      pushAccesUnit(avcSample, track);
      this.avcSample = null;
    }
  };

  _proto._insertSampleInOrder = function _insertSampleInOrder(arr, data) {
    var len = arr.length;

    if (len > 0) {
      if (data.pts >= arr[len - 1].pts) {
        arr.push(data);
      } else {
        for (var pos = len - 1; pos >= 0; pos--) {
          if (data.pts < arr[pos].pts) {
            arr.splice(pos, 0, data);
            break;
          }
        }
      }
    } else {
      arr.push(data);
    }
  };

  _proto._getLastNalUnit = function _getLastNalUnit() {
    var avcSample = this.avcSample,
        lastUnit; // try to fallback to previous sample if current one is empty

    if (!avcSample || avcSample.units.length === 0) {
      var track = this._avcTrack,
          samples = track.samples;
      avcSample = samples[samples.length - 1];
    }

    if (avcSample) {
      var units = avcSample.units;
      lastUnit = units[units.length - 1];
    }

    return lastUnit;
  };

  _proto._parseAVCNALu = function _parseAVCNALu(array) {
    var i = 0,
        len = array.byteLength,
        value,
        overflow,
        track = this._avcTrack,
        state = track.naluState || 0,
        lastState = state;
    var units = [],
        unit,
        unitType,
        lastUnitStart = -1,
        lastUnitType; // logger.log('PES:' + Hex.hexDump(array));

    if (state === -1) {
      // special use case where we found 3 or 4-byte start codes exactly at the end of previous PES packet
      lastUnitStart = 0; // NALu type is value read from offset 0

      lastUnitType = array[0] & 0x1f;
      state = 0;
      i = 1;
    }

    while (i < len) {
      value = array[i++]; // optimization. state 0 and 1 are the predominant case. let's handle them outside of the switch/case

      if (!state) {
        state = value ? 0 : 1;
        continue;
      }

      if (state === 1) {
        state = value ? 0 : 2;
        continue;
      } // here we have state either equal to 2 or 3


      if (!value) {
        state = 3;
      } else if (value === 1) {
        if (lastUnitStart >= 0) {
          unit = {
            data: array.subarray(lastUnitStart, i - state - 1),
            type: lastUnitType
          }; // logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);

          units.push(unit);
        } else {
          // lastUnitStart is undefined => this is the first start code found in this PES packet
          // first check if start code delimiter is overlapping between 2 PES packets,
          // ie it started in last packet (lastState not zero)
          // and ended at the beginning of this PES packet (i <= 4 - lastState)
          var lastUnit = this._getLastNalUnit();

          if (lastUnit) {
            if (lastState && i <= 4 - lastState) {
              // start delimiter overlapping between PES packets
              // strip start delimiter bytes from the end of last NAL unit
              // check if lastUnit had a state different from zero
              if (lastUnit.state) {
                // strip last bytes
                lastUnit.data = lastUnit.data.subarray(0, lastUnit.data.byteLength - lastState);
              }
            } // If NAL units are not starting right at the beginning of the PES packet, push preceding data into previous NAL unit.


            overflow = i - state - 1;

            if (overflow > 0) {
              // logger.log('first NALU found with overflow:' + overflow);
              var tmp = new Uint8Array(lastUnit.data.byteLength + overflow);
              tmp.set(lastUnit.data, 0);
              tmp.set(array.subarray(0, overflow), lastUnit.data.byteLength);
              lastUnit.data = tmp;
            }
          }
        } // check if we can read unit type


        if (i < len) {
          unitType = array[i] & 0x1f; // logger.log('find NALU @ offset:' + i + ',type:' + unitType);

          lastUnitStart = i;
          lastUnitType = unitType;
          state = 0;
        } else {
          // not enough byte to read unit type. let's read it on next PES parsing
          state = -1;
        }
      } else {
        state = 0;
      }
    }

    if (lastUnitStart >= 0 && state >= 0) {
      unit = {
        data: array.subarray(lastUnitStart, len),
        type: lastUnitType,
        state: state
      };
      units.push(unit); // logger.log('pushing NALU, type/size/state:' + unit.type + '/' + unit.data.byteLength + '/' + state);
    } // no NALu found


    if (units.length === 0) {
      // append pes.data to previous NAL unit
      var _lastUnit = this._getLastNalUnit();

      if (_lastUnit) {
        var _tmp = new Uint8Array(_lastUnit.data.byteLength + array.byteLength);

        _tmp.set(_lastUnit.data, 0);

        _tmp.set(array, _lastUnit.data.byteLength);

        _lastUnit.data = _tmp;
      }
    }

    track.naluState = state;
    return units;
  }
  /**
   * remove Emulation Prevention bytes from a RBSP
   */
  ;

  _proto.discardEPB = function discardEPB(data) {
    var length = data.byteLength,
        EPBPositions = [],
        i = 1,
        newLength,
        newData; // Find all `Emulation Prevention Bytes`

    while (i < length - 2) {
      if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
        EPBPositions.push(i + 2);
        i += 2;
      } else {
        i++;
      }
    } // If no Emulation Prevention Bytes were found just return the original
    // array


    if (EPBPositions.length === 0) {
      return data;
    } // Create a new array to hold the NAL unit data


    newLength = length - EPBPositions.length;
    newData = new Uint8Array(newLength);
    var sourceIndex = 0;

    for (i = 0; i < newLength; sourceIndex++, i++) {
      if (sourceIndex === EPBPositions[0]) {
        // Skip this byte
        sourceIndex++; // Remove this position index

        EPBPositions.shift();
      }

      newData[i] = data[sourceIndex];
    }

    return newData;
  };

  _proto._parseAACPES = function _parseAACPES(pes) {
    var track = this._audioTrack,
        data = pes.data,
        pts = pes.pts,
        startOffset = 0,
        aacOverFlow = this.aacOverFlow,
        aacLastPTS = this.aacLastPTS,
        frameDuration,
        frameIndex,
        offset,
        stamp,
        len;

    if (aacOverFlow) {
      var tmp = new Uint8Array(aacOverFlow.byteLength + data.byteLength);
      tmp.set(aacOverFlow, 0);
      tmp.set(data, aacOverFlow.byteLength); // logger.log(`AAC: append overflowing ${aacOverFlow.byteLength} bytes to beginning of new PES`);

      data = tmp;
    } // look for ADTS header (0xFFFx)


    for (offset = startOffset, len = data.length; offset < len - 1; offset++) {
      if (isHeader(data, offset)) {
        break;
      }
    } // if ADTS header does not start straight from the beginning of the PES payload, raise an error


    if (offset) {
      var reason, fatal;

      if (offset < len - 1) {
        reason = "AAC PES did not start with ADTS header,offset:" + offset;
        fatal = false;
      } else {
        reason = 'no ADTS header found in AAC PES';
        fatal = true;
      }

      logger["logger"].warn("parsing error:" + reason);
      this.observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].FRAG_PARSING_ERROR,
        fatal: fatal,
        reason: reason
      });

      if (fatal) {
        return;
      }
    }

    initTrackConfig(track, this.observer, data, offset, this.audioCodec);
    frameIndex = 0;
    frameDuration = getFrameDuration(track.samplerate); // if last AAC frame is overflowing, we should ensure timestamps are contiguous:
    // first sample PTS should be equal to last sample PTS + frameDuration

    if (aacOverFlow && aacLastPTS) {
      var newPTS = aacLastPTS + frameDuration;

      if (Math.abs(newPTS - pts) > 1) {
        logger["logger"].log("AAC: align PTS for overlapping frames by " + Math.round((newPTS - pts) / 90));
        pts = newPTS;
      }
    } // scan for aac samples


    while (offset < len) {
      if (isHeader(data, offset)) {
        if (offset + 5 < len) {
          var frame = appendFrame(track, data, offset, pts, frameIndex);

          if (frame) {
            offset += frame.length;
            stamp = frame.sample.pts;
            frameIndex++;
            continue;
          }
        } // We are at an ADTS header, but do not have enough data for a frame
        // Remaining data will be added to aacOverFlow


        break;
      } else {
        // nothing found, keep looking
        offset++;
      }
    }

    if (offset < len) {
      aacOverFlow = data.subarray(offset, len); // logger.log(`AAC: overflow detected:${len-offset}`);
    } else {
      aacOverFlow = null;
    }

    this.aacOverFlow = aacOverFlow;
    this.aacLastPTS = stamp;
  };

  _proto._parseMPEGPES = function _parseMPEGPES(pes) {
    var data = pes.data;
    var length = data.length;
    var frameIndex = 0;
    var offset = 0;
    var pts = pes.pts;

    while (offset < length) {
      if (mpegaudio.isHeader(data, offset)) {
        var frame = mpegaudio.appendFrame(this._audioTrack, data, offset, pts, frameIndex);

        if (frame) {
          offset += frame.length;
          frameIndex++;
        } else {
          // logger.log('Unable to parse Mpeg audio frame');
          break;
        }
      } else {
        // nothing found, keep looking
        offset++;
      }
    }
  };

  _proto._parseID3PES = function _parseID3PES(pes) {
    this._id3Track.samples.push(pes);
  };

  return TSDemuxer;
}();

/* harmony default export */ var tsdemuxer = (tsdemuxer_TSDemuxer);
// CONCATENATED MODULE: ./src/demux/mp3demuxer.js
/**
 * MP3 demuxer
 */




var mp3demuxer_MP3Demuxer = /*#__PURE__*/function () {
  function MP3Demuxer(observer, remuxer, config) {
    this.observer = observer;
    this.config = config;
    this.remuxer = remuxer;
  }

  var _proto = MP3Demuxer.prototype;

  _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, duration) {
    this._audioTrack = {
      container: 'audio/mpeg',
      type: 'audio',
      id: -1,
      sequenceNumber: 0,
      isAAC: false,
      samples: [],
      len: 0,
      manifestCodec: audioCodec,
      duration: duration,
      inputTimeScale: 90000
    };
  };

  _proto.resetTimeStamp = function resetTimeStamp() {};

  MP3Demuxer.probe = function probe(data) {
    // check if data contains ID3 timestamp and MPEG sync word
    var offset, length;
    var id3Data = id3["default"].getID3Data(data, 0);

    if (id3Data && id3["default"].getTimeStamp(id3Data) !== undefined) {
      // Look for MPEG header | 1111 1111 | 111X XYZX | where X can be either 0 or 1 and Y or Z should be 1
      // Layer bits (position 14 and 15) in header should be always different from 0 (Layer I or Layer II or Layer III)
      // More info http://www.mp3-tech.org/programmer/frame_header.html
      for (offset = id3Data.length, length = Math.min(data.length - 1, offset + 100); offset < length; offset++) {
        if (mpegaudio.probe(data, offset)) {
          logger["logger"].log('MPEG Audio sync word found !');
          return true;
        }
      }
    }

    return false;
  } // feed incoming data to the front of the parsing pipeline
  ;

  _proto.append = function append(data, timeOffset, contiguous, accurateTimeOffset) {
    var id3Data = id3["default"].getID3Data(data, 0) || [];
    var timestamp = id3["default"].getTimeStamp(id3Data);
    var pts = timestamp !== undefined ? 90 * timestamp : timeOffset * 90000;
    var offset = id3Data.length;
    var length = data.length;
    var frameIndex = 0,
        stamp = 0;
    var track = this._audioTrack;
    var id3Samples = [{
      pts: pts,
      dts: pts,
      data: id3Data
    }];

    while (offset < length) {
      if (mpegaudio.isHeader(data, offset)) {
        var frame = mpegaudio.appendFrame(track, data, offset, pts, frameIndex);

        if (frame) {
          offset += frame.length;
          stamp = frame.sample.pts;
          frameIndex++;
        } else {
          // logger.log('Unable to parse Mpeg audio frame');
          break;
        }
      } else if (id3["default"].isHeader(data, offset)) {
        id3Data = id3["default"].getID3Data(data, offset);
        id3Samples.push({
          pts: stamp,
          dts: stamp,
          data: id3Data
        });
        offset += id3Data.length;
      } else {
        // nothing found, keep looking
        offset++;
      }
    }

    this.remuxer.remux(track, {
      samples: []
    }, {
      samples: id3Samples,
      inputTimeScale: 90000
    }, {
      samples: []
    }, timeOffset, contiguous, accurateTimeOffset);
  };

  _proto.destroy = function destroy() {};

  return MP3Demuxer;
}();

/* harmony default export */ var mp3demuxer = (mp3demuxer_MP3Demuxer);
// CONCATENATED MODULE: ./src/remux/aac-helper.js
/**
 *  AAC helper
 */
var AAC = /*#__PURE__*/function () {
  function AAC() {}

  AAC.getSilentFrame = function getSilentFrame(codec, channelCount) {
    switch (codec) {
      case 'mp4a.40.2':
        if (channelCount === 1) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
        } else if (channelCount === 2) {
          return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
        } else if (channelCount === 3) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
        } else if (channelCount === 4) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
        } else if (channelCount === 5) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
        } else if (channelCount === 6) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
        }

        break;
      // handle HE-AAC below (mp4a.40.5 / mp4a.40.29)

      default:
        if (channelCount === 1) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0:d=0.05" -c:a libfdk_aac -profile:a aac_he -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x4e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x1c, 0x6, 0xf1, 0xc1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        } else if (channelCount === 2) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        } else if (channelCount === 3) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0|0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        }

        break;
    }

    return null;
  };

  return AAC;
}();

/* harmony default export */ var aac_helper = (AAC);
// CONCATENATED MODULE: ./src/remux/mp4-generator.js
/**
 * Generate MP4 Box
*/
var UINT32_MAX = Math.pow(2, 32) - 1;

var MP4 = /*#__PURE__*/function () {
  function MP4() {}

  MP4.init = function init() {
    MP4.types = {
      avc1: [],
      // codingname
      avcC: [],
      btrt: [],
      dinf: [],
      dref: [],
      esds: [],
      ftyp: [],
      hdlr: [],
      mdat: [],
      mdhd: [],
      mdia: [],
      mfhd: [],
      minf: [],
      moof: [],
      moov: [],
      mp4a: [],
      '.mp3': [],
      mvex: [],
      mvhd: [],
      pasp: [],
      sdtp: [],
      stbl: [],
      stco: [],
      stsc: [],
      stsd: [],
      stsz: [],
      stts: [],
      tfdt: [],
      tfhd: [],
      traf: [],
      trak: [],
      trun: [],
      trex: [],
      tkhd: [],
      vmhd: [],
      smhd: []
    };
    var i;

    for (i in MP4.types) {
      if (MP4.types.hasOwnProperty(i)) {
        MP4.types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
      }
    }

    var videoHdlr = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
    ]);
    var audioHdlr = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
    ]);
    MP4.HDLR_TYPES = {
      'video': videoHdlr,
      'audio': audioHdlr
    };
    var dref = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01, // entry_count
    0x00, 0x00, 0x00, 0x0c, // entry_size
    0x75, 0x72, 0x6c, 0x20, // 'url' type
    0x00, // version 0
    0x00, 0x00, 0x01 // entry_flags
    ]);
    var stco = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
    ]);
    MP4.STTS = MP4.STSC = MP4.STCO = stco;
    MP4.STSZ = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // sample_size
    0x00, 0x00, 0x00, 0x00 // sample_count
    ]);
    MP4.VMHD = new Uint8Array([0x00, // version
    0x00, 0x00, 0x01, // flags
    0x00, 0x00, // graphicsmode
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
    ]);
    MP4.SMHD = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, // balance
    0x00, 0x00 // reserved
    ]);
    MP4.STSD = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01]); // entry_count

    var majorBrand = new Uint8Array([105, 115, 111, 109]); // isom

    var avc1Brand = new Uint8Array([97, 118, 99, 49]); // avc1

    var minorVersion = new Uint8Array([0, 0, 0, 1]);
    MP4.FTYP = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, avc1Brand);
    MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
  };

  MP4.box = function box(type) {
    var payload = Array.prototype.slice.call(arguments, 1),
        size = 8,
        i = payload.length,
        len = i,
        result; // calculate the total size we need to allocate

    while (i--) {
      size += payload[i].byteLength;
    }

    result = new Uint8Array(size);
    result[0] = size >> 24 & 0xff;
    result[1] = size >> 16 & 0xff;
    result[2] = size >> 8 & 0xff;
    result[3] = size & 0xff;
    result.set(type, 4); // copy the payload into the result

    for (i = 0, size = 8; i < len; i++) {
      // copy payload[i] array @ offset size
      result.set(payload[i], size);
      size += payload[i].byteLength;
    }

    return result;
  };

  MP4.hdlr = function hdlr(type) {
    return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type]);
  };

  MP4.mdat = function mdat(data) {
    return MP4.box(MP4.types.mdat, data);
  };

  MP4.mdhd = function mdhd(timescale, duration) {
    duration *= timescale;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    return MP4.box(MP4.types.mdhd, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, // timescale
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xFF, upperWordDuration >> 8 & 0xFF, upperWordDuration & 0xFF, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xFF, lowerWordDuration >> 8 & 0xFF, lowerWordDuration & 0xFF, 0x55, 0xc4, // 'und' language (undetermined)
    0x00, 0x00]));
  };

  MP4.mdia = function mdia(track) {
    return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale, track.duration), MP4.hdlr(track.type), MP4.minf(track));
  };

  MP4.mfhd = function mfhd(sequenceNumber) {
    return MP4.box(MP4.types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // flags
    sequenceNumber >> 24, sequenceNumber >> 16 & 0xFF, sequenceNumber >> 8 & 0xFF, sequenceNumber & 0xFF // sequence_number
    ]));
  };

  MP4.minf = function minf(track) {
    if (track.type === 'audio') {
      return MP4.box(MP4.types.minf, MP4.box(MP4.types.smhd, MP4.SMHD), MP4.DINF, MP4.stbl(track));
    } else {
      return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
    }
  };

  MP4.moof = function moof(sn, baseMediaDecodeTime, track) {
    return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track, baseMediaDecodeTime));
  }
  /**
  * @param tracks... (optional) {array} the tracks associated with this movie
  */
  ;

  MP4.moov = function moov(tracks) {
    var i = tracks.length,
        boxes = [];

    while (i--) {
      boxes[i] = MP4.trak(tracks[i]);
    }

    return MP4.box.apply(null, [MP4.types.moov, MP4.mvhd(tracks[0].timescale, tracks[0].duration)].concat(boxes).concat(MP4.mvex(tracks)));
  };

  MP4.mvex = function mvex(tracks) {
    var i = tracks.length,
        boxes = [];

    while (i--) {
      boxes[i] = MP4.trex(tracks[i]);
    }

    return MP4.box.apply(null, [MP4.types.mvex].concat(boxes));
  };

  MP4.mvhd = function mvhd(timescale, duration) {
    duration *= timescale;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    var bytes = new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, // timescale
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xFF, upperWordDuration >> 8 & 0xFF, upperWordDuration & 0xFF, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xFF, lowerWordDuration >> 8 & 0xFF, lowerWordDuration & 0xFF, 0x00, 0x01, 0x00, 0x00, // 1.0 rate
    0x01, 0x00, // 1.0 volume
    0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
    0xff, 0xff, 0xff, 0xff // next_track_ID
    ]);
    return MP4.box(MP4.types.mvhd, bytes);
  };

  MP4.sdtp = function sdtp(track) {
    var samples = track.samples || [],
        bytes = new Uint8Array(4 + samples.length),
        flags,
        i; // leave the full box header (4 bytes) all zero
    // write the sample table

    for (i = 0; i < samples.length; i++) {
      flags = samples[i].flags;
      bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
    }

    return MP4.box(MP4.types.sdtp, bytes);
  };

  MP4.stbl = function stbl(track) {
    return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
  };

  MP4.avc1 = function avc1(track) {
    var sps = [],
        pps = [],
        i,
        data,
        len; // assemble the SPSs

    for (i = 0; i < track.sps.length; i++) {
      data = track.sps[i];
      len = data.byteLength;
      sps.push(len >>> 8 & 0xFF);
      sps.push(len & 0xFF); // SPS

      sps = sps.concat(Array.prototype.slice.call(data));
    } // assemble the PPSs


    for (i = 0; i < track.pps.length; i++) {
      data = track.pps[i];
      len = data.byteLength;
      pps.push(len >>> 8 & 0xFF);
      pps.push(len & 0xFF);
      pps = pps.concat(Array.prototype.slice.call(data));
    }

    var avcc = MP4.box(MP4.types.avcC, new Uint8Array([0x01, // version
    sps[3], // profile
    sps[4], // profile compat
    sps[5], // level
    0xfc | 3, // lengthSizeMinusOne, hard-coded to 4 bytes
    0xE0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
    ].concat(sps).concat([track.pps.length // numOfPictureParameterSets
    ]).concat(pps))),
        // "PPS"
    width = track.width,
        height = track.height,
        hSpacing = track.pixelRatio[0],
        vSpacing = track.pixelRatio[1];
    return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, // pre_defined
    0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
    width >> 8 & 0xFF, width & 0xff, // width
    height >> 8 & 0xFF, height & 0xff, // height
    0x00, 0x48, 0x00, 0x00, // horizresolution
    0x00, 0x48, 0x00, 0x00, // vertresolution
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // frame_count
    0x12, 0x64, 0x61, 0x69, 0x6C, // dailymotion/hls.js
    0x79, 0x6D, 0x6F, 0x74, 0x69, 0x6F, 0x6E, 0x2F, 0x68, 0x6C, 0x73, 0x2E, 0x6A, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
    0x00, 0x18, // depth = 24
    0x11, 0x11]), // pre_defined = -1
    avcc, MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
    0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
    0x00, 0x2d, 0xc6, 0xc0])), // avgBitrate
    MP4.box(MP4.types.pasp, new Uint8Array([hSpacing >> 24, // hSpacing
    hSpacing >> 16 & 0xFF, hSpacing >> 8 & 0xFF, hSpacing & 0xFF, vSpacing >> 24, // vSpacing
    vSpacing >> 16 & 0xFF, vSpacing >> 8 & 0xFF, vSpacing & 0xFF])));
  };

  MP4.esds = function esds(track) {
    var configlen = track.config.length;
    return new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x03, // descriptor_type
    0x17 + configlen, // length
    0x00, 0x01, // es_id
    0x00, // stream_priority
    0x04, // descriptor_type
    0x0f + configlen, // length
    0x40, // codec : mpeg4_audio
    0x15, // stream_type
    0x00, 0x00, 0x00, // buffer_size
    0x00, 0x00, 0x00, 0x00, // maxBitrate
    0x00, 0x00, 0x00, 0x00, // avgBitrate
    0x05 // descriptor_type
    ].concat([configlen]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
  };

  MP4.mp4a = function mp4a(track) {
    var samplerate = track.samplerate;
    return MP4.box(MP4.types.mp4a, new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, track.channelCount, // channelcount
    0x00, 0x10, // sampleSize:16bits
    0x00, 0x00, 0x00, 0x00, // reserved2
    samplerate >> 8 & 0xFF, samplerate & 0xff, //
    0x00, 0x00]), MP4.box(MP4.types.esds, MP4.esds(track)));
  };

  MP4.mp3 = function mp3(track) {
    var samplerate = track.samplerate;
    return MP4.box(MP4.types['.mp3'], new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, track.channelCount, // channelcount
    0x00, 0x10, // sampleSize:16bits
    0x00, 0x00, 0x00, 0x00, // reserved2
    samplerate >> 8 & 0xFF, samplerate & 0xff, //
    0x00, 0x00]));
  };

  MP4.stsd = function stsd(track) {
    if (track.type === 'audio') {
      if (!track.isAAC && track.codec === 'mp3') {
        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp3(track));
      }

      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track));
    } else {
      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
    }
  };

  MP4.tkhd = function tkhd(track) {
    var id = track.id,
        duration = track.duration * track.timescale,
        width = track.width,
        height = track.height,
        upperWordDuration = Math.floor(duration / (UINT32_MAX + 1)),
        lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    return MP4.box(MP4.types.tkhd, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x07, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    id >> 24 & 0xFF, id >> 16 & 0xFF, id >> 8 & 0xFF, id & 0xFF, // track_ID
    0x00, 0x00, 0x00, 0x00, // reserved
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xFF, upperWordDuration >> 8 & 0xFF, upperWordDuration & 0xFF, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xFF, lowerWordDuration >> 8 & 0xFF, lowerWordDuration & 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, // layer
    0x00, 0x00, // alternate_group
    0x00, 0x00, // non-audio track volume
    0x00, 0x00, // reserved
    0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
    width >> 8 & 0xFF, width & 0xFF, 0x00, 0x00, // width
    height >> 8 & 0xFF, height & 0xFF, 0x00, 0x00 // height
    ]));
  };

  MP4.traf = function traf(track, baseMediaDecodeTime) {
    var sampleDependencyTable = MP4.sdtp(track),
        id = track.id,
        upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1)),
        lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
    return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF // track_ID
    ])), MP4.box(MP4.types.tfdt, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    upperWordBaseMediaDecodeTime >> 24, upperWordBaseMediaDecodeTime >> 16 & 0XFF, upperWordBaseMediaDecodeTime >> 8 & 0XFF, upperWordBaseMediaDecodeTime & 0xFF, lowerWordBaseMediaDecodeTime >> 24, lowerWordBaseMediaDecodeTime >> 16 & 0XFF, lowerWordBaseMediaDecodeTime >> 8 & 0XFF, lowerWordBaseMediaDecodeTime & 0xFF])), MP4.trun(track, sampleDependencyTable.length + 16 + // tfhd
    20 + // tfdt
    8 + // traf header
    16 + // mfhd
    8 + // moof header
    8), // mdat header
    sampleDependencyTable);
  }
  /**
   * Generate a track box.
   * @param track {object} a track definition
   * @return {Uint8Array} the track box
   */
  ;

  MP4.trak = function trak(track) {
    track.duration = track.duration || 0xffffffff;
    return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
  };

  MP4.trex = function trex(track) {
    var id = track.id;
    return MP4.box(MP4.types.trex, new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF, // track_ID
    0x00, 0x00, 0x00, 0x01, // default_sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x01, 0x00, 0x01 // default_sample_flags
    ]));
  };

  MP4.trun = function trun(track, offset) {
    var samples = track.samples || [],
        len = samples.length,
        arraylen = 12 + 16 * len,
        array = new Uint8Array(arraylen),
        i,
        sample,
        duration,
        size,
        flags,
        cts;
    offset += 8 + arraylen;
    array.set([0x00, // version 0
    0x00, 0x0f, 0x01, // flags
    len >>> 24 & 0xFF, len >>> 16 & 0xFF, len >>> 8 & 0xFF, len & 0xFF, // sample_count
    offset >>> 24 & 0xFF, offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF // data_offset
    ], 0);

    for (i = 0; i < len; i++) {
      sample = samples[i];
      duration = sample.duration;
      size = sample.size;
      flags = sample.flags;
      cts = sample.cts;
      array.set([duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, // sample_duration
      size >>> 24 & 0xFF, size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, // sample_size
      flags.isLeading << 2 | flags.dependsOn, flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.paddingValue << 1 | flags.isNonSync, flags.degradPrio & 0xF0 << 8, flags.degradPrio & 0x0F, // sample_flags
      cts >>> 24 & 0xFF, cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF // sample_composition_time_offset
      ], 12 + 16 * i);
    }

    return MP4.box(MP4.types.trun, array);
  };

  MP4.initSegment = function initSegment(tracks) {
    if (!MP4.types) {
      MP4.init();
    }

    var movie = MP4.moov(tracks),
        result;
    result = new Uint8Array(MP4.FTYP.byteLength + movie.byteLength);
    result.set(MP4.FTYP);
    result.set(movie, MP4.FTYP.byteLength);
    return result;
  };

  return MP4;
}();

/* harmony default export */ var mp4_generator = (MP4);
// CONCATENATED MODULE: ./src/utils/timescale-conversion.ts
var MPEG_TS_CLOCK_FREQ_HZ = 90000;
function toTimescaleFromScale(value, destScale, srcScale, round) {
  if (srcScale === void 0) {
    srcScale = 1;
  }

  if (round === void 0) {
    round = false;
  }

  return toTimescaleFromBase(value, destScale, 1 / srcScale);
}
function toTimescaleFromBase(value, destScale, srcBase, round) {
  if (srcBase === void 0) {
    srcBase = 1;
  }

  if (round === void 0) {
    round = false;
  }

  var result = value * destScale * srcBase; // equivalent to `(value * scale) / (1 / base)`

  return round ? Math.round(result) : result;
}
function toMsFromMpegTsClock(value, round) {
  if (round === void 0) {
    round = false;
  }

  return toTimescaleFromBase(value, 1000, 1 / MPEG_TS_CLOCK_FREQ_HZ, round);
}
function toMpegTsClockFromTimescale(value, srcScale) {
  if (srcScale === void 0) {
    srcScale = 1;
  }

  return toTimescaleFromBase(value, MPEG_TS_CLOCK_FREQ_HZ, 1 / srcScale);
}
// CONCATENATED MODULE: ./src/remux/mp4-remuxer.js
/**
 * fMP4 remuxer
*/






var MAX_SILENT_FRAME_DURATION_90KHZ = toMpegTsClockFromTimescale(10);
var PTS_DTS_SHIFT_TOLERANCE_90KHZ = toMpegTsClockFromTimescale(0.2);
var chromeVersion = null;

var mp4_remuxer_MP4Remuxer = /*#__PURE__*/function () {
  function MP4Remuxer(observer, config, typeSupported, vendor) {
    this.observer = observer;
    this.config = config;
    this.typeSupported = typeSupported;
    this.ISGenerated = false;

    if (chromeVersion === null) {
      var result = navigator.userAgent.match(/Chrome\/(\d+)/i);
      chromeVersion = result ? parseInt(result[1]) : 0;
    }
  }

  var _proto = MP4Remuxer.prototype;

  _proto.destroy = function destroy() {};

  _proto.resetTimeStamp = function resetTimeStamp(defaultTimeStamp) {
    this._initPTS = this._initDTS = defaultTimeStamp;
  };

  _proto.resetInitSegment = function resetInitSegment() {
    this.ISGenerated = false;
  };

  _proto.getVideoStartPts = function getVideoStartPts(videoSamples) {
    var rolloverDetected = false;
    var startPTS = videoSamples.reduce(function (minPTS, sample) {
      var delta = sample.pts - minPTS;

      if (delta < -4294967296) {
        // 2^32, see PTSNormalize for reasoning, but we're hitting a rollover here, and we don't want that to impact the timeOffset calculation
        rolloverDetected = true;
        return PTSNormalize(minPTS, sample.pts);
      } else if (delta > 0) {
        return minPTS;
      } else {
        return sample.pts;
      }
    }, videoSamples[0].pts);

    if (rolloverDetected) {
      logger["logger"].debug('PTS rollover detected');
    }

    return startPTS;
  };

  _proto.remux = function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset) {
    // generate Init Segment if needed
    if (!this.ISGenerated) {
      this.generateIS(audioTrack, videoTrack, timeOffset);
    }

    if (this.ISGenerated) {
      var nbAudioSamples = audioTrack.samples.length;
      var nbVideoSamples = videoTrack.samples.length;
      var audioTimeOffset = timeOffset;
      var videoTimeOffset = timeOffset;

      if (nbAudioSamples && nbVideoSamples) {
        // timeOffset is expected to be the offset of the first timestamp of this fragment (first DTS)
        // if first audio DTS is not aligned with first video DTS then we need to take that into account
        // when providing timeOffset to remuxAudio / remuxVideo. if we don't do that, there might be a permanent / small
        // drift between audio and video streams
        var startPTS = this.getVideoStartPts(videoTrack.samples);
        var tsDelta = PTSNormalize(audioTrack.samples[0].pts, startPTS) - startPTS;
        var audiovideoTimestampDelta = tsDelta / videoTrack.inputTimeScale;
        audioTimeOffset += Math.max(0, audiovideoTimestampDelta);
        videoTimeOffset += Math.max(0, -audiovideoTimestampDelta);
      } // Purposefully remuxing audio before video, so that remuxVideo can use nextAudioPts, which is
      // calculated in remuxAudio.
      // logger.log('nb AAC samples:' + audioTrack.samples.length);


      if (nbAudioSamples) {
        // if initSegment was generated without video samples, regenerate it again
        if (!audioTrack.timescale) {
          logger["logger"].warn('regenerate InitSegment as audio detected');
          this.generateIS(audioTrack, videoTrack, timeOffset);
        }

        var audioData = this.remuxAudio(audioTrack, audioTimeOffset, contiguous, accurateTimeOffset); // logger.log('nb AVC samples:' + videoTrack.samples.length);

        if (nbVideoSamples) {
          var audioTrackLength;

          if (audioData) {
            audioTrackLength = audioData.endPTS - audioData.startPTS;
          } // if initSegment was generated without video samples, regenerate it again


          if (!videoTrack.timescale) {
            logger["logger"].warn('regenerate InitSegment as video detected');
            this.generateIS(audioTrack, videoTrack, timeOffset);
          }

          this.remuxVideo(videoTrack, videoTimeOffset, contiguous, audioTrackLength);
        }
      } else {
        // logger.log('nb AVC samples:' + videoTrack.samples.length);
        if (nbVideoSamples) {
          var videoData = this.remuxVideo(videoTrack, videoTimeOffset, contiguous, 0, accurateTimeOffset);

          if (videoData && audioTrack.codec) {
            this.remuxEmptyAudio(audioTrack, audioTimeOffset, contiguous, videoData);
          }
        }
      }
    } // logger.log('nb ID3 samples:' + audioTrack.samples.length);


    if (id3Track.samples.length) {
      this.remuxID3(id3Track, timeOffset);
    } // logger.log('nb ID3 samples:' + audioTrack.samples.length);


    if (textTrack.samples.length) {
      this.remuxText(textTrack, timeOffset);
    } // notify end of parsing


    this.observer.trigger(events["default"].FRAG_PARSED);
  };

  _proto.generateIS = function generateIS(audioTrack, videoTrack, timeOffset) {
    var observer = this.observer,
        audioSamples = audioTrack.samples,
        videoSamples = videoTrack.samples,
        typeSupported = this.typeSupported,
        container = 'audio/mp4',
        tracks = {},
        data = {
      tracks: tracks
    },
        computePTSDTS = this._initPTS === undefined,
        initPTS,
        initDTS;

    if (computePTSDTS) {
      initPTS = initDTS = Infinity;
    }

    if (audioTrack.config && audioSamples.length) {
      // let's use audio sampling rate as MP4 time scale.
      // rationale is that there is a integer nb of audio frames per audio sample (1024 for AAC)
      // using audio sampling rate here helps having an integer MP4 frame duration
      // this avoids potential rounding issue and AV sync issue
      audioTrack.timescale = audioTrack.samplerate;
      logger["logger"].log("audio sampling rate : " + audioTrack.samplerate);

      if (!audioTrack.isAAC) {
        if (typeSupported.mpeg) {
          // Chrome and Safari
          container = 'audio/mpeg';
          audioTrack.codec = '';
        } else if (typeSupported.mp3) {
          // Firefox
          audioTrack.codec = 'mp3';
        }
      }

      tracks.audio = {
        container: container,
        codec: audioTrack.codec,
        initSegment: !audioTrack.isAAC && typeSupported.mpeg ? new Uint8Array() : mp4_generator.initSegment([audioTrack]),
        metadata: {
          channelCount: audioTrack.channelCount
        }
      };

      if (computePTSDTS) {
        // remember first PTS of this demuxing context. for audio, PTS = DTS
        initPTS = initDTS = audioSamples[0].pts - Math.round(audioTrack.inputTimeScale * timeOffset);
      }
    }

    if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
      // let's use input time scale as MP4 video timescale
      // we use input time scale straight away to avoid rounding issues on frame duration / cts computation
      var inputTimeScale = videoTrack.inputTimeScale;
      videoTrack.timescale = inputTimeScale;
      tracks.video = {
        container: 'video/mp4',
        codec: videoTrack.codec,
        initSegment: mp4_generator.initSegment([videoTrack]),
        metadata: {
          width: videoTrack.width,
          height: videoTrack.height
        }
      };

      if (computePTSDTS) {
        var startPTS = this.getVideoStartPts(videoSamples);
        var startOffset = Math.round(inputTimeScale * timeOffset);
        initDTS = Math.min(initDTS, PTSNormalize(videoSamples[0].dts, startPTS) - startOffset);
        initPTS = Math.min(initPTS, startPTS - startOffset);
        this.observer.trigger(events["default"].INIT_PTS_FOUND, {
          initPTS: initPTS
        });
      }
    } else if (computePTSDTS && tracks.audio) {
      // initPTS found for audio-only stream with main and alt audio
      this.observer.trigger(events["default"].INIT_PTS_FOUND, {
        initPTS: initPTS
      });
    }

    if (Object.keys(tracks).length) {
      observer.trigger(events["default"].FRAG_PARSING_INIT_SEGMENT, data);
      this.ISGenerated = true;

      if (computePTSDTS) {
        this._initPTS = initPTS;
        this._initDTS = initDTS;
      }
    } else {
      observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].FRAG_PARSING_ERROR,
        fatal: false,
        reason: 'no audio/video samples found'
      });
    }
  };

  _proto.remuxVideo = function remuxVideo(track, timeOffset, contiguous, audioTrackLength) {
    var timeScale = track.timescale;
    var inputSamples = track.samples;
    var outputSamples = [];
    var nbSamples = inputSamples.length;
    var initPTS = this._initPTS;
    var offset = 8;
    var mp4SampleDuration;
    var mdat;
    var moof;
    var firstDTS;
    var lastDTS;
    var minPTS = Number.POSITIVE_INFINITY;
    var maxPTS = Number.NEGATIVE_INFINITY;
    var ptsDtsShift = 0;
    var sortSamples = false; // if parsed fragment is contiguous with last one, let's use last DTS value as reference

    var nextAvcDts = this.nextAvcDts;

    if (nbSamples === 0) {
      return;
    }

    if (!contiguous) {
      var pts = timeOffset * timeScale;
      var cts = inputSamples[0].pts - PTSNormalize(inputSamples[0].dts, inputSamples[0].pts); // if not contiguous, let's use target timeOffset

      nextAvcDts = pts - cts;
    } // PTS is coded on 33bits, and can loop from -2^32 to 2^32
    // PTSNormalize will make PTS/DTS value monotonic, we use last known DTS value as reference value


    for (var i = 0; i < nbSamples; i++) {
      var sample = inputSamples[i];
      sample.pts = PTSNormalize(sample.pts - initPTS, nextAvcDts);
      sample.dts = PTSNormalize(sample.dts - initPTS, nextAvcDts);

      if (sample.dts > sample.pts) {
        ptsDtsShift = Math.max(Math.min(ptsDtsShift, sample.pts - sample.dts), -1 * PTS_DTS_SHIFT_TOLERANCE_90KHZ);
      }

      if (sample.dts < inputSamples[i > 0 ? i - 1 : i].dts) {
        sortSamples = true;
      }
    } // sort video samples by DTS then PTS then demux id order


    if (sortSamples) {
      inputSamples.sort(function (a, b) {
        var deltadts = a.dts - b.dts;
        var deltapts = a.pts - b.pts;
        return deltadts || deltapts || a.id - b.id;
      });
    } // Get first/last DTS


    firstDTS = inputSamples[0].dts;
    lastDTS = inputSamples[nbSamples - 1].dts; // on Safari let's signal the same sample duration for all samples
    // sample duration (as expected by trun MP4 boxes), should be the delta between sample DTS
    // set this constant duration as being the avg delta between consecutive DTS.

    var averageSampleDuration = Math.round((lastDTS - firstDTS) / (nbSamples - 1)); // handle broken streams with PTS < DTS, tolerance up 0.2 seconds

    if (ptsDtsShift < 0) {
      if (ptsDtsShift < averageSampleDuration * -2) {
        // Fix for "CNN special report, with CC" in test-streams (including Safari browser)
        // With large PTS < DTS errors such as this, we want to correct CTS while maintaining increasing DTS values
        logger["logger"].warn("PTS < DTS detected in video samples, offsetting DTS from PTS by " + toMsFromMpegTsClock(-averageSampleDuration, true) + " ms");
        var lastDts = ptsDtsShift;

        for (var _i = 0; _i < nbSamples; _i++) {
          inputSamples[_i].dts = lastDts = Math.max(lastDts, inputSamples[_i].pts - averageSampleDuration);
          inputSamples[_i].pts = Math.max(lastDts, inputSamples[_i].pts);
        }
      } else {
        // Fix for "Custom IV with bad PTS DTS" in test-streams
        // With smaller PTS < DTS errors we can simply move all DTS back. This increases CTS without causing buffer gaps or decode errors in Safari
        logger["logger"].warn("PTS < DTS detected in video samples, shifting DTS by " + toMsFromMpegTsClock(ptsDtsShift, true) + " ms to overcome this issue");

        for (var _i2 = 0; _i2 < nbSamples; _i2++) {
          inputSamples[_i2].dts = inputSamples[_i2].dts + ptsDtsShift;
        }
      }

      firstDTS = inputSamples[0].dts;
      lastDTS = inputSamples[nbSamples - 1].dts;
    } // if fragment are contiguous, detect hole/overlapping between fragments


    if (contiguous) {
      // check timestamp continuity across consecutive fragments (this is to remove inter-fragment gap/hole)
      var delta = firstDTS - nextAvcDts;
      var foundHole = delta > averageSampleDuration;
      var foundOverlap = delta < -1;

      if (foundHole || foundOverlap) {
        if (foundHole) {
          logger["logger"].warn("AVC: " + toMsFromMpegTsClock(delta, true) + " ms (" + delta + "dts) hole between fragments detected, filling it");
        } else {
          logger["logger"].warn("AVC: " + toMsFromMpegTsClock(-delta, true) + " ms (" + delta + "dts) overlapping between fragments detected");
        }

        firstDTS = nextAvcDts;
        var firstPTS = inputSamples[0].pts - delta;
        inputSamples[0].dts = firstDTS;
        inputSamples[0].pts = firstPTS;
        logger["logger"].log("Video: First PTS/DTS adjusted: " + toMsFromMpegTsClock(firstPTS, true) + "/" + toMsFromMpegTsClock(firstDTS, true) + ", delta: " + toMsFromMpegTsClock(delta, true) + " ms");
      }
    }

    if (chromeVersion && chromeVersion < 75) {
      firstDTS = Math.max(0, firstDTS);
    }

    var nbNalu = 0;
    var naluLen = 0;

    for (var _i3 = 0; _i3 < nbSamples; _i3++) {
      // compute total/avc sample length and nb of NAL units
      var _sample = inputSamples[_i3];
      var units = _sample.units;
      var nbUnits = units.length;
      var sampleLen = 0;

      for (var j = 0; j < nbUnits; j++) {
        sampleLen += units[j].data.length;
      }

      naluLen += sampleLen;
      nbNalu += nbUnits;
      _sample.length = sampleLen; // normalize PTS/DTS
      // ensure sample monotonic DTS

      _sample.dts = Math.max(_sample.dts, firstDTS); // ensure that computed value is greater or equal than sample DTS

      _sample.pts = Math.max(_sample.pts, _sample.dts, 0);
      minPTS = Math.min(_sample.pts, minPTS);
      maxPTS = Math.max(_sample.pts, maxPTS);
    }

    lastDTS = inputSamples[nbSamples - 1].dts;
    /* concatenate the video data and construct the mdat in place
      (need 8 more bytes to fill length and mpdat type) */

    var mdatSize = naluLen + 4 * nbNalu + 8;

    try {
      mdat = new Uint8Array(mdatSize);
    } catch (err) {
      this.observer.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MUX_ERROR,
        details: errors["ErrorDetails"].REMUX_ALLOC_ERROR,
        fatal: false,
        bytes: mdatSize,
        reason: "fail allocating video mdat " + mdatSize
      });
      return;
    }

    var view = new DataView(mdat.buffer);
    view.setUint32(0, mdatSize);
    mdat.set(mp4_generator.types.mdat, 4);

    for (var _i4 = 0; _i4 < nbSamples; _i4++) {
      var avcSample = inputSamples[_i4];
      var avcSampleUnits = avcSample.units;
      var mp4SampleLength = 0;
      var compositionTimeOffset = void 0; // convert NALU bitstream to MP4 format (prepend NALU with size field)

      for (var _j = 0, _nbUnits = avcSampleUnits.length; _j < _nbUnits; _j++) {
        var unit = avcSampleUnits[_j];
        var unitData = unit.data;
        var unitDataLen = unit.data.byteLength;
        view.setUint32(offset, unitDataLen);
        offset += 4;
        mdat.set(unitData, offset);
        offset += unitDataLen;
        mp4SampleLength += 4 + unitDataLen;
      } // expected sample duration is the Decoding Timestamp diff of consecutive samples


      if (_i4 < nbSamples - 1) {
        mp4SampleDuration = inputSamples[_i4 + 1].dts - avcSample.dts;
      } else {
        var config = this.config;
        var lastFrameDuration = avcSample.dts - inputSamples[_i4 > 0 ? _i4 - 1 : _i4].dts;

        if (config.stretchShortVideoTrack) {
          // In some cases, a segment's audio track duration may exceed the video track duration.
          // Since we've already remuxed audio, and we know how long the audio track is, we look to
          // see if the delta to the next segment is longer than maxBufferHole.
          // If so, playback would potentially get stuck, so we artificially inflate
          // the duration of the last frame to minimize any potential gap between segments.
          var maxBufferHole = config.maxBufferHole;
          var gapTolerance = Math.floor(maxBufferHole * timeScale);
          var deltaToFrameEnd = (audioTrackLength ? minPTS + audioTrackLength * timeScale : this.nextAudioPts) - avcSample.pts;

          if (deltaToFrameEnd > gapTolerance) {
            // We subtract lastFrameDuration from deltaToFrameEnd to try to prevent any video
            // frame overlap. maxBufferHole should be >> lastFrameDuration anyway.
            mp4SampleDuration = deltaToFrameEnd - lastFrameDuration;

            if (mp4SampleDuration < 0) {
              mp4SampleDuration = lastFrameDuration;
            }

            logger["logger"].log("It is approximately " + toMsFromMpegTsClock(deltaToFrameEnd, false) + " ms to the next segment; using duration " + toMsFromMpegTsClock(mp4SampleDuration, false) + " ms for the last video frame.");
          } else {
            mp4SampleDuration = lastFrameDuration;
          }
        } else {
          mp4SampleDuration = lastFrameDuration;
        }
      }

      compositionTimeOffset = Math.round(avcSample.pts - avcSample.dts); // console.log('PTS/DTS/initDTS/normPTS/normDTS/relative PTS : ${avcSample.pts}/${avcSample.dts}/${initDTS}/${ptsnorm}/${dtsnorm}/${(avcSample.pts/4294967296).toFixed(3)}');

      outputSamples.push({
        size: mp4SampleLength,
        // constant duration
        duration: mp4SampleDuration,
        cts: compositionTimeOffset,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          dependsOn: avcSample.key ? 2 : 1,
          isNonSync: avcSample.key ? 0 : 1
        }
      });
    } // next AVC sample DTS should be equal to last sample DTS + last sample duration (in PES timescale)


    this.nextAvcDts = lastDTS + mp4SampleDuration;
    var dropped = track.dropped;
    track.nbNalu = 0;
    track.dropped = 0;

    if (outputSamples.length && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var flags = outputSamples[0].flags; // chrome workaround, mark first sample as being a Random Access Point to avoid sourcebuffer append issue
      // https://code.google.com/p/chromium/issues/detail?id=229412

      flags.dependsOn = 2;
      flags.isNonSync = 0;
    }

    track.samples = outputSamples;
    moof = mp4_generator.moof(track.sequenceNumber++, firstDTS, track);
    track.samples = [];
    var data = {
      data1: moof,
      data2: mdat,
      startPTS: minPTS / timeScale,
      endPTS: (maxPTS + mp4SampleDuration) / timeScale,
      startDTS: firstDTS / timeScale,
      endDTS: this.nextAvcDts / timeScale,
      type: 'video',
      hasAudio: false,
      hasVideo: true,
      nb: outputSamples.length,
      dropped: dropped
    };
    this.observer.trigger(events["default"].FRAG_PARSING_DATA, data);
    return data;
  };

  _proto.remuxAudio = function remuxAudio(track, timeOffset, contiguous, accurateTimeOffset) {
    var inputTimeScale = track.inputTimeScale;
    var mp4timeScale = track.timescale;
    var scaleFactor = inputTimeScale / mp4timeScale;
    var mp4SampleDuration = track.isAAC ? 1024 : 1152;
    var inputSampleDuration = mp4SampleDuration * scaleFactor;
    var initPTS = this._initPTS;
    var rawMPEG = !track.isAAC && this.typeSupported.mpeg;
    var mp4Sample;
    var fillFrame;
    var mdat;
    var moof;
    var firstPTS;
    var lastPTS;
    var offset = rawMPEG ? 0 : 8;
    var inputSamples = track.samples;
    var outputSamples = [];
    var nextAudioPts = this.nextAudioPts; // for audio samples, also consider consecutive fragments as being contiguous (even if a level switch occurs),
    // for sake of clarity:
    // consecutive fragments are frags with
    //  - less than 100ms gaps between new time offset (if accurate) and next expected PTS OR
    //  - less than 20 audio frames distance
    // contiguous fragments are consecutive fragments from same quality level (same level, new SN = old SN + 1)
    // this helps ensuring audio continuity
    // and this also avoids audio glitches/cut when switching quality, or reporting wrong duration on first audio frame

    contiguous |= inputSamples.length && nextAudioPts && (accurateTimeOffset && Math.abs(timeOffset - nextAudioPts / inputTimeScale) < 0.1 || Math.abs(inputSamples[0].pts - nextAudioPts - initPTS) < 20 * inputSampleDuration); // compute normalized PTS

    inputSamples.forEach(function (sample) {
      sample.pts = sample.dts = PTSNormalize(sample.pts - initPTS, timeOffset * inputTimeScale);
    }); // filter out sample with negative PTS that are not playable anyway
    // if we don't remove these negative samples, they will shift all audio samples forward.
    // leading to audio overlap between current / next fragment

    inputSamples = inputSamples.filter(function (sample) {
      return sample.pts >= 0;
    }); // in case all samples have negative PTS, and have been filtered out, return now

    if (inputSamples.length === 0) {
      return;
    }

    if (!contiguous) {
      if (!accurateTimeOffset) {
        // if frag are mot contiguous and if we cant trust time offset, let's use first sample PTS as next audio PTS
        nextAudioPts = inputSamples[0].pts;
      } else {
        // if timeOffset is accurate, let's use it as predicted next audio PTS
        nextAudioPts = Math.max(0, timeOffset * inputTimeScale);
      }
    } // If the audio track is missing samples, the frames seem to get "left-shifted" within the
    // resulting mp4 segment, causing sync issues and leaving gaps at the end of the audio segment.
    // In an effort to prevent this from happening, we inject frames here where there are gaps.
    // When possible, we inject a silent frame; when that's not possible, we duplicate the last
    // frame.


    if (track.isAAC) {
      var maxAudioFramesDrift = this.config.maxAudioFramesDrift;

      for (var i = 0, nextPts = nextAudioPts; i < inputSamples.length;) {
        // First, let's see how far off this frame is from where we expect it to be
        var sample = inputSamples[i];
        var pts = sample.pts;
        var delta = pts - nextPts; // If we're overlapping by more than a duration, drop this sample

        if (delta <= -maxAudioFramesDrift * inputSampleDuration) {
          if (contiguous || i > 0) {
            logger["logger"].warn("Dropping 1 audio frame @ " + toMsFromMpegTsClock(nextPts, true) / 1000 + "s due to " + toMsFromMpegTsClock(delta, true) + " ms overlap.");
            inputSamples.splice(i, 1); // Don't touch nextPtsNorm or i
          } else {
            // When changing qualities we can't trust that audio has been appended up to nextAudioPts
            // Warn about the overlap but do not drop samples as that can introduce buffer gaps
            logger["logger"].warn("Audio frame @ " + toMsFromMpegTsClock(pts, true) / 1000 + "s overlaps nextAudioPts by " + toMsFromMpegTsClock(delta, true) + " ms.");
            nextPts = pts + inputSampleDuration;
            i++;
          }
        } // eslint-disable-line brace-style
        // Insert missing frames if:
        // 1: We're more than maxAudioFramesDrift frame away
        // 2: Not more than MAX_SILENT_FRAME_DURATION away
        // 3: currentTime (aka nextPtsNorm) is not 0
        else if (delta >= maxAudioFramesDrift * inputSampleDuration && delta < MAX_SILENT_FRAME_DURATION_90KHZ && nextPts) {
            var missing = Math.round(delta / inputSampleDuration);
            logger["logger"].warn("Injecting " + missing + " audio frames @ " + toMsFromMpegTsClock(nextPts, true) / 1000 + "s due to " + toMsFromMpegTsClock(delta, true) + " ms gap.");

            for (var j = 0; j < missing; j++) {
              var newStamp = Math.max(nextPts, 0);
              fillFrame = aac_helper.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);

              if (!fillFrame) {
                logger["logger"].log('Unable to get silent frame for given audio codec; duplicating last frame instead.');
                fillFrame = sample.unit.subarray();
              }

              inputSamples.splice(i, 0, {
                unit: fillFrame,
                pts: newStamp,
                dts: newStamp
              });
              nextPts += inputSampleDuration;
              i++;
            } // Adjust sample to next expected pts


            sample.pts = sample.dts = nextPts;
            nextPts += inputSampleDuration;
            i++;
          } else {
            // Otherwise, just adjust pts
            if (Math.abs(delta) > 0.1 * inputSampleDuration) {// logger.log(`Invalid frame delta ${Math.round(delta + inputSampleDuration)} at PTS ${Math.round(pts / 90)} (should be ${Math.round(inputSampleDuration)}).`);
            }

            sample.pts = sample.dts = nextPts;
            nextPts += inputSampleDuration;
            i++;
          }
      }
    } // compute mdat size, as we eventually filtered/added some samples


    var nbSamples = inputSamples.length;
    var mdatSize = 0;

    while (nbSamples--) {
      mdatSize += inputSamples[nbSamples].unit.byteLength;
    }

    for (var _j2 = 0, _nbSamples = inputSamples.length; _j2 < _nbSamples; _j2++) {
      var audioSample = inputSamples[_j2];
      var unit = audioSample.unit;
      var _pts = audioSample.pts; // logger.log(`Audio/PTS:${toMsFromMpegTsClock(pts, true)}`);
      // if not first sample

      if (lastPTS !== undefined && mp4Sample) {
        mp4Sample.duration = Math.round((_pts - lastPTS) / scaleFactor);
      } else {
        var _delta = _pts - nextAudioPts;

        var numMissingFrames = 0; // if fragment are contiguous, detect hole/overlapping between fragments
        // contiguous fragments are consecutive fragments from same quality level (same level, new SN = old SN + 1)

        if (contiguous && track.isAAC) {
          // log delta
          if (_delta) {
            if (_delta > 0 && _delta < MAX_SILENT_FRAME_DURATION_90KHZ) {
              // Q: why do we have to round here, shouldn't this always result in an integer if timestamps are correct,
              // and if not, shouldn't we actually Math.ceil() instead?
              numMissingFrames = Math.round((_pts - nextAudioPts) / inputSampleDuration);
              logger["logger"].log(toMsFromMpegTsClock(_delta, true) + " ms hole between AAC samples detected,filling it");

              if (numMissingFrames > 0) {
                fillFrame = aac_helper.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);

                if (!fillFrame) {
                  fillFrame = unit.subarray();
                }

                mdatSize += numMissingFrames * fillFrame.length;
              } // if we have frame overlap, overlapping for more than half a frame duraion

            } else if (_delta < -12) {
              // drop overlapping audio frames... browser will deal with it
              logger["logger"].log("drop overlapping AAC sample, expected/parsed/delta: " + toMsFromMpegTsClock(nextAudioPts, true) + " ms / " + toMsFromMpegTsClock(_pts, true) + " ms / " + toMsFromMpegTsClock(-_delta, true) + " ms");
              mdatSize -= unit.byteLength;
              continue;
            } // set PTS/DTS to expected PTS/DTS


            _pts = nextAudioPts;
          }
        } // remember first PTS of our audioSamples


        firstPTS = _pts;

        if (mdatSize > 0) {
          mdatSize += offset;

          try {
            mdat = new Uint8Array(mdatSize);
          } catch (err) {
            this.observer.trigger(events["default"].ERROR, {
              type: errors["ErrorTypes"].MUX_ERROR,
              details: errors["ErrorDetails"].REMUX_ALLOC_ERROR,
              fatal: false,
              bytes: mdatSize,
              reason: "fail allocating audio mdat " + mdatSize
            });
            return;
          }

          if (!rawMPEG) {
            var view = new DataView(mdat.buffer);
            view.setUint32(0, mdatSize);
            mdat.set(mp4_generator.types.mdat, 4);
          }
        } else {
          // no audio samples
          return;
        }

        for (var _i5 = 0; _i5 < numMissingFrames; _i5++) {
          fillFrame = aac_helper.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);

          if (!fillFrame) {
            logger["logger"].log('Unable to get silent frame for given audio codec; duplicating this frame instead.');
            fillFrame = unit.subarray();
          }

          mdat.set(fillFrame, offset);
          offset += fillFrame.byteLength;
          mp4Sample = {
            size: fillFrame.byteLength,
            cts: 0,
            duration: 1024,
            flags: {
              isLeading: 0,
              isDependedOn: 0,
              hasRedundancy: 0,
              degradPrio: 0,
              dependsOn: 1
            }
          };
          outputSamples.push(mp4Sample);
        }
      }

      mdat.set(unit, offset);
      var unitLen = unit.byteLength;
      offset += unitLen; // console.log('PTS/DTS/initDTS/normPTS/normDTS/relative PTS : ${audioSample.pts}/${audioSample.dts}/${initDTS}/${ptsnorm}/${dtsnorm}/${(audioSample.pts/4294967296).toFixed(3)}');

      mp4Sample = {
        size: unitLen,
        cts: 0,
        duration: 0,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          dependsOn: 1
        }
      };
      outputSamples.push(mp4Sample);
      lastPTS = _pts;
    }

    var lastSampleDuration = 0;
    nbSamples = outputSamples.length; // set last sample duration as being identical to previous sample

    if (nbSamples >= 2) {
      lastSampleDuration = outputSamples[nbSamples - 2].duration;
      mp4Sample.duration = lastSampleDuration;
    }

    if (nbSamples) {
      // next audio sample PTS should be equal to last sample PTS + duration
      this.nextAudioPts = nextAudioPts = lastPTS + scaleFactor * lastSampleDuration; // logger.log('Audio/PTS/PTSend:' + audioSample.pts.toFixed(0) + '/' + this.nextAacDts.toFixed(0));

      track.samples = outputSamples;

      if (rawMPEG) {
        moof = new Uint8Array();
      } else {
        moof = mp4_generator.moof(track.sequenceNumber++, firstPTS / scaleFactor, track);
      }

      track.samples = [];
      var start = firstPTS / inputTimeScale;
      var end = nextAudioPts / inputTimeScale;
      var audioData = {
        data1: moof,
        data2: mdat,
        startPTS: start,
        endPTS: end,
        startDTS: start,
        endDTS: end,
        type: 'audio',
        hasAudio: true,
        hasVideo: false,
        nb: nbSamples
      };
      this.observer.trigger(events["default"].FRAG_PARSING_DATA, audioData);
      return audioData;
    }

    return null;
  };

  _proto.remuxEmptyAudio = function remuxEmptyAudio(track, timeOffset, contiguous, videoData) {
    var inputTimeScale = track.inputTimeScale;
    var mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale;
    var scaleFactor = inputTimeScale / mp4timeScale;
    var nextAudioPts = this.nextAudioPts; // sync with video's timestamp

    var startDTS = (nextAudioPts !== undefined ? nextAudioPts : videoData.startDTS * inputTimeScale) + this._initDTS;
    var endDTS = videoData.endDTS * inputTimeScale + this._initDTS; // one sample's duration value

    var sampleDuration = 1024;
    var frameDuration = scaleFactor * sampleDuration; // samples count of this segment's duration

    var nbSamples = Math.ceil((endDTS - startDTS) / frameDuration); // silent frame

    var silentFrame = aac_helper.getSilentFrame(track.manifestCodec || track.codec, track.channelCount);
    logger["logger"].warn('remux empty Audio'); // Can't remux if we can't generate a silent frame...

    if (!silentFrame) {
      logger["logger"].trace('Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!');
      return;
    }

    var samples = [];

    for (var i = 0; i < nbSamples; i++) {
      var stamp = startDTS + i * frameDuration;
      samples.push({
        unit: silentFrame,
        pts: stamp,
        dts: stamp
      });
    }

    track.samples = samples;
    this.remuxAudio(track, timeOffset, contiguous);
  };

  _proto.remuxID3 = function remuxID3(track, timeOffset) {
    var length = track.samples.length;

    if (!length) {
      return;
    }

    var inputTimeScale = track.inputTimeScale;
    var initPTS = this._initPTS;
    var initDTS = this._initDTS; // consume samples

    for (var index = 0; index < length; index++) {
      var sample = track.samples[index]; // setting id3 pts, dts to relative time
      // using this._initPTS and this._initDTS to calculate relative time

      sample.pts = PTSNormalize(sample.pts - initPTS, timeOffset * inputTimeScale) / inputTimeScale;
      sample.dts = PTSNormalize(sample.dts - initDTS, timeOffset * inputTimeScale) / inputTimeScale;
    }

    this.observer.trigger(events["default"].FRAG_PARSING_METADATA, {
      samples: track.samples
    });
    track.samples = [];
  };

  _proto.remuxText = function remuxText(track, timeOffset) {
    var length = track.samples.length;
    var inputTimeScale = track.inputTimeScale;
    var initPTS = this._initPTS; // consume samples

    if (length) {
      for (var index = 0; index < length; index++) {
        var sample = track.samples[index]; // setting text pts, dts to relative time
        // using this._initPTS and this._initDTS to calculate relative time

        sample.pts = PTSNormalize(sample.pts - initPTS, timeOffset * inputTimeScale) / inputTimeScale;
      }

      track.samples.sort(function (a, b) {
        return a.pts - b.pts;
      });
      this.observer.trigger(events["default"].FRAG_PARSING_USERDATA, {
        samples: track.samples
      });
    }

    track.samples = [];
  };

  return MP4Remuxer;
}();

function PTSNormalize(value, reference) {
  var offset;

  if (reference === undefined) {
    return value;
  }

  if (reference < value) {
    // - 2^33
    offset = -8589934592;
  } else {
    // + 2^33
    offset = 8589934592;
  }
  /* PTS is 33bit (from 0 to 2^33 -1)
    if diff between value and reference is bigger than half of the amplitude (2^32) then it means that
    PTS looping occured. fill the gap */


  while (Math.abs(value - reference) > 4294967296) {
    value += offset;
  }

  return value;
}

/* harmony default export */ var mp4_remuxer = (mp4_remuxer_MP4Remuxer);
// CONCATENATED MODULE: ./src/remux/passthrough-remuxer.js
/**
 * passthrough remuxer
*/


var passthrough_remuxer_PassThroughRemuxer = /*#__PURE__*/function () {
  function PassThroughRemuxer(observer) {
    this.observer = observer;
  }

  var _proto = PassThroughRemuxer.prototype;

  _proto.destroy = function destroy() {};

  _proto.resetTimeStamp = function resetTimeStamp() {};

  _proto.resetInitSegment = function resetInitSegment() {};

  _proto.remux = function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset, rawData) {
    var observer = this.observer;
    var streamType = '';

    if (audioTrack) {
      streamType += 'audio';
    }

    if (videoTrack) {
      streamType += 'video';
    }

    observer.trigger(events["default"].FRAG_PARSING_DATA, {
      data1: rawData,
      startPTS: timeOffset,
      startDTS: timeOffset,
      type: streamType,
      hasAudio: !!audioTrack,
      hasVideo: !!videoTrack,
      nb: 1,
      dropped: 0
    }); // notify end of parsing

    observer.trigger(events["default"].FRAG_PARSED);
  };

  return PassThroughRemuxer;
}();

/* harmony default export */ var passthrough_remuxer = (passthrough_remuxer_PassThroughRemuxer);
// CONCATENATED MODULE: ./src/demux/demuxer-inline.js
/**
 *
 * inline demuxer: probe fragments and instantiate
 * appropriate demuxer depending on content type (TSDemuxer, AACDemuxer, ...)
 *
 */










 // see https://stackoverflow.com/a/11237259/589493

var global = Object(get_self_scope["getSelfScope"])(); // safeguard for code that might run both on worker and main thread

var now; // performance.now() not available on WebWorker, at least on Safari Desktop

try {
  now = global.performance.now.bind(global.performance);
} catch (err) {
  logger["logger"].debug('Unable to use Performance API on this environment');
  now = global.Date.now;
}

var demuxer_inline_DemuxerInline = /*#__PURE__*/function () {
  function DemuxerInline(observer, typeSupported, config, vendor) {
    this.observer = observer;
    this.typeSupported = typeSupported;
    this.config = config;
    this.vendor = vendor;
  }

  var _proto = DemuxerInline.prototype;

  _proto.destroy = function destroy() {
    var demuxer = this.demuxer;

    if (demuxer) {
      demuxer.destroy();
    }
  };

  _proto.push = function push(data, decryptdata, initSegment, audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS) {
    var _this = this;

    if (data.byteLength > 0 && decryptdata != null && decryptdata.key != null && decryptdata.method === 'AES-128') {
      var decrypter = this.decrypter;

      if (decrypter == null) {
        decrypter = this.decrypter = new crypt_decrypter["default"](this.observer, this.config);
      }

      var startTime = now();
      decrypter.decrypt(data, decryptdata.key.buffer, decryptdata.iv.buffer, function (decryptedData) {
        var endTime = now();

        _this.observer.trigger(events["default"].FRAG_DECRYPTED, {
          stats: {
            tstart: startTime,
            tdecrypt: endTime
          }
        });

        _this.pushDecrypted(new Uint8Array(decryptedData), decryptdata, new Uint8Array(initSegment), audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS);
      });
    } else {
      this.pushDecrypted(new Uint8Array(data), decryptdata, new Uint8Array(initSegment), audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS);
    }
  };

  _proto.pushDecrypted = function pushDecrypted(data, decryptdata, initSegment, audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS) {
    var demuxer = this.demuxer;
    var remuxer = this.remuxer;

    if (!demuxer || // in case of continuity change, or track switch
    // we might switch from content type (AAC container to TS container, or TS to fmp4 for example)
    discontinuity || trackSwitch) {
      var observer = this.observer;
      var typeSupported = this.typeSupported;
      var config = this.config; // probing order is TS/MP4/AAC/MP3

      var muxConfig = [{
        demux: tsdemuxer,
        remux: mp4_remuxer
      }, {
        demux: mp4demuxer["default"],
        remux: passthrough_remuxer
      }, {
        demux: aacdemuxer,
        remux: mp4_remuxer
      }, {
        demux: mp3demuxer,
        remux: mp4_remuxer
      }]; // probe for content type

      var mux;

      for (var i = 0, len = muxConfig.length; i < len; i++) {
        mux = muxConfig[i];

        if (mux.demux.probe(data)) {
          break;
        }
      }

      if (!mux) {
        observer.trigger(events["default"].ERROR, {
          type: errors["ErrorTypes"].MEDIA_ERROR,
          details: errors["ErrorDetails"].FRAG_PARSING_ERROR,
          fatal: true,
          reason: 'no demux matching with content found'
        });
        return;
      } // so let's check that current remuxer and demuxer are still valid


      if (!remuxer || !(remuxer instanceof mux.remux)) {
        remuxer = new mux.remux(observer, config, typeSupported, this.vendor);
      }

      if (!demuxer || !(demuxer instanceof mux.demux)) {
        demuxer = new mux.demux(observer, remuxer, config, typeSupported);
        this.probe = mux.demux.probe;
      }

      this.demuxer = demuxer;
      this.remuxer = remuxer;
    }

    if (discontinuity || trackSwitch) {
      demuxer.resetInitSegment(initSegment, audioCodec, videoCodec, duration);
      remuxer.resetInitSegment();
    }

    if (discontinuity) {
      demuxer.resetTimeStamp(defaultInitPTS);
      remuxer.resetTimeStamp(defaultInitPTS);
    }

    if (typeof demuxer.setDecryptData === 'function') {
      demuxer.setDecryptData(decryptdata);
    }

    demuxer.append(data, timeOffset, contiguous, accurateTimeOffset);
  };

  return DemuxerInline;
}();

/* harmony default export */ var demuxer_inline = __webpack_exports__["default"] = (demuxer_inline_DemuxerInline);

/***/ }),

/***/ "./src/demux/demuxer-worker.js":
/*!*************************************!*\
  !*** ./src/demux/demuxer-worker.js ***!
  \*************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ./src/demux/demuxer.js (referenced with require.resolve) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _demux_demuxer_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../demux/demuxer-inline */ "./src/demux/demuxer-inline.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./src/events.js");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_3__);
/* demuxer web worker.
 *  - listen to worker message, and trigger DemuxerInline upon reception of Fragments.
 *  - provides MP4 Boxes back to main thread using [transferable objects](https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast) in order to minimize message passing overhead.
 */





var DemuxerWorker = function DemuxerWorker(self) {
  // observer setup
  var observer = new eventemitter3__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();

  observer.trigger = function trigger(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    observer.emit.apply(observer, [event, event].concat(data));
  };

  observer.off = function off(event) {
    for (var _len2 = arguments.length, data = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      data[_key2 - 1] = arguments[_key2];
    }

    observer.removeListener.apply(observer, [event].concat(data));
  };

  var forwardMessage = function forwardMessage(ev, data) {
    self.postMessage({
      event: ev,
      data: data
    });
  };

  self.addEventListener('message', function (ev) {
    var data = ev.data; // console.log('demuxer cmd:' + data.cmd);

    switch (data.cmd) {
      case 'init':
        var config = JSON.parse(data.config);
        self.demuxer = new _demux_demuxer_inline__WEBPACK_IMPORTED_MODULE_0__["default"](observer, data.typeSupported, config, data.vendor);
        Object(_utils_logger__WEBPACK_IMPORTED_MODULE_2__["enableLogs"])(config.debug); // signal end of worker init

        forwardMessage('init', null);
        break;

      case 'demux':
        self.demuxer.push(data.data, data.decryptdata, data.initSegment, data.audioCodec, data.videoCodec, data.timeOffset, data.discontinuity, data.trackSwitch, data.contiguous, data.duration, data.accurateTimeOffset, data.defaultInitPTS);
        break;

      default:
        break;
    }
  }); // forward events to main thread

  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].FRAG_DECRYPTED, forwardMessage);
  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].FRAG_PARSING_INIT_SEGMENT, forwardMessage);
  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].FRAG_PARSED, forwardMessage);
  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].ERROR, forwardMessage);
  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].FRAG_PARSING_METADATA, forwardMessage);
  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].FRAG_PARSING_USERDATA, forwardMessage);
  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].INIT_PTS_FOUND, forwardMessage); // special case for FRAG_PARSING_DATA: pass data1/data2 as transferable object (no copy)

  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].FRAG_PARSING_DATA, function (ev, data) {
    var transferable = [];
    var message = {
      event: ev,
      data: data
    };

    if (data.data1) {
      message.data1 = data.data1.buffer;
      transferable.push(data.data1.buffer);
      delete data.data1;
    }

    if (data.data2) {
      message.data2 = data.data2.buffer;
      transferable.push(data.data2.buffer);
      delete data.data2;
    }

    self.postMessage(message, transferable);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (DemuxerWorker);

/***/ }),

/***/ "./src/demux/id3.js":
/*!**************************!*\
  !*** ./src/demux/id3.js ***!
  \**************************/
/*! exports provided: default, utf8ArrayToStr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8ArrayToStr", function() { return utf8ArrayToStr; });
/* harmony import */ var _utils_get_self_scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/get-self-scope */ "./src/utils/get-self-scope.js");

/**
 * ID3 parser
 */

var ID3 = /*#__PURE__*/function () {
  function ID3() {}

  /**
   * Returns true if an ID3 header can be found at offset in data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {boolean} - True if an ID3 header is found
   */
  ID3.isHeader = function isHeader(data, offset) {
    /*
    * http://id3.org/id3v2.3.0
    * [0]     = 'I'
    * [1]     = 'D'
    * [2]     = '3'
    * [3,4]   = {Version}
    * [5]     = {Flags}
    * [6-9]   = {ID3 Size}
    *
    * An ID3v2 tag can be detected with the following pattern:
    *  $49 44 33 yy yy xx zz zz zz zz
    * Where yy is less than $FF, xx is the 'flags' byte and zz is less than $80
    */
    if (offset + 10 <= data.length) {
      // look for 'ID3' identifier
      if (data[offset] === 0x49 && data[offset + 1] === 0x44 && data[offset + 2] === 0x33) {
        // check version is within range
        if (data[offset + 3] < 0xFF && data[offset + 4] < 0xFF) {
          // check size is within range
          if (data[offset + 6] < 0x80 && data[offset + 7] < 0x80 && data[offset + 8] < 0x80 && data[offset + 9] < 0x80) {
            return true;
          }
        }
      }
    }

    return false;
  }
  /**
   * Returns true if an ID3 footer can be found at offset in data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {boolean} - True if an ID3 footer is found
   */
  ;

  ID3.isFooter = function isFooter(data, offset) {
    /*
    * The footer is a copy of the header, but with a different identifier
    */
    if (offset + 10 <= data.length) {
      // look for '3DI' identifier
      if (data[offset] === 0x33 && data[offset + 1] === 0x44 && data[offset + 2] === 0x49) {
        // check version is within range
        if (data[offset + 3] < 0xFF && data[offset + 4] < 0xFF) {
          // check size is within range
          if (data[offset + 6] < 0x80 && data[offset + 7] < 0x80 && data[offset + 8] < 0x80 && data[offset + 9] < 0x80) {
            return true;
          }
        }
      }
    }

    return false;
  }
  /**
   * Returns any adjacent ID3 tags found in data starting at offset, as one block of data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {Uint8Array} - The block of data containing any ID3 tags found
   */
  ;

  ID3.getID3Data = function getID3Data(data, offset) {
    var front = offset;
    var length = 0;

    while (ID3.isHeader(data, offset)) {
      // ID3 header is 10 bytes
      length += 10;

      var size = ID3._readSize(data, offset + 6);

      length += size;

      if (ID3.isFooter(data, offset + 10)) {
        // ID3 footer is 10 bytes
        length += 10;
      }

      offset += length;
    }

    if (length > 0) {
      return data.subarray(front, front + length);
    }

    return undefined;
  };

  ID3._readSize = function _readSize(data, offset) {
    var size = 0;
    size = (data[offset] & 0x7f) << 21;
    size |= (data[offset + 1] & 0x7f) << 14;
    size |= (data[offset + 2] & 0x7f) << 7;
    size |= data[offset + 3] & 0x7f;
    return size;
  }
  /**
   * Searches for the Elementary Stream timestamp found in the ID3 data chunk
   * @param {Uint8Array} data - Block of data containing one or more ID3 tags
   * @return {number} - The timestamp
   */
  ;

  ID3.getTimeStamp = function getTimeStamp(data) {
    var frames = ID3.getID3Frames(data);

    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];

      if (ID3.isTimeStampFrame(frame)) {
        return ID3._readTimeStamp(frame);
      }
    }

    return undefined;
  }
  /**
   * Returns true if the ID3 frame is an Elementary Stream timestamp frame
   * @param {ID3 frame} frame
   */
  ;

  ID3.isTimeStampFrame = function isTimeStampFrame(frame) {
    return frame && frame.key === 'PRIV' && frame.info === 'com.apple.streaming.transportStreamTimestamp';
  };

  ID3._getFrameData = function _getFrameData(data) {
    /*
    Frame ID       $xx xx xx xx (four characters)
    Size           $xx xx xx xx
    Flags          $xx xx
    */
    var type = String.fromCharCode(data[0], data[1], data[2], data[3]);

    var size = ID3._readSize(data, 4); // skip frame id, size, and flags


    var offset = 10;
    return {
      type: type,
      size: size,
      data: data.subarray(offset, offset + size)
    };
  }
  /**
   * Returns an array of ID3 frames found in all the ID3 tags in the id3Data
   * @param {Uint8Array} id3Data - The ID3 data containing one or more ID3 tags
   * @return {ID3 frame[]} - Array of ID3 frame objects
   */
  ;

  ID3.getID3Frames = function getID3Frames(id3Data) {
    var offset = 0;
    var frames = [];

    while (ID3.isHeader(id3Data, offset)) {
      var size = ID3._readSize(id3Data, offset + 6); // skip past ID3 header


      offset += 10;
      var end = offset + size; // loop through frames in the ID3 tag

      while (offset + 8 < end) {
        var frameData = ID3._getFrameData(id3Data.subarray(offset));

        var frame = ID3._decodeFrame(frameData);

        if (frame) {
          frames.push(frame);
        } // skip frame header and frame data


        offset += frameData.size + 10;
      }

      if (ID3.isFooter(id3Data, offset)) {
        offset += 10;
      }
    }

    return frames;
  };

  ID3._decodeFrame = function _decodeFrame(frame) {
    if (frame.type === 'PRIV') {
      return ID3._decodePrivFrame(frame);
    } else if (frame.type[0] === 'W') {
      return ID3._decodeURLFrame(frame);
    }

    return ID3._decodeTextFrame(frame);
  };

  ID3._readTimeStamp = function _readTimeStamp(timeStampFrame) {
    if (timeStampFrame.data.byteLength === 8) {
      var data = new Uint8Array(timeStampFrame.data); // timestamp is 33 bit expressed as a big-endian eight-octet number,
      // with the upper 31 bits set to zero.

      var pts33Bit = data[3] & 0x1;
      var timestamp = (data[4] << 23) + (data[5] << 15) + (data[6] << 7) + data[7];
      timestamp /= 45;

      if (pts33Bit) {
        timestamp += 47721858.84;
      } // 2^32 / 90


      return Math.round(timestamp);
    }

    return undefined;
  };

  ID3._decodePrivFrame = function _decodePrivFrame(frame) {
    /*
    Format: <text string>\0<binary data>
    */
    if (frame.size < 2) {
      return undefined;
    }

    var owner = ID3._utf8ArrayToStr(frame.data, true);

    var privateData = new Uint8Array(frame.data.subarray(owner.length + 1));
    return {
      key: frame.type,
      info: owner,
      data: privateData.buffer
    };
  };

  ID3._decodeTextFrame = function _decodeTextFrame(frame) {
    if (frame.size < 2) {
      return undefined;
    }

    if (frame.type === 'TXXX') {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Description}\0{Value}
      */
      var index = 1;

      var description = ID3._utf8ArrayToStr(frame.data.subarray(index), true);

      index += description.length + 1;

      var value = ID3._utf8ArrayToStr(frame.data.subarray(index));

      return {
        key: frame.type,
        info: description,
        data: value
      };
    } else {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Value}
      */
      var text = ID3._utf8ArrayToStr(frame.data.subarray(1));

      return {
        key: frame.type,
        data: text
      };
    }
  };

  ID3._decodeURLFrame = function _decodeURLFrame(frame) {
    if (frame.type === 'WXXX') {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Description}\0{URL}
      */
      if (frame.size < 2) {
        return undefined;
      }

      var index = 1;

      var description = ID3._utf8ArrayToStr(frame.data.subarray(index), true);

      index += description.length + 1;

      var value = ID3._utf8ArrayToStr(frame.data.subarray(index));

      return {
        key: frame.type,
        info: description,
        data: value
      };
    } else {
      /*
      Format:
      [0-?] = {URL}
      */
      var url = ID3._utf8ArrayToStr(frame.data);

      return {
        key: frame.type,
        data: url
      };
    }
  } // http://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript/22373197
  // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

  /* utf.js - UTF-8 <=> UTF-16 convertion
   *
   * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0
   * LastModified: Dec 25 1999
   * This library is free.  You can redistribute it and/or modify it.
   */
  ;

  ID3._utf8ArrayToStr = function _utf8ArrayToStr(array, exitOnNull) {
    if (exitOnNull === void 0) {
      exitOnNull = false;
    }

    var decoder = getTextDecoder();

    if (decoder) {
      var decoded = decoder.decode(array);

      if (exitOnNull) {
        // grab up to the first null
        var idx = decoded.indexOf('\0');
        return idx !== -1 ? decoded.substring(0, idx) : decoded;
      } // remove any null characters


      return decoded.replace(/\0/g, '');
    }

    var len = array.length;
    var c;
    var char2;
    var char3;
    var out = '';
    var i = 0;

    while (i < len) {
      c = array[i++];

      if (c === 0x00 && exitOnNull) {
        return out;
      } else if (c === 0x00 || c === 0x03) {
        // If the character is 3 (END_OF_TEXT) or 0 (NULL) then skip it
        continue;
      }

      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;

        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
          break;

        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
          break;

        default:
      }
    }

    return out;
  };

  return ID3;
}();

var decoder;

function getTextDecoder() {
  var global = Object(_utils_get_self_scope__WEBPACK_IMPORTED_MODULE_0__["getSelfScope"])(); // safeguard for code that might run both on worker and main thread

  if (!decoder && typeof global.TextDecoder !== 'undefined') {
    decoder = new global.TextDecoder('utf-8');
  }

  return decoder;
}

var utf8ArrayToStr = ID3._utf8ArrayToStr;
/* harmony default export */ __webpack_exports__["default"] = (ID3);


/***/ }),

/***/ "./src/demux/mp4demuxer.js":
/*!*********************************!*\
  !*** ./src/demux/mp4demuxer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./src/events.js");
/**
 * MP4 demuxer
 */


var UINT32_MAX = Math.pow(2, 32) - 1;

var MP4Demuxer = /*#__PURE__*/function () {
  function MP4Demuxer(observer, remuxer) {
    this.observer = observer;
    this.remuxer = remuxer;
  }

  var _proto = MP4Demuxer.prototype;

  _proto.resetTimeStamp = function resetTimeStamp(initPTS) {
    this.initPTS = initPTS;
  };

  _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, duration) {
    // jshint unused:false
    if (initSegment && initSegment.byteLength) {
      var initData = this.initData = MP4Demuxer.parseInitSegment(initSegment); // default audio codec if nothing specified
      // TODO : extract that from initsegment

      if (audioCodec == null) {
        audioCodec = 'mp4a.40.5';
      }

      if (videoCodec == null) {
        videoCodec = 'avc1.42e01e';
      }

      var tracks = {};

      if (initData.audio && initData.video) {
        tracks.audiovideo = {
          container: 'video/mp4',
          codec: audioCodec + ',' + videoCodec,
          initSegment: duration ? initSegment : null
        };
      } else {
        if (initData.audio) {
          tracks.audio = {
            container: 'audio/mp4',
            codec: audioCodec,
            initSegment: duration ? initSegment : null
          };
        }

        if (initData.video) {
          tracks.video = {
            container: 'video/mp4',
            codec: videoCodec,
            initSegment: duration ? initSegment : null
          };
        }
      }

      this.observer.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["default"].FRAG_PARSING_INIT_SEGMENT, {
        tracks: tracks
      });
    } else {
      if (audioCodec) {
        this.audioCodec = audioCodec;
      }

      if (videoCodec) {
        this.videoCodec = videoCodec;
      }
    }
  };

  MP4Demuxer.probe = function probe(data) {
    // ensure we find a moof box in the first 16 kB
    return MP4Demuxer.findBox({
      data: data,
      start: 0,
      end: Math.min(data.length, 16384)
    }, ['moof']).length > 0;
  };

  MP4Demuxer.bin2str = function bin2str(buffer) {
    return String.fromCharCode.apply(null, buffer);
  };

  MP4Demuxer.readUint16 = function readUint16(buffer, offset) {
    if (buffer.data) {
      offset += buffer.start;
      buffer = buffer.data;
    }

    var val = buffer[offset] << 8 | buffer[offset + 1];
    return val < 0 ? 65536 + val : val;
  };

  MP4Demuxer.readUint32 = function readUint32(buffer, offset) {
    if (buffer.data) {
      offset += buffer.start;
      buffer = buffer.data;
    }

    var val = buffer[offset] << 24 | buffer[offset + 1] << 16 | buffer[offset + 2] << 8 | buffer[offset + 3];
    return val < 0 ? 4294967296 + val : val;
  };

  MP4Demuxer.writeUint32 = function writeUint32(buffer, offset, value) {
    if (buffer.data) {
      offset += buffer.start;
      buffer = buffer.data;
    }

    buffer[offset] = value >> 24;
    buffer[offset + 1] = value >> 16 & 0xff;
    buffer[offset + 2] = value >> 8 & 0xff;
    buffer[offset + 3] = value & 0xff;
  } // Find the data for a box specified by its path
  ;

  MP4Demuxer.findBox = function findBox(data, path) {
    var results = [],
        i,
        size,
        type,
        end,
        subresults,
        start,
        endbox;

    if (data.data) {
      start = data.start;
      end = data.end;
      data = data.data;
    } else {
      start = 0;
      end = data.byteLength;
    }

    if (!path.length) {
      // short-circuit the search for empty paths
      return null;
    }

    for (i = start; i < end;) {
      size = MP4Demuxer.readUint32(data, i);
      type = MP4Demuxer.bin2str(data.subarray(i + 4, i + 8));
      endbox = size > 1 ? i + size : end;

      if (type === path[0]) {
        if (path.length === 1) {
          // this is the end of the path and we've found the box we were
          // looking for
          results.push({
            data: data,
            start: i + 8,
            end: endbox
          });
        } else {
          // recursively search for the next box along the path
          subresults = MP4Demuxer.findBox({
            data: data,
            start: i + 8,
            end: endbox
          }, path.slice(1));

          if (subresults.length) {
            results = results.concat(subresults);
          }
        }
      }

      i = endbox;
    } // we've finished searching all of data


    return results;
  };

  MP4Demuxer.parseSegmentIndex = function parseSegmentIndex(initSegment) {
    var moov = MP4Demuxer.findBox(initSegment, ['moov'])[0];
    var moovEndOffset = moov ? moov.end : null; // we need this in case we need to chop of garbage of the end of current data

    var index = 0;
    var sidx = MP4Demuxer.findBox(initSegment, ['sidx']);
    var references;

    if (!sidx || !sidx[0]) {
      return null;
    }

    references = [];
    sidx = sidx[0];
    var version = sidx.data[0]; // set initial offset, we skip the reference ID (not needed)

    index = version === 0 ? 8 : 16;
    var timescale = MP4Demuxer.readUint32(sidx, index);
    index += 4; // TODO: parse earliestPresentationTime and firstOffset
    // usually zero in our case

    var earliestPresentationTime = 0;
    var firstOffset = 0;

    if (version === 0) {
      index += 8;
    } else {
      index += 16;
    } // skip reserved


    index += 2;
    var startByte = sidx.end + firstOffset;
    var referencesCount = MP4Demuxer.readUint16(sidx, index);
    index += 2;

    for (var i = 0; i < referencesCount; i++) {
      var referenceIndex = index;
      var referenceInfo = MP4Demuxer.readUint32(sidx, referenceIndex);
      referenceIndex += 4;
      var referenceSize = referenceInfo & 0x7FFFFFFF;
      var referenceType = (referenceInfo & 0x80000000) >>> 31;

      if (referenceType === 1) {
        console.warn('SIDX has hierarchical references (not supported)');
        return;
      }

      var subsegmentDuration = MP4Demuxer.readUint32(sidx, referenceIndex);
      referenceIndex += 4;
      references.push({
        referenceSize: referenceSize,
        subsegmentDuration: subsegmentDuration,
        // unscaled
        info: {
          duration: subsegmentDuration / timescale,
          start: startByte,
          end: startByte + referenceSize - 1
        }
      });
      startByte += referenceSize; // Skipping 1 bit for |startsWithSap|, 3 bits for |sapType|, and 28 bits
      // for |sapDelta|.

      referenceIndex += 4; // skip to next ref

      index = referenceIndex;
    }

    return {
      earliestPresentationTime: earliestPresentationTime,
      timescale: timescale,
      version: version,
      referencesCount: referencesCount,
      references: references,
      moovEndOffset: moovEndOffset
    };
  }
  /**
   * Parses an MP4 initialization segment and extracts stream type and
   * timescale values for any declared tracks. Timescale values indicate the
   * number of clock ticks per second to assume for time-based values
   * elsewhere in the MP4.
   *
   * To determine the start time of an MP4, you need two pieces of
   * information: the timescale unit and the earliest base media decode
   * time. Multiple timescales can be specified within an MP4 but the
   * base media decode time is always expressed in the timescale from
   * the media header box for the track:
   * ```
   * moov > trak > mdia > mdhd.timescale
   * moov > trak > mdia > hdlr
   * ```
   * @param init {Uint8Array} the bytes of the init segment
   * @return {object} a hash of track type to timescale values or null if
   * the init segment is malformed.
   */
  ;

  MP4Demuxer.parseInitSegment = function parseInitSegment(initSegment) {
    var result = [];
    var traks = MP4Demuxer.findBox(initSegment, ['moov', 'trak']);
    traks.forEach(function (trak) {
      var tkhd = MP4Demuxer.findBox(trak, ['tkhd'])[0];

      if (tkhd) {
        var version = tkhd.data[tkhd.start];
        var index = version === 0 ? 12 : 20;
        var trackId = MP4Demuxer.readUint32(tkhd, index);
        var mdhd = MP4Demuxer.findBox(trak, ['mdia', 'mdhd'])[0];

        if (mdhd) {
          version = mdhd.data[mdhd.start];
          index = version === 0 ? 12 : 20;
          var timescale = MP4Demuxer.readUint32(mdhd, index);
          var hdlr = MP4Demuxer.findBox(trak, ['mdia', 'hdlr'])[0];

          if (hdlr) {
            var hdlrType = MP4Demuxer.bin2str(hdlr.data.subarray(hdlr.start + 8, hdlr.start + 12));
            var type = {
              'soun': 'audio',
              'vide': 'video'
            }[hdlrType];

            if (type) {
              // extract codec info. TODO : parse codec details to be able to build MIME type
              var codecBox = MP4Demuxer.findBox(trak, ['mdia', 'minf', 'stbl', 'stsd']);

              if (codecBox.length) {
                codecBox = codecBox[0];
                var codecType = MP4Demuxer.bin2str(codecBox.data.subarray(codecBox.start + 12, codecBox.start + 16));
                _utils_logger__WEBPACK_IMPORTED_MODULE_0__["logger"].log("MP4Demuxer:" + type + ":" + codecType + " found");
              }

              result[trackId] = {
                timescale: timescale,
                type: type
              };
              result[type] = {
                timescale: timescale,
                id: trackId
              };
            }
          }
        }
      }
    });
    return result;
  }
  /**
  * Determine the base media decode start time, in seconds, for an MP4
  * fragment. If multiple fragments are specified, the earliest time is
  * returned.
  *
  * The base media decode time can be parsed from track fragment
  * metadata:
  * ```
  * moof > traf > tfdt.baseMediaDecodeTime
  * ```
  * It requires the timescale value from the mdhd to interpret.
  *
  * @param timescale {object} a hash of track ids to timescale values.
  * @return {number} the earliest base media decode start time for the
  * fragment, in seconds
  */
  ;

  MP4Demuxer.getStartDTS = function getStartDTS(initData, fragment) {
    var trafs, baseTimes, result; // we need info from two childrend of each track fragment box

    trafs = MP4Demuxer.findBox(fragment, ['moof', 'traf']); // determine the start times for each track

    baseTimes = [].concat.apply([], trafs.map(function (traf) {
      return MP4Demuxer.findBox(traf, ['tfhd']).map(function (tfhd) {
        var id, scale, baseTime; // get the track id from the tfhd

        id = MP4Demuxer.readUint32(tfhd, 4); // assume a 90kHz clock if no timescale was specified

        scale = initData[id].timescale || 90e3; // get the base media decode time from the tfdt

        baseTime = MP4Demuxer.findBox(traf, ['tfdt']).map(function (tfdt) {
          var version, result;
          version = tfdt.data[tfdt.start];
          result = MP4Demuxer.readUint32(tfdt, 4);

          if (version === 1) {
            result *= Math.pow(2, 32);
            result += MP4Demuxer.readUint32(tfdt, 8);
          }

          return result;
        })[0]; // convert base time to seconds

        return baseTime / scale;
      });
    })); // return the minimum

    result = Math.min.apply(null, baseTimes);
    return isFinite(result) ? result : 0;
  };

  MP4Demuxer.offsetStartDTS = function offsetStartDTS(initData, fragment, timeOffset) {
    MP4Demuxer.findBox(fragment, ['moof', 'traf']).map(function (traf) {
      return MP4Demuxer.findBox(traf, ['tfhd']).map(function (tfhd) {
        // get the track id from the tfhd
        var id = MP4Demuxer.readUint32(tfhd, 4); // assume a 90kHz clock if no timescale was specified

        var timescale = initData[id].timescale || 90e3; // get the base media decode time from the tfdt

        MP4Demuxer.findBox(traf, ['tfdt']).map(function (tfdt) {
          var version = tfdt.data[tfdt.start];
          var baseMediaDecodeTime = MP4Demuxer.readUint32(tfdt, 4);

          if (version === 0) {
            MP4Demuxer.writeUint32(tfdt, 4, baseMediaDecodeTime - timeOffset * timescale);
          } else {
            baseMediaDecodeTime *= Math.pow(2, 32);
            baseMediaDecodeTime += MP4Demuxer.readUint32(tfdt, 8);
            baseMediaDecodeTime -= timeOffset * timescale;
            baseMediaDecodeTime = Math.max(baseMediaDecodeTime, 0);
            var upper = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1));
            var lower = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
            MP4Demuxer.writeUint32(tfdt, 4, upper);
            MP4Demuxer.writeUint32(tfdt, 8, lower);
          }
        });
      });
    });
  } // feed incoming data to the front of the parsing pipeline
  ;

  _proto.append = function append(data, timeOffset, contiguous, accurateTimeOffset) {
    var initData = this.initData;

    if (!initData) {
      this.resetInitSegment(data, this.audioCodec, this.videoCodec, false);
      initData = this.initData;
    }

    var startDTS,
        initPTS = this.initPTS;

    if (initPTS === undefined) {
      var _startDTS = MP4Demuxer.getStartDTS(initData, data);

      this.initPTS = initPTS = _startDTS - timeOffset;
      this.observer.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["default"].INIT_PTS_FOUND, {
        initPTS: initPTS
      });
    }

    MP4Demuxer.offsetStartDTS(initData, data, initPTS);
    startDTS = MP4Demuxer.getStartDTS(initData, data);
    this.remuxer.remux(initData.audio, initData.video, null, null, startDTS, contiguous, accurateTimeOffset, data);
  };

  _proto.destroy = function destroy() {};

  return MP4Demuxer;
}();

/* harmony default export */ __webpack_exports__["default"] = (MP4Demuxer);

/***/ }),

/***/ "./src/errors.ts":
/*!***********************!*\
  !*** ./src/errors.ts ***!
  \***********************/
/*! exports provided: ErrorTypes, ErrorDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorTypes", function() { return ErrorTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorDetails", function() { return ErrorDetails; });
var ErrorTypes;
/**
 * @enum {ErrorDetails}
 * @typedef {string} ErrorDetail
 */

(function (ErrorTypes) {
  ErrorTypes["NETWORK_ERROR"] = "networkError";
  ErrorTypes["MEDIA_ERROR"] = "mediaError";
  ErrorTypes["KEY_SYSTEM_ERROR"] = "keySystemError";
  ErrorTypes["MUX_ERROR"] = "muxError";
  ErrorTypes["OTHER_ERROR"] = "otherError";
})(ErrorTypes || (ErrorTypes = {}));

var ErrorDetails;

(function (ErrorDetails) {
  ErrorDetails["KEY_SYSTEM_NO_KEYS"] = "keySystemNoKeys";
  ErrorDetails["KEY_SYSTEM_NO_ACCESS"] = "keySystemNoAccess";
  ErrorDetails["KEY_SYSTEM_NO_SESSION"] = "keySystemNoSession";
  ErrorDetails["KEY_SYSTEM_LICENSE_REQUEST_FAILED"] = "keySystemLicenseRequestFailed";
  ErrorDetails["KEY_SYSTEM_NO_INIT_DATA"] = "keySystemNoInitData";
  ErrorDetails["MANIFEST_LOAD_ERROR"] = "manifestLoadError";
  ErrorDetails["MANIFEST_LOAD_TIMEOUT"] = "manifestLoadTimeOut";
  ErrorDetails["MANIFEST_PARSING_ERROR"] = "manifestParsingError";
  ErrorDetails["MANIFEST_INCOMPATIBLE_CODECS_ERROR"] = "manifestIncompatibleCodecsError";
  ErrorDetails["LEVEL_EMPTY_ERROR"] = "levelEmptyError";
  ErrorDetails["LEVEL_LOAD_ERROR"] = "levelLoadError";
  ErrorDetails["LEVEL_LOAD_TIMEOUT"] = "levelLoadTimeOut";
  ErrorDetails["LEVEL_SWITCH_ERROR"] = "levelSwitchError";
  ErrorDetails["AUDIO_TRACK_LOAD_ERROR"] = "audioTrackLoadError";
  ErrorDetails["AUDIO_TRACK_LOAD_TIMEOUT"] = "audioTrackLoadTimeOut";
  ErrorDetails["FRAG_LOAD_ERROR"] = "fragLoadError";
  ErrorDetails["FRAG_LOAD_TIMEOUT"] = "fragLoadTimeOut";
  ErrorDetails["FRAG_DECRYPT_ERROR"] = "fragDecryptError";
  ErrorDetails["FRAG_PARSING_ERROR"] = "fragParsingError";
  ErrorDetails["REMUX_ALLOC_ERROR"] = "remuxAllocError";
  ErrorDetails["KEY_LOAD_ERROR"] = "keyLoadError";
  ErrorDetails["KEY_LOAD_TIMEOUT"] = "keyLoadTimeOut";
  ErrorDetails["BUFFER_ADD_CODEC_ERROR"] = "bufferAddCodecError";
  ErrorDetails["BUFFER_APPEND_ERROR"] = "bufferAppendError";
  ErrorDetails["BUFFER_APPENDING_ERROR"] = "bufferAppendingError";
  ErrorDetails["BUFFER_STALLED_ERROR"] = "bufferStalledError";
  ErrorDetails["BUFFER_FULL_ERROR"] = "bufferFullError";
  ErrorDetails["BUFFER_SEEK_OVER_HOLE"] = "bufferSeekOverHole";
  ErrorDetails["BUFFER_NUDGE_ON_STALL"] = "bufferNudgeOnStall";
  ErrorDetails["INTERNAL_EXCEPTION"] = "internalException";
})(ErrorDetails || (ErrorDetails = {}));

/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @readonly
 * @enum {string}
 */
var HlsEvents = {
  // fired before MediaSource is attaching to media element - data: { media }
  MEDIA_ATTACHING: 'hlsMediaAttaching',
  // fired when MediaSource has been succesfully attached to media element - data: { }
  MEDIA_ATTACHED: 'hlsMediaAttached',
  // fired before detaching MediaSource from media element - data: { }
  MEDIA_DETACHING: 'hlsMediaDetaching',
  // fired when MediaSource has been detached from media element - data: { }
  MEDIA_DETACHED: 'hlsMediaDetached',
  // fired when we buffer is going to be reset - data: { }
  BUFFER_RESET: 'hlsBufferReset',
  // fired when we know about the codecs that we need buffers for to push into - data: {tracks : { container, codec, levelCodec, initSegment, metadata }}
  BUFFER_CODECS: 'hlsBufferCodecs',
  // fired when sourcebuffers have been created - data: { tracks : tracks }
  BUFFER_CREATED: 'hlsBufferCreated',
  // fired when we append a segment to the buffer - data: { segment: segment object }
  BUFFER_APPENDING: 'hlsBufferAppending',
  // fired when we are done with appending a media segment to the buffer - data : { parent : segment parent that triggered BUFFER_APPENDING, pending : nb of segments waiting for appending for this segment parent}
  BUFFER_APPENDED: 'hlsBufferAppended',
  // fired when the stream is finished and we want to notify the media buffer that there will be no more data - data: { }
  BUFFER_EOS: 'hlsBufferEos',
  // fired when the media buffer should be flushed - data { startOffset, endOffset }
  BUFFER_FLUSHING: 'hlsBufferFlushing',
  // fired when the media buffer has been flushed - data: { }
  BUFFER_FLUSHED: 'hlsBufferFlushed',
  // fired to signal that a manifest loading starts - data: { url : manifestURL}
  MANIFEST_LOADING: 'hlsManifestLoading',
  // fired after manifest has been loaded - data: { levels : [available quality levels], audioTracks : [ available audio tracks], url : manifestURL, stats : { trequest, tfirst, tload, mtime}}
  MANIFEST_LOADED: 'hlsManifestLoaded',
  // fired after manifest has been parsed - data: { levels : [available quality levels], firstLevel : index of first quality level appearing in Manifest}
  MANIFEST_PARSED: 'hlsManifestParsed',
  // fired when a level switch is requested - data: { level : id of new level }
  LEVEL_SWITCHING: 'hlsLevelSwitching',
  // fired when a level switch is effective - data: { level : id of new level }
  LEVEL_SWITCHED: 'hlsLevelSwitched',
  // fired when a level playlist loading starts - data: { url : level URL, level : id of level being loaded}
  LEVEL_LOADING: 'hlsLevelLoading',
  // fired when a level playlist loading finishes - data: { details : levelDetails object, level : id of loaded level, stats : { trequest, tfirst, tload, mtime} }
  LEVEL_LOADED: 'hlsLevelLoaded',
  // fired when a level's details have been updated based on previous details, after it has been loaded - data: { details : levelDetails object, level : id of updated level }
  LEVEL_UPDATED: 'hlsLevelUpdated',
  // fired when a level's PTS information has been updated after parsing a fragment - data: { details : levelDetails object, level : id of updated level, drift: PTS drift observed when parsing last fragment }
  LEVEL_PTS_UPDATED: 'hlsLevelPtsUpdated',
  // fired to notify that levels have changed after removing a level - data: { levels : [available quality levels] }
  LEVELS_UPDATED: 'hlsLevelsUpdated',
  // fired to notify that audio track lists has been updated - data: { audioTracks : audioTracks }
  AUDIO_TRACKS_UPDATED: 'hlsAudioTracksUpdated',
  // fired when an audio track switching is requested - data: { id : audio track id }
  AUDIO_TRACK_SWITCHING: 'hlsAudioTrackSwitching',
  // fired when an audio track switch actually occurs - data: { id : audio track id }
  AUDIO_TRACK_SWITCHED: 'hlsAudioTrackSwitched',
  // fired when an audio track loading starts - data: { url : audio track URL, id : audio track id }
  AUDIO_TRACK_LOADING: 'hlsAudioTrackLoading',
  // fired when an audio track loading finishes - data: { details : levelDetails object, id : audio track id, stats : { trequest, tfirst, tload, mtime } }
  AUDIO_TRACK_LOADED: 'hlsAudioTrackLoaded',
  // fired to notify that subtitle track lists has been updated - data: { subtitleTracks : subtitleTracks }
  SUBTITLE_TRACKS_UPDATED: 'hlsSubtitleTracksUpdated',
  // fired when an subtitle track switch occurs - data: { id : subtitle track id }
  SUBTITLE_TRACK_SWITCH: 'hlsSubtitleTrackSwitch',
  // fired when a subtitle track loading starts - data: { url : subtitle track URL, id : subtitle track id }
  SUBTITLE_TRACK_LOADING: 'hlsSubtitleTrackLoading',
  // fired when a subtitle track loading finishes - data: { details : levelDetails object, id : subtitle track id, stats : { trequest, tfirst, tload, mtime } }
  SUBTITLE_TRACK_LOADED: 'hlsSubtitleTrackLoaded',
  // fired when a subtitle fragment has been processed - data: { success : boolean, frag : the processed frag }
  SUBTITLE_FRAG_PROCESSED: 'hlsSubtitleFragProcessed',
  // fired when a set of VTTCues to be managed externally has been parsed - data: { type: string, track: string, cues: [ VTTCue ] }
  CUES_PARSED: 'hlsCuesParsed',
  // fired when a text track to be managed externally is found - data: { tracks: [ { label: string, kind: string, default: boolean } ] }
  NON_NATIVE_TEXT_TRACKS_FOUND: 'hlsNonNativeTextTracksFound',
  // fired when the first timestamp is found - data: { id : demuxer id, initPTS: initPTS, frag : fragment object }
  INIT_PTS_FOUND: 'hlsInitPtsFound',
  // fired when a fragment loading starts - data: { frag : fragment object }
  FRAG_LOADING: 'hlsFragLoading',
  // fired when a fragment loading is progressing - data: { frag : fragment object, { trequest, tfirst, loaded } }
  FRAG_LOAD_PROGRESS: 'hlsFragLoadProgress',
  // Identifier for fragment load aborting for emergency switch down - data: { frag : fragment object }
  FRAG_LOAD_EMERGENCY_ABORTED: 'hlsFragLoadEmergencyAborted',
  // fired when a fragment loading is completed - data: { frag : fragment object, payload : fragment payload, stats : { trequest, tfirst, tload, length } }
  FRAG_LOADED: 'hlsFragLoaded',
  // fired when a fragment has finished decrypting - data: { id : demuxer id, frag: fragment object, payload : fragment payload, stats : { tstart, tdecrypt } }
  FRAG_DECRYPTED: 'hlsFragDecrypted',
  // fired when Init Segment has been extracted from fragment - data: { id : demuxer id, frag: fragment object, moov : moov MP4 box, codecs : codecs found while parsing fragment }
  FRAG_PARSING_INIT_SEGMENT: 'hlsFragParsingInitSegment',
  // fired when parsing sei text is completed - data: { id : demuxer id, frag: fragment object, samples : [ sei samples pes ] }
  FRAG_PARSING_USERDATA: 'hlsFragParsingUserdata',
  // fired when parsing id3 is completed - data: { id : demuxer id, frag: fragment object, samples : [ id3 samples pes ] }
  FRAG_PARSING_METADATA: 'hlsFragParsingMetadata',
  // fired when data have been extracted from fragment - data: { id : demuxer id, frag: fragment object, data1 : moof MP4 box or TS fragments, data2 : mdat MP4 box or null}
  FRAG_PARSING_DATA: 'hlsFragParsingData',
  // fired when fragment parsing is completed - data: { id : demuxer id, frag: fragment object }
  FRAG_PARSED: 'hlsFragParsed',
  // fired when fragment remuxed MP4 boxes have all been appended into SourceBuffer - data: { id : demuxer id, frag : fragment object, stats : { trequest, tfirst, tload, tparsed, tbuffered, length, bwEstimate } }
  FRAG_BUFFERED: 'hlsFragBuffered',
  // fired when fragment matching with current media position is changing - data : { id : demuxer id, frag : fragment object }
  FRAG_CHANGED: 'hlsFragChanged',
  // Identifier for a FPS drop event - data: { curentDropped, currentDecoded, totalDroppedFrames }
  FPS_DROP: 'hlsFpsDrop',
  // triggered when FPS drop triggers auto level capping - data: { level, droppedlevel }
  FPS_DROP_LEVEL_CAPPING: 'hlsFpsDropLevelCapping',
  // Identifier for an error event - data: { type : error type, details : error details, fatal : if true, hls.js cannot/will not try to recover, if false, hls.js will try to recover,other error specific data }
  ERROR: 'hlsError',
  // fired when hls.js instance starts destroying. Different from MEDIA_DETACHED as one could want to detach and reattach a media to the instance of hls.js to handle mid-rolls for example - data: { }
  DESTROYING: 'hlsDestroying',
  // fired when a decrypt key loading starts - data: { frag : fragment object }
  KEY_LOADING: 'hlsKeyLoading',
  // fired when a decrypt key loading is completed - data: { frag : fragment object, payload : key payload, stats : { trequest, tfirst, tload, length } }
  KEY_LOADED: 'hlsKeyLoaded',
  // fired upon stream controller state transitions - data: { previousState, nextState }
  STREAM_STATE_TRANSITION: 'hlsStreamStateTransition',
  // fired when the live back buffer is reached defined by the liveBackBufferLength config option - data : { bufferEnd: number }
  LIVE_BACK_BUFFER_REACHED: 'hlsLiveBackBufferReached'
};
/* harmony default export */ __webpack_exports__["default"] = (HlsEvents);

/***/ }),

/***/ "./src/hls.ts":
/*!*********************************!*\
  !*** ./src/hls.ts + 50 modules ***!
  \*********************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./src/crypt/decrypter.js because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/demuxer-inline.js because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/id3.js because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/demux/mp4demuxer.js because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/errors.ts because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/events.js because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/polyfills/number.js because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/get-self-scope.js because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/utils/logger.js because of ./src/demux/demuxer-worker.js */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/eventemitter3/index.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/url-toolkit/src/url-toolkit.js (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ hls_Hls; });

// NAMESPACE OBJECT: ./src/utils/cues.ts
var cues_namespaceObject = {};
__webpack_require__.r(cues_namespaceObject);
__webpack_require__.d(cues_namespaceObject, "newCue", function() { return newCue; });

// EXTERNAL MODULE: ./node_modules/url-toolkit/src/url-toolkit.js
var url_toolkit = __webpack_require__("./node_modules/url-toolkit/src/url-toolkit.js");

// EXTERNAL MODULE: ./src/errors.ts
var errors = __webpack_require__("./src/errors.ts");

// EXTERNAL MODULE: ./src/polyfills/number.js
var number = __webpack_require__("./src/polyfills/number.js");

// EXTERNAL MODULE: ./src/events.js
var events = __webpack_require__("./src/events.js");

// EXTERNAL MODULE: ./src/utils/logger.js
var logger = __webpack_require__("./src/utils/logger.js");

// CONCATENATED MODULE: ./src/event-handler.ts
/*
*
* All objects in the event handling chain should inherit from this class
*
*/



var FORBIDDEN_EVENT_NAMES = {
  'hlsEventGeneric': true,
  'hlsHandlerDestroying': true,
  'hlsHandlerDestroyed': true
};

var event_handler_EventHandler = /*#__PURE__*/function () {
  function EventHandler(hls) {
    this.hls = void 0;
    this.handledEvents = void 0;
    this.useGenericHandler = void 0;
    this.hls = hls;
    this.onEvent = this.onEvent.bind(this);

    for (var _len = arguments.length, events = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      events[_key - 1] = arguments[_key];
    }

    this.handledEvents = events;
    this.useGenericHandler = true;
    this.registerListeners();
  }

  var _proto = EventHandler.prototype;

  _proto.destroy = function destroy() {
    this.onHandlerDestroying();
    this.unregisterListeners();
    this.onHandlerDestroyed();
  };

  _proto.onHandlerDestroying = function onHandlerDestroying() {};

  _proto.onHandlerDestroyed = function onHandlerDestroyed() {};

  _proto.isEventHandler = function isEventHandler() {
    return typeof this.handledEvents === 'object' && this.handledEvents.length && typeof this.onEvent === 'function';
  };

  _proto.registerListeners = function registerListeners() {
    if (this.isEventHandler()) {
      this.handledEvents.forEach(function (event) {
        if (FORBIDDEN_EVENT_NAMES[event]) {
          throw new Error('Forbidden event-name: ' + event);
        }

        this.hls.on(event, this.onEvent);
      }, this);
    }
  };

  _proto.unregisterListeners = function unregisterListeners() {
    if (this.isEventHandler()) {
      this.handledEvents.forEach(function (event) {
        this.hls.off(event, this.onEvent);
      }, this);
    }
  }
  /**
   * arguments: event (string), data (any)
   */
  ;

  _proto.onEvent = function onEvent(event, data) {
    this.onEventGeneric(event, data);
  };

  _proto.onEventGeneric = function onEventGeneric(event, data) {
    var eventToFunction = function eventToFunction(event, data) {
      var funcName = 'on' + event.replace('hls', '');

      if (typeof this[funcName] !== 'function') {
        throw new Error("Event " + event + " has no generic handler in this " + this.constructor.name + " class (tried " + funcName + ")");
      }

      return this[funcName].bind(this, data);
    };

    try {
      eventToFunction.call(this, event, data).call();
    } catch (err) {
      logger["logger"].error("An internal error happened while handling event " + event + ". Error message: \"" + err.message + "\". Here is a stacktrace:", err);
      this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].OTHER_ERROR,
        details: errors["ErrorDetails"].INTERNAL_EXCEPTION,
        fatal: false,
        event: event,
        err: err
      });
    }
  };

  return EventHandler;
}();

/* harmony default export */ var event_handler = (event_handler_EventHandler);
// CONCATENATED MODULE: ./src/types/loader.ts
/**
 * `type` property values for this loaders' context object
 * @enum
 *
 */
var PlaylistContextType;
/**
 * @enum {string}
 */

(function (PlaylistContextType) {
  PlaylistContextType["MANIFEST"] = "manifest";
  PlaylistContextType["LEVEL"] = "level";
  PlaylistContextType["AUDIO_TRACK"] = "audioTrack";
  PlaylistContextType["SUBTITLE_TRACK"] = "subtitleTrack";
})(PlaylistContextType || (PlaylistContextType = {}));

var PlaylistLevelType;

(function (PlaylistLevelType) {
  PlaylistLevelType["MAIN"] = "main";
  PlaylistLevelType["AUDIO"] = "audio";
  PlaylistLevelType["SUBTITLE"] = "subtitle";
})(PlaylistLevelType || (PlaylistLevelType = {}));
// EXTERNAL MODULE: ./src/demux/mp4demuxer.js
var mp4demuxer = __webpack_require__("./src/demux/mp4demuxer.js");

// CONCATENATED MODULE: ./src/loader/level-key.ts
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var level_key_LevelKey = /*#__PURE__*/function () {
  function LevelKey(baseURI, relativeURI) {
    this._uri = null;
    this.baseuri = void 0;
    this.reluri = void 0;
    this.method = null;
    this.key = null;
    this.iv = null;
    this.baseuri = baseURI;
    this.reluri = relativeURI;
  }

  _createClass(LevelKey, [{
    key: "uri",
    get: function get() {
      if (!this._uri && this.reluri) {
        this._uri = Object(url_toolkit["buildAbsoluteURL"])(this.baseuri, this.reluri, {
          alwaysNormalize: true
        });
      }

      return this._uri;
    }
  }]);

  return LevelKey;
}();


// CONCATENATED MODULE: ./src/loader/fragment.ts



function fragment_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function fragment_createClass(Constructor, protoProps, staticProps) { if (protoProps) fragment_defineProperties(Constructor.prototype, protoProps); if (staticProps) fragment_defineProperties(Constructor, staticProps); return Constructor; }




var ElementaryStreamTypes;

(function (ElementaryStreamTypes) {
  ElementaryStreamTypes["AUDIO"] = "audio";
  ElementaryStreamTypes["VIDEO"] = "video";
})(ElementaryStreamTypes || (ElementaryStreamTypes = {}));

var fragment_Fragment = /*#__PURE__*/function () {
  function Fragment() {
    var _this$_elementaryStre;

    this._url = null;
    this._byteRange = null;
    this._decryptdata = null;
    this._elementaryStreams = (_this$_elementaryStre = {}, _this$_elementaryStre[ElementaryStreamTypes.AUDIO] = false, _this$_elementaryStre[ElementaryStreamTypes.VIDEO] = false, _this$_elementaryStre);
    this.deltaPTS = 0;
    this.rawProgramDateTime = null;
    this.programDateTime = null;
    this.title = null;
    this.tagList = [];
    this.cc = void 0;
    this.type = void 0;
    this.relurl = void 0;
    this.baseurl = void 0;
    this.duration = void 0;
    this.start = void 0;
    this.sn = 0;
    this.urlId = 0;
    this.level = 0;
    this.levelkey = void 0;
    this.loader = void 0;
  }

  var _proto = Fragment.prototype;

  // setByteRange converts a EXT-X-BYTERANGE attribute into a two element array
  _proto.setByteRange = function setByteRange(value, previousFrag) {
    var params = value.split('@', 2);
    var byteRange = [];

    if (params.length === 1) {
      byteRange[0] = previousFrag ? previousFrag.byteRangeEndOffset : 0;
    } else {
      byteRange[0] = parseInt(params[1]);
    }

    byteRange[1] = parseInt(params[0]) + byteRange[0];
    this._byteRange = byteRange;
  };

  /**
   * @param {ElementaryStreamTypes} type
   */
  _proto.addElementaryStream = function addElementaryStream(type) {
    this._elementaryStreams[type] = true;
  }
  /**
   * @param {ElementaryStreamTypes} type
   */
  ;

  _proto.hasElementaryStream = function hasElementaryStream(type) {
    return this._elementaryStreams[type] === true;
  }
  /**
   * Utility method for parseLevelPlaylist to create an initialization vector for a given segment
   * @param {number} segmentNumber - segment number to generate IV with
   * @returns {Uint8Array}
   */
  ;

  _proto.createInitializationVector = function createInitializationVector(segmentNumber) {
    var uint8View = new Uint8Array(16);

    for (var i = 12; i < 16; i++) {
      uint8View[i] = segmentNumber >> 8 * (15 - i) & 0xff;
    }

    return uint8View;
  }
  /**
   * Utility method for parseLevelPlaylist to get a fragment's decryption data from the currently parsed encryption key data
   * @param levelkey - a playlist's encryption info
   * @param segmentNumber - the fragment's segment number
   * @returns {LevelKey} - an object to be applied as a fragment's decryptdata
   */
  ;

  _proto.setDecryptDataFromLevelKey = function setDecryptDataFromLevelKey(levelkey, segmentNumber) {
    var decryptdata = levelkey;

    if ((levelkey === null || levelkey === void 0 ? void 0 : levelkey.method) && levelkey.uri && !levelkey.iv) {
      decryptdata = new level_key_LevelKey(levelkey.baseuri, levelkey.reluri);
      decryptdata.method = levelkey.method;
      decryptdata.iv = this.createInitializationVector(segmentNumber);
    }

    return decryptdata;
  };

  fragment_createClass(Fragment, [{
    key: "url",
    get: function get() {
      if (!this._url && this.relurl) {
        this._url = Object(url_toolkit["buildAbsoluteURL"])(this.baseurl, this.relurl, {
          alwaysNormalize: true
        });
      }

      return this._url;
    },
    set: function set(value) {
      this._url = value;
    }
  }, {
    key: "byteRange",
    get: function get() {
      if (!this._byteRange) {
        return [];
      }

      return this._byteRange;
    }
    /**
     * @type {number}
     */

  }, {
    key: "byteRangeStartOffset",
    get: function get() {
      return this.byteRange[0];
    }
  }, {
    key: "byteRangeEndOffset",
    get: function get() {
      return this.byteRange[1];
    }
  }, {
    key: "decryptdata",
    get: function get() {
      if (!this.levelkey && !this._decryptdata) {
        return null;
      }

      if (!this._decryptdata && this.levelkey) {
        var sn = this.sn;

        if (typeof sn !== 'number') {
          // We are fetching decryption data for a initialization segment
          // If the segment was encrypted with AES-128
          // It must have an IV defined. We cannot substitute the Segment Number in.
          if (this.levelkey && this.levelkey.method === 'AES-128' && !this.levelkey.iv) {
            logger["logger"].warn("missing IV for initialization segment with method=\"" + this.levelkey.method + "\" - compliance issue");
          }
          /*
          Be converted to a Number.
          'initSegment' will become NaN.
          NaN, which when converted through ToInt32() -> +0.
          ---
          Explicitly set sn to resulting value from implicit conversions 'initSegment' values for IV generation.
          */


          sn = 0;
        }

        this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, sn);
      }

      return this._decryptdata;
    }
  }, {
    key: "endProgramDateTime",
    get: function get() {
      if (this.programDateTime === null) {
        return null;
      }

      if (!Object(number["isFiniteNumber"])(this.programDateTime)) {
        return null;
      }

      var duration = !Object(number["isFiniteNumber"])(this.duration) ? 0 : this.duration;
      return this.programDateTime + duration * 1000;
    }
  }, {
    key: "encrypted",
    get: function get() {
      return !!(this.decryptdata && this.decryptdata.uri !== null && this.decryptdata.key === null);
    }
  }]);

  return Fragment;
}();


// CONCATENATED MODULE: ./src/loader/level.js


function level_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function level_createClass(Constructor, protoProps, staticProps) { if (protoProps) level_defineProperties(Constructor.prototype, protoProps); if (staticProps) level_defineProperties(Constructor, staticProps); return Constructor; }

var level_Level = /*#__PURE__*/function () {
  function Level(baseUrl) {
    // Please keep properties in alphabetical order
    this.endCC = 0;
    this.endSN = 0;
    this.fragments = [];
    this.initSegment = null;
    this.live = true;
    this.needSidxRanges = false;
    this.startCC = 0;
    this.startSN = 0;
    this.startTimeOffset = null;
    this.targetduration = 0;
    this.totalduration = 0;
    this.type = null;
    this.url = baseUrl;
    this.version = null;
  }

  level_createClass(Level, [{
    key: "hasProgramDateTime",
    get: function get() {
      return !!(this.fragments[0] && Object(number["isFiniteNumber"])(this.fragments[0].programDateTime));
    }
  }]);

  return Level;
}();


// CONCATENATED MODULE: ./src/utils/attr-list.js
var DECIMAL_RESOLUTION_REGEX = /^(\d+)x(\d+)$/; // eslint-disable-line no-useless-escape

var ATTR_LIST_REGEX = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g; // eslint-disable-line no-useless-escape
// adapted from https://github.com/kanongil/node-m3u8parse/blob/master/attrlist.js

var AttrList = /*#__PURE__*/function () {
  function AttrList(attrs) {
    if (typeof attrs === 'string') {
      attrs = AttrList.parseAttrList(attrs);
    }

    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        this[attr] = attrs[attr];
      }
    }
  }

  var _proto = AttrList.prototype;

  _proto.decimalInteger = function decimalInteger(attrName) {
    var intValue = parseInt(this[attrName], 10);

    if (intValue > Number.MAX_SAFE_INTEGER) {
      return Infinity;
    }

    return intValue;
  };

  _proto.hexadecimalInteger = function hexadecimalInteger(attrName) {
    if (this[attrName]) {
      var stringValue = (this[attrName] || '0x').slice(2);
      stringValue = (stringValue.length & 1 ? '0' : '') + stringValue;
      var value = new Uint8Array(stringValue.length / 2);

      for (var i = 0; i < stringValue.length / 2; i++) {
        value[i] = parseInt(stringValue.slice(i * 2, i * 2 + 2), 16);
      }

      return value;
    } else {
      return null;
    }
  };

  _proto.hexadecimalIntegerAsNumber = function hexadecimalIntegerAsNumber(attrName) {
    var intValue = parseInt(this[attrName], 16);

    if (intValue > Number.MAX_SAFE_INTEGER) {
      return Infinity;
    }

    return intValue;
  };

  _proto.decimalFloatingPoint = function decimalFloatingPoint(attrName) {
    return parseFloat(this[attrName]);
  };

  _proto.enumeratedString = function enumeratedString(attrName) {
    return this[attrName];
  };

  _proto.decimalResolution = function decimalResolution(attrName) {
    var res = DECIMAL_RESOLUTION_REGEX.exec(this[attrName]);

    if (res === null) {
      return undefined;
    }

    return {
      width: parseInt(res[1], 10),
      height: parseInt(res[2], 10)
    };
  };

  AttrList.parseAttrList = function parseAttrList(input) {
    var match,
        attrs = {};
    ATTR_LIST_REGEX.lastIndex = 0;

    while ((match = ATTR_LIST_REGEX.exec(input)) !== null) {
      var value = match[2],
          quote = '"';

      if (value.indexOf(quote) === 0 && value.lastIndexOf(quote) === value.length - 1) {
        value = value.slice(1, -1);
      }

      attrs[match[1]] = value;
    }

    return attrs;
  };

  return AttrList;
}();

/* harmony default export */ var attr_list = (AttrList);
// CONCATENATED MODULE: ./src/utils/codecs.ts
// from http://mp4ra.org/codecs.html
var sampleEntryCodesISO = {
  audio: {
    'a3ds': true,
    'ac-3': true,
    'ac-4': true,
    'alac': true,
    'alaw': true,
    'dra1': true,
    'dts+': true,
    'dts-': true,
    'dtsc': true,
    'dtse': true,
    'dtsh': true,
    'ec-3': true,
    'enca': true,
    'g719': true,
    'g726': true,
    'm4ae': true,
    'mha1': true,
    'mha2': true,
    'mhm1': true,
    'mhm2': true,
    'mlpa': true,
    'mp4a': true,
    'raw ': true,
    'Opus': true,
    'samr': true,
    'sawb': true,
    'sawp': true,
    'sevc': true,
    'sqcp': true,
    'ssmv': true,
    'twos': true,
    'ulaw': true
  },
  video: {
    'avc1': true,
    'avc2': true,
    'avc3': true,
    'avc4': true,
    'avcp': true,
    'drac': true,
    'dvav': true,
    'dvhe': true,
    'encv': true,
    'hev1': true,
    'hvc1': true,
    'mjp2': true,
    'mp4v': true,
    'mvc1': true,
    'mvc2': true,
    'mvc3': true,
    'mvc4': true,
    'resv': true,
    'rv60': true,
    's263': true,
    'svc1': true,
    'svc2': true,
    'vc-1': true,
    'vp08': true,
    'vp09': true
  }
};

function isCodecType(codec, type) {
  var typeCodes = sampleEntryCodesISO[type];
  return !!typeCodes && typeCodes[codec.slice(0, 4)] === true;
}

function isCodecSupportedInMp4(codec, type) {
  return MediaSource.isTypeSupported((type || 'video') + "/mp4;codecs=\"" + codec + "\"");
}


// CONCATENATED MODULE: ./src/loader/m3u8-parser.ts











/**
 * M3U8 parser
 * @module
 */
// https://regex101.com is your friend
var MASTER_PLAYLIST_REGEX = /(?:#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)|#EXT-X-SESSION-DATA:([^\n\r]*)[\r\n]+)/g;
var MASTER_PLAYLIST_MEDIA_REGEX = /#EXT-X-MEDIA:(.*)/g;
var LEVEL_PLAYLIST_REGEX_FAST = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, // duration (#EXTINF:<duration>,<title>), group 1 => duration, group 2 => title
/|(?!#)([\S+ ?]+)/.source, // segment URI, group 3 => the URI (note newline is not eaten)
/|#EXT-X-BYTERANGE:*(.+)/.source, // next segment's byterange, group 4 => range spec (x@y)
/|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, // next segment's program date/time group 5 => the datetime spec
/|#.*/.source // All other non-segment oriented tags will match with all groups empty
].join(''), 'g');
var LEVEL_PLAYLIST_REGEX_SLOW = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)([^:]*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/;
var MP4_REGEX_SUFFIX = /\.(mp4|m4s|m4v|m4a)$/i;

var m3u8_parser_M3U8Parser = /*#__PURE__*/function () {
  function M3U8Parser() {}

  M3U8Parser.findGroup = function findGroup(groups, mediaGroupId) {
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];

      if (group.id === mediaGroupId) {
        return group;
      }
    }
  };

  M3U8Parser.convertAVC1ToAVCOTI = function convertAVC1ToAVCOTI(codec) {
    var avcdata = codec.split('.');
    var result;

    if (avcdata.length > 2) {
      result = avcdata.shift() + '.';
      result += parseInt(avcdata.shift()).toString(16);
      result += ('000' + parseInt(avcdata.shift()).toString(16)).substr(-4);
    } else {
      result = codec;
    }

    return result;
  };

  M3U8Parser.resolve = function resolve(url, baseUrl) {
    return url_toolkit["buildAbsoluteURL"](baseUrl, url, {
      alwaysNormalize: true
    });
  };

  M3U8Parser.parseMasterPlaylist = function parseMasterPlaylist(string, baseurl) {
    // TODO(typescript-level)
    var levels = [];
    var sessionData = {};
    var hasSessionData = false;
    MASTER_PLAYLIST_REGEX.lastIndex = 0; // TODO(typescript-level)

    function setCodecs(codecs, level) {
      ['video', 'audio'].forEach(function (type) {
        var filtered = codecs.filter(function (codec) {
          return isCodecType(codec, type);
        });

        if (filtered.length) {
          var preferred = filtered.filter(function (codec) {
            return codec.lastIndexOf('avc1', 0) === 0 || codec.lastIndexOf('mp4a', 0) === 0;
          });
          level[type + "Codec"] = preferred.length > 0 ? preferred[0] : filtered[0]; // remove from list

          codecs = codecs.filter(function (codec) {
            return filtered.indexOf(codec) === -1;
          });
        }
      });
      level.unknownCodecs = codecs;
    }

    var result;

    while ((result = MASTER_PLAYLIST_REGEX.exec(string)) != null) {
      if (result[1]) {
        // '#EXT-X-STREAM-INF' is found, parse level tag  in group 1
        // TODO(typescript-level)
        var level = {};
        var attrs = level.attrs = new attr_list(result[1]);
        level.url = M3U8Parser.resolve(result[2], baseurl);
        var resolution = attrs.decimalResolution('RESOLUTION');

        if (resolution) {
          level.width = resolution.width;
          level.height = resolution.height;
        }

        level.bitrate = attrs.decimalInteger('AVERAGE-BANDWIDTH') || attrs.decimalInteger('BANDWIDTH');
        level.name = attrs.NAME;
        setCodecs([].concat((attrs.CODECS || '').split(/[ ,]+/)), level);

        if (level.videoCodec && level.videoCodec.indexOf('avc1') !== -1) {
          level.videoCodec = M3U8Parser.convertAVC1ToAVCOTI(level.videoCodec);
        }

        levels.push(level);
      } else if (result[3]) {
        // '#EXT-X-SESSION-DATA' is found, parse session data in group 3
        var sessionAttrs = new attr_list(result[3]);

        if (sessionAttrs['DATA-ID']) {
          hasSessionData = true;
          sessionData[sessionAttrs['DATA-ID']] = sessionAttrs;
        }
      }
    }

    return {
      levels: levels,
      sessionData: hasSessionData ? sessionData : null
    };
  };

  M3U8Parser.parseMasterPlaylistMedia = function parseMasterPlaylistMedia(string, baseurl, type, audioGroups) {
    if (audioGroups === void 0) {
      audioGroups = [];
    }

    var result;
    var medias = [];
    var id = 0;
    MASTER_PLAYLIST_MEDIA_REGEX.lastIndex = 0;

    while ((result = MASTER_PLAYLIST_MEDIA_REGEX.exec(string)) !== null) {
      var attrs = new attr_list(result[1]);

      if (attrs.TYPE === type) {
        var media = {
          attrs: attrs,
          id: id++,
          groupId: attrs['GROUP-ID'],
          instreamId: attrs['INSTREAM-ID'],
          name: attrs.NAME || attrs.LANGUAGE,
          type: type,
          default: attrs.DEFAULT === 'YES',
          autoselect: attrs.AUTOSELECT === 'YES',
          forced: attrs.FORCED === 'YES',
          lang: attrs.LANGUAGE
        };

        if (attrs.URI) {
          media.url = M3U8Parser.resolve(attrs.URI, baseurl);
        }

        if (audioGroups.length) {
          // If there are audio groups signalled in the manifest, let's look for a matching codec string for this track
          var groupCodec = M3U8Parser.findGroup(audioGroups, media.groupId); // If we don't find the track signalled, lets use the first audio groups codec we have
          // Acting as a best guess

          media.audioCodec = groupCodec ? groupCodec.codec : audioGroups[0].codec;
        }

        medias.push(media);
      }
    }

    return medias;
  };

  M3U8Parser.parseLevelPlaylist = function parseLevelPlaylist(string, baseurl, id, type, levelUrlId) {
    var currentSN = 0;
    var totalduration = 0;
    var level = new level_Level(baseurl);
    var discontinuityCounter = 0;
    var prevFrag = null;
    var frag = new fragment_Fragment();
    var result;
    var i;
    var levelkey;
    var firstPdtIndex = null;
    LEVEL_PLAYLIST_REGEX_FAST.lastIndex = 0;

    while ((result = LEVEL_PLAYLIST_REGEX_FAST.exec(string)) !== null) {
      var duration = result[1];

      if (duration) {
        // INF
        frag.duration = parseFloat(duration); // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939

        var title = (' ' + result[2]).slice(1);
        frag.title = title || null;
        frag.tagList.push(title ? ['INF', duration, title] : ['INF', duration]);
      } else if (result[3]) {
        // url
        if (Object(number["isFiniteNumber"])(frag.duration)) {
          var sn = currentSN++;
          frag.type = type;
          frag.start = totalduration;

          if (levelkey) {
            frag.levelkey = levelkey;
          }

          frag.sn = sn;
          frag.level = id;
          frag.cc = discontinuityCounter;
          frag.urlId = levelUrlId;
          frag.baseurl = baseurl; // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939

          frag.relurl = (' ' + result[3]).slice(1);
          assignProgramDateTime(frag, prevFrag);
          level.fragments.push(frag);
          prevFrag = frag;
          totalduration += frag.duration;
          frag = new fragment_Fragment();
        }
      } else if (result[4]) {
        // X-BYTERANGE
        var data = (' ' + result[4]).slice(1);

        if (prevFrag) {
          frag.setByteRange(data, prevFrag);
        } else {
          frag.setByteRange(data);
        }
      } else if (result[5]) {
        // PROGRAM-DATE-TIME
        // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939
        frag.rawProgramDateTime = (' ' + result[5]).slice(1);
        frag.tagList.push(['PROGRAM-DATE-TIME', frag.rawProgramDateTime]);

        if (firstPdtIndex === null) {
          firstPdtIndex = level.fragments.length;
        }
      } else {
        result = result[0].match(LEVEL_PLAYLIST_REGEX_SLOW);

        if (!result) {
          logger["logger"].warn('No matches on slow regex match for level playlist!');
          continue;
        }

        for (i = 1; i < result.length; i++) {
          if (typeof result[i] !== 'undefined') {
            break;
          }
        } // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939


        var value1 = (' ' + result[i + 1]).slice(1);
        var value2 = (' ' + result[i + 2]).slice(1);

        switch (result[i]) {
          case '#':
            frag.tagList.push(value2 ? [value1, value2] : [value1]);
            break;

          case 'PLAYLIST-TYPE':
            level.type = value1.toUpperCase();
            break;

          case 'MEDIA-SEQUENCE':
            currentSN = level.startSN = parseInt(value1);
            break;

          case 'TARGETDURATION':
            level.targetduration = parseFloat(value1);
            break;

          case 'VERSION':
            level.version = parseInt(value1);
            break;

          case 'EXTM3U':
            break;

          case 'ENDLIST':
            level.live = false;
            break;

          case 'DIS':
            discontinuityCounter++;
            frag.tagList.push(['DIS']);
            break;

          case 'DISCONTINUITY-SEQ':
            discontinuityCounter = parseInt(value1);
            break;

          case 'KEY':
            {
              // https://tools.ietf.org/html/rfc8216#section-4.3.2.4
              var decryptparams = value1;
              var keyAttrs = new attr_list(decryptparams);
              var decryptmethod = keyAttrs.enumeratedString('METHOD');
              var decrypturi = keyAttrs.URI;
              var decryptiv = keyAttrs.hexadecimalInteger('IV'); // From RFC: This attribute is OPTIONAL; its absence indicates an implicit value of "identity".

              var decryptkeyformat = keyAttrs.KEYFORMAT || 'identity';

              if (decryptkeyformat === 'com.apple.streamingkeydelivery') {
                logger["logger"].warn('Keyformat com.apple.streamingkeydelivery is not supported');
                continue;
              }

              if (decryptmethod) {
                levelkey = new level_key_LevelKey(baseurl, decrypturi);

                if (decrypturi && ['AES-128', 'SAMPLE-AES', 'SAMPLE-AES-CENC'].indexOf(decryptmethod) >= 0) {
                  levelkey.method = decryptmethod;
                  levelkey.key = null; // Initialization Vector (IV)

                  levelkey.iv = decryptiv;
                }
              }

              break;
            }

          case 'START':
            {
              var startAttrs = new attr_list(value1);
              var startTimeOffset = startAttrs.decimalFloatingPoint('TIME-OFFSET'); // TIME-OFFSET can be 0

              if (Object(number["isFiniteNumber"])(startTimeOffset)) {
                level.startTimeOffset = startTimeOffset;
              }

              break;
            }

          case 'MAP':
            {
              var mapAttrs = new attr_list(value1);
              frag.relurl = mapAttrs.URI;

              if (mapAttrs.BYTERANGE) {
                frag.setByteRange(mapAttrs.BYTERANGE);
              }

              frag.baseurl = baseurl;
              frag.level = id;
              frag.type = type;
              frag.sn = 'initSegment';
              level.initSegment = frag;
              frag = new fragment_Fragment();
              frag.rawProgramDateTime = level.initSegment.rawProgramDateTime;
              break;
            }

          default:
            logger["logger"].warn("line parsed but not handled: " + result);
            break;
        }
      }
    }

    frag = prevFrag; // logger.log('found ' + level.fragments.length + ' fragments');

    if (frag && !frag.relurl) {
      level.fragments.pop();
      totalduration -= frag.duration;
    }

    level.totalduration = totalduration;
    level.averagetargetduration = totalduration / level.fragments.length;
    level.endSN = currentSN - 1;
    level.startCC = level.fragments[0] ? level.fragments[0].cc : 0;
    level.endCC = discontinuityCounter;

    if (!level.initSegment && level.fragments.length) {
      // this is a bit lurky but HLS really has no other way to tell us
      // if the fragments are TS or MP4, except if we download them :/
      // but this is to be able to handle SIDX.
      if (level.fragments.every(function (frag) {
        return MP4_REGEX_SUFFIX.test(frag.relurl);
      })) {
        logger["logger"].warn('MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX');
        frag = new fragment_Fragment();
        frag.relurl = level.fragments[0].relurl;
        frag.baseurl = baseurl;
        frag.level = id;
        frag.type = type;
        frag.sn = 'initSegment';
        level.initSegment = frag;
        level.needSidxRanges = true;
      }
    }
    /**
     * Backfill any missing PDT values
       "If the first EXT-X-PROGRAM-DATE-TIME tag in a Playlist appears after
       one or more Media Segment URIs, the client SHOULD extrapolate
       backward from that tag (using EXTINF durations and/or media
       timestamps) to associate dates with those segments."
     * We have already extrapolated forward, but all fragments up to the first instance of PDT do not have their PDTs
     * computed.
     */


    if (firstPdtIndex) {
      backfillProgramDateTimes(level.fragments, firstPdtIndex);
    }

    return level;
  };

  return M3U8Parser;
}();



function backfillProgramDateTimes(fragments, startIndex) {
  var fragPrev = fragments[startIndex];

  for (var i = startIndex - 1; i >= 0; i--) {
    var frag = fragments[i];
    frag.programDateTime = fragPrev.programDateTime - frag.duration * 1000;
    fragPrev = frag;
  }
}

function assignProgramDateTime(frag, prevFrag) {
  if (frag.rawProgramDateTime) {
    frag.programDateTime = Date.parse(frag.rawProgramDateTime);
  } else if (prevFrag === null || prevFrag === void 0 ? void 0 : prevFrag.programDateTime) {
    frag.programDateTime = prevFrag.endProgramDateTime;
  }

  if (!Object(number["isFiniteNumber"])(frag.programDateTime)) {
    frag.programDateTime = null;
    frag.rawProgramDateTime = null;
  }
}
// CONCATENATED MODULE: ./src/loader/playlist-loader.ts



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * PlaylistLoader - delegate for media manifest/playlist loading tasks. Takes care of parsing media to internal data-models.
 *
 * Once loaded, dispatches events with parsed data-models of manifest/levels/audio/subtitle tracks.
 *
 * Uses loader(s) set in config to do actual internal loading of resource tasks.
 *
 * @module
 *
 */







var _window = window,
    performance = _window.performance;
/**
 * @constructor
 */

var playlist_loader_PlaylistLoader = /*#__PURE__*/function (_EventHandler) {
  _inheritsLoose(PlaylistLoader, _EventHandler);

  /**
   * @constructs
   * @param {Hls} hls
   */
  function PlaylistLoader(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].MANIFEST_LOADING, events["default"].LEVEL_LOADING, events["default"].AUDIO_TRACK_LOADING, events["default"].SUBTITLE_TRACK_LOADING) || this;
    _this.loaders = {};
    return _this;
  }
  /**
   * @param {PlaylistContextType} type
   * @returns {boolean}
   */


  PlaylistLoader.canHaveQualityLevels = function canHaveQualityLevels(type) {
    return type !== PlaylistContextType.AUDIO_TRACK && type !== PlaylistContextType.SUBTITLE_TRACK;
  }
  /**
   * Map context.type to LevelType
   * @param {PlaylistLoaderContext} context
   * @returns {LevelType}
   */
  ;

  PlaylistLoader.mapContextToLevelType = function mapContextToLevelType(context) {
    var type = context.type;

    switch (type) {
      case PlaylistContextType.AUDIO_TRACK:
        return PlaylistLevelType.AUDIO;

      case PlaylistContextType.SUBTITLE_TRACK:
        return PlaylistLevelType.SUBTITLE;

      default:
        return PlaylistLevelType.MAIN;
    }
  };

  PlaylistLoader.getResponseUrl = function getResponseUrl(response, context) {
    var url = response.url; // responseURL not supported on some browsers (it is used to detect URL redirection)
    // data-uri mode also not supported (but no need to detect redirection)

    if (url === undefined || url.indexOf('data:') === 0) {
      // fallback to initial URL
      url = context.url;
    }

    return url;
  }
  /**
   * Returns defaults or configured loader-type overloads (pLoader and loader config params)
   * Default loader is XHRLoader (see utils)
   * @param {PlaylistLoaderContext} context
   * @returns {Loader} or other compatible configured overload
   */
  ;

  var _proto = PlaylistLoader.prototype;

  _proto.createInternalLoader = function createInternalLoader(context) {
    var config = this.hls.config;
    var PLoader = config.pLoader;
    var Loader = config.loader; // TODO(typescript-config): Verify once config is typed that InternalLoader always returns a Loader

    var InternalLoader = PLoader || Loader;
    var loader = new InternalLoader(config); // TODO - Do we really need to assign the instance or if the dep has been lost

    context.loader = loader;
    this.loaders[context.type] = loader;
    return loader;
  };

  _proto.getInternalLoader = function getInternalLoader(context) {
    return this.loaders[context.type];
  };

  _proto.resetInternalLoader = function resetInternalLoader(contextType) {
    if (this.loaders[contextType]) {
      delete this.loaders[contextType];
    }
  }
  /**
   * Call `destroy` on all internal loader instances mapped (one per context type)
   */
  ;

  _proto.destroyInternalLoaders = function destroyInternalLoaders() {
    for (var contextType in this.loaders) {
      var loader = this.loaders[contextType];

      if (loader) {
        loader.destroy();
      }

      this.resetInternalLoader(contextType);
    }
  };

  _proto.destroy = function destroy() {
    this.destroyInternalLoaders();

    _EventHandler.prototype.destroy.call(this);
  };

  _proto.onManifestLoading = function onManifestLoading(data) {
    this.load({
      url: data.url,
      type: PlaylistContextType.MANIFEST,
      level: 0,
      id: null,
      responseType: 'text'
    });
  };

  _proto.onLevelLoading = function onLevelLoading(data) {
    this.load({
      url: data.url,
      type: PlaylistContextType.LEVEL,
      level: data.level,
      id: data.id,
      responseType: 'text'
    });
  };

  _proto.onAudioTrackLoading = function onAudioTrackLoading(data) {
    this.load({
      url: data.url,
      type: PlaylistContextType.AUDIO_TRACK,
      level: null,
      id: data.id,
      responseType: 'text'
    });
  };

  _proto.onSubtitleTrackLoading = function onSubtitleTrackLoading(data) {
    this.load({
      url: data.url,
      type: PlaylistContextType.SUBTITLE_TRACK,
      level: null,
      id: data.id,
      responseType: 'text'
    });
  };

  _proto.load = function load(context) {
    var config = this.hls.config;
    logger["logger"].debug("Loading playlist of type " + context.type + ", level: " + context.level + ", id: " + context.id); // Check if a loader for this context already exists

    var loader = this.getInternalLoader(context);

    if (loader) {
      var loaderContext = loader.context;

      if (loaderContext && loaderContext.url === context.url) {
        // same URL can't overlap
        logger["logger"].trace('playlist request ongoing');
        return false;
      } else {
        logger["logger"].warn("aborting previous loader for type: " + context.type);
        loader.abort();
      }
    }

    var maxRetry;
    var timeout;
    var retryDelay;
    var maxRetryDelay; // apply different configs for retries depending on
    // context (manifest, level, audio/subs playlist)

    switch (context.type) {
      case PlaylistContextType.MANIFEST:
        maxRetry = config.manifestLoadingMaxRetry;
        timeout = config.manifestLoadingTimeOut;
        retryDelay = config.manifestLoadingRetryDelay;
        maxRetryDelay = config.manifestLoadingMaxRetryTimeout;
        break;

      case PlaylistContextType.LEVEL:
        // Disable internal loader retry logic, since we are managing retries in Level Controller
        maxRetry = 0;
        maxRetryDelay = 0;
        retryDelay = 0;
        timeout = config.levelLoadingTimeOut; // TODO Introduce retry settings for audio-track and subtitle-track, it should not use level retry config

        break;

      default:
        maxRetry = config.levelLoadingMaxRetry;
        timeout = config.levelLoadingTimeOut;
        retryDelay = config.levelLoadingRetryDelay;
        maxRetryDelay = config.levelLoadingMaxRetryTimeout;
        break;
    }

    loader = this.createInternalLoader(context);
    var loaderConfig = {
      timeout: timeout,
      maxRetry: maxRetry,
      retryDelay: retryDelay,
      maxRetryDelay: maxRetryDelay
    };
    var loaderCallbacks = {
      onSuccess: this.loadsuccess.bind(this),
      onError: this.loaderror.bind(this),
      onTimeout: this.loadtimeout.bind(this)
    };
    logger["logger"].debug("Calling internal loader delegate for URL: " + context.url);
    loader.load(context, loaderConfig, loaderCallbacks);
    return true;
  };

  _proto.loadsuccess = function loadsuccess(response, stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    if (context.isSidxRequest) {
      this._handleSidxRequest(response, context);

      this._handlePlaylistLoaded(response, stats, context, networkDetails);

      return;
    }

    this.resetInternalLoader(context.type);

    if (typeof response.data !== 'string') {
      throw new Error('expected responseType of "text" for PlaylistLoader');
    }

    var string = response.data;
    stats.tload = performance.now(); // stats.mtime = new Date(target.getResponseHeader('Last-Modified'));
    // Validate if it is an M3U8 at all

    if (string.indexOf('#EXTM3U') !== 0) {
      this._handleManifestParsingError(response, context, 'no EXTM3U delimiter', networkDetails);

      return;
    } // Check if chunk-list or master. handle empty chunk list case (first EXTINF not signaled, but TARGETDURATION present)


    if (string.indexOf('#EXTINF:') > 0 || string.indexOf('#EXT-X-TARGETDURATION:') > 0) {
      this._handleTrackOrLevelPlaylist(response, stats, context, networkDetails);
    } else {
      this._handleMasterPlaylist(response, stats, context, networkDetails);
    }
  };

  _proto.loaderror = function loaderror(response, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    this._handleNetworkError(context, networkDetails, false, response);
  };

  _proto.loadtimeout = function loadtimeout(stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    this._handleNetworkError(context, networkDetails, true);
  } // TODO(typescript-config): networkDetails can currently be a XHR or Fetch impl,
  // but with custom loaders it could be generic investigate this further when config is typed
  ;

  _proto._handleMasterPlaylist = function _handleMasterPlaylist(response, stats, context, networkDetails) {
    var hls = this.hls;
    var string = response.data;
    var url = PlaylistLoader.getResponseUrl(response, context);

    var _M3U8Parser$parseMast = m3u8_parser_M3U8Parser.parseMasterPlaylist(string, url),
        levels = _M3U8Parser$parseMast.levels,
        sessionData = _M3U8Parser$parseMast.sessionData;

    if (!levels.length) {
      this._handleManifestParsingError(response, context, 'no level found in manifest', networkDetails);

      return;
    } // multi level playlist, parse level info


    var audioGroups = levels.map(function (level) {
      return {
        id: level.attrs.AUDIO,
        codec: level.audioCodec
      };
    });
    var audioTracks = m3u8_parser_M3U8Parser.parseMasterPlaylistMedia(string, url, 'AUDIO', audioGroups);
    var subtitles = m3u8_parser_M3U8Parser.parseMasterPlaylistMedia(string, url, 'SUBTITLES');
    var captions = m3u8_parser_M3U8Parser.parseMasterPlaylistMedia(string, url, 'CLOSED-CAPTIONS');

    if (audioTracks.length) {
      // check if we have found an audio track embedded in main playlist (audio track without URI attribute)
      var embeddedAudioFound = false;
      audioTracks.forEach(function (audioTrack) {
        if (!audioTrack.url) {
          embeddedAudioFound = true;
        }
      }); // if no embedded audio track defined, but audio codec signaled in quality level,
      // we need to signal this main audio track this could happen with playlists with
      // alt audio rendition in which quality levels (main)
      // contains both audio+video. but with mixed audio track not signaled

      if (embeddedAudioFound === false && levels[0].audioCodec && !levels[0].attrs.AUDIO) {
        logger["logger"].log('audio codec signaled in quality level, but no embedded audio track signaled, create one');
        audioTracks.unshift({
          type: 'main',
          name: 'main',
          default: false,
          autoselect: false,
          forced: false,
          id: -1,
          attrs: {},
          url: ''
        });
      }
    }

    hls.trigger(events["default"].MANIFEST_LOADED, {
      levels: levels,
      audioTracks: audioTracks,
      subtitles: subtitles,
      captions: captions,
      url: url,
      stats: stats,
      networkDetails: networkDetails,
      sessionData: sessionData
    });
  };

  _proto._handleTrackOrLevelPlaylist = function _handleTrackOrLevelPlaylist(response, stats, context, networkDetails) {
    var hls = this.hls;
    var id = context.id,
        level = context.level,
        type = context.type;
    var url = PlaylistLoader.getResponseUrl(response, context); // if the values are null, they will result in the else conditional

    var levelUrlId = Object(number["isFiniteNumber"])(id) ? id : 0;
    var levelId = Object(number["isFiniteNumber"])(level) ? level : levelUrlId;
    var levelType = PlaylistLoader.mapContextToLevelType(context);
    var levelDetails = m3u8_parser_M3U8Parser.parseLevelPlaylist(response.data, url, levelId, levelType, levelUrlId); // set stats on level structure
    // TODO(jstackhouse): why? mixing concerns, is it just treated as value bag?

    levelDetails.tload = stats.tload;

    if (!levelDetails.fragments.length) {
      hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].NETWORK_ERROR,
        details: errors["ErrorDetails"].LEVEL_EMPTY_ERROR,
        fatal: false,
        url: url,
        reason: 'no fragments found in level',
        level: typeof context.level === 'number' ? context.level : undefined
      });
      return;
    } // We have done our first request (Manifest-type) and receive
    // not a master playlist but a chunk-list (track/level)
    // We fire the manifest-loaded event anyway with the parsed level-details
    // by creating a single-level structure for it.


    if (type === PlaylistContextType.MANIFEST) {
      var singleLevel = {
        url: url,
        details: levelDetails
      };
      hls.trigger(events["default"].MANIFEST_LOADED, {
        levels: [singleLevel],
        audioTracks: [],
        url: url,
        stats: stats,
        networkDetails: networkDetails,
        sessionData: null
      });
    } // save parsing time


    stats.tparsed = performance.now(); // in case we need SIDX ranges
    // return early after calling load for
    // the SIDX box.

    if (levelDetails.needSidxRanges) {
      var sidxUrl = levelDetails.initSegment.url;
      this.load({
        url: sidxUrl,
        isSidxRequest: true,
        type: type,
        level: level,
        levelDetails: levelDetails,
        id: id,
        rangeStart: 0,
        rangeEnd: 2048,
        responseType: 'arraybuffer'
      });
      return;
    } // extend the context with the new levelDetails property


    context.levelDetails = levelDetails;

    this._handlePlaylistLoaded(response, stats, context, networkDetails);
  };

  _proto._handleSidxRequest = function _handleSidxRequest(response, context) {
    if (typeof response.data === 'string') {
      throw new Error('sidx request must be made with responseType of array buffer');
    }

    var sidxInfo = mp4demuxer["default"].parseSegmentIndex(new Uint8Array(response.data)); // if provided fragment does not contain sidx, early return

    if (!sidxInfo) {
      return;
    }

    var sidxReferences = sidxInfo.references;
    var levelDetails = context.levelDetails;
    sidxReferences.forEach(function (segmentRef, index) {
      var segRefInfo = segmentRef.info;

      if (!levelDetails) {
        return;
      }

      var frag = levelDetails.fragments[index];

      if (frag.byteRange.length === 0) {
        frag.setByteRange(String(1 + segRefInfo.end - segRefInfo.start) + '@' + String(segRefInfo.start));
      }
    });

    if (levelDetails) {
      levelDetails.initSegment.setByteRange(String(sidxInfo.moovEndOffset) + '@0');
    }
  };

  _proto._handleManifestParsingError = function _handleManifestParsingError(response, context, reason, networkDetails) {
    this.hls.trigger(events["default"].ERROR, {
      type: errors["ErrorTypes"].NETWORK_ERROR,
      details: errors["ErrorDetails"].MANIFEST_PARSING_ERROR,
      fatal: true,
      url: response.url,
      reason: reason,
      networkDetails: networkDetails
    });
  };

  _proto._handleNetworkError = function _handleNetworkError(context, networkDetails, timeout, response) {
    if (timeout === void 0) {
      timeout = false;
    }

    if (response === void 0) {
      response = null;
    }

    logger["logger"].info("A network error occured while loading a " + context.type + "-type playlist");
    var details;
    var fatal;
    var loader = this.getInternalLoader(context);

    switch (context.type) {
      case PlaylistContextType.MANIFEST:
        details = timeout ? errors["ErrorDetails"].MANIFEST_LOAD_TIMEOUT : errors["ErrorDetails"].MANIFEST_LOAD_ERROR;
        fatal = true;
        break;

      case PlaylistContextType.LEVEL:
        details = timeout ? errors["ErrorDetails"].LEVEL_LOAD_TIMEOUT : errors["ErrorDetails"].LEVEL_LOAD_ERROR;
        fatal = false;
        break;

      case PlaylistContextType.AUDIO_TRACK:
        details = timeout ? errors["ErrorDetails"].AUDIO_TRACK_LOAD_TIMEOUT : errors["ErrorDetails"].AUDIO_TRACK_LOAD_ERROR;
        fatal = false;
        break;

      default:
        // details = ...?
        fatal = false;
    }

    if (loader) {
      loader.abort();
      this.resetInternalLoader(context.type);
    } // TODO(typescript-events): when error events are handled, type this


    var errorData = {
      type: errors["ErrorTypes"].NETWORK_ERROR,
      details: details,
      fatal: fatal,
      url: context.url,
      loader: loader,
      context: context,
      networkDetails: networkDetails
    };

    if (response) {
      errorData.response = response;
    }

    this.hls.trigger(events["default"].ERROR, errorData);
  };

  _proto._handlePlaylistLoaded = function _handlePlaylistLoaded(response, stats, context, networkDetails) {
    var type = context.type,
        level = context.level,
        id = context.id,
        levelDetails = context.levelDetails;

    if (!levelDetails || !levelDetails.targetduration) {
      this._handleManifestParsingError(response, context, 'invalid target duration', networkDetails);

      return;
    }

    var canHaveLevels = PlaylistLoader.canHaveQualityLevels(context.type);

    if (canHaveLevels) {
      this.hls.trigger(events["default"].LEVEL_LOADED, {
        details: levelDetails,
        level: level || 0,
        id: id || 0,
        stats: stats,
        networkDetails: networkDetails
      });
    } else {
      switch (type) {
        case PlaylistContextType.AUDIO_TRACK:
          this.hls.trigger(events["default"].AUDIO_TRACK_LOADED, {
            details: levelDetails,
            id: id,
            stats: stats,
            networkDetails: networkDetails
          });
          break;

        case PlaylistContextType.SUBTITLE_TRACK:
          this.hls.trigger(events["default"].SUBTITLE_TRACK_LOADED, {
            details: levelDetails,
            id: id,
            stats: stats,
            networkDetails: networkDetails
          });
          break;
      }
    }
  };

  return PlaylistLoader;
}(event_handler);

/* harmony default export */ var playlist_loader = (playlist_loader_PlaylistLoader);
// CONCATENATED MODULE: ./src/loader/fragment-loader.js



function fragment_loader_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Fragment Loader
*/





var fragment_loader_FragmentLoader = /*#__PURE__*/function (_EventHandler) {
  fragment_loader_inheritsLoose(FragmentLoader, _EventHandler);

  function FragmentLoader(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].FRAG_LOADING) || this;
    _this.loaders = {};
    return _this;
  }

  var _proto = FragmentLoader.prototype;

  _proto.destroy = function destroy() {
    var loaders = this.loaders;

    for (var loaderName in loaders) {
      var loader = loaders[loaderName];

      if (loader) {
        loader.destroy();
      }
    }

    this.loaders = {};

    _EventHandler.prototype.destroy.call(this);
  };

  _proto.onFragLoading = function onFragLoading(data) {
    var frag = data.frag,
        type = frag.type,
        loaders = this.loaders,
        config = this.hls.config,
        FragmentILoader = config.fLoader,
        DefaultILoader = config.loader; // reset fragment state

    frag.loaded = 0;
    var loader = loaders[type];

    if (loader) {
      logger["logger"].warn("abort previous fragment loader for type: " + type);
      loader.abort();
    }

    loader = loaders[type] = frag.loader = config.fLoader ? new FragmentILoader(config) : new DefaultILoader(config);
    var loaderContext, loaderConfig, loaderCallbacks;
    loaderContext = {
      url: frag.url,
      frag: frag,
      responseType: 'arraybuffer',
      progressData: false
    };
    var start = frag.byteRangeStartOffset,
        end = frag.byteRangeEndOffset;

    if (Object(number["isFiniteNumber"])(start) && Object(number["isFiniteNumber"])(end)) {
      loaderContext.rangeStart = start;
      loaderContext.rangeEnd = end;
    }

    loaderConfig = {
      timeout: config.fragLoadingTimeOut,
      maxRetry: 0,
      retryDelay: 0,
      maxRetryDelay: config.fragLoadingMaxRetryTimeout
    };
    loaderCallbacks = {
      onSuccess: this.loadsuccess.bind(this),
      onError: this.loaderror.bind(this),
      onTimeout: this.loadtimeout.bind(this),
      onProgress: this.loadprogress.bind(this)
    };
    loader.load(loaderContext, loaderConfig, loaderCallbacks);
  };

  _proto.loadsuccess = function loadsuccess(response, stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    var payload = response.data,
        frag = context.frag; // detach fragment loader on load success

    frag.loader = undefined;
    this.loaders[frag.type] = undefined;
    this.hls.trigger(events["default"].FRAG_LOADED, {
      payload: payload,
      frag: frag,
      stats: stats,
      networkDetails: networkDetails
    });
  };

  _proto.loaderror = function loaderror(response, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    this.loaders[frag.type] = undefined;
    this.hls.trigger(events["default"].ERROR, {
      type: errors["ErrorTypes"].NETWORK_ERROR,
      details: errors["ErrorDetails"].FRAG_LOAD_ERROR,
      fatal: false,
      frag: context.frag,
      response: response,
      networkDetails: networkDetails
    });
  };

  _proto.loadtimeout = function loadtimeout(stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    this.loaders[frag.type] = undefined;
    this.hls.trigger(events["default"].ERROR, {
      type: errors["ErrorTypes"].NETWORK_ERROR,
      details: errors["ErrorDetails"].FRAG_LOAD_TIMEOUT,
      fatal: false,
      frag: context.frag,
      networkDetails: networkDetails
    });
  } // data will be used for progressive parsing
  ;

  _proto.loadprogress = function loadprogress(stats, context, data, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    // jshint ignore:line
    var frag = context.frag;
    frag.loaded = stats.loaded;
    this.hls.trigger(events["default"].FRAG_LOAD_PROGRESS, {
      frag: frag,
      stats: stats,
      networkDetails: networkDetails
    });
  };

  return FragmentLoader;
}(event_handler);

/* harmony default export */ var fragment_loader = (fragment_loader_FragmentLoader);
// CONCATENATED MODULE: ./src/loader/key-loader.ts
function key_loader_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Decrypt key Loader
*/





var key_loader_KeyLoader = /*#__PURE__*/function (_EventHandler) {
  key_loader_inheritsLoose(KeyLoader, _EventHandler);

  function KeyLoader(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].KEY_LOADING) || this;
    _this.loaders = {};
    _this.decryptkey = null;
    _this.decrypturl = null;
    return _this;
  }

  var _proto = KeyLoader.prototype;

  _proto.destroy = function destroy() {
    for (var loaderName in this.loaders) {
      var loader = this.loaders[loaderName];

      if (loader) {
        loader.destroy();
      }
    }

    this.loaders = {};

    _EventHandler.prototype.destroy.call(this);
  };

  _proto.onKeyLoading = function onKeyLoading(data) {
    var frag = data.frag;
    var type = frag.type;
    var loader = this.loaders[type];

    if (!frag.decryptdata) {
      logger["logger"].warn('Missing decryption data on fragment in onKeyLoading');
      return;
    } // Load the key if the uri is different from previous one, or if the decrypt key has not yet been retrieved


    var uri = frag.decryptdata.uri;

    if (uri !== this.decrypturl || this.decryptkey === null) {
      var config = this.hls.config;

      if (loader) {
        logger["logger"].warn("abort previous key loader for type:" + type);
        loader.abort();
      }

      if (!uri) {
        logger["logger"].warn('key uri is falsy');
        return;
      }

      frag.loader = this.loaders[type] = new config.loader(config);
      this.decrypturl = uri;
      this.decryptkey = null;
      var loaderContext = {
        url: uri,
        frag: frag,
        responseType: 'arraybuffer'
      }; // maxRetry is 0 so that instead of retrying the same key on the same variant multiple times,
      // key-loader will trigger an error and rely on stream-controller to handle retry logic.
      // this will also align retry logic with fragment-loader

      var loaderConfig = {
        timeout: config.fragLoadingTimeOut,
        maxRetry: 0,
        retryDelay: config.fragLoadingRetryDelay,
        maxRetryDelay: config.fragLoadingMaxRetryTimeout
      };
      var loaderCallbacks = {
        onSuccess: this.loadsuccess.bind(this),
        onError: this.loaderror.bind(this),
        onTimeout: this.loadtimeout.bind(this)
      };
      frag.loader.load(loaderContext, loaderConfig, loaderCallbacks);
    } else if (this.decryptkey) {
      // Return the key if it's already been loaded
      frag.decryptdata.key = this.decryptkey;
      this.hls.trigger(events["default"].KEY_LOADED, {
        frag: frag
      });
    }
  };

  _proto.loadsuccess = function loadsuccess(response, stats, context) {
    var frag = context.frag;

    if (!frag.decryptdata) {
      logger["logger"].error('after key load, decryptdata unset');
      return;
    }

    this.decryptkey = frag.decryptdata.key = new Uint8Array(response.data); // detach fragment loader on load success

    frag.loader = undefined;
    delete this.loaders[frag.type];
    this.hls.trigger(events["default"].KEY_LOADED, {
      frag: frag
    });
  };

  _proto.loaderror = function loaderror(response, context) {
    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    delete this.loaders[frag.type];
    this.hls.trigger(events["default"].ERROR, {
      type: errors["ErrorTypes"].NETWORK_ERROR,
      details: errors["ErrorDetails"].KEY_LOAD_ERROR,
      fatal: false,
      frag: frag,
      response: response
    });
  };

  _proto.loadtimeout = function loadtimeout(stats, context) {
    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    delete this.loaders[frag.type];
    this.hls.trigger(events["default"].ERROR, {
      type: errors["ErrorTypes"].NETWORK_ERROR,
      details: errors["ErrorDetails"].KEY_LOAD_TIMEOUT,
      fatal: false,
      frag: frag
    });
  };

  return KeyLoader;
}(event_handler);

/* harmony default export */ var key_loader = (key_loader_KeyLoader);
// CONCATENATED MODULE: ./src/controller/fragment-tracker.js


function fragment_tracker_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var FragmentState = {
  NOT_LOADED: 'NOT_LOADED',
  APPENDING: 'APPENDING',
  PARTIAL: 'PARTIAL',
  OK: 'OK'
};
var fragment_tracker_FragmentTracker = /*#__PURE__*/function (_EventHandler) {
  fragment_tracker_inheritsLoose(FragmentTracker, _EventHandler);

  function FragmentTracker(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].BUFFER_APPENDED, events["default"].FRAG_BUFFERED, events["default"].FRAG_LOADED) || this;
    _this.bufferPadding = 0.2;
    _this.fragments = Object.create(null);
    _this.timeRanges = Object.create(null);
    _this.config = hls.config;
    return _this;
  }

  var _proto = FragmentTracker.prototype;

  _proto.destroy = function destroy() {
    this.fragments = Object.create(null);
    this.timeRanges = Object.create(null);
    this.config = null;
    event_handler.prototype.destroy.call(this);

    _EventHandler.prototype.destroy.call(this);
  }
  /**
   * Return a Fragment that match the position and levelType.
   * If not found any Fragment, return null
   * @param {number} position
   * @param {LevelType} levelType
   * @returns {Fragment|null}
   */
  ;

  _proto.getBufferedFrag = function getBufferedFrag(position, levelType) {
    var fragments = this.fragments;
    var bufferedFrags = Object.keys(fragments).filter(function (key) {
      var fragmentEntity = fragments[key];

      if (fragmentEntity.body.type !== levelType) {
        return false;
      }

      if (!fragmentEntity.buffered) {
        return false;
      }

      var frag = fragmentEntity.body;
      return frag.startPTS <= position && position <= frag.endPTS;
    });

    if (bufferedFrags.length === 0) {
      return null;
    } else {
      // https://github.com/video-dev/hls.js/pull/1545#discussion_r166229566
      var bufferedFragKey = bufferedFrags.pop();
      return fragments[bufferedFragKey].body;
    }
  }
  /**
   * Partial fragments effected by coded frame eviction will be removed
   * The browser will unload parts of the buffer to free up memory for new buffer data
   * Fragments will need to be reloaded when the buffer is freed up, removing partial fragments will allow them to reload(since there might be parts that are still playable)
   * @param {String} elementaryStream The elementaryStream of media this is (eg. video/audio)
   * @param {TimeRanges} timeRange TimeRange object from a sourceBuffer
   */
  ;

  _proto.detectEvictedFragments = function detectEvictedFragments(elementaryStream, timeRange) {
    var _this2 = this;

    // Check if any flagged fragments have been unloaded
    Object.keys(this.fragments).forEach(function (key) {
      var fragmentEntity = _this2.fragments[key];

      if (!fragmentEntity || !fragmentEntity.buffered) {
        return;
      }

      var esData = fragmentEntity.range[elementaryStream];

      if (!esData) {
        return;
      }

      var fragmentTimes = esData.time;

      for (var i = 0; i < fragmentTimes.length; i++) {
        var time = fragmentTimes[i];

        if (!_this2.isTimeBuffered(time.startPTS, time.endPTS, timeRange)) {
          // Unregister partial fragment as it needs to load again to be reused
          _this2.removeFragment(fragmentEntity.body);

          break;
        }
      }
    });
  }
  /**
   * Checks if the fragment passed in is loaded in the buffer properly
   * Partially loaded fragments will be registered as a partial fragment
   * @param {Object} fragment Check the fragment against all sourceBuffers loaded
   */
  ;

  _proto.detectPartialFragments = function detectPartialFragments(fragment) {
    var _this3 = this;

    var fragKey = this.getFragmentKey(fragment);
    var fragmentEntity = this.fragments[fragKey];

    if (fragmentEntity) {
      fragmentEntity.buffered = true;
      Object.keys(this.timeRanges).forEach(function (elementaryStream) {
        if (fragment.hasElementaryStream(elementaryStream)) {
          var timeRange = _this3.timeRanges[elementaryStream]; // Check for malformed fragments
          // Gaps need to be calculated for each elementaryStream

          fragmentEntity.range[elementaryStream] = _this3.getBufferedTimes(fragment.startPTS, fragment.endPTS, timeRange);
        }
      });
    }
  };

  _proto.getBufferedTimes = function getBufferedTimes(startPTS, endPTS, timeRange) {
    var fragmentTimes = [];
    var startTime, endTime;
    var fragmentPartial = false;

    for (var i = 0; i < timeRange.length; i++) {
      startTime = timeRange.start(i) - this.bufferPadding;
      endTime = timeRange.end(i) + this.bufferPadding;

      if (startPTS >= startTime && endPTS <= endTime) {
        // Fragment is entirely contained in buffer
        // No need to check the other timeRange times since it's completely playable
        fragmentTimes.push({
          startPTS: Math.max(startPTS, timeRange.start(i)),
          endPTS: Math.min(endPTS, timeRange.end(i))
        });
        break;
      } else if (startPTS < endTime && endPTS > startTime) {
        // Check for intersection with buffer
        // Get playable sections of the fragment
        fragmentTimes.push({
          startPTS: Math.max(startPTS, timeRange.start(i)),
          endPTS: Math.min(endPTS, timeRange.end(i))
        });
        fragmentPartial = true;
      } else if (endPTS <= startTime) {
        // No need to check the rest of the timeRange as it is in order
        break;
      }
    }

    return {
      time: fragmentTimes,
      partial: fragmentPartial
    };
  };

  _proto.getFragmentKey = function getFragmentKey(fragment) {
    return fragment.type + "_" + fragment.level + "_" + fragment.urlId + "_" + fragment.sn;
  }
  /**
   * Gets the partial fragment for a certain time
   * @param {Number} time
   * @returns {Object} fragment Returns a partial fragment at a time or null if there is no partial fragment
   */
  ;

  _proto.getPartialFragment = function getPartialFragment(time) {
    var _this4 = this;

    var timePadding, startTime, endTime;
    var bestFragment = null;
    var bestOverlap = 0;
    Object.keys(this.fragments).forEach(function (key) {
      var fragmentEntity = _this4.fragments[key];

      if (_this4.isPartial(fragmentEntity)) {
        startTime = fragmentEntity.body.startPTS - _this4.bufferPadding;
        endTime = fragmentEntity.body.endPTS + _this4.bufferPadding;

        if (time >= startTime && time <= endTime) {
          // Use the fragment that has the most padding from start and end time
          timePadding = Math.min(time - startTime, endTime - time);

          if (bestOverlap <= timePadding) {
            bestFragment = fragmentEntity.body;
            bestOverlap = timePadding;
          }
        }
      }
    });
    return bestFragment;
  }
  /**
   * @param {Object} fragment The fragment to check
   * @returns {String} Returns the fragment state when a fragment never loaded or if it partially loaded
   */
  ;

  _proto.getState = function getState(fragment) {
    var fragKey = this.getFragmentKey(fragment);
    var fragmentEntity = this.fragments[fragKey];
    var state = FragmentState.NOT_LOADED;

    if (fragmentEntity !== undefined) {
      if (!fragmentEntity.buffered) {
        state = FragmentState.APPENDING;
      } else if (this.isPartial(fragmentEntity) === true) {
        state = FragmentState.PARTIAL;
      } else {
        state = FragmentState.OK;
      }
    }

    return state;
  };

  _proto.isPartial = function isPartial(fragmentEntity) {
    return fragmentEntity.buffered === true && (fragmentEntity.range.video !== undefined && fragmentEntity.range.video.partial === true || fragmentEntity.range.audio !== undefined && fragmentEntity.range.audio.partial === true);
  };

  _proto.isTimeBuffered = function isTimeBuffered(startPTS, endPTS, timeRange) {
    var startTime, endTime;

    for (var i = 0; i < timeRange.length; i++) {
      startTime = timeRange.start(i) - this.bufferPadding;
      endTime = timeRange.end(i) + this.bufferPadding;

      if (startPTS >= startTime && endPTS <= endTime) {
        return true;
      }

      if (endPTS <= startTime) {
        // No need to check the rest of the timeRange as it is in order
        return false;
      }
    }

    return false;
  }
  /**
   * Fires when a fragment loading is completed
   */
  ;

  _proto.onFragLoaded = function onFragLoaded(e) {
    var fragment = e.frag; // don't track initsegment (for which sn is not a number)
    // don't track frags used for bitrateTest, they're irrelevant.

    if (!Object(number["isFiniteNumber"])(fragment.sn) || fragment.bitrateTest) {
      return;
    }

    this.fragments[this.getFragmentKey(fragment)] = {
      body: fragment,
      range: Object.create(null),
      buffered: false
    };
  }
  /**
   * Fires when the buffer is updated
   */
  ;

  _proto.onBufferAppended = function onBufferAppended(e) {
    var _this5 = this;

    // Store the latest timeRanges loaded in the buffer
    this.timeRanges = e.timeRanges;
    Object.keys(this.timeRanges).forEach(function (elementaryStream) {
      var timeRange = _this5.timeRanges[elementaryStream];

      _this5.detectEvictedFragments(elementaryStream, timeRange);
    });
  }
  /**
   * Fires after a fragment has been loaded into the source buffer
   */
  ;

  _proto.onFragBuffered = function onFragBuffered(e) {
    this.detectPartialFragments(e.frag);
  }
  /**
   * Return true if fragment tracker has the fragment.
   * @param {Object} fragment
   * @returns {boolean}
   */
  ;

  _proto.hasFragment = function hasFragment(fragment) {
    var fragKey = this.getFragmentKey(fragment);
    return this.fragments[fragKey] !== undefined;
  }
  /**
   * Remove a fragment from fragment tracker until it is loaded again
   * @param {Object} fragment The fragment to remove
   */
  ;

  _proto.removeFragment = function removeFragment(fragment) {
    var fragKey = this.getFragmentKey(fragment);
    delete this.fragments[fragKey];
  }
  /**
   * Remove all fragments from fragment tracker.
   */
  ;

  _proto.removeAllFragments = function removeAllFragments() {
    this.fragments = Object.create(null);
  };

  return FragmentTracker;
}(event_handler);
// CONCATENATED MODULE: ./src/utils/binary-search.ts
var BinarySearch = {
  /**
   * Searches for an item in an array which matches a certain condition.
   * This requires the condition to only match one item in the array,
   * and for the array to be ordered.
   *
   * @param {Array<T>} list The array to search.
   * @param {BinarySearchComparison<T>} comparisonFn
   *      Called and provided a candidate item as the first argument.
   *      Should return:
   *          > -1 if the item should be located at a lower index than the provided item.
   *          > 1 if the item should be located at a higher index than the provided item.
   *          > 0 if the item is the item you're looking for.
   *
   * @return {T | null} The object if it is found or null otherwise.
   */
  search: function search(list, comparisonFn) {
    var minIndex = 0;
    var maxIndex = list.length - 1;
    var currentIndex = null;
    var currentElement = null;

    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = list[currentIndex];
      var comparisonResult = comparisonFn(currentElement);

      if (comparisonResult > 0) {
        minIndex = currentIndex + 1;
      } else if (comparisonResult < 0) {
        maxIndex = currentIndex - 1;
      } else {
        return currentElement;
      }
    }

    return null;
  }
};
/* harmony default export */ var binary_search = (BinarySearch);
// CONCATENATED MODULE: ./src/utils/buffer-helper.ts
/**
 * @module BufferHelper
 *
 * Providing methods dealing with buffer length retrieval for example.
 *
 * In general, a helper around HTML5 MediaElement TimeRanges gathered from `buffered` property.
 *
 * Also @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered
*/
var BufferHelper = /*#__PURE__*/function () {
  function BufferHelper() {}

  /**
   * Return true if `media`'s buffered include `position`
   * @param {Bufferable} media
   * @param {number} position
   * @returns {boolean}
   */
  BufferHelper.isBuffered = function isBuffered(media, position) {
    try {
      if (media) {
        var buffered = media.buffered;

        for (var i = 0; i < buffered.length; i++) {
          if (position >= buffered.start(i) && position <= buffered.end(i)) {
            return true;
          }
        }
      }
    } catch (error) {// this is to catch
      // InvalidStateError: Failed to read the 'buffered' property from 'SourceBuffer':
      // This SourceBuffer has been removed from the parent media source
    }

    return false;
  };

  BufferHelper.bufferInfo = function bufferInfo(media, pos, maxHoleDuration) {
    try {
      if (media) {
        var vbuffered = media.buffered;
        var buffered = [];
        var i;

        for (i = 0; i < vbuffered.length; i++) {
          buffered.push({
            start: vbuffered.start(i),
            end: vbuffered.end(i)
          });
        }

        return this.bufferedInfo(buffered, pos, maxHoleDuration);
      }
    } catch (error) {// this is to catch
      // InvalidStateError: Failed to read the 'buffered' property from 'SourceBuffer':
      // This SourceBuffer has been removed from the parent media source
    }

    return {
      len: 0,
      start: pos,
      end: pos,
      nextStart: undefined
    };
  };

  BufferHelper.bufferedInfo = function bufferedInfo(buffered, pos, maxHoleDuration) {
    // sort on buffer.start/smaller end (IE does not always return sorted buffered range)
    buffered.sort(function (a, b) {
      var diff = a.start - b.start;

      if (diff) {
        return diff;
      } else {
        return b.end - a.end;
      }
    });
    var buffered2 = [];

    if (maxHoleDuration) {
      // there might be some small holes between buffer time range
      // consider that holes smaller than maxHoleDuration are irrelevant and build another
      // buffer time range representations that discards those holes
      for (var i = 0; i < buffered.length; i++) {
        var buf2len = buffered2.length;

        if (buf2len) {
          var buf2end = buffered2[buf2len - 1].end; // if small hole (value between 0 or maxHoleDuration ) or overlapping (negative)

          if (buffered[i].start - buf2end < maxHoleDuration) {
            // merge overlapping time ranges
            // update lastRange.end only if smaller than item.end
            // e.g.  [ 1, 15] with  [ 2,8] => [ 1,15] (no need to modify lastRange.end)
            // whereas [ 1, 8] with  [ 2,15] => [ 1,15] ( lastRange should switch from [1,8] to [1,15])
            if (buffered[i].end > buf2end) {
              buffered2[buf2len - 1].end = buffered[i].end;
            }
          } else {
            // big hole
            buffered2.push(buffered[i]);
          }
        } else {
          // first value
          buffered2.push(buffered[i]);
        }
      }
    } else {
      buffered2 = buffered;
    }

    var bufferLen = 0; // bufferStartNext can possibly be undefined based on the conditional logic below

    var bufferStartNext; // bufferStart and bufferEnd are buffer boundaries around current video position

    var bufferStart = pos;
    var bufferEnd = pos;

    for (var _i = 0; _i < buffered2.length; _i++) {
      var start = buffered2[_i].start,
          end = buffered2[_i].end; // logger.log('buf start/end:' + buffered.start(i) + '/' + buffered.end(i));

      if (pos + maxHoleDuration >= start && pos < end) {
        // play position is inside this buffer TimeRange, retrieve end of buffer position and buffer length
        bufferStart = start;
        bufferEnd = end;
        bufferLen = bufferEnd - pos;
      } else if (pos + maxHoleDuration < start) {
        bufferStartNext = start;
        break;
      }
    }

    return {
      len: bufferLen,
      start: bufferStart,
      end: bufferEnd,
      nextStart: bufferStartNext
    };
  };

  return BufferHelper;
}();
// EXTERNAL MODULE: ./node_modules/eventemitter3/index.js
var eventemitter3 = __webpack_require__("./node_modules/eventemitter3/index.js");

// EXTERNAL MODULE: ./node_modules/webworkify-webpack/index.js
var webworkify_webpack = __webpack_require__("./node_modules/webworkify-webpack/index.js");

// EXTERNAL MODULE: ./src/demux/demuxer-inline.js + 12 modules
var demuxer_inline = __webpack_require__("./src/demux/demuxer-inline.js");

// CONCATENATED MODULE: ./src/utils/mediasource-helper.ts
/**
 * MediaSource helper
 */
function getMediaSource() {
  return window.MediaSource || window.WebKitMediaSource;
}
// EXTERNAL MODULE: ./src/utils/get-self-scope.js
var get_self_scope = __webpack_require__("./src/utils/get-self-scope.js");

// CONCATENATED MODULE: ./src/observer.ts
function observer_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }


/**
 * Simple adapter sub-class of Nodejs-like EventEmitter.
 */

var Observer = /*#__PURE__*/function (_EventEmitter) {
  observer_inheritsLoose(Observer, _EventEmitter);

  function Observer() {
    return _EventEmitter.apply(this, arguments) || this;
  }

  var _proto = Observer.prototype;

  /**
   * We simply want to pass along the event-name itself
   * in every call to a handler, which is the purpose of our `trigger` method
   * extending the standard API.
   */
  _proto.trigger = function trigger(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    this.emit.apply(this, [event, event].concat(data));
  };

  return Observer;
}(eventemitter3["EventEmitter"]);
// CONCATENATED MODULE: ./src/demux/demuxer.js









 // see https://stackoverflow.com/a/11237259/589493

var global = Object(get_self_scope["getSelfScope"])(); // safeguard for code that might run both on worker and main thread

var demuxer_MediaSource = getMediaSource() || {
  isTypeSupported: function isTypeSupported() {
    return false;
  }
};

var demuxer_Demuxer = /*#__PURE__*/function () {
  function Demuxer(hls, id) {
    var _this = this;

    this.hls = hls;
    this.id = id;
    var observer = this.observer = new Observer();
    var config = hls.config;

    var forwardMessage = function forwardMessage(ev, data) {
      data = data || {};
      data.frag = _this.frag;
      data.id = _this.id;
      hls.trigger(ev, data);
    }; // forward events to main thread


    observer.on(events["default"].FRAG_DECRYPTED, forwardMessage);
    observer.on(events["default"].FRAG_PARSING_INIT_SEGMENT, forwardMessage);
    observer.on(events["default"].FRAG_PARSING_DATA, forwardMessage);
    observer.on(events["default"].FRAG_PARSED, forwardMessage);
    observer.on(events["default"].ERROR, forwardMessage);
    observer.on(events["default"].FRAG_PARSING_METADATA, forwardMessage);
    observer.on(events["default"].FRAG_PARSING_USERDATA, forwardMessage);
    observer.on(events["default"].INIT_PTS_FOUND, forwardMessage);
    var typeSupported = {
      mp4: demuxer_MediaSource.isTypeSupported('video/mp4'),
      mpeg: demuxer_MediaSource.isTypeSupported('audio/mpeg'),
      mp3: demuxer_MediaSource.isTypeSupported('audio/mp4; codecs="mp3"')
    }; // navigator.vendor is not always available in Web Worker
    // refer to https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/navigator

    var vendor = navigator.vendor;

    if (config.enableWorker && typeof Worker !== 'undefined') {
      logger["logger"].log('demuxing in webworker');
      var w;

      try {
        w = this.w = webworkify_webpack(/*require.resolve*/(/*! ../demux/demuxer-worker.js */ "./src/demux/demuxer-worker.js"));
        this.onwmsg = this.onWorkerMessage.bind(this);
        w.addEventListener('message', this.onwmsg);

        w.onerror = function (event) {
          hls.trigger(events["default"].ERROR, {
            type: errors["ErrorTypes"].OTHER_ERROR,
            details: errors["ErrorDetails"].INTERNAL_EXCEPTION,
            fatal: true,
            event: 'demuxerWorker',
            err: {
              message: event.message + ' (' + event.filename + ':' + event.lineno + ')'
            }
          });
        };

        w.postMessage({
          cmd: 'init',
          typeSupported: typeSupported,
          vendor: vendor,
          id: id,
          config: JSON.stringify(config)
        });
      } catch (err) {
        logger["logger"].warn('Error in worker:', err);
        logger["logger"].error('Error while initializing DemuxerWorker, fallback on DemuxerInline');

        if (w) {
          // revoke the Object URL that was used to create demuxer worker, so as not to leak it
          global.URL.revokeObjectURL(w.objectURL);
        }

        this.demuxer = new demuxer_inline["default"](observer, typeSupported, config, vendor);
        this.w = undefined;
      }
    } else {
      this.demuxer = new demuxer_inline["default"](observer, typeSupported, config, vendor);
    }
  }

  var _proto = Demuxer.prototype;

  _proto.destroy = function destroy() {
    var w = this.w;

    if (w) {
      w.removeEventListener('message', this.onwmsg);
      w.terminate();
      this.w = null;
    } else {
      var demuxer = this.demuxer;

      if (demuxer) {
        demuxer.destroy();
        this.demuxer = null;
      }
    }

    var observer = this.observer;

    if (observer) {
      observer.removeAllListeners();
      this.observer = null;
    }
  };

  _proto.push = function push(data, initSegment, audioCodec, videoCodec, frag, duration, accurateTimeOffset, defaultInitPTS) {
    var w = this.w;
    var timeOffset = Object(number["isFiniteNumber"])(frag.startPTS) ? frag.startPTS : frag.start;
    var decryptdata = frag.decryptdata;
    var lastFrag = this.frag;
    var discontinuity = !(lastFrag && frag.cc === lastFrag.cc);
    var trackSwitch = !(lastFrag && frag.level === lastFrag.level);
    var nextSN = lastFrag && frag.sn === lastFrag.sn + 1;
    var contiguous = !trackSwitch && nextSN;

    if (discontinuity) {
      logger["logger"].log(this.id + ":discontinuity detected");
    }

    if (trackSwitch) {
      logger["logger"].log(this.id + ":switch detected");
    }

    this.frag = frag;

    if (w) {
      // post fragment payload as transferable objects for ArrayBuffer (no copy)
      w.postMessage({
        cmd: 'demux',
        data: data,
        decryptdata: decryptdata,
        initSegment: initSegment,
        audioCodec: audioCodec,
        videoCodec: videoCodec,
        timeOffset: timeOffset,
        discontinuity: discontinuity,
        trackSwitch: trackSwitch,
        contiguous: contiguous,
        duration: duration,
        accurateTimeOffset: accurateTimeOffset,
        defaultInitPTS: defaultInitPTS
      }, data instanceof ArrayBuffer ? [data] : []);
    } else {
      var demuxer = this.demuxer;

      if (demuxer) {
        demuxer.push(data, decryptdata, initSegment, audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS);
      }
    }
  };

  _proto.onWorkerMessage = function onWorkerMessage(ev) {
    var data = ev.data,
        hls = this.hls;

    switch (data.event) {
      case 'init':
        // revoke the Object URL that was used to create demuxer worker, so as not to leak it
        global.URL.revokeObjectURL(this.w.objectURL);
        break;
      // special case for FRAG_PARSING_DATA: data1 and data2 are transferable objects

      case events["default"].FRAG_PARSING_DATA:
        data.data.data1 = new Uint8Array(data.data1);

        if (data.data2) {
          data.data.data2 = new Uint8Array(data.data2);
        }

      /* falls through */

      default:
        data.data = data.data || {};
        data.data.frag = this.frag;
        data.data.id = this.id;
        hls.trigger(data.event, data.data);
        break;
    }
  };

  return Demuxer;
}();

/* harmony default export */ var demux_demuxer = (demuxer_Demuxer);
// CONCATENATED MODULE: ./src/controller/level-helper.js





/**
 * @module LevelHelper
 *
 * Providing methods dealing with playlist sliding and drift
 *
 * TODO: Create an actual `Level` class/model that deals with all this logic in an object-oriented-manner.
 *
 * */

function addGroupId(level, type, id) {
  switch (type) {
    case 'audio':
      if (!level.audioGroupIds) {
        level.audioGroupIds = [];
      }

      level.audioGroupIds.push(id);
      break;

    case 'text':
      if (!level.textGroupIds) {
        level.textGroupIds = [];
      }

      level.textGroupIds.push(id);
      break;
  }
}
function updatePTS(fragments, fromIdx, toIdx) {
  var fragFrom = fragments[fromIdx],
      fragTo = fragments[toIdx],
      fragToPTS = fragTo.startPTS; // if we know startPTS[toIdx]

  if (Object(number["isFiniteNumber"])(fragToPTS)) {
    // update fragment duration.
    // it helps to fix drifts between playlist reported duration and fragment real duration
    if (toIdx > fromIdx) {
      fragFrom.duration = fragToPTS - fragFrom.start;

      if (fragFrom.duration < 0) {
        logger["logger"].warn("negative duration computed for frag " + fragFrom.sn + ",level " + fragFrom.level + ", there should be some duration drift between playlist and fragment!");
      }
    } else {
      fragTo.duration = fragFrom.start - fragToPTS;

      if (fragTo.duration < 0) {
        logger["logger"].warn("negative duration computed for frag " + fragTo.sn + ",level " + fragTo.level + ", there should be some duration drift between playlist and fragment!");
      }
    }
  } else {
    // we dont know startPTS[toIdx]
    if (toIdx > fromIdx) {
      var contiguous = fragFrom.cc === fragTo.cc;
      fragTo.start = fragFrom.start + (contiguous && fragFrom.minEndPTS ? fragFrom.minEndPTS - fragFrom.start : fragFrom.duration);
    } else {
      fragTo.start = Math.max(fragFrom.start - fragTo.duration, 0);
    }
  }
}
function updateFragPTSDTS(details, frag, startPTS, endPTS, startDTS, endDTS) {
  // update frag PTS/DTS
  var maxStartPTS = startPTS;
  var minEndPTS = endPTS;

  if (Object(number["isFiniteNumber"])(frag.startPTS)) {
    // delta PTS between audio and video
    var deltaPTS = Math.abs(frag.startPTS - startPTS);

    if (!Object(number["isFiniteNumber"])(frag.deltaPTS)) {
      frag.deltaPTS = deltaPTS;
    } else {
      frag.deltaPTS = Math.max(deltaPTS, frag.deltaPTS);
    }

    maxStartPTS = Math.max(startPTS, frag.startPTS);
    startPTS = Math.min(startPTS, frag.startPTS);
    minEndPTS = Math.min(endPTS, frag.endPTS);
    endPTS = Math.max(endPTS, frag.endPTS);
    startDTS = Math.min(startDTS, frag.startDTS);
    endDTS = Math.max(endDTS, frag.endDTS);
  }

  var drift = startPTS - frag.start;
  frag.start = frag.startPTS = startPTS;
  frag.maxStartPTS = maxStartPTS;
  frag.endPTS = endPTS;
  frag.minEndPTS = minEndPTS;
  frag.startDTS = startDTS;
  frag.endDTS = endDTS;
  frag.duration = endPTS - startPTS;
  var sn = frag.sn; // exit if sn out of range

  if (!details || sn < details.startSN || sn > details.endSN) {
    return 0;
  }

  var fragIdx, fragments, i;
  fragIdx = sn - details.startSN;
  fragments = details.fragments; // update frag reference in fragments array
  // rationale is that fragments array might not contain this frag object.
  // this will happen if playlist has been refreshed between frag loading and call to updateFragPTSDTS()
  // if we don't update frag, we won't be able to propagate PTS info on the playlist
  // resulting in invalid sliding computation

  fragments[fragIdx] = frag; // adjust fragment PTS/duration from seqnum-1 to frag 0

  for (i = fragIdx; i > 0; i--) {
    updatePTS(fragments, i, i - 1);
  } // adjust fragment PTS/duration from seqnum to last frag


  for (i = fragIdx; i < fragments.length - 1; i++) {
    updatePTS(fragments, i, i + 1);
  }

  details.PTSKnown = true;
  return drift;
}
function mergeDetails(oldDetails, newDetails) {
  // potentially retrieve cached initsegment
  if (newDetails.initSegment && oldDetails.initSegment) {
    newDetails.initSegment = oldDetails.initSegment;
  } // check if old/new playlists have fragments in common
  // loop through overlapping SN and update startPTS , cc, and duration if any found


  var ccOffset = 0;
  var PTSFrag;
  mapFragmentIntersection(oldDetails, newDetails, function (oldFrag, newFrag) {
    ccOffset = oldFrag.cc - newFrag.cc;

    if (Object(number["isFiniteNumber"])(oldFrag.startPTS)) {
      newFrag.start = newFrag.startPTS = oldFrag.startPTS;
      newFrag.endPTS = oldFrag.endPTS;
      newFrag.duration = oldFrag.duration;
      newFrag.backtracked = oldFrag.backtracked;
      newFrag.dropped = oldFrag.dropped;
      PTSFrag = newFrag;
    } // PTS is known when there are overlapping segments


    newDetails.PTSKnown = true;
  });

  if (!newDetails.PTSKnown) {
    return;
  }

  if (ccOffset) {
    logger["logger"].log('discontinuity sliding from playlist, take drift into account');
    var newFragments = newDetails.fragments;

    for (var i = 0; i < newFragments.length; i++) {
      newFragments[i].cc += ccOffset;
    }
  } // if at least one fragment contains PTS info, recompute PTS information for all fragments


  if (PTSFrag) {
    updateFragPTSDTS(newDetails, PTSFrag, PTSFrag.startPTS, PTSFrag.endPTS, PTSFrag.startDTS, PTSFrag.endDTS);
  } else {
    // ensure that delta is within oldFragments range
    // also adjust sliding in case delta is 0 (we could have old=[50-60] and new=old=[50-61])
    // in that case we also need to adjust start offset of all fragments
    adjustSliding(oldDetails, newDetails);
  } // if we are here, it means we have fragments overlapping between
  // old and new level. reliable PTS info is thus relying on old level


  newDetails.PTSKnown = oldDetails.PTSKnown;
}
function mergeSubtitlePlaylists(oldPlaylist, newPlaylist, referenceStart) {
  if (referenceStart === void 0) {
    referenceStart = 0;
  }

  var lastIndex = -1;
  mapFragmentIntersection(oldPlaylist, newPlaylist, function (oldFrag, newFrag, index) {
    newFrag.start = oldFrag.start;
    lastIndex = index;
  });
  var frags = newPlaylist.fragments;

  if (lastIndex < 0) {
    frags.forEach(function (frag) {
      frag.start += referenceStart;
    });
    return;
  }

  for (var i = lastIndex + 1; i < frags.length; i++) {
    frags[i].start = frags[i - 1].start + frags[i - 1].duration;
  }
}
function mapFragmentIntersection(oldPlaylist, newPlaylist, intersectionFn) {
  if (!oldPlaylist || !newPlaylist) {
    return;
  }

  var start = Math.max(oldPlaylist.startSN, newPlaylist.startSN) - newPlaylist.startSN;
  var end = Math.min(oldPlaylist.endSN, newPlaylist.endSN) - newPlaylist.startSN;
  var delta = newPlaylist.startSN - oldPlaylist.startSN;

  for (var i = start; i <= end; i++) {
    var oldFrag = oldPlaylist.fragments[delta + i];
    var newFrag = newPlaylist.fragments[i];

    if (!oldFrag || !newFrag) {
      break;
    }

    intersectionFn(oldFrag, newFrag, i);
  }
}
function adjustSliding(oldPlaylist, newPlaylist) {
  var delta = newPlaylist.startSN - oldPlaylist.startSN;
  var oldFragments = oldPlaylist.fragments;
  var newFragments = newPlaylist.fragments;

  if (delta < 0 || delta > oldFragments.length) {
    return;
  }

  for (var i = 0; i < newFragments.length; i++) {
    newFragments[i].start += oldFragments[delta].start;
  }
}
function computeReloadInterval(currentPlaylist, newPlaylist, lastRequestTime) {
  var reloadInterval = 1000 * (newPlaylist.averagetargetduration ? newPlaylist.averagetargetduration : newPlaylist.targetduration);
  var minReloadInterval = reloadInterval / 2;

  if (currentPlaylist && newPlaylist.endSN === currentPlaylist.endSN) {
    // follow HLS Spec, If the client reloads a Playlist file and finds that it has not
    // changed then it MUST wait for a period of one-half the target
    // duration before retrying.
    reloadInterval = minReloadInterval;
  }

  if (lastRequestTime) {
    reloadInterval = Math.max(minReloadInterval, reloadInterval - (window.performance.now() - lastRequestTime));
  } // in any case, don't reload more than half of target duration


  return Math.round(reloadInterval);
}
// CONCATENATED MODULE: ./src/utils/time-ranges.ts
/**
 *  TimeRanges to string helper
 */
var TimeRanges = {
  toString: function toString(r) {
    var log = '';
    var len = r.length;

    for (var i = 0; i < len; i++) {
      log += '[' + r.start(i).toFixed(3) + ',' + r.end(i).toFixed(3) + ']';
    }

    return log;
  }
};
/* harmony default export */ var time_ranges = (TimeRanges);
// CONCATENATED MODULE: ./src/utils/discontinuities.js



function findFirstFragWithCC(fragments, cc) {
  var firstFrag = null;

  for (var i = 0; i < fragments.length; i += 1) {
    var currentFrag = fragments[i];

    if (currentFrag && currentFrag.cc === cc) {
      firstFrag = currentFrag;
      break;
    }
  }

  return firstFrag;
}
function findFragWithCC(fragments, CC) {
  return binary_search.search(fragments, function (candidate) {
    if (candidate.cc < CC) {
      return 1;
    } else if (candidate.cc > CC) {
      return -1;
    } else {
      return 0;
    }
  });
}
function shouldAlignOnDiscontinuities(lastFrag, lastLevel, details) {
  var shouldAlign = false;

  if (lastLevel && lastLevel.details && details) {
    if (details.endCC > details.startCC || lastFrag && lastFrag.cc < details.startCC) {
      shouldAlign = true;
    }
  }

  return shouldAlign;
} // Find the first frag in the previous level which matches the CC of the first frag of the new level

function findDiscontinuousReferenceFrag(prevDetails, curDetails) {
  var prevFrags = prevDetails.fragments;
  var curFrags = curDetails.fragments;

  if (!curFrags.length || !prevFrags.length) {
    logger["logger"].log('No fragments to align');
    return;
  }

  var prevStartFrag = findFirstFragWithCC(prevFrags, curFrags[0].cc);

  if (!prevStartFrag || prevStartFrag && !prevStartFrag.startPTS) {
    logger["logger"].log('No frag in previous level to align on');
    return;
  }

  return prevStartFrag;
}
function adjustPts(sliding, details) {
  details.fragments.forEach(function (frag) {
    if (frag) {
      var start = frag.start + sliding;
      frag.start = frag.startPTS = start;
      frag.endPTS = start + frag.duration;
    }
  });
  details.PTSKnown = true;
}
/**
 * Using the parameters of the last level, this function computes PTS' of the new fragments so that they form a
 * contiguous stream with the last fragments.
 * The PTS of a fragment lets Hls.js know where it fits into a stream - by knowing every PTS, we know which fragment to
 * download at any given time. PTS is normally computed when the fragment is demuxed, so taking this step saves us time
 * and an extra download.
 * @param lastFrag
 * @param lastLevel
 * @param details
 */

function alignStream(lastFrag, lastLevel, details) {
  alignDiscontinuities(lastFrag, details, lastLevel);

  if (!details.PTSKnown && lastLevel) {
    // If the PTS wasn't figured out via discontinuity sequence that means there was no CC increase within the level.
    // Aligning via Program Date Time should therefore be reliable, since PDT should be the same within the same
    // discontinuity sequence.
    alignPDT(details, lastLevel.details);
  }
}
/**
 * Computes the PTS if a new level's fragments using the PTS of a fragment in the last level which shares the same
 * discontinuity sequence.
 * @param lastLevel - The details of the last loaded level
 * @param details - The details of the new level
 */

function alignDiscontinuities(lastFrag, details, lastLevel) {
  if (shouldAlignOnDiscontinuities(lastFrag, lastLevel, details)) {
    var referenceFrag = findDiscontinuousReferenceFrag(lastLevel.details, details);

    if (referenceFrag) {
      logger["logger"].log('Adjusting PTS using last level due to CC increase within current level');
      adjustPts(referenceFrag.start, details);
    }
  }
}
/**
 * Computes the PTS of a new level's fragments using the difference in Program Date Time from the last level.
 * @param details - The details of the new level
 * @param lastDetails - The details of the last loaded level
 */

function alignPDT(details, lastDetails) {
  if (lastDetails && lastDetails.fragments.length) {
    if (!details.hasProgramDateTime || !lastDetails.hasProgramDateTime) {
      return;
    } // if last level sliding is 1000 and its first frag PROGRAM-DATE-TIME is 2017-08-20 1:10:00 AM
    // and if new details first frag PROGRAM DATE-TIME is 2017-08-20 1:10:08 AM
    // then we can deduce that playlist B sliding is 1000+8 = 1008s


    var lastPDT = lastDetails.fragments[0].programDateTime;
    var newPDT = details.fragments[0].programDateTime; // date diff is in ms. frag.start is in seconds

    var sliding = (newPDT - lastPDT) / 1000 + lastDetails.fragments[0].start;

    if (Object(number["isFiniteNumber"])(sliding)) {
      logger["logger"].log("adjusting PTS using programDateTime delta, sliding:" + sliding.toFixed(3));
      adjustPts(sliding, details);
    }
  }
}
// CONCATENATED MODULE: ./src/controller/fragment-finders.ts



/**
 * Returns first fragment whose endPdt value exceeds the given PDT.
 * @param {Array<Fragment>} fragments - The array of candidate fragments
 * @param {number|null} [PDTValue = null] - The PDT value which must be exceeded
 * @param {number} [maxFragLookUpTolerance = 0] - The amount of time that a fragment's start/end can be within in order to be considered contiguous
 * @returns {*|null} fragment - The best matching fragment
 */
function findFragmentByPDT(fragments, PDTValue, maxFragLookUpTolerance) {
  if (PDTValue === null || !Array.isArray(fragments) || !fragments.length || !Object(number["isFiniteNumber"])(PDTValue)) {
    return null;
  } // if less than start


  var startPDT = fragments[0].programDateTime;

  if (PDTValue < (startPDT || 0)) {
    return null;
  }

  var endPDT = fragments[fragments.length - 1].endProgramDateTime;

  if (PDTValue >= (endPDT || 0)) {
    return null;
  }

  maxFragLookUpTolerance = maxFragLookUpTolerance || 0;

  for (var seg = 0; seg < fragments.length; ++seg) {
    var frag = fragments[seg];

    if (pdtWithinToleranceTest(PDTValue, maxFragLookUpTolerance, frag)) {
      return frag;
    }
  }

  return null;
}
/**
 * Finds a fragment based on the SN of the previous fragment; or based on the needs of the current buffer.
 * This method compensates for small buffer gaps by applying a tolerance to the start of any candidate fragment, thus
 * breaking any traps which would cause the same fragment to be continuously selected within a small range.
 * @param {*} fragPrevious - The last frag successfully appended
 * @param {Array<Fragment>} fragments - The array of candidate fragments
 * @param {number} [bufferEnd = 0] - The end of the contiguous buffered range the playhead is currently within
 * @param {number} maxFragLookUpTolerance - The amount of time that a fragment's start/end can be within in order to be considered contiguous
 * @returns {*} foundFrag - The best matching fragment
 */

function findFragmentByPTS(fragPrevious, fragments, bufferEnd, maxFragLookUpTolerance) {
  if (bufferEnd === void 0) {
    bufferEnd = 0;
  }

  if (maxFragLookUpTolerance === void 0) {
    maxFragLookUpTolerance = 0;
  }

  var fragNext = null;

  if (fragPrevious) {
    fragNext = fragments[fragPrevious.sn - fragments[0].sn + 1];
  } else if (bufferEnd === 0 && fragments[0].start === 0) {
    fragNext = fragments[0];
  } // Prefer the next fragment if it's within tolerance


  if (fragNext && fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, fragNext) === 0) {
    return fragNext;
  } // We might be seeking past the tolerance so find the best match


  var foundFragment = binary_search.search(fragments, fragmentWithinToleranceTest.bind(null, bufferEnd, maxFragLookUpTolerance));

  if (foundFragment) {
    return foundFragment;
  } // If no match was found return the next fragment after fragPrevious, or null


  return fragNext;
}
/**
 * The test function used by the findFragmentBySn's BinarySearch to look for the best match to the current buffer conditions.
 * @param {*} candidate - The fragment to test
 * @param {number} [bufferEnd = 0] - The end of the current buffered range the playhead is currently within
 * @param {number} [maxFragLookUpTolerance = 0] - The amount of time that a fragment's start can be within in order to be considered contiguous
 * @returns {number} - 0 if it matches, 1 if too low, -1 if too high
 */

function fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, candidate) {
  if (bufferEnd === void 0) {
    bufferEnd = 0;
  }

  if (maxFragLookUpTolerance === void 0) {
    maxFragLookUpTolerance = 0;
  }

  // offset should be within fragment boundary - config.maxFragLookUpTolerance
  // this is to cope with situations like
  // bufferEnd = 9.991
  // frag[Ø] : [0,10]
  // frag[1] : [10,20]
  // bufferEnd is within frag[0] range ... although what we are expecting is to return frag[1] here
  //              frag start               frag start+duration
  //                  |-----------------------------|
  //              <--->                         <--->
  //  ...--------><-----------------------------><---------....
  // previous frag         matching fragment         next frag
  //  return -1             return 0                 return 1
  // logger.log(`level/sn/start/end/bufEnd:${level}/${candidate.sn}/${candidate.start}/${(candidate.start+candidate.duration)}/${bufferEnd}`);
  // Set the lookup tolerance to be small enough to detect the current segment - ensures we don't skip over very small segments
  var candidateLookupTolerance = Math.min(maxFragLookUpTolerance, candidate.duration + (candidate.deltaPTS ? candidate.deltaPTS : 0));

  if (candidate.start + candidate.duration - candidateLookupTolerance <= bufferEnd) {
    return 1;
  } else if (candidate.start - candidateLookupTolerance > bufferEnd && candidate.start) {
    // if maxFragLookUpTolerance will have negative value then don't return -1 for first element
    return -1;
  }

  return 0;
}
/**
 * The test function used by the findFragmentByPdt's BinarySearch to look for the best match to the current buffer conditions.
 * This function tests the candidate's program date time values, as represented in Unix time
 * @param {*} candidate - The fragment to test
 * @param {number} [pdtBufferEnd = 0] - The Unix time representing the end of the current buffered range
 * @param {number} [maxFragLookUpTolerance = 0] - The amount of time that a fragment's start can be within in order to be considered contiguous
 * @returns {boolean} True if contiguous, false otherwise
 */

function pdtWithinToleranceTest(pdtBufferEnd, maxFragLookUpTolerance, candidate) {
  var candidateLookupTolerance = Math.min(maxFragLookUpTolerance, candidate.duration + (candidate.deltaPTS ? candidate.deltaPTS : 0)) * 1000; // endProgramDateTime can be null, default to zero

  var endProgramDateTime = candidate.endProgramDateTime || 0;
  return endProgramDateTime - candidateLookupTolerance > pdtBufferEnd;
}
// CONCATENATED MODULE: ./src/controller/gap-controller.js




var STALL_MINIMUM_DURATION_MS = 250;
var MAX_START_GAP_JUMP = 2.0;
var SKIP_BUFFER_HOLE_STEP_SECONDS = 0.1;
var SKIP_BUFFER_RANGE_START = 0.05;

var gap_controller_GapController = /*#__PURE__*/function () {
  function GapController(config, media, fragmentTracker, hls) {
    this.config = config;
    this.media = media;
    this.fragmentTracker = fragmentTracker;
    this.hls = hls;
    this.nudgeRetry = 0;
    this.stallReported = false;
    this.stalled = null;
    this.moved = false;
    this.seeking = false;
  }
  /**
   * Checks if the playhead is stuck within a gap, and if so, attempts to free it.
   * A gap is an unbuffered range between two buffered ranges (or the start and the first buffered range).
   *
   * @param {number} lastCurrentTime Previously read playhead position
   */


  var _proto = GapController.prototype;

  _proto.poll = function poll(lastCurrentTime) {
    var config = this.config,
        media = this.media,
        stalled = this.stalled;
    var currentTime = media.currentTime,
        seeking = media.seeking;
    var seeked = this.seeking && !seeking;
    var beginSeek = !this.seeking && seeking;
    this.seeking = seeking; // The playhead is moving, no-op

    if (currentTime !== lastCurrentTime) {
      this.moved = true;

      if (stalled !== null) {
        // The playhead is now moving, but was previously stalled
        if (this.stallReported) {
          var _stalledDuration = self.performance.now() - stalled;

          logger["logger"].warn("playback not stuck anymore @" + currentTime + ", after " + Math.round(_stalledDuration) + "ms");
          this.stallReported = false;
        }

        this.stalled = null;
        this.nudgeRetry = 0;
      }

      return;
    } // Clear stalled state when beginning or finishing seeking so that we don't report stalls coming out of a seek


    if (beginSeek || seeked) {
      this.stalled = null;
    } // The playhead should not be moving


    if (media.paused || media.ended || media.playbackRate === 0 || !media.buffered.length) {
      return;
    }

    var bufferInfo = BufferHelper.bufferInfo(media, currentTime, 0);
    var isBuffered = bufferInfo.len > 0;
    var nextStart = bufferInfo.nextStart || 0; // There is no playable buffer (waiting for buffer append)

    if (!isBuffered && !nextStart) {
      return;
    }

    if (seeking) {
      // Waiting for seeking in a buffered range to complete
      var hasEnoughBuffer = bufferInfo.len > MAX_START_GAP_JUMP; // Next buffered range is too far ahead to jump to while still seeking

      var noBufferGap = !nextStart || nextStart - currentTime > MAX_START_GAP_JUMP && !this.fragmentTracker.getPartialFragment(currentTime);

      if (hasEnoughBuffer || noBufferGap) {
        return;
      } // Reset moved state when seeking to a point in or before a gap


      this.moved = false;
    } // Skip start gaps if we haven't played, but the last poll detected the start of a stall
    // The addition poll gives the browser a chance to jump the gap for us


    if (!this.moved && this.stalled) {
      // Jump start gaps within jump threshold
      var startJump = Math.max(nextStart, bufferInfo.start || 0) - currentTime;

      if (startJump > 0 && startJump <= MAX_START_GAP_JUMP) {
        this._trySkipBufferHole(null);

        return;
      }
    } // Start tracking stall time


    var tnow = self.performance.now();

    if (stalled === null) {
      this.stalled = tnow;
      return;
    }

    var stalledDuration = tnow - stalled;

    if (!seeking && stalledDuration >= STALL_MINIMUM_DURATION_MS) {
      // Report stalling after trying to fix
      this._reportStall(bufferInfo.len);
    }

    var bufferedWithHoles = BufferHelper.bufferInfo(media, currentTime, config.maxBufferHole);

    this._tryFixBufferStall(bufferedWithHoles, stalledDuration);
  }
  /**
   * Detects and attempts to fix known buffer stalling issues.
   * @param bufferInfo - The properties of the current buffer.
   * @param stalledDurationMs - The amount of time Hls.js has been stalling for.
   * @private
   */
  ;

  _proto._tryFixBufferStall = function _tryFixBufferStall(bufferInfo, stalledDurationMs) {
    var config = this.config,
        fragmentTracker = this.fragmentTracker,
        media = this.media;
    var currentTime = media.currentTime;
    var partial = fragmentTracker.getPartialFragment(currentTime);

    if (partial) {
      // Try to skip over the buffer hole caused by a partial fragment
      // This method isn't limited by the size of the gap between buffered ranges
      var targetTime = this._trySkipBufferHole(partial); // we return here in this case, meaning
      // the branch below only executes when we don't handle a partial fragment


      if (targetTime) {
        return;
      }
    } // if we haven't had to skip over a buffer hole of a partial fragment
    // we may just have to "nudge" the playlist as the browser decoding/rendering engine
    // needs to cross some sort of threshold covering all source-buffers content
    // to start playing properly.


    if (bufferInfo.len > config.maxBufferHole && stalledDurationMs > config.highBufferWatchdogPeriod * 1000) {
      logger["logger"].warn('Trying to nudge playhead over buffer-hole'); // Try to nudge currentTime over a buffer hole if we've been stalling for the configured amount of seconds
      // We only try to jump the hole if it's under the configured size
      // Reset stalled so to rearm watchdog timer

      this.stalled = null;

      this._tryNudgeBuffer();
    }
  }
  /**
   * Triggers a BUFFER_STALLED_ERROR event, but only once per stall period.
   * @param bufferLen - The playhead distance from the end of the current buffer segment.
   * @private
   */
  ;

  _proto._reportStall = function _reportStall(bufferLen) {
    var hls = this.hls,
        media = this.media,
        stallReported = this.stallReported;

    if (!stallReported) {
      // Report stalled error once
      this.stallReported = true;
      logger["logger"].warn("Playback stalling at @" + media.currentTime + " due to low buffer (buffer=" + bufferLen + ")");
      hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].BUFFER_STALLED_ERROR,
        fatal: false,
        buffer: bufferLen
      });
    }
  }
  /**
   * Attempts to fix buffer stalls by jumping over known gaps caused by partial fragments
   * @param partial - The partial fragment found at the current time (where playback is stalling).
   * @private
   */
  ;

  _proto._trySkipBufferHole = function _trySkipBufferHole(partial) {
    var config = this.config,
        hls = this.hls,
        media = this.media;
    var currentTime = media.currentTime;
    var lastEndTime = 0; // Check if currentTime is between unbuffered regions of partial fragments

    for (var i = 0; i < media.buffered.length; i++) {
      var startTime = media.buffered.start(i);

      if (currentTime + config.maxBufferHole >= lastEndTime && currentTime < startTime) {
        var targetTime = Math.max(startTime + SKIP_BUFFER_RANGE_START, media.currentTime + SKIP_BUFFER_HOLE_STEP_SECONDS);
        logger["logger"].warn("skipping hole, adjusting currentTime from " + currentTime + " to " + targetTime);
        this.moved = true;
        this.stalled = null;
        media.currentTime = targetTime;

        if (partial) {
          hls.trigger(events["default"].ERROR, {
            type: errors["ErrorTypes"].MEDIA_ERROR,
            details: errors["ErrorDetails"].BUFFER_SEEK_OVER_HOLE,
            fatal: false,
            reason: "fragment loaded with buffer holes, seeking from " + currentTime + " to " + targetTime,
            frag: partial
          });
        }

        return targetTime;
      }

      lastEndTime = media.buffered.end(i);
    }

    return 0;
  }
  /**
   * Attempts to fix buffer stalls by advancing the mediaElement's current time by a small amount.
   * @private
   */
  ;

  _proto._tryNudgeBuffer = function _tryNudgeBuffer() {
    var config = this.config,
        hls = this.hls,
        media = this.media;
    var currentTime = media.currentTime;
    var nudgeRetry = (this.nudgeRetry || 0) + 1;
    this.nudgeRetry = nudgeRetry;

    if (nudgeRetry < config.nudgeMaxRetry) {
      var targetTime = currentTime + nudgeRetry * config.nudgeOffset; // playback stalled in buffered area ... let's nudge currentTime to try to overcome this

      logger["logger"].warn("Nudging 'currentTime' from " + currentTime + " to " + targetTime);
      media.currentTime = targetTime;
      hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].BUFFER_NUDGE_ON_STALL,
        fatal: false
      });
    } else {
      logger["logger"].error("Playhead still not moving while enough data buffered @" + currentTime + " after " + config.nudgeMaxRetry + " nudges");
      hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].BUFFER_STALLED_ERROR,
        fatal: true
      });
    }
  };

  return GapController;
}();


// CONCATENATED MODULE: ./src/task-loop.ts
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function task_loop_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



/**
 * Sub-class specialization of EventHandler base class.
 *
 * TaskLoop allows to schedule a task function being called (optionnaly repeatedly) on the main loop,
 * scheduled asynchroneously, avoiding recursive calls in the same tick.
 *
 * The task itself is implemented in `doTick`. It can be requested and called for single execution
 * using the `tick` method.
 *
 * It will be assured that the task execution method (`tick`) only gets called once per main loop "tick",
 * no matter how often it gets requested for execution. Execution in further ticks will be scheduled accordingly.
 *
 * If further execution requests have already been scheduled on the next tick, it can be checked with `hasNextTick`,
 * and cancelled with `clearNextTick`.
 *
 * The task can be scheduled as an interval repeatedly with a period as parameter (see `setInterval`, `clearInterval`).
 *
 * Sub-classes need to implement the `doTick` method which will effectively have the task execution routine.
 *
 * Further explanations:
 *
 * The baseclass has a `tick` method that will schedule the doTick call. It may be called synchroneously
 * only for a stack-depth of one. On re-entrant calls, sub-sequent calls are scheduled for next main loop ticks.
 *
 * When the task execution (`tick` method) is called in re-entrant way this is detected and
 * we are limiting the task execution per call stack to exactly one, but scheduling/post-poning further
 * task processing on the next main loop iteration (also known as "next tick" in the Node/JS runtime lingo).
 */
var TaskLoop = /*#__PURE__*/function (_EventHandler) {
  task_loop_inheritsLoose(TaskLoop, _EventHandler);

  function TaskLoop(hls) {
    var _this;

    for (var _len = arguments.length, events = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      events[_key - 1] = arguments[_key];
    }

    _this = _EventHandler.call.apply(_EventHandler, [this, hls].concat(events)) || this;
    _this._boundTick = void 0;
    _this._tickTimer = null;
    _this._tickInterval = null;
    _this._tickCallCount = 0;
    _this._boundTick = _this.tick.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * @override
   */


  var _proto = TaskLoop.prototype;

  _proto.onHandlerDestroying = function onHandlerDestroying() {
    // clear all timers before unregistering from event bus
    this.clearNextTick();
    this.clearInterval();
  }
  /**
   * @returns {boolean}
   */
  ;

  _proto.hasInterval = function hasInterval() {
    return !!this._tickInterval;
  }
  /**
   * @returns {boolean}
   */
  ;

  _proto.hasNextTick = function hasNextTick() {
    return !!this._tickTimer;
  }
  /**
   * @param {number} millis Interval time (ms)
   * @returns {boolean} True when interval has been scheduled, false when already scheduled (no effect)
   */
  ;

  _proto.setInterval = function setInterval(millis) {
    if (!this._tickInterval) {
      this._tickInterval = self.setInterval(this._boundTick, millis);
      return true;
    }

    return false;
  }
  /**
   * @returns {boolean} True when interval was cleared, false when none was set (no effect)
   */
  ;

  _proto.clearInterval = function clearInterval() {
    if (this._tickInterval) {
      self.clearInterval(this._tickInterval);
      this._tickInterval = null;
      return true;
    }

    return false;
  }
  /**
   * @returns {boolean} True when timeout was cleared, false when none was set (no effect)
   */
  ;

  _proto.clearNextTick = function clearNextTick() {
    if (this._tickTimer) {
      self.clearTimeout(this._tickTimer);
      this._tickTimer = null;
      return true;
    }

    return false;
  }
  /**
   * Will call the subclass doTick implementation in this main loop tick
   * or in the next one (via setTimeout(,0)) in case it has already been called
   * in this tick (in case this is a re-entrant call).
   */
  ;

  _proto.tick = function tick() {
    this._tickCallCount++;

    if (this._tickCallCount === 1) {
      this.doTick(); // re-entrant call to tick from previous doTick call stack
      // -> schedule a call on the next main loop iteration to process this task processing request

      if (this._tickCallCount > 1) {
        // make sure only one timer exists at any time at max
        this.clearNextTick();
        this._tickTimer = self.setTimeout(this._boundTick, 0);
      }

      this._tickCallCount = 0;
    }
  }
  /**
   * For subclass to implement task logic
   * @abstract
   */
  ;

  _proto.doTick = function doTick() {};

  return TaskLoop;
}(event_handler);


// CONCATENATED MODULE: ./src/controller/base-stream-controller.js


function base_stream_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var State = {
  STOPPED: 'STOPPED',
  STARTING: 'STARTING',
  IDLE: 'IDLE',
  PAUSED: 'PAUSED',
  KEY_LOADING: 'KEY_LOADING',
  FRAG_LOADING: 'FRAG_LOADING',
  FRAG_LOADING_WAITING_RETRY: 'FRAG_LOADING_WAITING_RETRY',
  WAITING_TRACK: 'WAITING_TRACK',
  PARSING: 'PARSING',
  PARSED: 'PARSED',
  BUFFER_FLUSHING: 'BUFFER_FLUSHING',
  ENDED: 'ENDED',
  ERROR: 'ERROR',
  WAITING_INIT_PTS: 'WAITING_INIT_PTS',
  WAITING_LEVEL: 'WAITING_LEVEL'
};

var base_stream_controller_BaseStreamController = /*#__PURE__*/function (_TaskLoop) {
  base_stream_controller_inheritsLoose(BaseStreamController, _TaskLoop);

  function BaseStreamController() {
    return _TaskLoop.apply(this, arguments) || this;
  }

  var _proto = BaseStreamController.prototype;

  _proto.doTick = function doTick() {};

  _proto.startLoad = function startLoad() {};

  _proto.stopLoad = function stopLoad() {
    var frag = this.fragCurrent;

    if (frag) {
      if (frag.loader) {
        frag.loader.abort();
      }

      this.fragmentTracker.removeFragment(frag);
    }

    if (this.demuxer) {
      this.demuxer.destroy();
      this.demuxer = null;
    }

    this.fragCurrent = null;
    this.fragPrevious = null;
    this.clearInterval();
    this.clearNextTick();
    this.state = State.STOPPED;
  };

  _proto._streamEnded = function _streamEnded(bufferInfo, levelDetails) {
    var fragCurrent = this.fragCurrent,
        fragmentTracker = this.fragmentTracker; // we just got done loading the final fragment and there is no other buffered range after ...
    // rationale is that in case there are any buffered ranges after, it means that there are unbuffered portion in between
    // so we should not switch to ENDED in that case, to be able to buffer them
    // dont switch to ENDED if we need to backtrack last fragment

    if (!levelDetails.live && fragCurrent && !fragCurrent.backtracked && fragCurrent.sn === levelDetails.endSN && !bufferInfo.nextStart) {
      var fragState = fragmentTracker.getState(fragCurrent);
      return fragState === FragmentState.PARTIAL || fragState === FragmentState.OK;
    }

    return false;
  };

  _proto.onMediaSeeking = function onMediaSeeking() {
    var config = this.config,
        media = this.media,
        mediaBuffer = this.mediaBuffer,
        state = this.state;
    var currentTime = media ? media.currentTime : null;
    var bufferInfo = BufferHelper.bufferInfo(mediaBuffer || media, currentTime, this.config.maxBufferHole);
    logger["logger"].log("media seeking to " + (Object(number["isFiniteNumber"])(currentTime) ? currentTime.toFixed(3) : currentTime));

    if (state === State.FRAG_LOADING) {
      var fragCurrent = this.fragCurrent; // check if we are seeking to a unbuffered area AND if frag loading is in progress

      if (bufferInfo.len === 0 && fragCurrent) {
        var tolerance = config.maxFragLookUpTolerance;
        var fragStartOffset = fragCurrent.start - tolerance;
        var fragEndOffset = fragCurrent.start + fragCurrent.duration + tolerance; // check if we seek position will be out of currently loaded frag range : if out cancel frag load, if in, don't do anything

        if (currentTime < fragStartOffset || currentTime > fragEndOffset) {
          if (fragCurrent.loader) {
            logger["logger"].log('seeking outside of buffer while fragment load in progress, cancel fragment load');
            fragCurrent.loader.abort();
          }

          this.fragCurrent = null;
          this.fragPrevious = null; // switch to IDLE state to load new fragment

          this.state = State.IDLE;
        } else {
          logger["logger"].log('seeking outside of buffer but within currently loaded fragment range');
        }
      }
    } else if (state === State.ENDED) {
      // if seeking to unbuffered area, clean up fragPrevious
      if (bufferInfo.len === 0) {
        this.fragPrevious = null;
        this.fragCurrent = null;
      } // switch to IDLE state to check for potential new fragment


      this.state = State.IDLE;
    }

    if (media) {
      this.lastCurrentTime = currentTime;
    } // in case seeking occurs although no media buffered, adjust startPosition and nextLoadPosition to seek target


    if (!this.loadedmetadata) {
      this.nextLoadPosition = this.startPosition = currentTime;
    } // tick to speed up processing


    this.tick();
  };

  _proto.onMediaEnded = function onMediaEnded() {
    // reset startPosition and lastCurrentTime to restart playback @ stream beginning
    this.startPosition = this.lastCurrentTime = 0;
  };

  _proto.onHandlerDestroying = function onHandlerDestroying() {
    this.stopLoad();

    _TaskLoop.prototype.onHandlerDestroying.call(this);
  };

  _proto.onHandlerDestroyed = function onHandlerDestroyed() {
    this.state = State.STOPPED;
    this.fragmentTracker = null;
  };

  _proto.computeLivePosition = function computeLivePosition(sliding, levelDetails) {
    var targetLatency = this.config.liveSyncDuration !== undefined ? this.config.liveSyncDuration : this.config.liveSyncDurationCount * levelDetails.targetduration;
    return sliding + Math.max(0, levelDetails.totalduration - targetLatency);
  };

  return BaseStreamController;
}(TaskLoop);


// CONCATENATED MODULE: ./src/controller/stream-controller.js







function stream_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function stream_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) stream_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) stream_controller_defineProperties(Constructor, staticProps); return Constructor; }

function stream_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Stream Controller
*/















var TICK_INTERVAL = 100; // how often to tick in ms

var stream_controller_StreamController = /*#__PURE__*/function (_BaseStreamController) {
  stream_controller_inheritsLoose(StreamController, _BaseStreamController);

  function StreamController(hls, fragmentTracker) {
    var _this;

    _this = _BaseStreamController.call(this, hls, events["default"].MEDIA_ATTACHED, events["default"].MEDIA_DETACHING, events["default"].MANIFEST_LOADING, events["default"].MANIFEST_PARSED, events["default"].LEVEL_LOADED, events["default"].LEVELS_UPDATED, events["default"].KEY_LOADED, events["default"].FRAG_LOADED, events["default"].FRAG_LOAD_EMERGENCY_ABORTED, events["default"].FRAG_PARSING_INIT_SEGMENT, events["default"].FRAG_PARSING_DATA, events["default"].FRAG_PARSED, events["default"].ERROR, events["default"].AUDIO_TRACK_SWITCHING, events["default"].AUDIO_TRACK_SWITCHED, events["default"].BUFFER_CREATED, events["default"].BUFFER_APPENDED, events["default"].BUFFER_FLUSHED) || this;
    _this.fragmentTracker = fragmentTracker;
    _this.config = hls.config;
    _this.audioCodecSwap = false;
    _this._state = State.STOPPED;
    _this.stallReported = false;
    _this.gapController = null;
    _this.altAudio = false;
    _this.audioOnly = false;
    _this.bitrateTest = false;
    return _this;
  }

  var _proto = StreamController.prototype;

  _proto.startLoad = function startLoad(startPosition) {
    if (this.levels) {
      var lastCurrentTime = this.lastCurrentTime,
          hls = this.hls;
      this.stopLoad();
      this.setInterval(TICK_INTERVAL);
      this.level = -1;
      this.fragLoadError = 0;

      if (!this.startFragRequested) {
        // determine load level
        var startLevel = hls.startLevel;

        if (startLevel === -1) {
          if (hls.config.testBandwidth) {
            // -1 : guess start Level by doing a bitrate test by loading first fragment of lowest quality level
            startLevel = 0;
            this.bitrateTest = true;
          } else {
            startLevel = hls.nextAutoLevel;
          }
        } // set new level to playlist loader : this will trigger start level load
        // hls.nextLoadLevel remains until it is set to a new value or until a new frag is successfully loaded


        this.level = hls.nextLoadLevel = startLevel;
        this.loadedmetadata = false;
      } // if startPosition undefined but lastCurrentTime set, set startPosition to last currentTime


      if (lastCurrentTime > 0 && startPosition === -1) {
        logger["logger"].log("override startPosition with lastCurrentTime @" + lastCurrentTime.toFixed(3));
        startPosition = lastCurrentTime;
      }

      this.state = State.IDLE;
      this.nextLoadPosition = this.startPosition = this.lastCurrentTime = startPosition;
      this.tick();
    } else {
      this.forceStartLoad = true;
      this.state = State.STOPPED;
    }
  };

  _proto.stopLoad = function stopLoad() {
    this.forceStartLoad = false;

    _BaseStreamController.prototype.stopLoad.call(this);
  };

  _proto.doTick = function doTick() {
    switch (this.state) {
      case State.BUFFER_FLUSHING:
        // in buffer flushing state, reset fragLoadError counter
        this.fragLoadError = 0;
        break;

      case State.IDLE:
        this._doTickIdle();

        break;

      case State.WAITING_LEVEL:
        var level = this.levels[this.level]; // check if playlist is already loaded

        if (level && level.details) {
          this.state = State.IDLE;
        }

        break;

      case State.FRAG_LOADING_WAITING_RETRY:
        var now = window.performance.now();
        var retryDate = this.retryDate; // if current time is gt than retryDate, or if media seeking let's switch to IDLE state to retry loading

        if (!retryDate || now >= retryDate || this.media && this.media.seeking) {
          logger["logger"].log('mediaController: retryDate reached, switch back to IDLE state');
          this.state = State.IDLE;
        }

        break;

      case State.ERROR:
      case State.STOPPED:
      case State.FRAG_LOADING:
      case State.PARSING:
      case State.PARSED:
      case State.ENDED:
        break;

      default:
        break;
    } // check buffer


    this._checkBuffer(); // check/update current fragment


    this._checkFragmentChanged();
  } // Ironically the "idle" state is the on we do the most logic in it seems ....
  // NOTE: Maybe we could rather schedule a check for buffer length after half of the currently
  //       played segment, or on pause/play/seek instead of naively checking every 100ms?
  ;

  _proto._doTickIdle = function _doTickIdle() {
    var hls = this.hls,
        config = hls.config,
        media = this.media; // if start level not parsed yet OR
    // if video not attached AND start fragment already requested OR start frag prefetch disable
    // exit loop, as we either need more info (level not parsed) or we need media to be attached to load new fragment

    if (this.levelLastLoaded === undefined || !media && (this.startFragRequested || !config.startFragPrefetch)) {
      return;
    } // If the "main" level is audio-only but we are loading an alternate track in the same group, do not load anything


    if (this.altAudio && this.audioOnly) {
      // Clear audio demuxer state so when switching back to main audio we're not still appending where we left off
      this.demuxer.frag = null;
      return;
    } // if we have not yet loaded any fragment, start loading from start position


    var pos;

    if (this.loadedmetadata) {
      pos = media.currentTime;
    } else {
      pos = this.nextLoadPosition;
    } // determine next load level


    var level = hls.nextLoadLevel,
        levelInfo = this.levels[level];

    if (!levelInfo) {
      return;
    }

    var levelBitrate = levelInfo.bitrate,
        maxBufLen; // compute max Buffer Length that we could get from this load level, based on level bitrate.

    if (levelBitrate) {
      maxBufLen = Math.max(8 * config.maxBufferSize / levelBitrate, config.maxBufferLength);
    } else {
      maxBufLen = config.maxBufferLength;
    }

    maxBufLen = Math.min(maxBufLen, config.maxMaxBufferLength); // determine next candidate fragment to be loaded, based on current position and end of buffer position
    // ensure up to `config.maxMaxBufferLength` of buffer upfront

    var maxBufferHole = pos < config.maxBufferHole ? Math.max(MAX_START_GAP_JUMP, config.maxBufferHole) : config.maxBufferHole;
    var bufferInfo = BufferHelper.bufferInfo(this.mediaBuffer ? this.mediaBuffer : media, pos, maxBufferHole);
    var bufferLen = bufferInfo.len; // Stay idle if we are still with buffer margins

    if (bufferLen >= maxBufLen) {
      return;
    } // if buffer length is less than maxBufLen try to load a new fragment ...


    logger["logger"].trace("buffer length of " + bufferLen.toFixed(3) + " is below max of " + maxBufLen.toFixed(3) + ". checking for more payload ..."); // set next load level : this will trigger a playlist load if needed

    this.level = hls.nextLoadLevel = level;
    var levelDetails = levelInfo.details; // if level info not retrieved yet, switch state and wait for level retrieval
    // if live playlist, ensure that new playlist has been refreshed to avoid loading/try to load
    // a useless and outdated fragment (that might even introduce load error if it is already out of the live playlist)

    if (!levelDetails || levelDetails.live && this.levelLastLoaded !== level) {
      this.state = State.WAITING_LEVEL;
      return;
    }

    if (this._streamEnded(bufferInfo, levelDetails)) {
      var data = {};

      if (this.altAudio) {
        data.type = 'video';
      }

      this.hls.trigger(events["default"].BUFFER_EOS, data);
      this.state = State.ENDED;
      return;
    } // if we have the levelDetails for the selected variant, lets continue enrichen our stream (load keys/fragments or trigger EOS, etc..)


    this._fetchPayloadOrEos(pos, bufferInfo, levelDetails);
  };

  _proto._fetchPayloadOrEos = function _fetchPayloadOrEos(pos, bufferInfo, levelDetails) {
    var fragPrevious = this.fragPrevious,
        level = this.level,
        fragments = levelDetails.fragments,
        fragLen = fragments.length; // empty playlist

    if (fragLen === 0) {
      return;
    } // find fragment index, contiguous with end of buffer position


    var start = fragments[0].start,
        end = fragments[fragLen - 1].start + fragments[fragLen - 1].duration,
        bufferEnd = bufferInfo.end,
        frag;

    if (levelDetails.initSegment && !levelDetails.initSegment.data) {
      frag = levelDetails.initSegment;
    } else {
      // in case of live playlist we need to ensure that requested position is not located before playlist start
      if (levelDetails.live) {
        var initialLiveManifestSize = this.config.initialLiveManifestSize;

        if (fragLen < initialLiveManifestSize) {
          logger["logger"].warn("Can not start playback of a level, reason: not enough fragments " + fragLen + " < " + initialLiveManifestSize);
          return;
        }

        frag = this._ensureFragmentAtLivePoint(levelDetails, bufferEnd, start, end, fragPrevious, fragments); // if it explicitely returns null don't load any fragment and exit function now

        if (frag === null) {
          return;
        }
      } else {
        // VoD playlist: if bufferEnd before start of playlist, load first fragment
        if (bufferEnd < start) {
          frag = fragments[0];
        }
      }
    }

    if (!frag) {
      frag = this._findFragment(start, fragPrevious, fragLen, fragments, bufferEnd, end, levelDetails);
    }

    if (frag) {
      if (frag.encrypted) {
        this._loadKey(frag, levelDetails);
      } else {
        this._loadFragment(frag, levelDetails, pos, bufferEnd);
      }
    }
  };

  _proto._ensureFragmentAtLivePoint = function _ensureFragmentAtLivePoint(levelDetails, bufferEnd, start, end, fragPrevious, fragments) {
    var config = this.hls.config,
        media = this.media;
    var frag; // check if requested position is within seekable boundaries :
    // logger.log(`start/pos/bufEnd/seeking:${start.toFixed(3)}/${pos.toFixed(3)}/${bufferEnd.toFixed(3)}/${this.media.seeking}`);

    var maxLatency = Infinity;

    if (config.liveMaxLatencyDuration !== undefined) {
      maxLatency = config.liveMaxLatencyDuration;
    } else if (Object(number["isFiniteNumber"])(config.liveMaxLatencyDurationCount)) {
      maxLatency = config.liveMaxLatencyDurationCount * levelDetails.targetduration;
    }

    if (bufferEnd < Math.max(start - config.maxFragLookUpTolerance, end - maxLatency)) {
      var liveSyncPosition = this.liveSyncPosition = this.computeLivePosition(start, levelDetails);
      bufferEnd = liveSyncPosition;

      if (media && !media.paused && media.readyState && media.duration > liveSyncPosition && liveSyncPosition > media.currentTime) {
        logger["logger"].log("buffer end: " + bufferEnd.toFixed(3) + " is located too far from the end of live sliding playlist, reset currentTime to : " + liveSyncPosition.toFixed(3));
        media.currentTime = liveSyncPosition;
      }

      this.nextLoadPosition = liveSyncPosition;
    } // if end of buffer greater than live edge, don't load any fragment
    // this could happen if live playlist intermittently slides in the past.
    // level 1 loaded [182580161,182580167]
    // level 1 loaded [182580162,182580169]
    // Loading 182580168 of [182580162 ,182580169],level 1 ..
    // Loading 182580169 of [182580162 ,182580169],level 1 ..
    // level 1 loaded [182580162,182580168] <============= here we should have bufferEnd > end. in that case break to avoid reloading 182580168
    // level 1 loaded [182580164,182580171]
    //
    // don't return null in case media not loaded yet (readystate === 0)


    if (levelDetails.PTSKnown && bufferEnd > end && media && media.readyState) {
      return null;
    }

    if (this.startFragRequested && !levelDetails.PTSKnown) {
      /* we are switching level on live playlist, but we don't have any PTS info for that quality level ...
         try to load frag matching with next SN.
         even if SN are not synchronized between playlists, loading this frag will help us
         compute playlist sliding and find the right one after in case it was not the right consecutive one */
      if (fragPrevious) {
        if (levelDetails.hasProgramDateTime) {
          // Relies on PDT in order to switch bitrates (Support EXT-X-DISCONTINUITY without EXT-X-DISCONTINUITY-SEQUENCE)
          logger["logger"].log("live playlist, switching playlist, load frag with same PDT: " + fragPrevious.programDateTime);
          frag = findFragmentByPDT(fragments, fragPrevious.endProgramDateTime, config.maxFragLookUpTolerance);
        } else {
          // Uses buffer and sequence number to calculate switch segment (required if using EXT-X-DISCONTINUITY-SEQUENCE)
          var targetSN = fragPrevious.sn + 1;

          if (targetSN >= levelDetails.startSN && targetSN <= levelDetails.endSN) {
            var fragNext = fragments[targetSN - levelDetails.startSN];

            if (fragPrevious.cc === fragNext.cc) {
              frag = fragNext;
              logger["logger"].log("live playlist, switching playlist, load frag with next SN: " + frag.sn);
            }
          } // next frag SN not available (or not with same continuity counter)
          // look for a frag sharing the same CC


          if (!frag) {
            frag = binary_search.search(fragments, function (frag) {
              return fragPrevious.cc - frag.cc;
            });

            if (frag) {
              logger["logger"].log("live playlist, switching playlist, load frag with same CC: " + frag.sn);
            }
          }
        }
      }
    }

    return frag;
  };

  _proto._findFragment = function _findFragment(start, fragPreviousLoad, fragmentIndexRange, fragments, bufferEnd, end, levelDetails) {
    var config = this.hls.config;
    var fragNextLoad;

    if (bufferEnd < end) {
      var lookupTolerance = bufferEnd > end - config.maxFragLookUpTolerance ? 0 : config.maxFragLookUpTolerance; // Remove the tolerance if it would put the bufferEnd past the actual end of stream
      // Uses buffer and sequence number to calculate switch segment (required if using EXT-X-DISCONTINUITY-SEQUENCE)

      fragNextLoad = findFragmentByPTS(fragPreviousLoad, fragments, bufferEnd, lookupTolerance);
    } else {
      // reach end of playlist
      fragNextLoad = fragments[fragmentIndexRange - 1];
    }

    if (fragNextLoad) {
      var curSNIdx = fragNextLoad.sn - levelDetails.startSN;
      var sameLevel = fragPreviousLoad && fragNextLoad.level === fragPreviousLoad.level;
      var prevSnFrag = fragments[curSNIdx - 1];
      var nextSnFrag = fragments[curSNIdx + 1]; // logger.log('find SN matching with pos:' +  bufferEnd + ':' + frag.sn);

      if (fragPreviousLoad && fragNextLoad.sn === fragPreviousLoad.sn) {
        if (sameLevel && !fragNextLoad.backtracked) {
          if (fragNextLoad.sn < levelDetails.endSN) {
            var deltaPTS = fragPreviousLoad.deltaPTS; // if there is a significant delta between audio and video, larger than max allowed hole,
            // and if previous remuxed fragment did not start with a keyframe. (fragPrevious.dropped)
            // let's try to load previous fragment again to get last keyframe
            // then we will reload again current fragment (that way we should be able to fill the buffer hole ...)

            if (deltaPTS && deltaPTS > config.maxBufferHole && fragPreviousLoad.dropped && curSNIdx) {
              fragNextLoad = prevSnFrag;
              logger["logger"].warn('Previous fragment was dropped with large PTS gap between audio and video. Maybe fragment is not starting with a keyframe? Loading previous one to try to overcome this');
            } else {
              fragNextLoad = nextSnFrag;

              if (this.fragmentTracker.getState(fragNextLoad) !== FragmentState.OK) {
                logger["logger"].log("Re-loading fragment with SN: " + fragNextLoad.sn);
              }
            }
          } else {
            fragNextLoad = null;
          }
        } else if (fragNextLoad.backtracked) {
          // Only backtrack a max of 1 consecutive fragment to prevent sliding back too far when little or no frags start with keyframes
          if (nextSnFrag && nextSnFrag.backtracked) {
            logger["logger"].warn("Already backtracked from fragment " + nextSnFrag.sn + ", will not backtrack to fragment " + fragNextLoad.sn + ". Loading fragment " + nextSnFrag.sn);
            fragNextLoad = nextSnFrag;
          } else {
            // If a fragment has dropped frames and it's in a same level/sequence, load the previous fragment to try and find the keyframe
            // Reset the dropped count now since it won't be reset until we parse the fragment again, which prevents infinite backtracking on the same segment
            logger["logger"].warn('Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe');
            fragNextLoad.dropped = 0;

            if (prevSnFrag) {
              fragNextLoad = prevSnFrag;
              fragNextLoad.backtracked = true;
            } else if (curSNIdx) {
              // can't backtrack on very first fragment
              fragNextLoad = null;
            }
          }
        }
      }
    }

    return fragNextLoad;
  };

  _proto._loadKey = function _loadKey(frag, levelDetails) {
    logger["logger"].log("Loading key for " + frag.sn + " of [" + levelDetails.startSN + "-" + levelDetails.endSN + "], level " + this.level);
    this.state = State.KEY_LOADING;
    this.hls.trigger(events["default"].KEY_LOADING, {
      frag: frag
    });
  };

  _proto._loadFragment = function _loadFragment(frag, levelDetails, pos, bufferEnd) {
    // Check if fragment is not loaded
    var fragState = this.fragmentTracker.getState(frag);
    this.fragCurrent = frag;

    if (frag.sn !== 'initSegment') {
      this.startFragRequested = true;
    } // Don't update nextLoadPosition for fragments which are not buffered


    if (Object(number["isFiniteNumber"])(frag.sn) && !frag.bitrateTest) {
      this.nextLoadPosition = frag.start + frag.duration;
    } // Allow backtracked fragments to load


    if (frag.backtracked || fragState === FragmentState.NOT_LOADED || fragState === FragmentState.PARTIAL) {
      frag.autoLevel = this.hls.autoLevelEnabled;
      frag.bitrateTest = this.bitrateTest;
      logger["logger"].log("Loading " + frag.sn + " of [" + levelDetails.startSN + "-" + levelDetails.endSN + "], level " + this.level + ", " + (this.loadedmetadata ? 'currentTime' : 'nextLoadPosition') + ": " + parseFloat(pos.toFixed(3)) + ", bufferEnd: " + parseFloat(bufferEnd.toFixed(3)));
      this.hls.trigger(events["default"].FRAG_LOADING, {
        frag: frag
      }); // lazy demuxer init, as this could take some time ... do it during frag loading

      if (!this.demuxer) {
        this.demuxer = new demux_demuxer(this.hls, 'main');
      }

      this.state = State.FRAG_LOADING;
    } else if (fragState === FragmentState.APPENDING) {
      // Lower the buffer size and try again
      if (this._reduceMaxBufferLength(frag.duration)) {
        this.fragmentTracker.removeFragment(frag);
      }
    }
  };

  _proto.getBufferedFrag = function getBufferedFrag(position) {
    return this.fragmentTracker.getBufferedFrag(position, PlaylistLevelType.MAIN);
  };

  _proto.followingBufferedFrag = function followingBufferedFrag(frag) {
    if (frag) {
      // try to get range of next fragment (500ms after this range)
      return this.getBufferedFrag(frag.endPTS + 0.5);
    }

    return null;
  };

  _proto._checkFragmentChanged = function _checkFragmentChanged() {
    var fragPlayingCurrent,
        currentTime,
        video = this.media;

    if (video && video.readyState && video.seeking === false) {
      currentTime = video.currentTime;
      /* if video element is in seeked state, currentTime can only increase.
        (assuming that playback rate is positive ...)
        As sometimes currentTime jumps back to zero after a
        media decode error, check this, to avoid seeking back to
        wrong position after a media decode error
      */

      if (currentTime > this.lastCurrentTime) {
        this.lastCurrentTime = currentTime;
      }

      if (BufferHelper.isBuffered(video, currentTime)) {
        fragPlayingCurrent = this.getBufferedFrag(currentTime);
      } else if (BufferHelper.isBuffered(video, currentTime + 0.1)) {
        /* ensure that FRAG_CHANGED event is triggered at startup,
          when first video frame is displayed and playback is paused.
          add a tolerance of 100ms, in case current position is not buffered,
          check if current pos+100ms is buffered and use that buffer range
          for FRAG_CHANGED event reporting */
        fragPlayingCurrent = this.getBufferedFrag(currentTime + 0.1);
      }

      if (fragPlayingCurrent) {
        var fragPlaying = fragPlayingCurrent;

        if (fragPlaying !== this.fragPlaying) {
          this.hls.trigger(events["default"].FRAG_CHANGED, {
            frag: fragPlaying
          });
          var fragPlayingLevel = fragPlaying.level;

          if (!this.fragPlaying || this.fragPlaying.level !== fragPlayingLevel) {
            this.hls.trigger(events["default"].LEVEL_SWITCHED, {
              level: fragPlayingLevel
            });
          }

          this.fragPlaying = fragPlaying;
        }
      }
    }
  }
  /*
    on immediate level switch :
     - pause playback if playing
     - cancel any pending load request
     - and trigger a buffer flush
  */
  ;

  _proto.immediateLevelSwitch = function immediateLevelSwitch() {
    logger["logger"].log('immediateLevelSwitch');

    if (!this.immediateSwitch) {
      this.immediateSwitch = true;
      var media = this.media,
          previouslyPaused;

      if (media) {
        previouslyPaused = media.paused;

        if (!previouslyPaused) {
          media.pause();
        }
      } else {
        // don't restart playback after instant level switch in case media not attached
        previouslyPaused = true;
      }

      this.previouslyPaused = previouslyPaused;
    }

    var fragCurrent = this.fragCurrent;

    if (fragCurrent && fragCurrent.loader) {
      fragCurrent.loader.abort();
    }

    this.fragCurrent = null; // flush everything

    this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
  }
  /**
   * on immediate level switch end, after new fragment has been buffered:
   * - nudge video decoder by slightly adjusting video currentTime (if currentTime buffered)
   * - resume the playback if needed
   */
  ;

  _proto.immediateLevelSwitchEnd = function immediateLevelSwitchEnd() {
    var media = this.media;

    if (media && media.buffered.length) {
      this.immediateSwitch = false;

      if (media.currentTime > 0 && BufferHelper.isBuffered(media, media.currentTime)) {
        // only nudge if currentTime is buffered
        media.currentTime -= 0.0001;
      }

      if (!this.previouslyPaused) {
        media.play();
      }
    }
  }
  /**
   * try to switch ASAP without breaking video playback:
   * in order to ensure smooth but quick level switching,
   * we need to find the next flushable buffer range
   * we should take into account new segment fetch time
   */
  ;

  _proto.nextLevelSwitch = function nextLevelSwitch() {
    var media = this.media; // ensure that media is defined and that metadata are available (to retrieve currentTime)

    if (media && media.readyState) {
      var fetchdelay;
      var fragPlayingCurrent = this.getBufferedFrag(media.currentTime);

      if (fragPlayingCurrent && fragPlayingCurrent.startPTS > 1) {
        // flush buffer preceding current fragment (flush until current fragment start offset)
        // minus 1s to avoid video freezing, that could happen if we flush keyframe of current video ...
        this.flushMainBuffer(0, fragPlayingCurrent.startPTS - 1);
      }

      if (!media.paused) {
        // add a safety delay of 1s
        var nextLevelId = this.hls.nextLoadLevel,
            nextLevel = this.levels[nextLevelId],
            fragLastKbps = this.fragLastKbps;

        if (fragLastKbps && this.fragCurrent) {
          fetchdelay = this.fragCurrent.duration * nextLevel.bitrate / (1000 * fragLastKbps) + 1;
        } else {
          fetchdelay = 0;
        }
      } else {
        fetchdelay = 0;
      } // logger.log('fetchdelay:'+fetchdelay);
      // find buffer range that will be reached once new fragment will be fetched


      var bufferedFrag = this.getBufferedFrag(media.currentTime + fetchdelay);

      if (bufferedFrag) {
        // we can flush buffer range following this one without stalling playback
        var nextBufferedFrag = this.followingBufferedFrag(bufferedFrag);

        if (nextBufferedFrag) {
          // if we are here, we can also cancel any loading/demuxing in progress, as they are useless
          var fragCurrent = this.fragCurrent;

          if (fragCurrent && fragCurrent.loader) {
            fragCurrent.loader.abort();
          }

          this.fragCurrent = null; // start flush position is the start PTS of next buffered frag.
          // we use frag.naxStartPTS which is max(audio startPTS, video startPTS).
          // in case there is a small PTS Delta between audio and video, using maxStartPTS avoids flushing last samples from current fragment

          var startPts = Math.max(bufferedFrag.endPTS, nextBufferedFrag.maxStartPTS + Math.min(this.config.maxFragLookUpTolerance, nextBufferedFrag.duration));
          this.flushMainBuffer(startPts, Number.POSITIVE_INFINITY);
        }
      }
    }
  };

  _proto.flushMainBuffer = function flushMainBuffer(startOffset, endOffset) {
    this.state = State.BUFFER_FLUSHING;
    var flushScope = {
      startOffset: startOffset,
      endOffset: endOffset
    }; // if alternate audio tracks are used, only flush video, otherwise flush everything

    if (this.altAudio) {
      flushScope.type = 'video';
    }

    this.hls.trigger(events["default"].BUFFER_FLUSHING, flushScope);
  };

  _proto.onMediaAttached = function onMediaAttached(data) {
    var media = this.media = this.mediaBuffer = data.media;
    this.onvseeking = this.onMediaSeeking.bind(this);
    this.onvseeked = this.onMediaSeeked.bind(this);
    this.onvended = this.onMediaEnded.bind(this);
    media.addEventListener('seeking', this.onvseeking);
    media.addEventListener('seeked', this.onvseeked);
    media.addEventListener('ended', this.onvended);
    var config = this.config;

    if (this.levels && config.autoStartLoad) {
      this.hls.startLoad(config.startPosition);
    }

    this.gapController = new gap_controller_GapController(config, media, this.fragmentTracker, this.hls);
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    var media = this.media;

    if (media && media.ended) {
      logger["logger"].log('MSE detaching and video ended, reset startPosition');
      this.startPosition = this.lastCurrentTime = 0;
    } // reset fragment backtracked flag


    var levels = this.levels;

    if (levels) {
      levels.forEach(function (level) {
        if (level.details) {
          level.details.fragments.forEach(function (fragment) {
            fragment.backtracked = undefined;
          });
        }
      });
    } // remove video listeners


    if (media) {
      media.removeEventListener('seeking', this.onvseeking);
      media.removeEventListener('seeked', this.onvseeked);
      media.removeEventListener('ended', this.onvended);
      this.onvseeking = this.onvseeked = this.onvended = null;
    }

    this.fragmentTracker.removeAllFragments();
    this.media = this.mediaBuffer = null;
    this.loadedmetadata = false;
    this.stopLoad();
  };

  _proto.onMediaSeeked = function onMediaSeeked() {
    var media = this.media;
    var currentTime = media ? media.currentTime : undefined;

    if (Object(number["isFiniteNumber"])(currentTime)) {
      logger["logger"].log("media seeked to " + currentTime.toFixed(3));
    } // tick to speed up FRAGMENT_PLAYING triggering


    this.tick();
  };

  _proto.onManifestLoading = function onManifestLoading() {
    // reset buffer on manifest loading
    logger["logger"].log('trigger BUFFER_RESET');
    this.hls.trigger(events["default"].BUFFER_RESET);
    this.fragmentTracker.removeAllFragments();
    this.stalled = false;
    this.startPosition = this.lastCurrentTime = 0;
  };

  _proto.onManifestParsed = function onManifestParsed(data) {
    var aac = false,
        heaac = false,
        codec;
    data.levels.forEach(function (level) {
      // detect if we have different kind of audio codecs used amongst playlists
      codec = level.audioCodec;

      if (codec) {
        if (codec.indexOf('mp4a.40.2') !== -1) {
          aac = true;
        }

        if (codec.indexOf('mp4a.40.5') !== -1) {
          heaac = true;
        }
      }
    });
    this.audioCodecSwitch = aac && heaac;

    if (this.audioCodecSwitch) {
      logger["logger"].log('both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC');
    }

    this.altAudio = data.altAudio;
    this.levels = data.levels;
    this.startFragRequested = false;
    var config = this.config;

    if (config.autoStartLoad || this.forceStartLoad) {
      this.hls.startLoad(config.startPosition);
    }
  };

  _proto.onLevelLoaded = function onLevelLoaded(data) {
    var newDetails = data.details;
    var newLevelId = data.level;
    var lastLevel = this.levels[this.levelLastLoaded];
    var curLevel = this.levels[newLevelId];
    var duration = newDetails.totalduration;
    var sliding = 0;
    logger["logger"].log("level " + newLevelId + " loaded [" + newDetails.startSN + "," + newDetails.endSN + "],duration:" + duration);

    if (newDetails.live || curLevel.details && curLevel.details.live) {
      var curDetails = curLevel.details;

      if (curDetails && newDetails.fragments.length > 0) {
        // we already have details for that level, merge them
        mergeDetails(curDetails, newDetails);
        sliding = newDetails.fragments[0].start;
        this.liveSyncPosition = this.computeLivePosition(sliding, curDetails);

        if (newDetails.PTSKnown && Object(number["isFiniteNumber"])(sliding)) {
          logger["logger"].log("live playlist sliding:" + sliding.toFixed(3));
        } else {
          logger["logger"].log('live playlist - outdated PTS, unknown sliding');
          alignStream(this.fragPrevious, lastLevel, newDetails);
        }
      } else {
        logger["logger"].log('live playlist - first load, unknown sliding');
        newDetails.PTSKnown = false;
        alignStream(this.fragPrevious, lastLevel, newDetails);
      }
    } else {
      newDetails.PTSKnown = false;
    } // override level info


    curLevel.details = newDetails;
    this.levelLastLoaded = newLevelId;
    this.hls.trigger(events["default"].LEVEL_UPDATED, {
      details: newDetails,
      level: newLevelId
    });

    if (this.startFragRequested === false) {
      // compute start position if set to -1. use it straight away if value is defined
      if (this.startPosition === -1 || this.lastCurrentTime === -1) {
        // first, check if start time offset has been set in playlist, if yes, use this value
        var startTimeOffset = newDetails.startTimeOffset;

        if (Object(number["isFiniteNumber"])(startTimeOffset)) {
          if (startTimeOffset < 0) {
            logger["logger"].log("negative start time offset " + startTimeOffset + ", count from end of last fragment");
            startTimeOffset = sliding + duration + startTimeOffset;
          }

          logger["logger"].log("start time offset found in playlist, adjust startPosition to " + startTimeOffset);
          this.startPosition = startTimeOffset;
        } else {
          // if live playlist, set start position to be fragment N-this.config.liveSyncDurationCount (usually 3)
          if (newDetails.live) {
            this.startPosition = this.computeLivePosition(sliding, newDetails);
            logger["logger"].log("configure startPosition to " + this.startPosition);
          } else {
            this.startPosition = 0;
          }
        }

        this.lastCurrentTime = this.startPosition;
      }

      this.nextLoadPosition = this.startPosition;
    } // only switch batck to IDLE state if we were waiting for level to start downloading a new fragment


    if (this.state === State.WAITING_LEVEL) {
      this.state = State.IDLE;
    } // trigger handler right now


    this.tick();
  };

  _proto.onKeyLoaded = function onKeyLoaded() {
    if (this.state === State.KEY_LOADING) {
      this.state = State.IDLE;
      this.tick();
    }
  };

  _proto.onFragLoaded = function onFragLoaded(data) {
    var fragCurrent = this.fragCurrent,
        hls = this.hls,
        levels = this.levels,
        media = this.media;
    var fragLoaded = data.frag;

    if (this.state === State.FRAG_LOADING && fragCurrent && fragLoaded.type === 'main' && fragLoaded.level === fragCurrent.level && fragLoaded.sn === fragCurrent.sn) {
      var stats = data.stats;
      var currentLevel = levels[fragCurrent.level];
      var details = currentLevel.details; // reset frag bitrate test in any case after frag loaded event
      // if this frag was loaded to perform a bitrate test AND if hls.nextLoadLevel is greater than 0
      // then this means that we should be able to load a fragment at a higher quality level

      this.bitrateTest = false;
      this.stats = stats;
      logger["logger"].log("Loaded " + fragCurrent.sn + " of [" + details.startSN + " ," + details.endSN + "],level " + fragCurrent.level);

      if (fragLoaded.bitrateTest && hls.nextLoadLevel) {
        // switch back to IDLE state ... we just loaded a fragment to determine adequate start bitrate and initialize autoswitch algo
        this.state = State.IDLE;
        this.startFragRequested = false;
        stats.tparsed = stats.tbuffered = window.performance.now();
        hls.trigger(events["default"].FRAG_BUFFERED, {
          stats: stats,
          frag: fragCurrent,
          id: 'main'
        });
        this.tick();
      } else if (fragLoaded.sn === 'initSegment') {
        this.state = State.IDLE;
        stats.tparsed = stats.tbuffered = window.performance.now();
        details.initSegment.data = data.payload;
        hls.trigger(events["default"].FRAG_BUFFERED, {
          stats: stats,
          frag: fragCurrent,
          id: 'main'
        });
        this.tick();
      } else {
        logger["logger"].log("Parsing " + fragCurrent.sn + " of [" + details.startSN + " ," + details.endSN + "],level " + fragCurrent.level + ", cc " + fragCurrent.cc);
        this.state = State.PARSING;
        this.pendingBuffering = true;
        this.appended = false; // Bitrate test frags are not usually buffered so the fragment tracker ignores them. If Hls.js decides to buffer
        // it (and therefore ends up at this line), then the fragment tracker needs to be manually informed.

        if (fragLoaded.bitrateTest) {
          fragLoaded.bitrateTest = false;
          this.fragmentTracker.onFragLoaded({
            frag: fragLoaded
          });
        } // time Offset is accurate if level PTS is known, or if playlist is not sliding (not live) and if media is not seeking (this is to overcome potential timestamp drifts between playlists and fragments)


        var accurateTimeOffset = !(media && media.seeking) && (details.PTSKnown || !details.live);
        var initSegmentData = details.initSegment ? details.initSegment.data : [];

        var audioCodec = this._getAudioCodec(currentLevel); // transmux the MPEG-TS data to ISO-BMFF segments


        var demuxer = this.demuxer = this.demuxer || new demux_demuxer(this.hls, 'main');
        demuxer.push(data.payload, initSegmentData, audioCodec, currentLevel.videoCodec, fragCurrent, details.totalduration, accurateTimeOffset);
      }
    }

    this.fragLoadError = 0;
  };

  _proto.onFragParsingInitSegment = function onFragParsingInitSegment(data) {
    var fragCurrent = this.fragCurrent;
    var fragNew = data.frag;

    if (fragCurrent && data.id === 'main' && fragNew.sn === fragCurrent.sn && fragNew.level === fragCurrent.level && this.state === State.PARSING) {
      var tracks = data.tracks,
          trackName,
          track;
      this.audioOnly = tracks.audio && !tracks.video; // if audio track is expected to come from audio stream controller, discard any coming from main

      if (this.altAudio && !this.audioOnly) {
        delete tracks.audio;
      } // include levelCodec in audio and video tracks


      track = tracks.audio;

      if (track) {
        var audioCodec = this.levels[this.level].audioCodec,
            ua = navigator.userAgent.toLowerCase();

        if (audioCodec && this.audioCodecSwap) {
          logger["logger"].log('swapping playlist audio codec');

          if (audioCodec.indexOf('mp4a.40.5') !== -1) {
            audioCodec = 'mp4a.40.2';
          } else {
            audioCodec = 'mp4a.40.5';
          }
        } // in case AAC and HE-AAC audio codecs are signalled in manifest
        // force HE-AAC , as it seems that most browsers prefers that way,
        // except for mono streams OR on FF
        // these conditions might need to be reviewed ...


        if (this.audioCodecSwitch) {
          // don't force HE-AAC if mono stream
          if (track.metadata.channelCount !== 1 && // don't force HE-AAC if firefox
          ua.indexOf('firefox') === -1) {
            audioCodec = 'mp4a.40.5';
          }
        } // HE-AAC is broken on Android, always signal audio codec as AAC even if variant manifest states otherwise


        if (ua.indexOf('android') !== -1 && track.container !== 'audio/mpeg') {
          // Exclude mpeg audio
          audioCodec = 'mp4a.40.2';
          logger["logger"].log("Android: force audio codec to " + audioCodec);
        }

        track.levelCodec = audioCodec;
        track.id = data.id;
      }

      track = tracks.video;

      if (track) {
        track.levelCodec = this.levels[this.level].videoCodec;
        track.id = data.id;
      }

      this.hls.trigger(events["default"].BUFFER_CODECS, tracks); // loop through tracks that are going to be provided to bufferController

      for (trackName in tracks) {
        track = tracks[trackName];
        logger["logger"].log("main track:" + trackName + ",container:" + track.container + ",codecs[level/parsed]=[" + track.levelCodec + "/" + track.codec + "]");
        var initSegment = track.initSegment;

        if (initSegment) {
          this.appended = true; // arm pending Buffering flag before appending a segment

          this.pendingBuffering = true;
          this.hls.trigger(events["default"].BUFFER_APPENDING, {
            type: trackName,
            data: initSegment,
            parent: 'main',
            content: 'initSegment'
          });
        }
      } // trigger handler right now


      this.tick();
    }
  };

  _proto.onFragParsingData = function onFragParsingData(data) {
    var _this2 = this;

    var fragCurrent = this.fragCurrent;
    var fragNew = data.frag;

    if (fragCurrent && data.id === 'main' && fragNew.sn === fragCurrent.sn && fragNew.level === fragCurrent.level && !(data.type === 'audio' && this.altAudio) && // filter out main audio if audio track is loaded through audio stream controller
    this.state === State.PARSING) {
      var level = this.levels[this.level],
          frag = fragCurrent;

      if (!Object(number["isFiniteNumber"])(data.endPTS)) {
        data.endPTS = data.startPTS + fragCurrent.duration;
        data.endDTS = data.startDTS + fragCurrent.duration;
      }

      if (data.hasAudio === true) {
        frag.addElementaryStream(ElementaryStreamTypes.AUDIO);
      }

      if (data.hasVideo === true) {
        frag.addElementaryStream(ElementaryStreamTypes.VIDEO);
      }

      logger["logger"].log("Parsed " + data.type + ",PTS:[" + data.startPTS.toFixed(3) + "," + data.endPTS.toFixed(3) + "],DTS:[" + data.startDTS.toFixed(3) + "/" + data.endDTS.toFixed(3) + "],nb:" + data.nb + ",dropped:" + (data.dropped || 0)); // Detect gaps in a fragment  and try to fix it by finding a keyframe in the previous fragment (see _findFragments)

      if (data.type === 'video') {
        frag.dropped = data.dropped;

        if (frag.dropped) {
          if (!frag.backtracked) {
            var levelDetails = level.details;

            if (levelDetails && frag.sn === levelDetails.startSN) {
              logger["logger"].warn('missing video frame(s) on first frag, appending with gap', frag.sn);
            } else {
              logger["logger"].warn('missing video frame(s), backtracking fragment', frag.sn); // Return back to the IDLE state without appending to buffer
              // Causes findFragments to backtrack a segment and find the keyframe
              // Audio fragments arriving before video sets the nextLoadPosition, causing _findFragments to skip the backtracked fragment

              this.fragmentTracker.removeFragment(frag);
              frag.backtracked = true;
              this.nextLoadPosition = data.startPTS;
              this.state = State.IDLE;
              this.fragPrevious = frag;

              if (this.demuxer) {
                this.demuxer.destroy();
                this.demuxer = null;
              }

              this.tick();
              return;
            }
          } else {
            logger["logger"].warn('Already backtracked on this fragment, appending with the gap', frag.sn);
          }
        } else {
          // Only reset the backtracked flag if we've loaded the frag without any dropped frames
          frag.backtracked = false;
        }
      }

      var drift = updateFragPTSDTS(level.details, frag, data.startPTS, data.endPTS, data.startDTS, data.endDTS),
          hls = this.hls;
      hls.trigger(events["default"].LEVEL_PTS_UPDATED, {
        details: level.details,
        level: this.level,
        drift: drift,
        type: data.type,
        start: data.startPTS,
        end: data.endPTS
      }); // has remuxer dropped video frames located before first keyframe ?

      [data.data1, data.data2].forEach(function (buffer) {
        // only append in PARSING state (rationale is that an appending error could happen synchronously on first segment appending)
        // in that case it is useless to append following segments
        if (buffer && buffer.length && _this2.state === State.PARSING) {
          _this2.appended = true; // arm pending Buffering flag before appending a segment

          _this2.pendingBuffering = true;
          hls.trigger(events["default"].BUFFER_APPENDING, {
            type: data.type,
            data: buffer,
            parent: 'main',
            content: 'data'
          });
        }
      }); // trigger handler right now

      this.tick();
    }
  };

  _proto.onFragParsed = function onFragParsed(data) {
    var fragCurrent = this.fragCurrent;
    var fragNew = data.frag;

    if (fragCurrent && data.id === 'main' && fragNew.sn === fragCurrent.sn && fragNew.level === fragCurrent.level && this.state === State.PARSING) {
      this.stats.tparsed = window.performance.now();
      this.state = State.PARSED;

      this._checkAppendedParsed();
    }
  };

  _proto.onAudioTrackSwitching = function onAudioTrackSwitching(data) {
    // if any URL found on new audio track, it is an alternate audio track
    var fromAltAudio = this.altAudio;
    var altAudio = !!data.url;
    var trackId = data.id; // if we switch on main audio, ensure that main fragment scheduling is synced with media.buffered
    // don't do anything if we switch to alt audio: audio stream controller is handling it.
    // we will just have to change buffer scheduling on audioTrackSwitched

    if (!altAudio) {
      if (this.mediaBuffer !== this.media) {
        logger["logger"].log('switching on main audio, use media.buffered to schedule main fragment loading');
        this.mediaBuffer = this.media;
        var fragCurrent = this.fragCurrent; // we need to refill audio buffer from main: cancel any frag loading to speed up audio switch

        if (fragCurrent.loader) {
          logger["logger"].log('switching to main audio track, cancel main fragment load');
          fragCurrent.loader.abort();
        }

        this.fragCurrent = null;
        this.fragPrevious = null; // destroy demuxer to force init segment generation (following audio switch)

        if (this.demuxer) {
          this.demuxer.destroy();
          this.demuxer = null;
        } // switch to IDLE state to load new fragment


        this.state = State.IDLE;
      }

      var hls = this.hls; // If switching from alt to main audio, flush all audio and trigger track switched

      if (fromAltAudio) {
        hls.trigger(events["default"].BUFFER_FLUSHING, {
          startOffset: 0,
          endOffset: Number.POSITIVE_INFINITY,
          type: 'audio'
        });
      }

      hls.trigger(events["default"].AUDIO_TRACK_SWITCHED, {
        id: trackId
      });
    }
  };

  _proto.onAudioTrackSwitched = function onAudioTrackSwitched(data) {
    var trackId = data.id,
        altAudio = !!this.hls.audioTracks[trackId].url;

    if (altAudio) {
      var videoBuffer = this.videoBuffer; // if we switched on alternate audio, ensure that main fragment scheduling is synced with video sourcebuffer buffered

      if (videoBuffer && this.mediaBuffer !== videoBuffer) {
        logger["logger"].log('switching on alternate audio, use video.buffered to schedule main fragment loading');
        this.mediaBuffer = videoBuffer;
      }
    }

    this.altAudio = altAudio;
    this.tick();
  };

  _proto.onBufferCreated = function onBufferCreated(data) {
    var tracks = data.tracks,
        mediaTrack,
        name,
        alternate = false;

    for (var type in tracks) {
      var track = tracks[type];

      if (track.id === 'main') {
        name = type;
        mediaTrack = track; // keep video source buffer reference

        if (type === 'video') {
          this.videoBuffer = tracks[type].buffer;
        }
      } else {
        alternate = true;
      }
    }

    if (alternate && mediaTrack) {
      logger["logger"].log("alternate track found, use " + name + ".buffered to schedule main fragment loading");
      this.mediaBuffer = mediaTrack.buffer;
    } else {
      this.mediaBuffer = this.media;
    }
  };

  _proto.onBufferAppended = function onBufferAppended(data) {
    if (data.parent === 'main') {
      var state = this.state;

      if (state === State.PARSING || state === State.PARSED) {
        // check if all buffers have been appended
        this.pendingBuffering = data.pending > 0;

        this._checkAppendedParsed();
      }
    }
  };

  _proto._checkAppendedParsed = function _checkAppendedParsed() {
    // trigger handler right now
    if (this.state === State.PARSED && (!this.appended || !this.pendingBuffering)) {
      var frag = this.fragCurrent;

      if (frag) {
        var media = this.mediaBuffer ? this.mediaBuffer : this.media;
        logger["logger"].log("main buffered : " + time_ranges.toString(media.buffered));
        this.fragPrevious = frag;
        var stats = this.stats;
        stats.tbuffered = window.performance.now(); // we should get rid of this.fragLastKbps

        this.fragLastKbps = Math.round(8 * stats.total / (stats.tbuffered - stats.tfirst));
        this.hls.trigger(events["default"].FRAG_BUFFERED, {
          stats: stats,
          frag: frag,
          id: 'main'
        });
        this.state = State.IDLE;
      } // Do not tick when _seekToStartPos needs to be called as seeking to the start can fail on live streams at this point


      if (this.loadedmetadata || this.startPosition <= 0) {
        this.tick();
      }
    }
  };

  _proto.onError = function onError(data) {
    var frag = data.frag || this.fragCurrent; // don't handle frag error not related to main fragment

    if (frag && frag.type !== 'main') {
      return;
    } // 0.5 : tolerance needed as some browsers stalls playback before reaching buffered end


    var mediaBuffered = !!this.media && BufferHelper.isBuffered(this.media, this.media.currentTime) && BufferHelper.isBuffered(this.media, this.media.currentTime + 0.5);

    switch (data.details) {
      case errors["ErrorDetails"].FRAG_LOAD_ERROR:
      case errors["ErrorDetails"].FRAG_LOAD_TIMEOUT:
      case errors["ErrorDetails"].KEY_LOAD_ERROR:
      case errors["ErrorDetails"].KEY_LOAD_TIMEOUT:
        if (!data.fatal) {
          // keep retrying until the limit will be reached
          if (this.fragLoadError + 1 <= this.config.fragLoadingMaxRetry) {
            // exponential backoff capped to config.fragLoadingMaxRetryTimeout
            var delay = Math.min(Math.pow(2, this.fragLoadError) * this.config.fragLoadingRetryDelay, this.config.fragLoadingMaxRetryTimeout);
            logger["logger"].warn("mediaController: frag loading failed, retry in " + delay + " ms");
            this.retryDate = window.performance.now() + delay; // retry loading state
            // if loadedmetadata is not set, it means that we are emergency switch down on first frag
            // in that case, reset startFragRequested flag

            if (!this.loadedmetadata) {
              this.startFragRequested = false;
              this.nextLoadPosition = this.startPosition;
            }

            this.fragLoadError++;
            this.state = State.FRAG_LOADING_WAITING_RETRY;
          } else {
            logger["logger"].error("mediaController: " + data.details + " reaches max retry, redispatch as fatal ..."); // switch error to fatal

            data.fatal = true;
            this.state = State.ERROR;
          }
        }

        break;

      case errors["ErrorDetails"].LEVEL_LOAD_ERROR:
      case errors["ErrorDetails"].LEVEL_LOAD_TIMEOUT:
        if (this.state !== State.ERROR) {
          if (data.fatal) {
            // if fatal error, stop processing
            this.state = State.ERROR;
            logger["logger"].warn("streamController: " + data.details + ",switch to " + this.state + " state ...");
          } else {
            // in case of non fatal error while loading level, if level controller is not retrying to load level , switch back to IDLE
            if (!data.levelRetry && this.state === State.WAITING_LEVEL) {
              this.state = State.IDLE;
            }
          }
        }

        break;

      case errors["ErrorDetails"].BUFFER_FULL_ERROR:
        // if in appending state
        if (data.parent === 'main' && (this.state === State.PARSING || this.state === State.PARSED)) {
          // reduce max buf len if current position is buffered
          if (mediaBuffered) {
            this._reduceMaxBufferLength(this.config.maxBufferLength);

            this.state = State.IDLE;
          } else {
            // current position is not buffered, but browser is still complaining about buffer full error
            // this happens on IE/Edge, refer to https://github.com/video-dev/hls.js/pull/708
            // in that case flush the whole buffer to recover
            logger["logger"].warn('buffer full error also media.currentTime is not buffered, flush everything');
            this.fragCurrent = null; // flush everything

            this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
          }
        }

        break;

      default:
        break;
    }
  };

  _proto._reduceMaxBufferLength = function _reduceMaxBufferLength(minLength) {
    var config = this.config;

    if (config.maxMaxBufferLength >= minLength) {
      // reduce max buffer length as it might be too high. we do this to avoid loop flushing ...
      config.maxMaxBufferLength /= 2;
      logger["logger"].warn("main:reduce max buffer length to " + config.maxMaxBufferLength + "s");
      return true;
    }

    return false;
  }
  /**
   * Checks the health of the buffer and attempts to resolve playback stalls.
   * @private
   */
  ;

  _proto._checkBuffer = function _checkBuffer() {
    var media = this.media;

    if (!media || media.readyState === 0) {
      // Exit early if we don't have media or if the media hasn't bufferd anything yet (readyState 0)
      return;
    }

    var mediaBuffer = this.mediaBuffer ? this.mediaBuffer : media;
    var buffered = mediaBuffer.buffered;

    if (!this.loadedmetadata && buffered.length) {
      this.loadedmetadata = true;

      this._seekToStartPos();
    } else if (this.immediateSwitch) {
      this.immediateLevelSwitchEnd();
    } else {
      this.gapController.poll(this.lastCurrentTime, buffered);
    }
  };

  _proto.onFragLoadEmergencyAborted = function onFragLoadEmergencyAborted() {
    this.state = State.IDLE; // if loadedmetadata is not set, it means that we are emergency switch down on first frag
    // in that case, reset startFragRequested flag

    if (!this.loadedmetadata) {
      this.startFragRequested = false;
      this.nextLoadPosition = this.startPosition;
    }

    this.tick();
  };

  _proto.onBufferFlushed = function onBufferFlushed() {
    /* after successful buffer flushing, filter flushed fragments from bufferedFrags
      use mediaBuffered instead of media (so that we will check against video.buffered ranges in case of alt audio track)
    */
    var media = this.mediaBuffer ? this.mediaBuffer : this.media;

    if (media) {
      // filter fragments potentially evicted from buffer. this is to avoid memleak on live streams
      var elementaryStreamType = this.audioOnly ? ElementaryStreamTypes.AUDIO : ElementaryStreamTypes.VIDEO;
      this.fragmentTracker.detectEvictedFragments(elementaryStreamType, media.buffered);
    } // move to IDLE once flush complete. this should trigger new fragment loading


    this.state = State.IDLE; // reset reference to frag

    this.fragPrevious = null;
  };

  _proto.onLevelsUpdated = function onLevelsUpdated(data) {
    this.levels = data.levels;
  };

  _proto.swapAudioCodec = function swapAudioCodec() {
    this.audioCodecSwap = !this.audioCodecSwap;
  }
  /**
   * Seeks to the set startPosition if not equal to the mediaElement's current time.
   * @private
   */
  ;

  _proto._seekToStartPos = function _seekToStartPos() {
    var media = this.media;
    var currentTime = media.currentTime;
    var startPosition = this.startPosition; // only adjust currentTime if different from startPosition or if startPosition not buffered
    // at that stage, there should be only one buffered range, as we reach that code after first fragment has been buffered

    if (currentTime !== startPosition && startPosition >= 0) {
      if (media.seeking) {
        logger["logger"].log("could not seek to " + startPosition + ", already seeking at " + currentTime);
        return;
      }

      var bufferStart = media.buffered.length ? media.buffered.start(0) : 0;
      var delta = bufferStart - startPosition;

      if (delta > 0 && delta < this.config.maxBufferHole) {
        logger["logger"].log("adjusting start position by " + delta + " to match buffer start");
        startPosition += delta;
        this.startPosition = startPosition;
      }

      logger["logger"].log("seek to target start position " + startPosition + " from current time " + currentTime + ". ready state " + media.readyState);
      media.currentTime = startPosition;
    }
  };

  _proto._getAudioCodec = function _getAudioCodec(currentLevel) {
    var audioCodec = this.config.defaultAudioCodec || currentLevel.audioCodec;

    if (this.audioCodecSwap) {
      logger["logger"].log('swapping playlist audio codec');

      if (audioCodec) {
        if (audioCodec.indexOf('mp4a.40.5') !== -1) {
          audioCodec = 'mp4a.40.2';
        } else {
          audioCodec = 'mp4a.40.5';
        }
      }
    }

    return audioCodec;
  };

  stream_controller_createClass(StreamController, [{
    key: "state",
    set: function set(nextState) {
      if (this.state !== nextState) {
        var previousState = this.state;
        this._state = nextState;
        logger["logger"].log("main stream-controller: " + previousState + "->" + nextState);
        this.hls.trigger(events["default"].STREAM_STATE_TRANSITION, {
          previousState: previousState,
          nextState: nextState
        });
      }
    },
    get: function get() {
      return this._state;
    }
  }, {
    key: "currentLevel",
    get: function get() {
      var media = this.media;

      if (media) {
        var frag = this.getBufferedFrag(media.currentTime);

        if (frag) {
          return frag.level;
        }
      }

      return -1;
    }
  }, {
    key: "nextBufferedFrag",
    get: function get() {
      var media = this.media;

      if (media) {
        // first get end range of current fragment
        return this.followingBufferedFrag(this.getBufferedFrag(media.currentTime));
      } else {
        return null;
      }
    }
  }, {
    key: "nextLevel",
    get: function get() {
      var frag = this.nextBufferedFrag;

      if (frag) {
        return frag.level;
      } else {
        return -1;
      }
    }
  }, {
    key: "liveSyncPosition",
    get: function get() {
      return this._liveSyncPosition;
    },
    set: function set(value) {
      this._liveSyncPosition = value;
    }
  }]);

  return StreamController;
}(base_stream_controller_BaseStreamController);

/* harmony default export */ var stream_controller = (stream_controller_StreamController);
// CONCATENATED MODULE: ./src/controller/level-controller.js
function level_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function level_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) level_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) level_controller_defineProperties(Constructor, staticProps); return Constructor; }

function level_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Level Controller
*/






var chromeOrFirefox;

var level_controller_LevelController = /*#__PURE__*/function (_EventHandler) {
  level_controller_inheritsLoose(LevelController, _EventHandler);

  function LevelController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].MANIFEST_LOADED, events["default"].LEVEL_LOADED, events["default"].AUDIO_TRACK_SWITCHED, events["default"].FRAG_LOADED, events["default"].ERROR) || this;
    _this.canload = false;
    _this.currentLevelIndex = null;
    _this.manualLevelIndex = -1;
    _this.timer = null;
    chromeOrFirefox = /chrome|firefox/.test(navigator.userAgent.toLowerCase());
    return _this;
  }

  var _proto = LevelController.prototype;

  _proto.onHandlerDestroying = function onHandlerDestroying() {
    this.clearTimer();
    this.manualLevelIndex = -1;
  };

  _proto.clearTimer = function clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  _proto.startLoad = function startLoad() {
    var levels = this._levels;
    this.canload = true;
    this.levelRetryCount = 0; // clean up live level details to force reload them, and reset load errors

    if (levels) {
      levels.forEach(function (level) {
        level.loadError = 0;
        var levelDetails = level.details;

        if (levelDetails && levelDetails.live) {
          level.details = undefined;
        }
      });
    } // speed up live playlist refresh if timer exists


    if (this.timer !== null) {
      this.loadLevel();
    }
  };

  _proto.stopLoad = function stopLoad() {
    this.canload = false;
  };

  _proto.onManifestLoaded = function onManifestLoaded(data) {
    var levels = [];
    var audioTracks = [];
    var bitrateStart;
    var levelSet = {};
    var levelFromSet = null;
    var videoCodecFound = false;
    var audioCodecFound = false; // regroup redundant levels together

    data.levels.forEach(function (level) {
      var attributes = level.attrs;
      level.loadError = 0;
      level.fragmentError = false;
      videoCodecFound = videoCodecFound || !!level.videoCodec;
      audioCodecFound = audioCodecFound || !!level.audioCodec; // erase audio codec info if browser does not support mp4a.40.34.
      // demuxer will autodetect codec and fallback to mpeg/audio

      if (chromeOrFirefox && level.audioCodec && level.audioCodec.indexOf('mp4a.40.34') !== -1) {
        level.audioCodec = undefined;
      }

      levelFromSet = levelSet[level.bitrate]; // FIXME: we would also have to match the resolution here

      if (!levelFromSet) {
        level.url = [level.url];
        level.urlId = 0;
        levelSet[level.bitrate] = level;
        levels.push(level);
      } else {
        levelFromSet.url.push(level.url);
      }

      if (attributes) {
        if (attributes.AUDIO) {
          addGroupId(levelFromSet || level, 'audio', attributes.AUDIO);
        }

        if (attributes.SUBTITLES) {
          addGroupId(levelFromSet || level, 'text', attributes.SUBTITLES);
        }
      }
    }); // remove audio-only level if we also have levels with audio+video codecs signalled

    if (videoCodecFound && audioCodecFound) {
      levels = levels.filter(function (_ref) {
        var videoCodec = _ref.videoCodec;
        return !!videoCodec;
      });
    } // only keep levels with supported audio/video codecs


    levels = levels.filter(function (_ref2) {
      var audioCodec = _ref2.audioCodec,
          videoCodec = _ref2.videoCodec;
      return (!audioCodec || isCodecSupportedInMp4(audioCodec, 'audio')) && (!videoCodec || isCodecSupportedInMp4(videoCodec, 'video'));
    });

    if (data.audioTracks) {
      audioTracks = data.audioTracks.filter(function (track) {
        return !track.audioCodec || isCodecSupportedInMp4(track.audioCodec, 'audio');
      }); // Reassign id's after filtering since they're used as array indices

      audioTracks.forEach(function (track, index) {
        track.id = index;
      });
    }

    if (levels.length > 0) {
      // start bitrate is the first bitrate of the manifest
      bitrateStart = levels[0].bitrate; // sort level on bitrate

      levels.sort(function (a, b) {
        return a.bitrate - b.bitrate;
      });
      this._levels = levels; // find index of first level in sorted levels

      for (var i = 0; i < levels.length; i++) {
        if (levels[i].bitrate === bitrateStart) {
          this._firstLevel = i;
          logger["logger"].log("manifest loaded," + levels.length + " level(s) found, first bitrate:" + bitrateStart);
          break;
        }
      } // Audio is only alternate if manifest include a URI along with the audio group tag,
      // and this is not an audio-only stream where levels contain audio-only


      var audioOnly = audioCodecFound && !videoCodecFound;
      this.hls.trigger(events["default"].MANIFEST_PARSED, {
        levels: levels,
        audioTracks: audioTracks,
        firstLevel: this._firstLevel,
        stats: data.stats,
        audio: audioCodecFound,
        video: videoCodecFound,
        altAudio: !audioOnly && audioTracks.some(function (t) {
          return !!t.url;
        })
      });
    } else {
      this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].MANIFEST_INCOMPATIBLE_CODECS_ERROR,
        fatal: true,
        url: this.hls.url,
        reason: 'no level with compatible codecs found in manifest'
      });
    }
  };

  _proto.setLevelInternal = function setLevelInternal(newLevel) {
    var levels = this._levels;
    var hls = this.hls; // check if level idx is valid

    if (newLevel >= 0 && newLevel < levels.length) {
      // stopping live reloading timer if any
      this.clearTimer();

      if (this.currentLevelIndex !== newLevel) {
        logger["logger"].log("switching to level " + newLevel);
        this.currentLevelIndex = newLevel;
        var levelProperties = levels[newLevel];
        levelProperties.level = newLevel;
        hls.trigger(events["default"].LEVEL_SWITCHING, levelProperties);
      }

      var level = levels[newLevel];
      var levelDetails = level.details; // check if we need to load playlist for this level

      if (!levelDetails || levelDetails.live) {
        // level not retrieved yet, or live playlist we need to (re)load it
        var urlId = level.urlId;
        hls.trigger(events["default"].LEVEL_LOADING, {
          url: level.url[urlId],
          level: newLevel,
          id: urlId
        });
      }
    } else {
      // invalid level id given, trigger error
      hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].OTHER_ERROR,
        details: errors["ErrorDetails"].LEVEL_SWITCH_ERROR,
        level: newLevel,
        fatal: false,
        reason: 'invalid level idx'
      });
    }
  };

  _proto.onError = function onError(data) {
    if (data.fatal) {
      if (data.type === errors["ErrorTypes"].NETWORK_ERROR) {
        this.clearTimer();
      }

      return;
    }

    var levelError = false,
        fragmentError = false;
    var levelIndex; // try to recover not fatal errors

    switch (data.details) {
      case errors["ErrorDetails"].FRAG_LOAD_ERROR:
      case errors["ErrorDetails"].FRAG_LOAD_TIMEOUT:
      case errors["ErrorDetails"].KEY_LOAD_ERROR:
      case errors["ErrorDetails"].KEY_LOAD_TIMEOUT:
        levelIndex = data.frag.level;
        fragmentError = true;
        break;

      case errors["ErrorDetails"].LEVEL_LOAD_ERROR:
      case errors["ErrorDetails"].LEVEL_LOAD_TIMEOUT:
        levelIndex = data.context.level;
        levelError = true;
        break;

      case errors["ErrorDetails"].REMUX_ALLOC_ERROR:
        levelIndex = data.level;
        levelError = true;
        break;
    }

    if (levelIndex !== undefined) {
      this.recoverLevel(data, levelIndex, levelError, fragmentError);
    }
  }
  /**
   * Switch to a redundant stream if any available.
   * If redundant stream is not available, emergency switch down if ABR mode is enabled.
   *
   * @param {Object} errorEvent
   * @param {Number} levelIndex current level index
   * @param {Boolean} levelError
   * @param {Boolean} fragmentError
   */
  // FIXME Find a better abstraction where fragment/level retry management is well decoupled
  ;

  _proto.recoverLevel = function recoverLevel(errorEvent, levelIndex, levelError, fragmentError) {
    var _this2 = this;

    var config = this.hls.config;
    var errorDetails = errorEvent.details;
    var level = this._levels[levelIndex];
    var redundantLevels, delay, nextLevel;
    level.loadError++;
    level.fragmentError = fragmentError;

    if (levelError) {
      if (this.levelRetryCount + 1 <= config.levelLoadingMaxRetry) {
        // exponential backoff capped to max retry timeout
        delay = Math.min(Math.pow(2, this.levelRetryCount) * config.levelLoadingRetryDelay, config.levelLoadingMaxRetryTimeout); // Schedule level reload

        this.timer = setTimeout(function () {
          return _this2.loadLevel();
        }, delay); // boolean used to inform stream controller not to switch back to IDLE on non fatal error

        errorEvent.levelRetry = true;
        this.levelRetryCount++;
        logger["logger"].warn("level controller, " + errorDetails + ", retry in " + delay + " ms, current retry count is " + this.levelRetryCount);
      } else {
        logger["logger"].error("level controller, cannot recover from " + errorDetails + " error");
        this.currentLevelIndex = null; // stopping live reloading timer if any

        this.clearTimer(); // switch error to fatal

        errorEvent.fatal = true;
        return;
      }
    } // Try any redundant streams if available for both errors: level and fragment
    // If level.loadError reaches redundantLevels it means that we tried them all, no hope  => let's switch down


    if (levelError || fragmentError) {
      redundantLevels = level.url.length;

      if (redundantLevels > 1 && level.loadError < redundantLevels) {
        level.urlId = (level.urlId + 1) % redundantLevels;
        level.details = undefined;
        logger["logger"].warn("level controller, " + errorDetails + " for level " + levelIndex + ": switching to redundant URL-id " + level.urlId); // console.log('Current audio track group ID:', this.hls.audioTracks[this.hls.audioTrack].groupId);
        // console.log('New video quality level audio group id:', level.attrs.AUDIO);
      } else {
        // Search for available level
        if (this.manualLevelIndex === -1) {
          // When lowest level has been reached, let's start hunt from the top
          nextLevel = levelIndex === 0 ? this._levels.length - 1 : levelIndex - 1;
          logger["logger"].warn("level controller, " + errorDetails + ": switch to " + nextLevel);
          this.hls.nextAutoLevel = this.currentLevelIndex = nextLevel;
        } else if (fragmentError) {
          // Allow fragment retry as long as configuration allows.
          // reset this._level so that another call to set level() will trigger again a frag load
          logger["logger"].warn("level controller, " + errorDetails + ": reload a fragment");
          this.currentLevelIndex = null;
        }
      }
    }
  } // reset errors on the successful load of a fragment
  ;

  _proto.onFragLoaded = function onFragLoaded(_ref3) {
    var frag = _ref3.frag;

    if (frag !== undefined && frag.type === 'main') {
      var level = this._levels[frag.level];

      if (level !== undefined) {
        level.fragmentError = false;
        level.loadError = 0;
        this.levelRetryCount = 0;
      }
    }
  };

  _proto.onLevelLoaded = function onLevelLoaded(data) {
    var _this3 = this;

    var level = data.level,
        details = data.details; // only process level loaded events matching with expected level

    if (level !== this.currentLevelIndex) {
      return;
    }

    var curLevel = this._levels[level]; // reset level load error counter on successful level loaded only if there is no issues with fragments

    if (!curLevel.fragmentError) {
      curLevel.loadError = 0;
      this.levelRetryCount = 0;
    } // if current playlist is a live playlist, arm a timer to reload it


    if (details.live) {
      var reloadInterval = computeReloadInterval(curLevel.details, details, data.stats.trequest);
      logger["logger"].log("live playlist, reload in " + Math.round(reloadInterval) + " ms");
      this.timer = setTimeout(function () {
        return _this3.loadLevel();
      }, reloadInterval);
    } else {
      this.clearTimer();
    }
  };

  _proto.onAudioTrackSwitched = function onAudioTrackSwitched(data) {
    var audioGroupId = this.hls.audioTracks[data.id].groupId;
    var currentLevel = this.hls.levels[this.currentLevelIndex];

    if (!currentLevel) {
      return;
    }

    if (currentLevel.audioGroupIds) {
      var urlId = -1;

      for (var i = 0; i < currentLevel.audioGroupIds.length; i++) {
        if (currentLevel.audioGroupIds[i] === audioGroupId) {
          urlId = i;
          break;
        }
      }

      if (urlId !== currentLevel.urlId) {
        currentLevel.urlId = urlId;
        this.startLoad();
      }
    }
  };

  _proto.loadLevel = function loadLevel() {
    logger["logger"].debug('call to loadLevel');

    if (this.currentLevelIndex !== null && this.canload) {
      var levelObject = this._levels[this.currentLevelIndex];

      if (typeof levelObject === 'object' && levelObject.url.length > 0) {
        var level = this.currentLevelIndex;
        var id = levelObject.urlId;
        var url = levelObject.url[id];
        logger["logger"].log("Attempt loading level index " + level + " with URL-id " + id); // console.log('Current audio track group ID:', this.hls.audioTracks[this.hls.audioTrack].groupId);
        // console.log('New video quality level audio group id:', levelObject.attrs.AUDIO, level);

        this.hls.trigger(events["default"].LEVEL_LOADING, {
          url: url,
          level: level,
          id: id
        });
      }
    }
  };

  _proto.removeLevel = function removeLevel(levelIndex, urlId) {
    var levels = this.levels.filter(function (level, index) {
      if (index !== levelIndex) {
        return true;
      }

      if (level.url.length > 1 && urlId !== undefined) {
        level.url = level.url.filter(function (url, id) {
          return id !== urlId;
        });
        level.urlId = 0;
        return true;
      }

      return false;
    }).map(function (level, index) {
      var details = level.details;

      if (details && details.fragments) {
        details.fragments.forEach(function (fragment) {
          fragment.level = index;
        });
      }

      return level;
    });
    this._levels = levels;
    this.hls.trigger(events["default"].LEVELS_UPDATED, {
      levels: levels
    });
  };

  level_controller_createClass(LevelController, [{
    key: "levels",
    get: function get() {
      return this._levels;
    }
  }, {
    key: "level",
    get: function get() {
      return this.currentLevelIndex;
    },
    set: function set(newLevel) {
      var levels = this._levels;

      if (levels) {
        newLevel = Math.min(newLevel, levels.length - 1);

        if (this.currentLevelIndex !== newLevel || !levels[newLevel].details) {
          this.setLevelInternal(newLevel);
        }
      }
    }
  }, {
    key: "manualLevel",
    get: function get() {
      return this.manualLevelIndex;
    },
    set: function set(newLevel) {
      this.manualLevelIndex = newLevel;

      if (this._startLevel === undefined) {
        this._startLevel = newLevel;
      }

      if (newLevel !== -1) {
        this.level = newLevel;
      }
    }
  }, {
    key: "firstLevel",
    get: function get() {
      return this._firstLevel;
    },
    set: function set(newLevel) {
      this._firstLevel = newLevel;
    }
  }, {
    key: "startLevel",
    get: function get() {
      // hls.startLevel takes precedence over config.startLevel
      // if none of these values are defined, fallback on this._firstLevel (first quality level appearing in variant manifest)
      if (this._startLevel === undefined) {
        var configStartLevel = this.hls.config.startLevel;

        if (configStartLevel !== undefined) {
          return configStartLevel;
        } else {
          return this._firstLevel;
        }
      } else {
        return this._startLevel;
      }
    },
    set: function set(newLevel) {
      this._startLevel = newLevel;
    }
  }, {
    key: "nextLoadLevel",
    get: function get() {
      if (this.manualLevelIndex !== -1) {
        return this.manualLevelIndex;
      } else {
        return this.hls.nextAutoLevel;
      }
    },
    set: function set(nextLevel) {
      this.level = nextLevel;

      if (this.manualLevelIndex === -1) {
        this.hls.nextAutoLevel = nextLevel;
      }
    }
  }]);

  return LevelController;
}(event_handler);


// EXTERNAL MODULE: ./src/demux/id3.js
var id3 = __webpack_require__("./src/demux/id3.js");

// CONCATENATED MODULE: ./src/utils/texttrack-utils.ts
function sendAddTrackEvent(track, videoEl) {
  var event;

  try {
    event = new Event('addtrack');
  } catch (err) {
    // for IE11
    event = document.createEvent('Event');
    event.initEvent('addtrack', false, false);
  }

  event.track = track;
  videoEl.dispatchEvent(event);
}
function clearCurrentCues(track) {
  if (track === null || track === void 0 ? void 0 : track.cues) {
    while (track.cues.length > 0) {
      track.removeCue(track.cues[0]);
    }
  }
}
/**
 *  Given a list of Cues, finds the closest cue matching the given time.
 *  Modified verison of binary search O(log(n)).
 *
 * @export
 * @param {(TextTrackCueList | TextTrackCue[])} cues - List of cues.
 * @param {number} time - Target time, to find closest cue to.
 * @returns {TextTrackCue}
 */

function getClosestCue(cues, time) {
  // If the offset is less than the first element, the first element is the closest.
  if (time < cues[0].endTime) {
    return cues[0];
  } // If the offset is greater than the last cue, the last is the closest.


  if (time > cues[cues.length - 1].endTime) {
    return cues[cues.length - 1];
  }

  var left = 0;
  var right = cues.length - 1;

  while (left <= right) {
    var mid = Math.floor((right + left) / 2);

    if (time < cues[mid].endTime) {
      right = mid - 1;
    } else if (time > cues[mid].endTime) {
      left = mid + 1;
    } else {
      // If it's not lower or higher, it must be equal.
      return cues[mid];
    }
  } // At this point, left and right have swapped.
  // No direct match was found, left or right element must be the closest. Check which one has the smallest diff.


  return cues[left].endTime - time < time - cues[right].endTime ? cues[left] : cues[right];
}
// CONCATENATED MODULE: ./src/controller/id3-track-controller.js
function id3_track_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * id3 metadata track controller
*/




var MIN_CUE_DURATION = 0.25;

var id3_track_controller_ID3TrackController = /*#__PURE__*/function (_EventHandler) {
  id3_track_controller_inheritsLoose(ID3TrackController, _EventHandler);

  function ID3TrackController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].MEDIA_ATTACHED, events["default"].MEDIA_DETACHING, events["default"].FRAG_PARSING_METADATA, events["default"].LIVE_BACK_BUFFER_REACHED) || this;
    _this.id3Track = undefined;
    _this.media = undefined;
    return _this;
  }

  var _proto = ID3TrackController.prototype;

  _proto.destroy = function destroy() {
    event_handler.prototype.destroy.call(this);
  } // Add ID3 metatadata text track.
  ;

  _proto.onMediaAttached = function onMediaAttached(data) {
    this.media = data.media;

    if (!this.media) {}
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    clearCurrentCues(this.id3Track);
    this.id3Track = undefined;
    this.media = undefined;
  };

  _proto.getID3Track = function getID3Track(textTracks) {
    for (var i = 0; i < textTracks.length; i++) {
      var textTrack = textTracks[i];

      if (textTrack.kind === 'metadata' && textTrack.label === 'id3') {
        // send 'addtrack' when reusing the textTrack for metadata,
        // same as what we do for captions
        sendAddTrackEvent(textTrack, this.media);
        return textTrack;
      }
    }

    return this.media.addTextTrack('metadata', 'id3');
  };

  _proto.onFragParsingMetadata = function onFragParsingMetadata(data) {
    var fragment = data.frag;
    var samples = data.samples; // create track dynamically

    if (!this.id3Track) {
      this.id3Track = this.getID3Track(this.media.textTracks);
      this.id3Track.mode = 'hidden';
    } // Attempt to recreate Safari functionality by creating
    // WebKitDataCue objects when available and store the decoded
    // ID3 data in the value property of the cue


    var Cue = window.WebKitDataCue || window.VTTCue || window.TextTrackCue;

    for (var i = 0; i < samples.length; i++) {
      var frames = id3["default"].getID3Frames(samples[i].data);

      if (frames) {
        // Ensure the pts is positive - sometimes it's reported as a small negative number
        var startTime = Math.max(samples[i].pts, 0);
        var endTime = i < samples.length - 1 ? samples[i + 1].pts : fragment.endPTS;

        if (!endTime) {
          endTime = fragment.start + fragment.duration;
        }

        var timeDiff = endTime - startTime;

        if (timeDiff <= 0) {
          endTime = startTime + MIN_CUE_DURATION;
        }

        for (var j = 0; j < frames.length; j++) {
          var frame = frames[j]; // Safari doesn't put the timestamp frame in the TextTrack

          if (!id3["default"].isTimeStampFrame(frame)) {
            var cue = new Cue(startTime, endTime, '');
            cue.value = frame;
            this.id3Track.addCue(cue);
          }
        }
      }
    }
  };

  _proto.onLiveBackBufferReached = function onLiveBackBufferReached(_ref) {
    var bufferEnd = _ref.bufferEnd;
    var id3Track = this.id3Track;

    if (!id3Track || !id3Track.cues || !id3Track.cues.length) {
      return;
    }

    var foundCue = getClosestCue(id3Track.cues, bufferEnd);

    if (!foundCue) {
      return;
    }

    while (id3Track.cues[0] !== foundCue) {
      id3Track.removeCue(id3Track.cues[0]);
    }
  };

  return ID3TrackController;
}(event_handler);

/* harmony default export */ var id3_track_controller = (id3_track_controller_ID3TrackController);
// CONCATENATED MODULE: ./src/is-supported.ts

function is_supported_isSupported() {
  var mediaSource = getMediaSource();

  if (!mediaSource) {
    return false;
  }

  var sourceBuffer = self.SourceBuffer || self.WebKitSourceBuffer;
  var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'); // if SourceBuffer is exposed ensure its API is valid
  // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible

  var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
  return !!isTypeSupported && !!sourceBufferValidAPI;
}
// CONCATENATED MODULE: ./src/utils/ewma.ts
/*
 * compute an Exponential Weighted moving average
 * - https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
 *  - heavily inspired from shaka-player
 */
var EWMA = /*#__PURE__*/function () {
  //  About half of the estimated value will be from the last |halfLife| samples by weight.
  function EWMA(halfLife) {
    this.alpha_ = void 0;
    this.estimate_ = void 0;
    this.totalWeight_ = void 0;
    // Larger values of alpha expire historical data more slowly.
    this.alpha_ = halfLife ? Math.exp(Math.log(0.5) / halfLife) : 0;
    this.estimate_ = 0;
    this.totalWeight_ = 0;
  }

  var _proto = EWMA.prototype;

  _proto.sample = function sample(weight, value) {
    var adjAlpha = Math.pow(this.alpha_, weight);
    this.estimate_ = value * (1 - adjAlpha) + adjAlpha * this.estimate_;
    this.totalWeight_ += weight;
  };

  _proto.getTotalWeight = function getTotalWeight() {
    return this.totalWeight_;
  };

  _proto.getEstimate = function getEstimate() {
    if (this.alpha_) {
      var zeroFactor = 1 - Math.pow(this.alpha_, this.totalWeight_);
      return this.estimate_ / zeroFactor;
    } else {
      return this.estimate_;
    }
  };

  return EWMA;
}();

/* harmony default export */ var ewma = (EWMA);
// CONCATENATED MODULE: ./src/utils/ewma-bandwidth-estimator.ts
/*
 * EWMA Bandwidth Estimator
 *  - heavily inspired from shaka-player
 * Tracks bandwidth samples and estimates available bandwidth.
 * Based on the minimum of two exponentially-weighted moving averages with
 * different half-lives.
 */


var ewma_bandwidth_estimator_EwmaBandWidthEstimator = /*#__PURE__*/function () {
  // TODO(typescript-hls)
  function EwmaBandWidthEstimator(hls, slow, fast, defaultEstimate) {
    this.hls = void 0;
    this.defaultEstimate_ = void 0;
    this.minWeight_ = void 0;
    this.minDelayMs_ = void 0;
    this.slow_ = void 0;
    this.fast_ = void 0;
    this.hls = hls;
    this.defaultEstimate_ = defaultEstimate;
    this.minWeight_ = 0.001;
    this.minDelayMs_ = 50;
    this.slow_ = new ewma(slow);
    this.fast_ = new ewma(fast);
  }

  var _proto = EwmaBandWidthEstimator.prototype;

  _proto.sample = function sample(durationMs, numBytes) {
    durationMs = Math.max(durationMs, this.minDelayMs_);
    var numBits = 8 * numBytes,
        // weight is duration in seconds
    durationS = durationMs / 1000,
        // value is bandwidth in bits/s
    bandwidthInBps = numBits / durationS;
    this.fast_.sample(durationS, bandwidthInBps);
    this.slow_.sample(durationS, bandwidthInBps);
  };

  _proto.canEstimate = function canEstimate() {
    var fast = this.fast_;
    return fast && fast.getTotalWeight() >= this.minWeight_;
  };

  _proto.getEstimate = function getEstimate() {
    if (this.canEstimate()) {
      // console.log('slow estimate:'+ Math.round(this.slow_.getEstimate()));
      // console.log('fast estimate:'+ Math.round(this.fast_.getEstimate()));
      // Take the minimum of these two estimates.  This should have the effect of
      // adapting down quickly, but up more slowly.
      return Math.min(this.fast_.getEstimate(), this.slow_.getEstimate());
    } else {
      return this.defaultEstimate_;
    }
  };

  _proto.destroy = function destroy() {};

  return EwmaBandWidthEstimator;
}();

/* harmony default export */ var ewma_bandwidth_estimator = (ewma_bandwidth_estimator_EwmaBandWidthEstimator);
// CONCATENATED MODULE: ./src/controller/abr-controller.js



function abr_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function abr_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) abr_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) abr_controller_defineProperties(Constructor, staticProps); return Constructor; }

function abr_controller_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function abr_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * simple ABR Controller
 *  - compute next level based on last fragment bw heuristics
 *  - implement an abandon rules triggered if we have less than 2 frag buffered and if computed bw shows that we risk buffer stalling
 */






var abr_controller_window = window,
    abr_controller_performance = abr_controller_window.performance;

var abr_controller_AbrController = /*#__PURE__*/function (_EventHandler) {
  abr_controller_inheritsLoose(AbrController, _EventHandler);

  function AbrController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].FRAG_LOADING, events["default"].FRAG_LOADED, events["default"].FRAG_BUFFERED, events["default"].ERROR) || this;
    _this.lastLoadedFragLevel = 0;
    _this._nextAutoLevel = -1;
    _this.hls = hls;
    _this.timer = null;
    _this._bwEstimator = null;
    _this.onCheck = _this._abandonRulesCheck.bind(abr_controller_assertThisInitialized(_this));
    return _this;
  }

  var _proto = AbrController.prototype;

  _proto.destroy = function destroy() {
    this.clearTimer();
    event_handler.prototype.destroy.call(this);
  };

  _proto.onFragLoading = function onFragLoading(data) {
    var frag = data.frag;

    if (frag.type === 'main') {
      if (!this.timer) {
        this.fragCurrent = frag;
        this.timer = setInterval(this.onCheck, 100);
      } // lazy init of BwEstimator, rationale is that we use different params for Live/VoD
      // so we need to wait for stream manifest / playlist type to instantiate it.


      if (!this._bwEstimator) {
        var hls = this.hls;
        var config = hls.config;
        var level = frag.level;
        var isLive = hls.levels[level].details.live;
        var ewmaFast;
        var ewmaSlow;

        if (isLive) {
          ewmaFast = config.abrEwmaFastLive;
          ewmaSlow = config.abrEwmaSlowLive;
        } else {
          ewmaFast = config.abrEwmaFastVoD;
          ewmaSlow = config.abrEwmaSlowVoD;
        }

        this._bwEstimator = new ewma_bandwidth_estimator(hls, ewmaSlow, ewmaFast, config.abrEwmaDefaultEstimate);
      }
    }
  };

  _proto._abandonRulesCheck = function _abandonRulesCheck() {
    /*
      monitor fragment retrieval time...
      we compute expected time of arrival of the complete fragment.
      we compare it to expected time of buffer starvation
    */
    var hls = this.hls;
    var video = hls.media;
    var frag = this.fragCurrent;

    if (!frag) {
      return;
    }

    var loader = frag.loader; // if loader has been destroyed or loading has been aborted, stop timer and return

    if (!loader || loader.stats && loader.stats.aborted) {
      logger["logger"].warn('frag loader destroy or aborted, disarm abandonRules');
      this.clearTimer(); // reset forced auto level value so that next level will be selected

      this._nextAutoLevel = -1;
      return;
    }

    var stats = loader.stats;
    /* only monitor frag retrieval time if
    (video not paused OR first fragment being loaded(ready state === HAVE_NOTHING = 0)) AND autoswitching enabled AND not lowest level (=> means that we have several levels) */

    if (video && stats && (!video.paused && video.playbackRate !== 0 || !video.readyState) && frag.autoLevel && frag.level) {
      var requestDelay = abr_controller_performance.now() - stats.trequest;
      var playbackRate = Math.abs(video.playbackRate); // monitor fragment load progress after half of expected fragment duration,to stabilize bitrate

      if (requestDelay > 500 * frag.duration / playbackRate) {
        var levels = hls.levels;
        var loadRate = Math.max(1, stats.bw ? stats.bw / 8 : stats.loaded * 1000 / requestDelay); // byte/s; at least 1 byte/s to avoid division by zero
        // compute expected fragment length using frag duration and level bitrate. also ensure that expected len is gte than already loaded size

        var level = levels[frag.level];

        if (!level) {
          return;
        }

        var levelBitrate = level.realBitrate ? Math.max(level.realBitrate, level.bitrate) : level.bitrate;
        var expectedLen = stats.total ? stats.total : Math.max(stats.loaded, Math.round(frag.duration * levelBitrate / 8));
        var pos = video.currentTime;
        var fragLoadedDelay = (expectedLen - stats.loaded) / loadRate;
        var bufferStarvationDelay = (BufferHelper.bufferInfo(video, pos, hls.config.maxBufferHole).end - pos) / playbackRate; // consider emergency switch down only if we have less than 2 frag buffered AND
        // time to finish loading current fragment is bigger than buffer starvation delay
        // ie if we risk buffer starvation if bw does not increase quickly

        if (bufferStarvationDelay < 2 * frag.duration / playbackRate && fragLoadedDelay > bufferStarvationDelay) {
          var minAutoLevel = hls.minAutoLevel;
          var fragLevelNextLoadedDelay;
          var nextLoadLevel; // lets iterate through lower level and try to find the biggest one that could avoid rebuffering
          // we start from current level - 1 and we step down , until we find a matching level

          for (nextLoadLevel = frag.level - 1; nextLoadLevel > minAutoLevel; nextLoadLevel--) {
            // compute time to load next fragment at lower level
            // 0.8 : consider only 80% of current bw to be conservative
            // 8 = bits per byte (bps/Bps)
            var levelNextBitrate = levels[nextLoadLevel].realBitrate ? Math.max(levels[nextLoadLevel].realBitrate, levels[nextLoadLevel].bitrate) : levels[nextLoadLevel].bitrate;

            var _fragLevelNextLoadedDelay = frag.duration * levelNextBitrate / (8 * 0.8 * loadRate);

            if (_fragLevelNextLoadedDelay < bufferStarvationDelay) {
              // we found a lower level that be rebuffering free with current estimated bw !
              break;
            }
          } // only emergency switch down if it takes less time to load new fragment at lowest level instead
          // of finishing loading current one ...


          if (fragLevelNextLoadedDelay < fragLoadedDelay) {
            logger["logger"].warn("loading too slow, abort fragment loading and switch to level " + nextLoadLevel + ":fragLoadedDelay[" + nextLoadLevel + "]<fragLoadedDelay[" + (frag.level - 1) + "];bufferStarvationDelay:" + fragLevelNextLoadedDelay.toFixed(1) + "<" + fragLoadedDelay.toFixed(1) + ":" + bufferStarvationDelay.toFixed(1)); // force next load level in auto mode

            hls.nextLoadLevel = nextLoadLevel; // update bw estimate for this fragment before cancelling load (this will help reducing the bw)

            this._bwEstimator.sample(requestDelay, stats.loaded); // abort fragment loading


            loader.abort(); // stop abandon rules timer

            this.clearTimer();
            hls.trigger(events["default"].FRAG_LOAD_EMERGENCY_ABORTED, {
              frag: frag,
              stats: stats
            });
          }
        }
      }
    }
  };

  _proto.onFragLoaded = function onFragLoaded(data) {
    var frag = data.frag;

    if (frag.type === 'main' && Object(number["isFiniteNumber"])(frag.sn)) {
      // stop monitoring bw once frag loaded
      this.clearTimer(); // store level id after successful fragment load

      this.lastLoadedFragLevel = frag.level; // reset forced auto level value so that next level will be selected

      this._nextAutoLevel = -1; // compute level average bitrate

      if (this.hls.config.abrMaxWithRealBitrate) {
        var level = this.hls.levels[frag.level];
        var loadedBytes = (level.loaded ? level.loaded.bytes : 0) + data.stats.loaded;
        var loadedDuration = (level.loaded ? level.loaded.duration : 0) + data.frag.duration;
        level.loaded = {
          bytes: loadedBytes,
          duration: loadedDuration
        };
        level.realBitrate = Math.round(8 * loadedBytes / loadedDuration);
      } // if fragment has been loaded to perform a bitrate test,


      if (data.frag.bitrateTest) {
        var stats = data.stats;
        stats.tparsed = stats.tbuffered = stats.tload;
        this.onFragBuffered(data);
      }
    }
  };

  _proto.onFragBuffered = function onFragBuffered(data) {
    var stats = data.stats;
    var frag = data.frag; // only update stats on first frag buffering
    // if same frag is loaded multiple times, it might be in browser cache, and loaded quickly
    // and leading to wrong bw estimation
    // on bitrate test, also only update stats once (if tload = tbuffered == on FRAG_LOADED)

    if (stats.aborted !== true && frag.type === 'main' && Object(number["isFiniteNumber"])(frag.sn) && (!frag.bitrateTest || stats.tload === stats.tbuffered)) {
      // use tparsed-trequest instead of tbuffered-trequest to compute fragLoadingProcessing; rationale is that  buffer appending only happens once media is attached
      // in case we use config.startFragPrefetch while media is not attached yet, fragment might be parsed while media not attached yet, but it will only be buffered on media attached
      // as a consequence it could happen really late in the process. meaning that appending duration might appears huge ... leading to underestimated throughput estimation
      var fragLoadingProcessingMs = stats.tparsed - stats.trequest;
      logger["logger"].log("latency/loading/parsing/append/kbps:" + Math.round(stats.tfirst - stats.trequest) + "/" + Math.round(stats.tload - stats.tfirst) + "/" + Math.round(stats.tparsed - stats.tload) + "/" + Math.round(stats.tbuffered - stats.tparsed) + "/" + Math.round(8 * stats.loaded / (stats.tbuffered - stats.trequest)));

      this._bwEstimator.sample(fragLoadingProcessingMs, stats.loaded);

      stats.bwEstimate = this._bwEstimator.getEstimate(); // if fragment has been loaded to perform a bitrate test, (hls.startLevel = -1), store bitrate test delay duration

      if (frag.bitrateTest) {
        this.bitrateTestDelay = fragLoadingProcessingMs / 1000;
      } else {
        this.bitrateTestDelay = 0;
      }
    }
  };

  _proto.onError = function onError(data) {
    // stop timer in case of frag loading error
    switch (data.details) {
      case errors["ErrorDetails"].FRAG_LOAD_ERROR:
      case errors["ErrorDetails"].FRAG_LOAD_TIMEOUT:
        this.clearTimer();
        break;

      default:
        break;
    }
  };

  _proto.clearTimer = function clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
  } // return next auto level
  ;

  _proto._findBestLevel = function _findBestLevel(currentLevel, currentFragDuration, currentBw, minAutoLevel, maxAutoLevel, maxFetchDuration, bwFactor, bwUpFactor, levels) {
    for (var i = maxAutoLevel; i >= minAutoLevel; i--) {
      var levelInfo = levels[i];

      if (!levelInfo) {
        continue;
      }

      var levelDetails = levelInfo.details;
      var avgDuration = levelDetails ? levelDetails.totalduration / levelDetails.fragments.length : currentFragDuration;
      var live = levelDetails ? levelDetails.live : false;
      var adjustedbw = void 0; // follow algorithm captured from stagefright :
      // https://android.googlesource.com/platform/frameworks/av/+/master/media/libstagefright/httplive/LiveSession.cpp
      // Pick the highest bandwidth stream below or equal to estimated bandwidth.
      // consider only 80% of the available bandwidth, but if we are switching up,
      // be even more conservative (70%) to avoid overestimating and immediately
      // switching back.

      if (i <= currentLevel) {
        adjustedbw = bwFactor * currentBw;
      } else {
        adjustedbw = bwUpFactor * currentBw;
      }

      var bitrate = levels[i].realBitrate ? Math.max(levels[i].realBitrate, levels[i].bitrate) : levels[i].bitrate;
      var fetchDuration = bitrate * avgDuration / adjustedbw;
      logger["logger"].trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + i + "/" + Math.round(adjustedbw) + "/" + bitrate + "/" + avgDuration + "/" + maxFetchDuration + "/" + fetchDuration); // if adjusted bw is greater than level bitrate AND

      if (adjustedbw > bitrate && ( // fragment fetchDuration unknown OR live stream OR fragment fetchDuration less than max allowed fetch duration, then this level matches
      // we don't account for max Fetch Duration for live streams, this is to avoid switching down when near the edge of live sliding window ...
      // special case to support startLevel = -1 (bitrateTest) on live streams : in that case we should not exit loop so that _findBestLevel will return -1
      !fetchDuration || live && !this.bitrateTestDelay || fetchDuration < maxFetchDuration)) {
        // as we are looping from highest to lowest, this will return the best achievable quality level
        return i;
      }
    } // not enough time budget even with quality level 0 ... rebuffering might happen


    return -1;
  };

  abr_controller_createClass(AbrController, [{
    key: "nextAutoLevel",
    get: function get() {
      var forcedAutoLevel = this._nextAutoLevel;
      var bwEstimator = this._bwEstimator; // in case next auto level has been forced, and bw not available or not reliable, return forced value

      if (forcedAutoLevel !== -1 && (!bwEstimator || !bwEstimator.canEstimate())) {
        return forcedAutoLevel;
      } // compute next level using ABR logic


      var nextABRAutoLevel = this._nextABRAutoLevel; // if forced auto level has been defined, use it to cap ABR computed quality level

      if (forcedAutoLevel !== -1) {
        nextABRAutoLevel = Math.min(forcedAutoLevel, nextABRAutoLevel);
      }

      return nextABRAutoLevel;
    },
    set: function set(nextLevel) {
      this._nextAutoLevel = nextLevel;
    }
  }, {
    key: "_nextABRAutoLevel",
    get: function get() {
      var hls = this.hls;
      var maxAutoLevel = hls.maxAutoLevel,
          levels = hls.levels,
          config = hls.config,
          minAutoLevel = hls.minAutoLevel;
      var video = hls.media;
      var currentLevel = this.lastLoadedFragLevel;
      var currentFragDuration = this.fragCurrent ? this.fragCurrent.duration : 0;
      var pos = video ? video.currentTime : 0; // playbackRate is the absolute value of the playback rate; if video.playbackRate is 0, we use 1 to load as
      // if we're playing back at the normal rate.

      var playbackRate = video && video.playbackRate !== 0 ? Math.abs(video.playbackRate) : 1.0;
      var avgbw = this._bwEstimator ? this._bwEstimator.getEstimate() : config.abrEwmaDefaultEstimate; // bufferStarvationDelay is the wall-clock time left until the playback buffer is exhausted.

      var bufferStarvationDelay = (BufferHelper.bufferInfo(video, pos, config.maxBufferHole).end - pos) / playbackRate; // First, look to see if we can find a level matching with our avg bandwidth AND that could also guarantee no rebuffering at all

      var bestLevel = this._findBestLevel(currentLevel, currentFragDuration, avgbw, minAutoLevel, maxAutoLevel, bufferStarvationDelay, config.abrBandWidthFactor, config.abrBandWidthUpFactor, levels);

      if (bestLevel >= 0) {
        return bestLevel;
      } else {
        logger["logger"].trace('rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering'); // not possible to get rid of rebuffering ... let's try to find level that will guarantee less than maxStarvationDelay of rebuffering
        // if no matching level found, logic will return 0

        var maxStarvationDelay = currentFragDuration ? Math.min(currentFragDuration, config.maxStarvationDelay) : config.maxStarvationDelay;
        var bwFactor = config.abrBandWidthFactor;
        var bwUpFactor = config.abrBandWidthUpFactor;

        if (bufferStarvationDelay === 0) {
          // in case buffer is empty, let's check if previous fragment was loaded to perform a bitrate test
          var bitrateTestDelay = this.bitrateTestDelay;

          if (bitrateTestDelay) {
            // if it is the case, then we need to adjust our max starvation delay using maxLoadingDelay config value
            // max video loading delay used in  automatic start level selection :
            // in that mode ABR controller will ensure that video loading time (ie the time to fetch the first fragment at lowest quality level +
            // the time to fetch the fragment at the appropriate quality level is less than ```maxLoadingDelay``` )
            // cap maxLoadingDelay and ensure it is not bigger 'than bitrate test' frag duration
            var maxLoadingDelay = currentFragDuration ? Math.min(currentFragDuration, config.maxLoadingDelay) : config.maxLoadingDelay;
            maxStarvationDelay = maxLoadingDelay - bitrateTestDelay;
            logger["logger"].trace("bitrate test took " + Math.round(1000 * bitrateTestDelay) + "ms, set first fragment max fetchDuration to " + Math.round(1000 * maxStarvationDelay) + " ms"); // don't use conservative factor on bitrate test

            bwFactor = bwUpFactor = 1;
          }
        }

        bestLevel = this._findBestLevel(currentLevel, currentFragDuration, avgbw, minAutoLevel, maxAutoLevel, bufferStarvationDelay + maxStarvationDelay, bwFactor, bwUpFactor, levels);
        return Math.max(bestLevel, 0);
      }
    }
  }]);

  return AbrController;
}(event_handler);

/* harmony default export */ var abr_controller = (abr_controller_AbrController);
// CONCATENATED MODULE: ./src/controller/buffer-controller.ts


function buffer_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Buffer Controller
 */





var buffer_controller_MediaSource = getMediaSource();

var buffer_controller_BufferController = /*#__PURE__*/function (_EventHandler) {
  buffer_controller_inheritsLoose(BufferController, _EventHandler);

  // the value that we have set mediasource.duration to
  // (the actual duration may be tweaked slighly by the browser)
  // the value that we want to set mediaSource.duration to
  // the target duration of the current media playlist
  // current stream state: true - for live broadcast, false - for VoD content
  // cache the self generated object url to detect hijack of video tag
  // signals that the sourceBuffers need to be flushed
  // signals that mediaSource should have endOfStream called
  // this is optional because this property is removed from the class sometimes
  // The number of BUFFER_CODEC events received before any sourceBuffers are created
  // The total number of BUFFER_CODEC events received
  // A reference to the attached media element
  // A reference to the active media source
  // List of pending segments to be appended to source buffer
  // A guard to see if we are currently appending to the source buffer
  // counters
  function BufferController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].MEDIA_ATTACHING, events["default"].MEDIA_DETACHING, events["default"].MANIFEST_PARSED, events["default"].BUFFER_RESET, events["default"].BUFFER_APPENDING, events["default"].BUFFER_CODECS, events["default"].BUFFER_EOS, events["default"].BUFFER_FLUSHING, events["default"].LEVEL_PTS_UPDATED, events["default"].LEVEL_UPDATED) || this;
    _this._msDuration = null;
    _this._levelDuration = null;
    _this._levelTargetDuration = 10;
    _this._live = null;
    _this._objectUrl = null;
    _this._needsFlush = false;
    _this._needsEos = false;
    _this.config = void 0;
    _this.audioTimestampOffset = void 0;
    _this.bufferCodecEventsExpected = 0;
    _this._bufferCodecEventsTotal = 0;
    _this.media = null;
    _this.mediaSource = null;
    _this.segments = [];
    _this.parent = void 0;
    _this.appending = false;
    _this.appended = 0;
    _this.appendError = 0;
    _this.flushBufferCounter = 0;
    _this.tracks = {};
    _this.pendingTracks = {};
    _this.sourceBuffer = {};
    _this.flushRange = [];

    _this._onMediaSourceOpen = function () {
      logger["logger"].log('media source opened');

      _this.hls.trigger(events["default"].MEDIA_ATTACHED, {
        media: _this.media
      });

      var mediaSource = _this.mediaSource;

      if (mediaSource) {
        // once received, don't listen anymore to sourceopen event
        mediaSource.removeEventListener('sourceopen', _this._onMediaSourceOpen);
      }

      _this.checkPendingTracks();
    };

    _this._onMediaSourceClose = function () {
      logger["logger"].log('media source closed');
    };

    _this._onMediaSourceEnded = function () {
      logger["logger"].log('media source ended');
    };

    _this._onSBUpdateEnd = function () {
      // update timestampOffset
      if (_this.audioTimestampOffset && _this.sourceBuffer.audio) {
        var audioBuffer = _this.sourceBuffer.audio;
        logger["logger"].warn("change mpeg audio timestamp offset from " + audioBuffer.timestampOffset + " to " + _this.audioTimestampOffset);
        audioBuffer.timestampOffset = _this.audioTimestampOffset;
        delete _this.audioTimestampOffset;
      }

      if (_this._needsFlush) {
        _this.doFlush();
      }

      if (_this._needsEos) {
        _this.checkEos();
      }

      _this.appending = false;
      var parent = _this.parent; // count nb of pending segments waiting for appending on this sourcebuffer

      var pending = _this.segments.reduce(function (counter, segment) {
        return segment.parent === parent ? counter + 1 : counter;
      }, 0); // this.sourceBuffer is better to use than media.buffered as it is closer to the PTS data from the fragments


      var timeRanges = {};
      var sbSet = _this.sourceBuffer;

      for (var streamType in sbSet) {
        var sb = sbSet[streamType];

        if (!sb) {
          throw Error("handling source buffer update end error: source buffer for " + streamType + " uninitilized and unable to update buffered TimeRanges.");
        }

        timeRanges[streamType] = sb.buffered;
      }

      _this.hls.trigger(events["default"].BUFFER_APPENDED, {
        parent: parent,
        pending: pending,
        timeRanges: timeRanges
      }); // don't append in flushing mode


      if (!_this._needsFlush) {
        _this.doAppending();
      }

      _this.updateMediaElementDuration(); // appending goes first


      if (pending === 0) {
        _this.flushLiveBackBuffer();
      }
    };

    _this._onSBUpdateError = function (event) {
      logger["logger"].error('sourceBuffer error:', event); // according to http://www.w3.org/TR/media-source/#sourcebuffer-append-error
      // this error might not always be fatal (it is fatal if decode error is set, in that case
      // it will be followed by a mediaElement error ...)

      _this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].BUFFER_APPENDING_ERROR,
        fatal: false
      }); // we don't need to do more than that, as accordin to the spec, updateend will be fired just after

    };

    _this.config = hls.config;
    return _this;
  }

  var _proto = BufferController.prototype;

  _proto.destroy = function destroy() {
    event_handler.prototype.destroy.call(this);
  };

  _proto.onLevelPtsUpdated = function onLevelPtsUpdated(data) {
    var type = data.type;
    var audioTrack = this.tracks.audio; // Adjusting `SourceBuffer.timestampOffset` (desired point in the timeline where the next frames should be appended)
    // in Chrome browser when we detect MPEG audio container and time delta between level PTS and `SourceBuffer.timestampOffset`
    // is greater than 100ms (this is enough to handle seek for VOD or level change for LIVE videos). At the time of change we issue
    // `SourceBuffer.abort()` and adjusting `SourceBuffer.timestampOffset` if `SourceBuffer.updating` is false or awaiting `updateend`
    // event if SB is in updating state.
    // More info here: https://github.com/video-dev/hls.js/issues/332#issuecomment-257986486

    if (type === 'audio' && audioTrack && audioTrack.container === 'audio/mpeg') {
      // Chrome audio mp3 track
      var audioBuffer = this.sourceBuffer.audio;

      if (!audioBuffer) {
        throw Error('Level PTS Updated and source buffer for audio uninitalized');
      }

      var delta = Math.abs(audioBuffer.timestampOffset - data.start); // adjust timestamp offset if time delta is greater than 100ms

      if (delta > 0.1) {
        var updating = audioBuffer.updating;

        try {
          audioBuffer.abort();
        } catch (err) {
          logger["logger"].warn('can not abort audio buffer: ' + err);
        }

        if (!updating) {
          logger["logger"].warn('change mpeg audio timestamp offset from ' + audioBuffer.timestampOffset + ' to ' + data.start);
          audioBuffer.timestampOffset = data.start;
        } else {
          this.audioTimestampOffset = data.start;
        }
      }
    }
  };

  _proto.onManifestParsed = function onManifestParsed(data) {
    // in case of alt audio (where all tracks have urls) 2 BUFFER_CODECS events will be triggered, one per stream controller
    // sourcebuffers will be created all at once when the expected nb of tracks will be reached
    // in case alt audio is not used, only one BUFFER_CODEC event will be fired from main stream controller
    // it will contain the expected nb of source buffers, no need to compute it
    var codecEvents = 2;

    if (data.audio && !data.video || !data.altAudio) {
      codecEvents = 1;
    }

    this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = codecEvents;
    logger["logger"].log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected");
  };

  _proto.onMediaAttaching = function onMediaAttaching(data) {
    var media = this.media = data.media;

    if (media && buffer_controller_MediaSource) {
      // setup the media source
      var ms = this.mediaSource = new buffer_controller_MediaSource(); // Media Source listeners

      ms.addEventListener('sourceopen', this._onMediaSourceOpen);
      ms.addEventListener('sourceended', this._onMediaSourceEnded);
      ms.addEventListener('sourceclose', this._onMediaSourceClose); // link video and media Source

      media.src = window.URL.createObjectURL(ms); // cache the locally generated object url

      this._objectUrl = media.src;
    }
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    logger["logger"].log('media source detaching');
    var ms = this.mediaSource;

    if (ms) {
      if (ms.readyState === 'open') {
        try {
          // endOfStream could trigger exception if any sourcebuffer is in updating state
          // we don't really care about checking sourcebuffer state here,
          // as we are anyway detaching the MediaSource
          // let's just avoid this exception to propagate
          ms.endOfStream();
        } catch (err) {
          logger["logger"].warn("onMediaDetaching:" + err.message + " while calling endOfStream");
        }
      }

      ms.removeEventListener('sourceopen', this._onMediaSourceOpen);
      ms.removeEventListener('sourceended', this._onMediaSourceEnded);
      ms.removeEventListener('sourceclose', this._onMediaSourceClose); // Detach properly the MediaSource from the HTMLMediaElement as
      // suggested in https://github.com/w3c/media-source/issues/53.

      if (this.media) {
        if (this._objectUrl) {
          window.URL.revokeObjectURL(this._objectUrl);
        } // clean up video tag src only if it's our own url. some external libraries might
        // hijack the video tag and change its 'src' without destroying the Hls instance first


        if (this.media.src === this._objectUrl) {
          this.media.removeAttribute('src');
          this.media.load();
        } else {
          logger["logger"].warn('media.src was changed by a third party - skip cleanup');
        }
      }

      this.mediaSource = null;
      this.media = null;
      this._objectUrl = null;
      this.bufferCodecEventsExpected = this._bufferCodecEventsTotal;
      this.pendingTracks = {};
      this.tracks = {};
      this.sourceBuffer = {};
      this.flushRange = [];
      this.segments = [];
      this.appended = 0;
    }

    this.hls.trigger(events["default"].MEDIA_DETACHED);
  };

  _proto.checkPendingTracks = function checkPendingTracks() {
    var bufferCodecEventsExpected = this.bufferCodecEventsExpected,
        pendingTracks = this.pendingTracks; // Check if we've received all of the expected bufferCodec events. When none remain, create all the sourceBuffers at once.
    // This is important because the MSE spec allows implementations to throw QuotaExceededErrors if creating new sourceBuffers after
    // data has been appended to existing ones.
    // 2 tracks is the max (one for audio, one for video). If we've reach this max go ahead and create the buffers.

    var pendingTracksCount = Object.keys(pendingTracks).length;

    if (pendingTracksCount && !bufferCodecEventsExpected || pendingTracksCount === 2) {
      // ok, let's create them now !
      this.createSourceBuffers(pendingTracks);
      this.pendingTracks = {}; // append any pending segments now !

      this.doAppending();
    }
  };

  _proto.onBufferReset = function onBufferReset() {
    var sourceBuffer = this.sourceBuffer;

    for (var type in sourceBuffer) {
      var sb = sourceBuffer[type];

      try {
        if (sb) {
          if (this.mediaSource) {
            this.mediaSource.removeSourceBuffer(sb);
          }

          sb.removeEventListener('updateend', this._onSBUpdateEnd);
          sb.removeEventListener('error', this._onSBUpdateError);
        }
      } catch (err) {}
    }

    this.sourceBuffer = {};
    this.flushRange = [];
    this.segments = [];
    this.appended = 0;
  };

  _proto.onBufferCodecs = function onBufferCodecs(tracks) {
    var _this2 = this;

    // if source buffer(s) not created yet, appended buffer tracks in this.pendingTracks
    // if sourcebuffers already created, do nothing ...
    if (Object.keys(this.sourceBuffer).length) {
      return;
    }

    Object.keys(tracks).forEach(function (trackName) {
      _this2.pendingTracks[trackName] = tracks[trackName];
    });
    this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0);

    if (this.mediaSource && this.mediaSource.readyState === 'open') {
      this.checkPendingTracks();
    }
  };

  _proto.createSourceBuffers = function createSourceBuffers(tracks) {
    var sourceBuffer = this.sourceBuffer,
        mediaSource = this.mediaSource;

    if (!mediaSource) {
      throw Error('createSourceBuffers called when mediaSource was null');
    }

    for (var trackName in tracks) {
      if (!sourceBuffer[trackName]) {
        var track = tracks[trackName];

        if (!track) {
          throw Error("source buffer exists for track " + trackName + ", however track does not");
        } // use levelCodec as first priority


        var codec = track.levelCodec || track.codec;
        var mimeType = track.container + ";codecs=" + codec;
        logger["logger"].log("creating sourceBuffer(" + mimeType + ")");

        try {
          var sb = sourceBuffer[trackName] = mediaSource.addSourceBuffer(mimeType);
          sb.addEventListener('updateend', this._onSBUpdateEnd);
          sb.addEventListener('error', this._onSBUpdateError);
          this.tracks[trackName] = {
            buffer: sb,
            codec: codec,
            id: track.id,
            container: track.container,
            levelCodec: track.levelCodec
          };
        } catch (err) {
          logger["logger"].error("error while trying to add sourceBuffer:" + err.message);
          this.hls.trigger(events["default"].ERROR, {
            type: errors["ErrorTypes"].MEDIA_ERROR,
            details: errors["ErrorDetails"].BUFFER_ADD_CODEC_ERROR,
            fatal: false,
            err: err,
            mimeType: mimeType
          });
        }
      }
    }

    this.hls.trigger(events["default"].BUFFER_CREATED, {
      tracks: this.tracks
    });
  };

  _proto.onBufferAppending = function onBufferAppending(data) {
    if (!this._needsFlush) {
      if (!this.segments) {
        this.segments = [data];
      } else {
        this.segments.push(data);
      }

      this.doAppending();
    }
  } // on BUFFER_EOS mark matching sourcebuffer(s) as ended and trigger checkEos()
  // an undefined data.type will mark all buffers as EOS.
  ;

  _proto.onBufferEos = function onBufferEos(data) {
    for (var type in this.sourceBuffer) {
      if (!data.type || data.type === type) {
        var sb = this.sourceBuffer[type];

        if (sb && !sb.ended) {
          sb.ended = true;
          logger["logger"].log(type + " sourceBuffer now EOS");
        }
      }
    }

    this.checkEos();
  } // if all source buffers are marked as ended, signal endOfStream() to MediaSource.
  ;

  _proto.checkEos = function checkEos() {
    var sourceBuffer = this.sourceBuffer,
        mediaSource = this.mediaSource;

    if (!mediaSource || mediaSource.readyState !== 'open') {
      this._needsEos = false;
      return;
    }

    for (var type in sourceBuffer) {
      var sb = sourceBuffer[type];
      if (!sb) continue;

      if (!sb.ended) {
        return;
      }

      if (sb.updating) {
        this._needsEos = true;
        return;
      }
    }

    logger["logger"].log('all media data are available, signal endOfStream() to MediaSource and stop loading fragment'); // Notify the media element that it now has all of the media data

    try {
      mediaSource.endOfStream();
    } catch (e) {
      logger["logger"].warn('exception while calling mediaSource.endOfStream()');
    }

    this._needsEos = false;
  };

  _proto.onBufferFlushing = function onBufferFlushing(data) {
    if (data.type) {
      this.flushRange.push({
        start: data.startOffset,
        end: data.endOffset,
        type: data.type
      });
    } else {
      this.flushRange.push({
        start: data.startOffset,
        end: data.endOffset,
        type: 'video'
      });
      this.flushRange.push({
        start: data.startOffset,
        end: data.endOffset,
        type: 'audio'
      });
    } // attempt flush immediately


    this.flushBufferCounter = 0;
    this.doFlush();
  };

  _proto.flushLiveBackBuffer = function flushLiveBackBuffer() {
    // clear back buffer for live only
    if (!this._live) {
      return;
    }

    var liveBackBufferLength = this.config.liveBackBufferLength;

    if (!isFinite(liveBackBufferLength) || liveBackBufferLength < 0) {
      return;
    }

    if (!this.media) {
      logger["logger"].error('flushLiveBackBuffer called without attaching media');
      return;
    }

    var currentTime = this.media.currentTime;
    var sourceBuffer = this.sourceBuffer;
    var bufferTypes = Object.keys(sourceBuffer);
    var targetBackBufferPosition = currentTime - Math.max(liveBackBufferLength, this._levelTargetDuration);

    for (var index = bufferTypes.length - 1; index >= 0; index--) {
      var bufferType = bufferTypes[index];
      var sb = sourceBuffer[bufferType];

      if (sb) {
        var buffered = sb.buffered; // when target buffer start exceeds actual buffer start

        if (buffered.length > 0 && targetBackBufferPosition > buffered.start(0)) {
          // remove buffer up until current time minus minimum back buffer length (removing buffer too close to current
          // time will lead to playback freezing)
          // credits for level target duration - https://github.com/videojs/http-streaming/blob/3132933b6aa99ddefab29c10447624efd6fd6e52/src/segment-loader.js#L91
          if (this.removeBufferRange(bufferType, sb, 0, targetBackBufferPosition)) {
            this.hls.trigger(events["default"].LIVE_BACK_BUFFER_REACHED, {
              bufferEnd: targetBackBufferPosition
            });
          }
        }
      }
    }
  };

  _proto.onLevelUpdated = function onLevelUpdated(_ref) {
    var details = _ref.details;

    if (details.fragments.length > 0) {
      this._levelDuration = details.totalduration + details.fragments[0].start;
      this._levelTargetDuration = details.averagetargetduration || details.targetduration || 10;
      this._live = details.live;
      this.updateMediaElementDuration();
    }
  }
  /**
   * Update Media Source duration to current level duration or override to Infinity if configuration parameter
   * 'liveDurationInfinity` is set to `true`
   * More details: https://github.com/video-dev/hls.js/issues/355
   */
  ;

  _proto.updateMediaElementDuration = function updateMediaElementDuration() {
    var config = this.config;
    var duration;

    if (this._levelDuration === null || !this.media || !this.mediaSource || !this.sourceBuffer || this.media.readyState === 0 || this.mediaSource.readyState !== 'open') {
      return;
    }

    for (var type in this.sourceBuffer) {
      var sb = this.sourceBuffer[type];

      if (sb && sb.updating === true) {
        // can't set duration whilst a buffer is updating
        return;
      }
    }

    duration = this.media.duration; // initialise to the value that the media source is reporting

    if (this._msDuration === null) {
      this._msDuration = this.mediaSource.duration;
    }

    if (this._live === true && config.liveDurationInfinity === true) {
      // Override duration to Infinity
      logger["logger"].log('Media Source duration is set to Infinity');
      this._msDuration = this.mediaSource.duration = Infinity;
    } else if (this._levelDuration > this._msDuration && this._levelDuration > duration || !Object(number["isFiniteNumber"])(duration)) {
      // levelDuration was the last value we set.
      // not using mediaSource.duration as the browser may tweak this value
      // only update Media Source duration if its value increase, this is to avoid
      // flushing already buffered portion when switching between quality level
      logger["logger"].log("Updating Media Source duration to " + this._levelDuration.toFixed(3));
      this._msDuration = this.mediaSource.duration = this._levelDuration;
    }
  };

  _proto.doFlush = function doFlush() {
    // loop through all buffer ranges to flush
    while (this.flushRange.length) {
      var range = this.flushRange[0]; // flushBuffer will abort any buffer append in progress and flush Audio/Video Buffer

      if (this.flushBuffer(range.start, range.end, range.type)) {
        // range flushed, remove from flush array
        this.flushRange.shift();
        this.flushBufferCounter = 0;
      } else {
        this._needsFlush = true; // avoid looping, wait for SB update end to retrigger a flush

        return;
      }
    }

    if (this.flushRange.length === 0) {
      // everything flushed
      this._needsFlush = false; // let's recompute this.appended, which is used to avoid flush looping

      var appended = 0;
      var sourceBuffer = this.sourceBuffer;

      try {
        for (var type in sourceBuffer) {
          var sb = sourceBuffer[type];

          if (sb) {
            appended += sb.buffered.length;
          }
        }
      } catch (error) {
        // error could be thrown while accessing buffered, in case sourcebuffer has already been removed from MediaSource
        // this is harmess at this stage, catch this to avoid reporting an internal exception
        logger["logger"].error('error while accessing sourceBuffer.buffered');
      }

      this.appended = appended;
      this.hls.trigger(events["default"].BUFFER_FLUSHED);
    }
  };

  _proto.doAppending = function doAppending() {
    var config = this.config,
        hls = this.hls,
        segments = this.segments,
        sourceBuffer = this.sourceBuffer;

    if (!Object.keys(sourceBuffer).length) {
      // early exit if no source buffers have been initialized yet
      return;
    }

    if (!this.media || this.media.error) {
      this.segments = [];
      logger["logger"].error('trying to append although a media error occured, flush segment and abort');
      return;
    }

    if (this.appending) {
      // logger.log(`sb appending in progress`);
      return;
    }

    var segment = segments.shift();

    if (!segment) {
      // handle undefined shift
      return;
    }

    try {
      var sb = sourceBuffer[segment.type];

      if (!sb) {
        // in case we don't have any source buffer matching with this segment type,
        // it means that Mediasource fails to create sourcebuffer
        // discard this segment, and trigger update end
        this._onSBUpdateEnd();

        return;
      }

      if (sb.updating) {
        // if we are still updating the source buffer from the last segment, place this back at the front of the queue
        segments.unshift(segment);
        return;
      } // reset sourceBuffer ended flag before appending segment


      sb.ended = false; // logger.log(`appending ${segment.content} ${type} SB, size:${segment.data.length}, ${segment.parent}`);

      this.parent = segment.parent;
      sb.appendBuffer(segment.data);
      this.appendError = 0;
      this.appended++;
      this.appending = true;
    } catch (err) {
      // in case any error occured while appending, put back segment in segments table
      logger["logger"].error("error while trying to append buffer:" + err.message);
      segments.unshift(segment);
      var event = {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        parent: segment.parent,
        details: '',
        fatal: false
      };

      if (err.code === 22) {
        // QuotaExceededError: http://www.w3.org/TR/html5/infrastructure.html#quotaexceedederror
        // let's stop appending any segments, and report BUFFER_FULL_ERROR error
        this.segments = [];
        event.details = errors["ErrorDetails"].BUFFER_FULL_ERROR;
      } else {
        this.appendError++;
        event.details = errors["ErrorDetails"].BUFFER_APPEND_ERROR;
        /* with UHD content, we could get loop of quota exceeded error until
          browser is able to evict some data from sourcebuffer. retrying help recovering this
        */

        if (this.appendError > config.appendErrorMaxRetry) {
          logger["logger"].log("fail " + config.appendErrorMaxRetry + " times to append segment in sourceBuffer");
          this.segments = [];
          event.fatal = true;
        }
      }

      hls.trigger(events["default"].ERROR, event);
    }
  }
  /*
    flush specified buffered range,
    return true once range has been flushed.
    as sourceBuffer.remove() is asynchronous, flushBuffer will be retriggered on sourceBuffer update end
  */
  ;

  _proto.flushBuffer = function flushBuffer(startOffset, endOffset, sbType) {
    var sourceBuffer = this.sourceBuffer; // exit if no sourceBuffers are initialized

    if (!Object.keys(sourceBuffer).length) {
      return true;
    }

    var currentTime = 'null';

    if (this.media) {
      currentTime = this.media.currentTime.toFixed(3);
    }

    logger["logger"].log("flushBuffer,pos/start/end: " + currentTime + "/" + startOffset + "/" + endOffset); // safeguard to avoid infinite looping : don't try to flush more than the nb of appended segments

    if (this.flushBufferCounter >= this.appended) {
      logger["logger"].warn('abort flushing too many retries');
      return true;
    }

    var sb = sourceBuffer[sbType]; // we are going to flush buffer, mark source buffer as 'not ended'

    if (sb) {
      sb.ended = false;

      if (!sb.updating) {
        if (this.removeBufferRange(sbType, sb, startOffset, endOffset)) {
          this.flushBufferCounter++;
          return false;
        }
      } else {
        logger["logger"].warn('cannot flush, sb updating in progress');
        return false;
      }
    }

    logger["logger"].log('buffer flushed'); // everything flushed !

    return true;
  }
  /**
   * Removes first buffered range from provided source buffer that lies within given start and end offsets.
   *
   * @param {string} type Type of the source buffer, logging purposes only.
   * @param {SourceBuffer} sb Target SourceBuffer instance.
   * @param {number} startOffset
   * @param {number} endOffset
   *
   * @returns {boolean} True when source buffer remove requested.
   */
  ;

  _proto.removeBufferRange = function removeBufferRange(type, sb, startOffset, endOffset) {
    try {
      for (var i = 0; i < sb.buffered.length; i++) {
        var bufStart = sb.buffered.start(i);
        var bufEnd = sb.buffered.end(i);
        var removeStart = Math.max(bufStart, startOffset);
        var removeEnd = Math.min(bufEnd, endOffset);
        /* sometimes sourcebuffer.remove() does not flush
          the exact expected time range.
          to avoid rounding issues/infinite loop,
          only flush buffer range of length greater than 500ms.
        */

        if (Math.min(removeEnd, bufEnd) - removeStart > 0.5) {
          var currentTime = 'null';

          if (this.media) {
            currentTime = this.media.currentTime.toString();
          }

          logger["logger"].log("sb remove " + type + " [" + removeStart + "," + removeEnd + "], of [" + bufStart + "," + bufEnd + "], pos:" + currentTime);
          sb.remove(removeStart, removeEnd);
          return true;
        }
      }
    } catch (error) {
      logger["logger"].warn('removeBufferRange failed', error);
    }

    return false;
  };

  return BufferController;
}(event_handler);

/* harmony default export */ var buffer_controller = (buffer_controller_BufferController);
// CONCATENATED MODULE: ./src/controller/cap-level-controller.js
function cap_level_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function cap_level_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) cap_level_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) cap_level_controller_defineProperties(Constructor, staticProps); return Constructor; }

function cap_level_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * cap stream level to media size dimension controller
*/



var cap_level_controller_CapLevelController = /*#__PURE__*/function (_EventHandler) {
  cap_level_controller_inheritsLoose(CapLevelController, _EventHandler);

  function CapLevelController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].FPS_DROP_LEVEL_CAPPING, events["default"].MEDIA_ATTACHING, events["default"].MANIFEST_PARSED, events["default"].LEVELS_UPDATED, events["default"].BUFFER_CODECS, events["default"].MEDIA_DETACHING) || this;
    _this.autoLevelCapping = Number.POSITIVE_INFINITY;
    _this.firstLevel = null;
    _this.levels = [];
    _this.media = null;
    _this.restrictedLevels = [];
    _this.timer = null;
    _this.clientRect = null;
    return _this;
  }

  var _proto = CapLevelController.prototype;

  _proto.destroy = function destroy() {
    if (this.hls.config.capLevelToPlayerSize) {
      this.media = null;
      this.clientRect = null;
      this.stopCapping();
    }
  };

  _proto.onFpsDropLevelCapping = function onFpsDropLevelCapping(data) {
    // Don't add a restricted level more than once
    if (CapLevelController.isLevelAllowed(data.droppedLevel, this.restrictedLevels)) {
      this.restrictedLevels.push(data.droppedLevel);
    }
  };

  _proto.onMediaAttaching = function onMediaAttaching(data) {
    this.media = data.media instanceof window.HTMLVideoElement ? data.media : null;
  };

  _proto.onManifestParsed = function onManifestParsed(data) {
    var hls = this.hls;
    this.restrictedLevels = [];
    this.levels = data.levels;
    this.firstLevel = data.firstLevel;

    if (hls.config.capLevelToPlayerSize && data.video) {
      // Start capping immediately if the manifest has signaled video codecs
      this.startCapping();
    }
  } // Only activate capping when playing a video stream; otherwise, multi-bitrate audio-only streams will be restricted
  // to the first level
  ;

  _proto.onBufferCodecs = function onBufferCodecs(data) {
    var hls = this.hls;

    if (hls.config.capLevelToPlayerSize && data.video) {
      // If the manifest did not signal a video codec capping has been deferred until we're certain video is present
      this.startCapping();
    }
  };

  _proto.onLevelsUpdated = function onLevelsUpdated(data) {
    this.levels = data.levels;
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    this.stopCapping();
  };

  _proto.detectPlayerSize = function detectPlayerSize() {
    if (this.media) {
      var levelsLength = this.levels ? this.levels.length : 0;

      if (levelsLength) {
        var hls = this.hls;
        hls.autoLevelCapping = this.getMaxLevel(levelsLength - 1);

        if (hls.autoLevelCapping > this.autoLevelCapping) {
          // if auto level capping has a higher value for the previous one, flush the buffer using nextLevelSwitch
          // usually happen when the user go to the fullscreen mode.
          hls.streamController.nextLevelSwitch();
        }

        this.autoLevelCapping = hls.autoLevelCapping;
      }
    }
  }
  /*
  * returns level should be the one with the dimensions equal or greater than the media (player) dimensions (so the video will be downscaled)
  */
  ;

  _proto.getMaxLevel = function getMaxLevel(capLevelIndex) {
    var _this2 = this;

    if (!this.levels) {
      return -1;
    }

    var validLevels = this.levels.filter(function (level, index) {
      return CapLevelController.isLevelAllowed(index, _this2.restrictedLevels) && index <= capLevelIndex;
    });
    this.clientRect = null;
    return CapLevelController.getMaxLevelByMediaSize(validLevels, this.mediaWidth, this.mediaHeight);
  };

  _proto.startCapping = function startCapping() {
    if (this.timer) {
      // Don't reset capping if started twice; this can happen if the manifest signals a video codec
      return;
    }

    this.autoLevelCapping = Number.POSITIVE_INFINITY;
    this.hls.firstLevel = this.getMaxLevel(this.firstLevel);
    clearInterval(this.timer);
    this.timer = setInterval(this.detectPlayerSize.bind(this), 1000);
    this.detectPlayerSize();
  };

  _proto.stopCapping = function stopCapping() {
    this.restrictedLevels = [];
    this.firstLevel = null;
    this.autoLevelCapping = Number.POSITIVE_INFINITY;

    if (this.timer) {
      this.timer = clearInterval(this.timer);
      this.timer = null;
    }
  };

  _proto.getDimensions = function getDimensions() {
    if (this.clientRect) {
      return this.clientRect;
    }

    var media = this.media;
    var boundsRect = {
      width: 0,
      height: 0
    };

    if (media) {
      var clientRect = media.getBoundingClientRect();
      boundsRect.width = clientRect.width;
      boundsRect.height = clientRect.height;

      if (!boundsRect.width && !boundsRect.height) {
        // When the media element has no width or height (equivalent to not being in the DOM),
        // then use its width and height attributes (media.width, media.height)
        boundsRect.width = clientRect.right - clientRect.left || media.width || 0;
        boundsRect.height = clientRect.bottom - clientRect.top || media.height || 0;
      }
    }

    this.clientRect = boundsRect;
    return boundsRect;
  };

  CapLevelController.isLevelAllowed = function isLevelAllowed(level, restrictedLevels) {
    if (restrictedLevels === void 0) {
      restrictedLevels = [];
    }

    return restrictedLevels.indexOf(level) === -1;
  };

  CapLevelController.getMaxLevelByMediaSize = function getMaxLevelByMediaSize(levels, width, height) {
    if (!levels || levels && !levels.length) {
      return -1;
    } // Levels can have the same dimensions but differing bandwidths - since levels are ordered, we can look to the next
    // to determine whether we've chosen the greatest bandwidth for the media's dimensions


    var atGreatestBandiwdth = function atGreatestBandiwdth(curLevel, nextLevel) {
      if (!nextLevel) {
        return true;
      }

      return curLevel.width !== nextLevel.width || curLevel.height !== nextLevel.height;
    }; // If we run through the loop without breaking, the media's dimensions are greater than every level, so default to
    // the max level


    var maxLevelIndex = levels.length - 1;

    for (var i = 0; i < levels.length; i += 1) {
      var level = levels[i];

      if ((level.width >= width || level.height >= height) && atGreatestBandiwdth(level, levels[i + 1])) {
        maxLevelIndex = i;
        break;
      }
    }

    return maxLevelIndex;
  };

  cap_level_controller_createClass(CapLevelController, [{
    key: "mediaWidth",
    get: function get() {
      return this.getDimensions().width * CapLevelController.contentScaleFactor;
    }
  }, {
    key: "mediaHeight",
    get: function get() {
      return this.getDimensions().height * CapLevelController.contentScaleFactor;
    }
  }], [{
    key: "contentScaleFactor",
    get: function get() {
      var pixelRatio = 1;

      try {
        pixelRatio = window.devicePixelRatio;
      } catch (e) {}

      return pixelRatio;
    }
  }]);

  return CapLevelController;
}(event_handler);

/* harmony default export */ var cap_level_controller = (cap_level_controller_CapLevelController);
// CONCATENATED MODULE: ./src/controller/fps-controller.js
function fps_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * FPS Controller
*/



var fps_controller_window = window,
    fps_controller_performance = fps_controller_window.performance;

var fps_controller_FPSController = /*#__PURE__*/function (_EventHandler) {
  fps_controller_inheritsLoose(FPSController, _EventHandler);

  function FPSController(hls) {
    return _EventHandler.call(this, hls, events["default"].MEDIA_ATTACHING) || this;
  }

  var _proto = FPSController.prototype;

  _proto.destroy = function destroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.isVideoPlaybackQualityAvailable = false;
  };

  _proto.onMediaAttaching = function onMediaAttaching(data) {
    var config = this.hls.config;

    if (config.capLevelOnFPSDrop) {
      var video = this.video = data.media instanceof window.HTMLVideoElement ? data.media : null;

      if (typeof video.getVideoPlaybackQuality === 'function') {
        this.isVideoPlaybackQualityAvailable = true;
      }

      clearInterval(this.timer);
      this.timer = setInterval(this.checkFPSInterval.bind(this), config.fpsDroppedMonitoringPeriod);
    }
  };

  _proto.checkFPS = function checkFPS(video, decodedFrames, droppedFrames) {
    var currentTime = fps_controller_performance.now();

    if (decodedFrames) {
      if (this.lastTime) {
        var currentPeriod = currentTime - this.lastTime,
            currentDropped = droppedFrames - this.lastDroppedFrames,
            currentDecoded = decodedFrames - this.lastDecodedFrames,
            droppedFPS = 1000 * currentDropped / currentPeriod,
            hls = this.hls;
        hls.trigger(events["default"].FPS_DROP, {
          currentDropped: currentDropped,
          currentDecoded: currentDecoded,
          totalDroppedFrames: droppedFrames
        });

        if (droppedFPS > 0) {
          // logger.log('checkFPS : droppedFPS/decodedFPS:' + droppedFPS/(1000 * currentDecoded / currentPeriod));
          if (currentDropped > hls.config.fpsDroppedMonitoringThreshold * currentDecoded) {
            var currentLevel = hls.currentLevel;
            logger["logger"].warn('drop FPS ratio greater than max allowed value for currentLevel: ' + currentLevel);

            if (currentLevel > 0 && (hls.autoLevelCapping === -1 || hls.autoLevelCapping >= currentLevel)) {
              currentLevel = currentLevel - 1;
              hls.trigger(events["default"].FPS_DROP_LEVEL_CAPPING, {
                level: currentLevel,
                droppedLevel: hls.currentLevel
              });
              hls.autoLevelCapping = currentLevel;
              hls.streamController.nextLevelSwitch();
            }
          }
        }
      }

      this.lastTime = currentTime;
      this.lastDroppedFrames = droppedFrames;
      this.lastDecodedFrames = decodedFrames;
    }
  };

  _proto.checkFPSInterval = function checkFPSInterval() {
    var video = this.video;

    if (video) {
      if (this.isVideoPlaybackQualityAvailable) {
        var videoPlaybackQuality = video.getVideoPlaybackQuality();
        this.checkFPS(video, videoPlaybackQuality.totalVideoFrames, videoPlaybackQuality.droppedVideoFrames);
      } else {
        this.checkFPS(video, video.webkitDecodedFrameCount, video.webkitDroppedFrameCount);
      }
    }
  };

  return FPSController;
}(event_handler);

/* harmony default export */ var fps_controller = (fps_controller_FPSController);
// CONCATENATED MODULE: ./src/utils/xhr-loader.js
/**
 * XHR based logger
*/


var xhr_loader_XhrLoader = /*#__PURE__*/function () {
  function XhrLoader(config) {
    if (config && config.xhrSetup) {
      this.xhrSetup = config.xhrSetup;
    }
  }

  var _proto = XhrLoader.prototype;

  _proto.destroy = function destroy() {
    this.abort();
    this.loader = null;
  };

  _proto.abort = function abort() {
    var loader = this.loader;

    if (loader && loader.readyState !== 4) {
      this.stats.aborted = true;
      loader.abort();
    }

    window.clearTimeout(this.requestTimeout);
    this.requestTimeout = null;
    window.clearTimeout(this.retryTimeout);
    this.retryTimeout = null;
  };

  _proto.load = function load(context, config, callbacks) {
    this.context = context;
    this.config = config;
    this.callbacks = callbacks;
    this.stats = {
      trequest: window.performance.now(),
      retry: 0
    };
    this.retryDelay = config.retryDelay;
    this.loadInternal();
  };

  _proto.loadInternal = function loadInternal() {
    var xhr,
        context = this.context;
    xhr = this.loader = new window.XMLHttpRequest();
    var stats = this.stats;
    stats.tfirst = 0;
    stats.loaded = 0;
    var xhrSetup = this.xhrSetup;

    try {
      if (xhrSetup) {
        try {
          xhrSetup(xhr, context.url);
        } catch (e) {
          // fix xhrSetup: (xhr, url) => {xhr.setRequestHeader("Content-Language", "test");}
          // not working, as xhr.setRequestHeader expects xhr.readyState === OPEN
          xhr.open('GET', context.url, true);
          xhrSetup(xhr, context.url);
        }
      }

      if (!xhr.readyState) {
        xhr.open('GET', context.url, true);
      }
    } catch (e) {
      // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
      this.callbacks.onError({
        code: xhr.status,
        text: e.message
      }, context, xhr);
      return;
    }

    if (context.rangeEnd) {
      xhr.setRequestHeader('Range', 'bytes=' + context.rangeStart + '-' + (context.rangeEnd - 1));
    }

    xhr.onreadystatechange = this.readystatechange.bind(this);
    xhr.onprogress = this.loadprogress.bind(this);
    xhr.responseType = context.responseType; // setup timeout before we perform request

    this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout);
    xhr.send();
  };

  _proto.readystatechange = function readystatechange(event) {
    var xhr = event.currentTarget,
        readyState = xhr.readyState,
        stats = this.stats,
        context = this.context,
        config = this.config; // don't proceed if xhr has been aborted

    if (stats.aborted) {
      return;
    } // >= HEADERS_RECEIVED


    if (readyState >= 2) {
      // clear xhr timeout and rearm it if readyState less than 4
      window.clearTimeout(this.requestTimeout);

      if (stats.tfirst === 0) {
        stats.tfirst = Math.max(window.performance.now(), stats.trequest);
      }

      if (readyState === 4) {
        var status = xhr.status; // http status between 200 to 299 are all successful

        if (status >= 200 && status < 300) {
          stats.tload = Math.max(stats.tfirst, window.performance.now());
          var data, len;

          if (context.responseType === 'arraybuffer') {
            data = xhr.response;
            len = data.byteLength;
          } else {
            data = xhr.responseText;
            len = data.length;
          }

          stats.loaded = stats.total = len;
          var response = {
            url: xhr.responseURL,
            data: data
          };
          this.callbacks.onSuccess(response, stats, context, xhr);
        } else {
          // if max nb of retries reached or if http status between 400 and 499 (such error cannot be recovered, retrying is useless), return error
          if (stats.retry >= config.maxRetry || status >= 400 && status < 499) {
            logger["logger"].error(status + " while loading " + context.url);
            this.callbacks.onError({
              code: status,
              text: xhr.statusText
            }, context, xhr);
          } else {
            // retry
            logger["logger"].warn(status + " while loading " + context.url + ", retrying in " + this.retryDelay + "..."); // aborts and resets internal state

            this.destroy(); // schedule retry

            this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay); // set exponential backoff

            this.retryDelay = Math.min(2 * this.retryDelay, config.maxRetryDelay);
            stats.retry++;
          }
        }
      } else {
        // readyState >= 2 AND readyState !==4 (readyState = HEADERS_RECEIVED || LOADING) rearm timeout as xhr not finished yet
        this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), config.timeout);
      }
    }
  };

  _proto.loadtimeout = function loadtimeout() {
    logger["logger"].warn("timeout while loading " + this.context.url);
    this.callbacks.onTimeout(this.stats, this.context, null);
  };

  _proto.loadprogress = function loadprogress(event) {
    var xhr = event.currentTarget,
        stats = this.stats;
    stats.loaded = event.loaded;

    if (event.lengthComputable) {
      stats.total = event.total;
    }

    var onProgress = this.callbacks.onProgress;

    if (onProgress) {
      // third arg is to provide on progress data
      onProgress(stats, this.context, null, xhr);
    }
  };

  return XhrLoader;
}();

/* harmony default export */ var xhr_loader = (xhr_loader_XhrLoader);
// CONCATENATED MODULE: ./src/controller/audio-track-controller.js
function audio_track_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function audio_track_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) audio_track_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) audio_track_controller_defineProperties(Constructor, staticProps); return Constructor; }

function audio_track_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





/**
 * @class AudioTrackController
 * @implements {EventHandler}
 *
 * Handles main manifest and audio-track metadata loaded,
 * owns and exposes the selectable audio-tracks data-models.
 *
 * Exposes internal interface to select available audio-tracks.
 *
 * Handles errors on loading audio-track playlists. Manages fallback mechanism
 * with redundants tracks (group-IDs).
 *
 * Handles level-loading and group-ID switches for video (fallback on video levels),
 * and eventually adapts the audio-track group-ID to match.
 *
 * @fires AUDIO_TRACK_LOADING
 * @fires AUDIO_TRACK_SWITCHING
 * @fires AUDIO_TRACKS_UPDATED
 * @fires ERROR
 *
 */

var audio_track_controller_AudioTrackController = /*#__PURE__*/function (_TaskLoop) {
  audio_track_controller_inheritsLoose(AudioTrackController, _TaskLoop);

  function AudioTrackController(hls) {
    var _this;

    _this = _TaskLoop.call(this, hls, events["default"].MANIFEST_LOADING, events["default"].MANIFEST_PARSED, events["default"].AUDIO_TRACK_LOADED, events["default"].AUDIO_TRACK_SWITCHED, events["default"].LEVEL_LOADED, events["default"].ERROR) || this;
    /**
     * @private
     * Currently selected index in `tracks`
     * @member {number} trackId
     */

    _this._trackId = -1;
    /**
     * @private
     * If should select tracks according to default track attribute
     * @member {boolean} _selectDefaultTrack
     */

    _this._selectDefaultTrack = true;
    /**
     * @public
     * All tracks available
     * @member {AudioTrack[]}
     */

    _this.tracks = [];
    /**
     * @public
     * List of blacklisted audio track IDs (that have caused failure)
     * @member {number[]}
     */

    _this.trackIdBlacklist = Object.create(null);
    /**
     * @public
     * The currently running group ID for audio
     * (we grab this on manifest-parsed and new level-loaded)
     * @member {string}
     */

    _this.audioGroupId = null;
    return _this;
  }
  /**
   * Reset audio tracks on new manifest loading.
   */


  var _proto = AudioTrackController.prototype;

  _proto.onManifestLoading = function onManifestLoading() {
    this.tracks = [];
    this._trackId = -1;
    this._selectDefaultTrack = true;
  }
  /**
   * Store tracks data from manifest parsed data.
   *
   * Trigger AUDIO_TRACKS_UPDATED event.
   *
   * @param {*} data
   */
  ;

  _proto.onManifestParsed = function onManifestParsed(data) {
    var tracks = this.tracks = data.audioTracks || [];
    this.hls.trigger(events["default"].AUDIO_TRACKS_UPDATED, {
      audioTracks: tracks
    });

    this._selectAudioGroup(this.hls.nextLoadLevel);
  }
  /**
   * Store track details of loaded track in our data-model.
   *
   * Set-up metadata update interval task for live-mode streams.
   *
   * @param {*} data
   */
  ;

  _proto.onAudioTrackLoaded = function onAudioTrackLoaded(data) {
    if (data.id >= this.tracks.length) {
      logger["logger"].warn('Invalid audio track id:', data.id);
      return;
    }

    logger["logger"].log("audioTrack " + data.id + " loaded");
    this.tracks[data.id].details = data.details; // check if current playlist is a live playlist
    // and if we have already our reload interval setup

    if (data.details.live && !this.hasInterval()) {
      // if live playlist we will have to reload it periodically
      // set reload period to playlist target duration
      var updatePeriodMs = data.details.targetduration * 1000;
      this.setInterval(updatePeriodMs);
    }

    if (!data.details.live && this.hasInterval()) {
      // playlist is not live and timer is scheduled: cancel it
      this.clearInterval();
    }
  }
  /**
   * Update the internal group ID to any audio-track we may have set manually
   * or because of a failure-handling fallback.
   *
   * Quality-levels should update to that group ID in this case.
   *
   * @param {*} data
   */
  ;

  _proto.onAudioTrackSwitched = function onAudioTrackSwitched(data) {
    var audioGroupId = this.tracks[data.id].groupId;

    if (audioGroupId && this.audioGroupId !== audioGroupId) {
      this.audioGroupId = audioGroupId;
    }
  }
  /**
   * When a level gets loaded, if it has redundant audioGroupIds (in the same ordinality as it's redundant URLs)
   * we are setting our audio-group ID internally to the one set, if it is different from the group ID currently set.
   *
   * If group-ID got update, we re-select the appropriate audio-track with this group-ID matching the currently
   * selected one (based on NAME property).
   *
   * @param {*} data
   */
  ;

  _proto.onLevelLoaded = function onLevelLoaded(data) {
    this._selectAudioGroup(data.level);
  }
  /**
   * Handle network errors loading audio track manifests
   * and also pausing on any netwok errors.
   *
   * @param {ErrorEventData} data
   */
  ;

  _proto.onError = function onError(data) {
    // Only handle network errors
    if (data.type !== errors["ErrorTypes"].NETWORK_ERROR) {
      return;
    } // If fatal network error, cancel update task


    if (data.fatal) {
      this.clearInterval();
    } // If not an audio-track loading error don't handle further


    if (data.details !== errors["ErrorDetails"].AUDIO_TRACK_LOAD_ERROR) {
      return;
    }

    logger["logger"].warn('Network failure on audio-track id:', data.context.id);

    this._handleLoadError();
  }
  /**
   * @type {AudioTrack[]} Audio-track list we own
   */
  ;

  /**
   * @private
   * @param {number} newId
   */
  _proto._setAudioTrack = function _setAudioTrack(newId) {
    // noop on same audio track id as already set
    if (this._trackId === newId && this.tracks[this._trackId].details) {
      logger["logger"].debug('Same id as current audio-track passed, and track details available -> no-op');
      return;
    } // check if level idx is valid


    if (newId < 0 || newId >= this.tracks.length) {
      logger["logger"].warn('Invalid id passed to audio-track controller');
      return;
    }

    var audioTrack = this.tracks[newId];
    logger["logger"].log("Now switching to audio-track index " + newId); // stopping live reloading timer if any

    this.clearInterval();
    this._trackId = newId;
    var url = audioTrack.url,
        type = audioTrack.type,
        id = audioTrack.id;
    this.hls.trigger(events["default"].AUDIO_TRACK_SWITCHING, {
      id: id,
      type: type,
      url: url
    });

    this._loadTrackDetailsIfNeeded(audioTrack);
  }
  /**
   * @override
   */
  ;

  _proto.doTick = function doTick() {
    this._updateTrack(this._trackId);
  }
  /**
   * @param levelId
   * @private
   */
  ;

  _proto._selectAudioGroup = function _selectAudioGroup(levelId) {
    var levelInfo = this.hls.levels[levelId];

    if (!levelInfo || !levelInfo.audioGroupIds) {
      return;
    }

    var audioGroupId = levelInfo.audioGroupIds[levelInfo.urlId];

    if (this.audioGroupId !== audioGroupId) {
      this.audioGroupId = audioGroupId;

      this._selectInitialAudioTrack();
    }
  }
  /**
   * Select initial track
   * @private
   */
  ;

  _proto._selectInitialAudioTrack = function _selectInitialAudioTrack() {
    var _this2 = this;

    var tracks = this.tracks;

    if (!tracks.length) {
      return;
    }

    var currentAudioTrack = this.tracks[this._trackId];
    var name = null;

    if (currentAudioTrack) {
      name = currentAudioTrack.name;
    } // Pre-select default tracks if there are any


    if (this._selectDefaultTrack) {
      var defaultTracks = tracks.filter(function (track) {
        return track.default;
      });

      if (defaultTracks.length) {
        tracks = defaultTracks;
      } else {
        logger["logger"].warn('No default audio tracks defined');
      }
    }

    var trackFound = false;

    var traverseTracks = function traverseTracks() {
      // Select track with right group ID
      tracks.forEach(function (track) {
        if (trackFound) {
          return;
        } // We need to match the (pre-)selected group ID
        // and the NAME of the current track.


        if ((!_this2.audioGroupId || track.groupId === _this2.audioGroupId) && (!name || name === track.name)) {
          // If there was a previous track try to stay with the same `NAME`.
          // It should be unique across tracks of same group, and consistent through redundant track groups.
          _this2._setAudioTrack(track.id);

          trackFound = true;
        }
      });
    };

    traverseTracks();

    if (!trackFound) {
      name = null;
      traverseTracks();
    }

    if (!trackFound) {
      logger["logger"].error("No track found for running audio group-ID: " + this.audioGroupId);
      this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].MEDIA_ERROR,
        details: errors["ErrorDetails"].AUDIO_TRACK_LOAD_ERROR,
        fatal: true
      });
    }
  }
  /**
   * @private
   * @param {AudioTrack} audioTrack
   * @returns {boolean}
   */
  ;

  _proto._needsTrackLoading = function _needsTrackLoading(audioTrack) {
    var details = audioTrack.details,
        url = audioTrack.url;

    if (!details || details.live) {
      // check if we face an audio track embedded in main playlist (audio track without URI attribute)
      return !!url;
    }

    return false;
  }
  /**
   * @private
   * @param {AudioTrack} audioTrack
   */
  ;

  _proto._loadTrackDetailsIfNeeded = function _loadTrackDetailsIfNeeded(audioTrack) {
    if (this._needsTrackLoading(audioTrack)) {
      var url = audioTrack.url,
          id = audioTrack.id; // track not retrieved yet, or live playlist we need to (re)load it

      logger["logger"].log("loading audio-track playlist for id: " + id);
      this.hls.trigger(events["default"].AUDIO_TRACK_LOADING, {
        url: url,
        id: id
      });
    }
  }
  /**
   * @private
   * @param {number} newId
   */
  ;

  _proto._updateTrack = function _updateTrack(newId) {
    // check if level idx is valid
    if (newId < 0 || newId >= this.tracks.length) {
      return;
    } // stopping live reloading timer if any


    this.clearInterval();
    this._trackId = newId;
    logger["logger"].log("trying to update audio-track " + newId);
    var audioTrack = this.tracks[newId];

    this._loadTrackDetailsIfNeeded(audioTrack);
  }
  /**
   * @private
   */
  ;

  _proto._handleLoadError = function _handleLoadError() {
    // First, let's black list current track id
    this.trackIdBlacklist[this._trackId] = true; // Let's try to fall back on a functional audio-track with the same group ID

    var previousId = this._trackId;
    var _this$tracks$previous = this.tracks[previousId],
        name = _this$tracks$previous.name,
        language = _this$tracks$previous.language,
        groupId = _this$tracks$previous.groupId;
    logger["logger"].warn("Loading failed on audio track id: " + previousId + ", group-id: " + groupId + ", name/language: \"" + name + "\" / \"" + language + "\""); // Find a non-blacklisted track ID with the same NAME
    // At least a track that is not blacklisted, thus on another group-ID.

    var newId = previousId;

    for (var i = 0; i < this.tracks.length; i++) {
      if (this.trackIdBlacklist[i]) {
        continue;
      }

      var newTrack = this.tracks[i];

      if (newTrack.name === name) {
        newId = i;
        break;
      }
    }

    if (newId === previousId) {
      logger["logger"].warn("No fallback audio-track found for name/language: \"" + name + "\" / \"" + language + "\"");
      return;
    }

    logger["logger"].log('Attempting audio-track fallback id:', newId, 'group-id:', this.tracks[newId].groupId);

    this._setAudioTrack(newId);
  };

  audio_track_controller_createClass(AudioTrackController, [{
    key: "audioTracks",
    get: function get() {
      return this.tracks;
    }
    /**
     * @type {number} Index into audio-tracks list of currently selected track.
     */

  }, {
    key: "audioTrack",
    get: function get() {
      return this._trackId;
    }
    /**
     * Select current track by index
     */
    ,
    set: function set(newId) {
      this._setAudioTrack(newId); // If audio track is selected from API then don't choose from the manifest default track


      this._selectDefaultTrack = false;
    }
  }]);

  return AudioTrackController;
}(TaskLoop);

/* harmony default export */ var audio_track_controller = (audio_track_controller_AudioTrackController);
// CONCATENATED MODULE: ./src/controller/audio-stream-controller.js




function audio_stream_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function audio_stream_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) audio_stream_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) audio_stream_controller_defineProperties(Constructor, staticProps); return Constructor; }

function audio_stream_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Audio Stream Controller
*/














var audio_stream_controller_window = window,
    audio_stream_controller_performance = audio_stream_controller_window.performance;
var audio_stream_controller_TICK_INTERVAL = 100; // how often to tick in ms

var audio_stream_controller_AudioStreamController = /*#__PURE__*/function (_BaseStreamController) {
  audio_stream_controller_inheritsLoose(AudioStreamController, _BaseStreamController);

  function AudioStreamController(hls, fragmentTracker) {
    var _this;

    _this = _BaseStreamController.call(this, hls, events["default"].MEDIA_ATTACHED, events["default"].MEDIA_DETACHING, events["default"].AUDIO_TRACKS_UPDATED, events["default"].AUDIO_TRACK_SWITCHING, events["default"].AUDIO_TRACK_LOADED, events["default"].KEY_LOADED, events["default"].FRAG_LOADED, events["default"].FRAG_PARSING_INIT_SEGMENT, events["default"].FRAG_PARSING_DATA, events["default"].FRAG_PARSED, events["default"].ERROR, events["default"].BUFFER_RESET, events["default"].BUFFER_CREATED, events["default"].BUFFER_APPENDED, events["default"].BUFFER_FLUSHED, events["default"].INIT_PTS_FOUND) || this;
    _this.fragmentTracker = fragmentTracker;
    _this.config = hls.config;
    _this.audioCodecSwap = false;
    _this._state = State.STOPPED;
    _this.initPTS = [];
    _this.waitingFragment = null;
    _this.videoTrackCC = null;
    _this.waitingVideoCC = null;
    return _this;
  } // Signal that video PTS was found


  var _proto = AudioStreamController.prototype;

  _proto.onInitPtsFound = function onInitPtsFound(data) {
    var demuxerId = data.id,
        cc = data.frag.cc,
        initPTS = data.initPTS;

    if (demuxerId === 'main') {
      // Always update the new INIT PTS
      // Can change due level switch
      this.initPTS[cc] = initPTS;
      this.videoTrackCC = cc;
      logger["logger"].log("InitPTS for cc: " + cc + " found from main: " + initPTS); // If we are waiting we need to demux/remux the waiting frag
      // With the new initPTS

      if (this.state === State.WAITING_INIT_PTS) {
        this.tick();
      }
    }
  };

  _proto.startLoad = function startLoad(startPosition) {
    if (this.tracks) {
      var lastCurrentTime = this.lastCurrentTime;
      this.stopLoad();
      this.setInterval(audio_stream_controller_TICK_INTERVAL);
      this.fragLoadError = 0;

      if (lastCurrentTime > 0 && startPosition === -1) {
        logger["logger"].log("audio:override startPosition with lastCurrentTime @" + lastCurrentTime.toFixed(3));
        this.state = State.IDLE;
      } else {
        this.lastCurrentTime = this.startPosition ? this.startPosition : startPosition;
        this.state = State.STARTING;
      }

      this.nextLoadPosition = this.startPosition = this.lastCurrentTime;
      this.tick();
    } else {
      this.startPosition = startPosition;
      this.state = State.STOPPED;
    }
  };

  _proto.doTick = function doTick() {
    var pos,
        track,
        trackDetails,
        hls = this.hls,
        config = hls.config; // logger.log('audioStream:' + this.state);

    switch (this.state) {
      case State.ERROR: // don't do anything in error state to avoid breaking further ...

      case State.PAUSED: // don't do anything in paused state either ...

      case State.BUFFER_FLUSHING:
        break;

      case State.STARTING:
        this.state = State.WAITING_TRACK;
        this.loadedmetadata = false;
        break;

      case State.IDLE:
        var tracks = this.tracks; // audio tracks not received => exit loop

        if (!tracks) {
          break;
        } // if video not attached AND
        // start fragment already requested OR start frag prefetch disable
        // exit loop
        // => if media not attached but start frag prefetch is enabled and start frag not requested yet, we will not exit loop


        if (!this.media && (this.startFragRequested || !config.startFragPrefetch)) {
          break;
        } // determine next candidate fragment to be loaded, based on current position and
        //  end of buffer position
        // if we have not yet loaded any fragment, start loading from start position


        if (this.loadedmetadata) {
          pos = this.media.currentTime;
        } else {
          pos = this.nextLoadPosition;

          if (pos === undefined) {
            break;
          }
        }

        var media = this.mediaBuffer ? this.mediaBuffer : this.media;
        var videoBuffer = this.videoBuffer ? this.videoBuffer : this.media;
        var maxBufferHole = pos < config.maxBufferHole ? Math.max(MAX_START_GAP_JUMP, config.maxBufferHole) : config.maxBufferHole;
        var bufferInfo = BufferHelper.bufferInfo(media, pos, maxBufferHole);
        var mainBufferInfo = BufferHelper.bufferInfo(videoBuffer, pos, maxBufferHole);
        var bufferLen = bufferInfo.len;
        var bufferEnd = bufferInfo.end;
        var fragPrevious = this.fragPrevious; // ensure we buffer at least config.maxBufferLength (default 30s) or config.maxMaxBufferLength (default: 600s)
        // whichever is smaller.
        // once we reach that threshold, don't buffer more than video (mainBufferInfo.len)

        var maxConfigBuffer = Math.min(config.maxBufferLength, config.maxMaxBufferLength);
        var maxBufLen = Math.max(maxConfigBuffer, mainBufferInfo.len);
        var audioSwitch = this.audioSwitch;
        var trackId = this.trackId; // if buffer length is less than maxBufLen try to load a new fragment

        if ((bufferLen < maxBufLen || audioSwitch) && trackId < tracks.length) {
          trackDetails = tracks[trackId].details; // if track info not retrieved yet, switch state and wait for track retrieval

          if (typeof trackDetails === 'undefined') {
            this.state = State.WAITING_TRACK;
            break;
          }

          if (!audioSwitch && this._streamEnded(bufferInfo, trackDetails)) {
            this.hls.trigger(events["default"].BUFFER_EOS, {
              type: 'audio'
            });
            this.state = State.ENDED;
            return;
          } // find fragment index, contiguous with end of buffer position


          var fragments = trackDetails.fragments,
              fragLen = fragments.length,
              start = fragments[0].start,
              end = fragments[fragLen - 1].start + fragments[fragLen - 1].duration,
              frag; // When switching audio track, reload audio as close as possible to currentTime

          if (audioSwitch) {
            if (trackDetails.live && !trackDetails.PTSKnown) {
              logger["logger"].log('switching audiotrack, live stream, unknown PTS,load first fragment');
              bufferEnd = 0;
            } else {
              bufferEnd = pos; // if currentTime (pos) is less than alt audio playlist start time, it means that alt audio is ahead of currentTime

              if (trackDetails.PTSKnown && pos < start) {
                // if everything is buffered from pos to start or if audio buffer upfront, let's seek to start
                if (bufferInfo.end > start || bufferInfo.nextStart) {
                  logger["logger"].log('alt audio track ahead of main track, seek to start of alt audio track');
                  this.media.currentTime = start + 0.05;
                } else {
                  return;
                }
              }
            }
          }

          if (trackDetails.initSegment && !trackDetails.initSegment.data) {
            frag = trackDetails.initSegment;
          } // eslint-disable-line brace-style
          // if bufferEnd before start of playlist, load first fragment
          else if (bufferEnd <= start) {
              frag = fragments[0];

              if (this.videoTrackCC !== null && frag.cc !== this.videoTrackCC) {
                // Ensure we find a fragment which matches the continuity of the video track
                frag = findFragWithCC(fragments, this.videoTrackCC);
              }

              if (trackDetails.live && frag.loadIdx && frag.loadIdx === this.fragLoadIdx) {
                // we just loaded this first fragment, and we are still lagging behind the start of the live playlist
                // let's force seek to start
                var nextBuffered = bufferInfo.nextStart ? bufferInfo.nextStart : start;
                logger["logger"].log("no alt audio available @currentTime:" + this.media.currentTime + ", seeking @" + (nextBuffered + 0.05));
                this.media.currentTime = nextBuffered + 0.05;
                return;
              }
            } else {
              var foundFrag;
              var maxFragLookUpTolerance = config.maxFragLookUpTolerance;
              var fragNext = fragPrevious ? fragments[fragPrevious.sn - fragments[0].sn + 1] : undefined;

              if (bufferEnd < end) {
                if (bufferEnd > end - maxFragLookUpTolerance) {
                  maxFragLookUpTolerance = 0;
                } // Prefer the next fragment if it's within tolerance


                if (fragNext && !fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, fragNext)) {
                  foundFrag = fragNext;
                } else {
                  foundFrag = binary_search.search(fragments, function (frag) {
                    return fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, frag);
                  });
                }
              } else {
                // reach end of playlist
                foundFrag = fragments[fragLen - 1];
              }

              if (foundFrag) {
                frag = foundFrag;
                start = foundFrag.start; // logger.log('find SN matching with pos:' +  bufferEnd + ':' + frag.sn);

                if (fragPrevious && frag.level === fragPrevious.level && frag.sn === fragPrevious.sn) {
                  if (frag.sn < trackDetails.endSN) {
                    frag = fragments[frag.sn + 1 - trackDetails.startSN];

                    if (this.fragmentTracker.getState(frag) !== FragmentState.OK) {
                      logger["logger"].log("SN just loaded, load next one: " + frag.sn);
                    }
                  } else {
                    frag = null;
                  }
                }
              }
            }

          if (frag) {
            // logger.log('      loading frag ' + i +',pos/bufEnd:' + pos.toFixed(3) + '/' + bufferEnd.toFixed(3));
            if (frag.encrypted) {
              logger["logger"].log("Loading key for " + frag.sn + " of [" + trackDetails.startSN + " ," + trackDetails.endSN + "],track " + trackId);
              this.state = State.KEY_LOADING;
              hls.trigger(events["default"].KEY_LOADING, {
                frag: frag
              });
            } else {
              // only load if fragment is not loaded or if in audio switch
              // we force a frag loading in audio switch as fragment tracker might not have evicted previous frags in case of quick audio switch
              this.fragCurrent = frag;

              if (audioSwitch || this.fragmentTracker.getState(frag) === FragmentState.NOT_LOADED) {
                logger["logger"].log("Loading " + frag.sn + ", cc: " + frag.cc + " of [" + trackDetails.startSN + " ," + trackDetails.endSN + "],track " + trackId + ", " + (this.loadedmetadata ? 'currentTime' : 'nextLoadPosition') + ": " + pos + ", bufferEnd: " + bufferEnd.toFixed(3));

                if (frag.sn !== 'initSegment') {
                  this.startFragRequested = true;
                }

                if (Object(number["isFiniteNumber"])(frag.sn)) {
                  this.nextLoadPosition = frag.start + frag.duration;
                }

                hls.trigger(events["default"].FRAG_LOADING, {
                  frag: frag
                });
                this.state = State.FRAG_LOADING;
              }
            }
          }
        }

        break;

      case State.WAITING_TRACK:
        track = this.tracks[this.trackId]; // check if playlist is already loaded

        if (track && track.details) {
          this.state = State.IDLE;
        }

        break;

      case State.FRAG_LOADING_WAITING_RETRY:
        var now = audio_stream_controller_performance.now();
        var retryDate = this.retryDate;
        media = this.media;
        var isSeeking = media && media.seeking; // if current time is gt than retryDate, or if media seeking let's switch to IDLE state to retry loading

        if (!retryDate || now >= retryDate || isSeeking) {
          logger["logger"].log('audioStreamController: retryDate reached, switch back to IDLE state');
          this.state = State.IDLE;
        }

        break;

      case State.WAITING_INIT_PTS:
        // Ensure we don't get stuck in the WAITING_INIT_PTS state if the waiting frag CC doesn't match any initPTS
        var waitingFrag = this.waitingFragment;

        if (waitingFrag) {
          var waitingFragCC = waitingFrag.frag.cc;

          if (this.initPTS[waitingFragCC] !== undefined) {
            this.waitingFragment = null;
            this.state = State.FRAG_LOADING;
            this.onFragLoaded(waitingFrag);
          } else if (this.videoTrackCC !== this.waitingVideoCC) {
            // Drop waiting fragment if videoTrackCC has changed since waitingFragment was set and initPTS was not found
            logger["logger"].log("Waiting fragment cc (" + waitingFragCC + ") cancelled because video is at cc " + this.videoTrackCC);
            this.clearWaitingFragment();
          } else {
            // Drop waiting fragment if an earlier fragment is needed
            var _bufferInfo = BufferHelper.bufferInfo(this.mediaBuffer, this.media.currentTime, config.maxBufferHole);

            var waitingFragmentAtPosition = fragmentWithinToleranceTest(_bufferInfo.end, config.maxFragLookUpTolerance, waitingFrag.frag);

            if (waitingFragmentAtPosition < 0) {
              logger["logger"].log("Waiting fragment cc (" + waitingFragCC + ") @ " + waitingFrag.frag.start + " cancelled because another fragment at " + _bufferInfo.end + " is needed");
              this.clearWaitingFragment();
            }
          }
        } else {
          this.state = State.IDLE;
        }

        break;

      case State.STOPPED:
      case State.FRAG_LOADING:
      case State.PARSING:
      case State.PARSED:
      case State.ENDED:
        break;

      default:
        break;
    }
  };

  _proto.clearWaitingFragment = function clearWaitingFragment() {
    var waitingFrag = this.waitingFragment;

    if (waitingFrag) {
      this.fragmentTracker.removeFragment(waitingFrag.frag);
      this.waitingFragment = null;
      this.waitingVideoCC = null;
      this.state = State.IDLE;
    }
  };

  _proto.onMediaAttached = function onMediaAttached(data) {
    var media = this.media = this.mediaBuffer = data.media;
    this.onvseeking = this.onMediaSeeking.bind(this);
    this.onvended = this.onMediaEnded.bind(this);
    media.addEventListener('seeking', this.onvseeking);
    media.addEventListener('ended', this.onvended);
    var config = this.config;

    if (this.tracks && config.autoStartLoad) {
      this.startLoad(config.startPosition);
    }
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    var media = this.media;

    if (media && media.ended) {
      logger["logger"].log('MSE detaching and video ended, reset startPosition');
      this.startPosition = this.lastCurrentTime = 0;
    } // remove video listeners


    if (media) {
      media.removeEventListener('seeking', this.onvseeking);
      media.removeEventListener('ended', this.onvended);
      this.onvseeking = this.onvseeked = this.onvended = null;
    }

    this.media = this.mediaBuffer = this.videoBuffer = null;
    this.loadedmetadata = false;
    this.fragmentTracker.removeAllFragments();
    this.stopLoad();
  };

  _proto.onAudioTracksUpdated = function onAudioTracksUpdated(data) {
    logger["logger"].log('audio tracks updated');
    this.tracks = data.audioTracks;
  };

  _proto.onAudioTrackSwitching = function onAudioTrackSwitching(data) {
    // if any URL found on new audio track, it is an alternate audio track
    var altAudio = !!data.url;
    this.trackId = data.id;
    this.fragCurrent = null;
    this.clearWaitingFragment();
    this.state = State.PAUSED; // destroy useless demuxer when switching audio to main

    if (!altAudio) {
      if (this.demuxer) {
        this.demuxer.destroy();
        this.demuxer = null;
      }
    } else {
      // switching to audio track, start timer if not already started
      this.setInterval(audio_stream_controller_TICK_INTERVAL);
    } // should we switch tracks ?


    if (altAudio) {
      this.audioSwitch = true; // main audio track are handled by stream-controller, just do something if switching to alt audio track

      this.state = State.IDLE;
    }

    this.tick();
  };

  _proto.onAudioTrackLoaded = function onAudioTrackLoaded(data) {
    var newDetails = data.details,
        trackId = data.id,
        track = this.tracks[trackId],
        curDetails = track.details,
        duration = newDetails.totalduration,
        sliding = 0;
    logger["logger"].log("track " + trackId + " loaded [" + newDetails.startSN + "," + newDetails.endSN + "],duration:" + duration);

    if (newDetails.live || curDetails && curDetails.live) {
      if (curDetails && newDetails.fragments.length > 0) {
        // we already have details for that level, merge them
        mergeDetails(curDetails, newDetails);
        sliding = newDetails.fragments[0].start; // TODO
        // this.liveSyncPosition = this.computeLivePosition(sliding, curDetails);

        if (newDetails.PTSKnown) {
          logger["logger"].log("live audio playlist sliding:" + sliding.toFixed(3));
        } else {
          logger["logger"].log('live audio playlist - outdated PTS, unknown sliding');
        }
      } else {
        newDetails.PTSKnown = false;
        logger["logger"].log('live audio playlist - first load, unknown sliding');
      }
    } else {
      newDetails.PTSKnown = false;
    }

    track.details = newDetails; // compute start position

    if (!this.startFragRequested) {
      // compute start position if set to -1. use it straight away if value is defined
      if (this.startPosition === -1) {
        // first, check if start time offset has been set in playlist, if yes, use this value
        var startTimeOffset = newDetails.startTimeOffset;

        if (Object(number["isFiniteNumber"])(startTimeOffset)) {
          logger["logger"].log("start time offset found in playlist, adjust startPosition to " + startTimeOffset);
          this.startPosition = startTimeOffset;
        } else {
          if (newDetails.live) {
            this.startPosition = this.computeLivePosition(sliding, newDetails);
            logger["logger"].log("compute startPosition for audio-track to " + this.startPosition);
          } else {
            this.startPosition = 0;
          }
        }
      }

      this.nextLoadPosition = this.startPosition;
    } // only switch batck to IDLE state if we were waiting for track to start downloading a new fragment


    if (this.state === State.WAITING_TRACK) {
      this.state = State.IDLE;
    } // trigger handler right now


    this.tick();
  };

  _proto.onKeyLoaded = function onKeyLoaded() {
    if (this.state === State.KEY_LOADING) {
      this.state = State.IDLE;
      this.tick();
    }
  };

  _proto.onFragLoaded = function onFragLoaded(data) {
    var fragCurrent = this.fragCurrent,
        fragLoaded = data.frag;

    if (this.state === State.FRAG_LOADING && fragCurrent && fragLoaded.type === 'audio' && fragLoaded.level === fragCurrent.level && fragLoaded.sn === fragCurrent.sn) {
      var track = this.tracks[this.trackId],
          details = track.details,
          duration = details.totalduration,
          trackId = fragCurrent.level,
          sn = fragCurrent.sn,
          cc = fragCurrent.cc,
          audioCodec = this.config.defaultAudioCodec || track.audioCodec || 'mp4a.40.2',
          stats = this.stats = data.stats;

      if (sn === 'initSegment') {
        this.state = State.IDLE;
        stats.tparsed = stats.tbuffered = audio_stream_controller_performance.now();
        details.initSegment.data = data.payload;
        this.hls.trigger(events["default"].FRAG_BUFFERED, {
          stats: stats,
          frag: fragCurrent,
          id: 'audio'
        });
        this.tick();
      } else {
        this.state = State.PARSING; // transmux the MPEG-TS data to ISO-BMFF segments

        this.appended = false;

        if (!this.demuxer) {
          this.demuxer = new demux_demuxer(this.hls, 'audio');
        } // Check if we have video initPTS
        // If not we need to wait for it


        var initPTS = this.initPTS[cc];
        var initSegmentData = details.initSegment ? details.initSegment.data : [];

        if (initPTS !== undefined) {
          this.pendingBuffering = true;
          logger["logger"].log("Demuxing " + sn + " of [" + details.startSN + " ," + details.endSN + "],track " + trackId); // time Offset is accurate if level PTS is known, or if playlist is not sliding (not live)

          var accurateTimeOffset = false; // details.PTSKnown || !details.live;

          this.demuxer.push(data.payload, initSegmentData, audioCodec, null, fragCurrent, duration, accurateTimeOffset, initPTS);
        } else {
          logger["logger"].log("Unknown video PTS for cc " + cc + ", waiting for video PTS before demuxing audio frag " + sn + " of [" + details.startSN + " ," + details.endSN + "],track " + trackId);
          this.waitingFragment = data;
          this.waitingVideoCC = this.videoTrackCC;
          this.state = State.WAITING_INIT_PTS;
        }
      }
    }

    this.fragLoadError = 0;
  };

  _proto.onFragParsingInitSegment = function onFragParsingInitSegment(data) {
    var fragCurrent = this.fragCurrent;
    var fragNew = data.frag;

    if (fragCurrent && data.id === 'audio' && fragNew.sn === fragCurrent.sn && fragNew.level === fragCurrent.level && this.state === State.PARSING) {
      var tracks = data.tracks,
          track; // delete any video track found on audio demuxer

      if (tracks.video) {
        delete tracks.video;
      } // include levelCodec in audio and video tracks


      track = tracks.audio;

      if (track) {
        track.levelCodec = track.codec;
        track.id = data.id;
        this.hls.trigger(events["default"].BUFFER_CODECS, tracks);
        logger["logger"].log("audio track:audio,container:" + track.container + ",codecs[level/parsed]=[" + track.levelCodec + "/" + track.codec + "]");
        var initSegment = track.initSegment;

        if (initSegment) {
          var appendObj = {
            type: 'audio',
            data: initSegment,
            parent: 'audio',
            content: 'initSegment'
          };

          if (this.audioSwitch) {
            this.pendingData = [appendObj];
          } else {
            this.appended = true; // arm pending Buffering flag before appending a segment

            this.pendingBuffering = true;
            this.hls.trigger(events["default"].BUFFER_APPENDING, appendObj);
          }
        } // trigger handler right now


        this.tick();
      }
    }
  };

  _proto.onFragParsingData = function onFragParsingData(data) {
    var _this2 = this;

    var fragCurrent = this.fragCurrent;
    var fragNew = data.frag;

    if (fragCurrent && data.id === 'audio' && data.type === 'audio' && fragNew.sn === fragCurrent.sn && fragNew.level === fragCurrent.level && this.state === State.PARSING) {
      var trackId = this.trackId,
          track = this.tracks[trackId],
          hls = this.hls;

      if (!Object(number["isFiniteNumber"])(data.endPTS)) {
        data.endPTS = data.startPTS + fragCurrent.duration;
        data.endDTS = data.startDTS + fragCurrent.duration;
      }

      fragCurrent.addElementaryStream(ElementaryStreamTypes.AUDIO);
      logger["logger"].log("parsed " + data.type + ",PTS:[" + data.startPTS.toFixed(3) + "," + data.endPTS.toFixed(3) + "],DTS:[" + data.startDTS.toFixed(3) + "/" + data.endDTS.toFixed(3) + "],nb:" + data.nb);
      updateFragPTSDTS(track.details, fragCurrent, data.startPTS, data.endPTS);
      var media = this.media;
      var appendOnBufferFlush = false; // Only flush audio from old audio tracks when PTS is known on new audio track

      if (this.audioSwitch) {
        if (media && media.readyState) {
          var currentTime = media.currentTime;
          logger["logger"].log('switching audio track : currentTime:' + currentTime);

          if (currentTime >= data.startPTS) {
            logger["logger"].log('switching audio track : flushing all audio');
            this.state = State.BUFFER_FLUSHING;
            hls.trigger(events["default"].BUFFER_FLUSHING, {
              startOffset: 0,
              endOffset: Number.POSITIVE_INFINITY,
              type: 'audio'
            });
            appendOnBufferFlush = true; // Lets announce that the initial audio track switch flush occur

            this.audioSwitch = false;
            hls.trigger(events["default"].AUDIO_TRACK_SWITCHED, {
              id: trackId
            });
          }
        } else {
          // Lets announce that the initial audio track switch flush occur
          this.audioSwitch = false;
          hls.trigger(events["default"].AUDIO_TRACK_SWITCHED, {
            id: trackId
          });
        }
      }

      var pendingData = this.pendingData;

      if (!pendingData) {
        logger["logger"].warn('Apparently attempt to enqueue media payload without codec initialization data upfront');
        hls.trigger(events["default"].ERROR, {
          type: errors["ErrorTypes"].MEDIA_ERROR,
          details: null,
          fatal: true
        });
        return;
      }

      if (!this.audioSwitch) {
        [data.data1, data.data2].forEach(function (buffer) {
          if (buffer && buffer.length) {
            pendingData.push({
              type: data.type,
              data: buffer,
              parent: 'audio',
              content: 'data'
            });
          }
        });

        if (!appendOnBufferFlush && pendingData.length) {
          pendingData.forEach(function (appendObj) {
            // only append in PARSING state (rationale is that an appending error could happen synchronously on first segment appending)
            // in that case it is useless to append following segments
            if (_this2.state === State.PARSING) {
              // arm pending Buffering flag before appending a segment
              _this2.pendingBuffering = true;

              _this2.hls.trigger(events["default"].BUFFER_APPENDING, appendObj);
            }
          });
          this.pendingData = [];
          this.appended = true;
        }
      } // trigger handler right now


      this.tick();
    }
  };

  _proto.onFragParsed = function onFragParsed(data) {
    var fragCurrent = this.fragCurrent;
    var fragNew = data.frag;

    if (fragCurrent && data.id === 'audio' && fragNew.sn === fragCurrent.sn && fragNew.level === fragCurrent.level && this.state === State.PARSING) {
      this.stats.tparsed = audio_stream_controller_performance.now();
      this.state = State.PARSED;

      this._checkAppendedParsed();
    }
  };

  _proto.onBufferReset = function onBufferReset() {
    // reset reference to sourcebuffers
    this.mediaBuffer = this.videoBuffer = null;
    this.loadedmetadata = false;
  };

  _proto.onBufferCreated = function onBufferCreated(data) {
    var audioTrack = data.tracks.audio;

    if (audioTrack) {
      this.mediaBuffer = audioTrack.buffer;
      this.loadedmetadata = true;
    }

    if (data.tracks.video) {
      this.videoBuffer = data.tracks.video.buffer;
    }
  };

  _proto.onBufferAppended = function onBufferAppended(data) {
    if (data.parent === 'audio') {
      var state = this.state;

      if (state === State.PARSING || state === State.PARSED) {
        // check if all buffers have been appended
        this.pendingBuffering = data.pending > 0;

        this._checkAppendedParsed();
      }
    }
  };

  _proto._checkAppendedParsed = function _checkAppendedParsed() {
    // trigger handler right now
    if (this.state === State.PARSED && (!this.appended || !this.pendingBuffering)) {
      var frag = this.fragCurrent,
          stats = this.stats,
          hls = this.hls;

      if (frag) {
        this.fragPrevious = frag;
        stats.tbuffered = audio_stream_controller_performance.now();
        hls.trigger(events["default"].FRAG_BUFFERED, {
          stats: stats,
          frag: frag,
          id: 'audio'
        });
        var media = this.mediaBuffer ? this.mediaBuffer : this.media;

        if (media) {
          logger["logger"].log("audio buffered : " + time_ranges.toString(media.buffered));
        }

        if (this.audioSwitch && this.appended) {
          this.audioSwitch = false;
          hls.trigger(events["default"].AUDIO_TRACK_SWITCHED, {
            id: this.trackId
          });
        }

        this.state = State.IDLE;
      }

      this.tick();
    }
  };

  _proto.onError = function onError(data) {
    var frag = data.frag; // don't handle frag error not related to audio fragment

    if (frag && frag.type !== 'audio') {
      return;
    }

    switch (data.details) {
      case errors["ErrorDetails"].FRAG_LOAD_ERROR:
      case errors["ErrorDetails"].FRAG_LOAD_TIMEOUT:
        var _frag = data.frag; // don't handle frag error not related to audio fragment

        if (_frag && _frag.type !== 'audio') {
          break;
        }

        if (!data.fatal) {
          var loadError = this.fragLoadError;

          if (loadError) {
            loadError++;
          } else {
            loadError = 1;
          }

          var config = this.config;

          if (loadError <= config.fragLoadingMaxRetry) {
            this.fragLoadError = loadError; // exponential backoff capped to config.fragLoadingMaxRetryTimeout

            var delay = Math.min(Math.pow(2, loadError - 1) * config.fragLoadingRetryDelay, config.fragLoadingMaxRetryTimeout);
            logger["logger"].warn("AudioStreamController: frag loading failed, retry in " + delay + " ms");
            this.retryDate = audio_stream_controller_performance.now() + delay; // retry loading state

            this.state = State.FRAG_LOADING_WAITING_RETRY;
          } else {
            logger["logger"].error("AudioStreamController: " + data.details + " reaches max retry, redispatch as fatal ..."); // switch error to fatal

            data.fatal = true;
            this.state = State.ERROR;
          }
        }

        break;

      case errors["ErrorDetails"].AUDIO_TRACK_LOAD_ERROR:
      case errors["ErrorDetails"].AUDIO_TRACK_LOAD_TIMEOUT:
      case errors["ErrorDetails"].KEY_LOAD_ERROR:
      case errors["ErrorDetails"].KEY_LOAD_TIMEOUT:
        //  when in ERROR state, don't switch back to IDLE state in case a non-fatal error is received
        if (this.state !== State.ERROR) {
          // if fatal error, stop processing, otherwise move to IDLE to retry loading
          this.state = data.fatal ? State.ERROR : State.IDLE;
          logger["logger"].warn("AudioStreamController: " + data.details + " while loading frag, now switching to " + this.state + " state ...");
        }

        break;

      case errors["ErrorDetails"].BUFFER_FULL_ERROR:
        // if in appending state
        if (data.parent === 'audio' && (this.state === State.PARSING || this.state === State.PARSED)) {
          var media = this.mediaBuffer,
              currentTime = this.media.currentTime,
              mediaBuffered = media && BufferHelper.isBuffered(media, currentTime) && BufferHelper.isBuffered(media, currentTime + 0.5); // reduce max buf len if current position is buffered

          if (mediaBuffered) {
            var _config = this.config;

            if (_config.maxMaxBufferLength >= _config.maxBufferLength) {
              // reduce max buffer length as it might be too high. we do this to avoid loop flushing ...
              _config.maxMaxBufferLength /= 2;
              logger["logger"].warn("AudioStreamController: reduce max buffer length to " + _config.maxMaxBufferLength + "s");
            }

            this.state = State.IDLE;
          } else {
            // current position is not buffered, but browser is still complaining about buffer full error
            // this happens on IE/Edge, refer to https://github.com/video-dev/hls.js/pull/708
            // in that case flush the whole audio buffer to recover
            logger["logger"].warn('AudioStreamController: buffer full error also media.currentTime is not buffered, flush audio buffer');
            this.fragCurrent = null; // flush everything

            this.state = State.BUFFER_FLUSHING;
            this.hls.trigger(events["default"].BUFFER_FLUSHING, {
              startOffset: 0,
              endOffset: Number.POSITIVE_INFINITY,
              type: 'audio'
            });
          }
        }

        break;

      default:
        break;
    }
  };

  _proto.onBufferFlushed = function onBufferFlushed() {
    var _this3 = this;

    var pendingData = this.pendingData;

    if (pendingData && pendingData.length) {
      logger["logger"].log('AudioStreamController: appending pending audio data after buffer flushed');
      pendingData.forEach(function (appendObj) {
        _this3.hls.trigger(events["default"].BUFFER_APPENDING, appendObj);
      });
      this.appended = true;
      this.pendingData = [];
      this.state = State.PARSED;
    } else {
      // move to IDLE once flush complete. this should trigger new fragment loading
      this.state = State.IDLE; // reset reference to frag

      this.fragPrevious = null;
      this.tick();
    }
  };

  audio_stream_controller_createClass(AudioStreamController, [{
    key: "state",
    set: function set(nextState) {
      if (this.state !== nextState) {
        var previousState = this.state;
        this._state = nextState;
        logger["logger"].log("audio stream:" + previousState + "->" + nextState);
      }
    },
    get: function get() {
      return this._state;
    }
  }]);

  return AudioStreamController;
}(base_stream_controller_BaseStreamController);

/* harmony default export */ var audio_stream_controller = (audio_stream_controller_AudioStreamController);
// CONCATENATED MODULE: ./src/utils/vttcue.js
/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* harmony default export */ var vttcue = ((function () {
  if (typeof window !== 'undefined' && window.VTTCue) {
    return window.VTTCue;
  }

  var autoKeyword = 'auto';
  var directionSetting = {
    '': true,
    lr: true,
    rl: true
  };
  var alignSetting = {
    start: true,
    middle: true,
    end: true,
    left: true,
    right: true
  };

  function findDirectionSetting(value) {
    if (typeof value !== 'string') {
      return false;
    }

    var dir = directionSetting[value.toLowerCase()];
    return dir ? value.toLowerCase() : false;
  }

  function findAlignSetting(value) {
    if (typeof value !== 'string') {
      return false;
    }

    var align = alignSetting[value.toLowerCase()];
    return align ? value.toLowerCase() : false;
  }

  function extend(obj) {
    var i = 1;

    for (; i < arguments.length; i++) {
      var cobj = arguments[i];

      for (var p in cobj) {
        obj[p] = cobj[p];
      }
    }

    return obj;
  }

  function VTTCue(startTime, endTime, text) {
    var cue = this;
    var baseObj = {};
    baseObj.enumerable = true;
    /**
     * Shim implementation specific properties. These properties are not in
     * the spec.
     */
    // Lets us know when the VTTCue's data has changed in such a way that we need
    // to recompute its display state. This lets us compute its display state
    // lazily.

    cue.hasBeenReset = false;
    /**
     * VTTCue and TextTrackCue properties
     * http://dev.w3.org/html5/webvtt/#vttcue-interface
     */

    var _id = '';
    var _pauseOnExit = false;
    var _startTime = startTime;
    var _endTime = endTime;
    var _text = text;
    var _region = null;
    var _vertical = '';
    var _snapToLines = true;
    var _line = 'auto';
    var _lineAlign = 'start';
    var _position = 50;
    var _positionAlign = 'middle';
    var _size = 50;
    var _align = 'middle';
    Object.defineProperty(cue, 'id', extend({}, baseObj, {
      get: function get() {
        return _id;
      },
      set: function set(value) {
        _id = '' + value;
      }
    }));
    Object.defineProperty(cue, 'pauseOnExit', extend({}, baseObj, {
      get: function get() {
        return _pauseOnExit;
      },
      set: function set(value) {
        _pauseOnExit = !!value;
      }
    }));
    Object.defineProperty(cue, 'startTime', extend({}, baseObj, {
      get: function get() {
        return _startTime;
      },
      set: function set(value) {
        if (typeof value !== 'number') {
          throw new TypeError('Start time must be set to a number.');
        }

        _startTime = value;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'endTime', extend({}, baseObj, {
      get: function get() {
        return _endTime;
      },
      set: function set(value) {
        if (typeof value !== 'number') {
          throw new TypeError('End time must be set to a number.');
        }

        _endTime = value;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'text', extend({}, baseObj, {
      get: function get() {
        return _text;
      },
      set: function set(value) {
        _text = '' + value;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'region', extend({}, baseObj, {
      get: function get() {
        return _region;
      },
      set: function set(value) {
        _region = value;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'vertical', extend({}, baseObj, {
      get: function get() {
        return _vertical;
      },
      set: function set(value) {
        var setting = findDirectionSetting(value); // Have to check for false because the setting an be an empty string.

        if (setting === false) {
          throw new SyntaxError('An invalid or illegal string was specified.');
        }

        _vertical = setting;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'snapToLines', extend({}, baseObj, {
      get: function get() {
        return _snapToLines;
      },
      set: function set(value) {
        _snapToLines = !!value;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'line', extend({}, baseObj, {
      get: function get() {
        return _line;
      },
      set: function set(value) {
        if (typeof value !== 'number' && value !== autoKeyword) {
          throw new SyntaxError('An invalid number or illegal string was specified.');
        }

        _line = value;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'lineAlign', extend({}, baseObj, {
      get: function get() {
        return _lineAlign;
      },
      set: function set(value) {
        var setting = findAlignSetting(value);

        if (!setting) {
          throw new SyntaxError('An invalid or illegal string was specified.');
        }

        _lineAlign = setting;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'position', extend({}, baseObj, {
      get: function get() {
        return _position;
      },
      set: function set(value) {
        if (value < 0 || value > 100) {
          throw new Error('Position must be between 0 and 100.');
        }

        _position = value;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'positionAlign', extend({}, baseObj, {
      get: function get() {
        return _positionAlign;
      },
      set: function set(value) {
        var setting = findAlignSetting(value);

        if (!setting) {
          throw new SyntaxError('An invalid or illegal string was specified.');
        }

        _positionAlign = setting;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'size', extend({}, baseObj, {
      get: function get() {
        return _size;
      },
      set: function set(value) {
        if (value < 0 || value > 100) {
          throw new Error('Size must be between 0 and 100.');
        }

        _size = value;
        this.hasBeenReset = true;
      }
    }));
    Object.defineProperty(cue, 'align', extend({}, baseObj, {
      get: function get() {
        return _align;
      },
      set: function set(value) {
        var setting = findAlignSetting(value);

        if (!setting) {
          throw new SyntaxError('An invalid or illegal string was specified.');
        }

        _align = setting;
        this.hasBeenReset = true;
      }
    }));
    /**
     * Other <track> spec defined properties
     */
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#text-track-cue-display-state

    cue.displayState = void 0;
  }
  /**
   * VTTCue methods
   */


  VTTCue.prototype.getCueAsHTML = function () {
    // Assume WebVTT.convertCueToDOMTree is on the global.
    var WebVTT = window.WebVTT;
    return WebVTT.convertCueToDOMTree(window, this.text);
  };

  return VTTCue;
})());
// CONCATENATED MODULE: ./src/utils/vttparser.js
/*
 * Source: https://github.com/mozilla/vtt.js/blob/master/dist/vtt.js#L1716
 */


var StringDecoder = function StringDecoder() {
  return {
    decode: function decode(data) {
      if (!data) {
        return '';
      }

      if (typeof data !== 'string') {
        throw new Error('Error - expected string data.');
      }

      return decodeURIComponent(encodeURIComponent(data));
    }
  };
};

function VTTParser() {
  this.window = window;
  this.state = 'INITIAL';
  this.buffer = '';
  this.decoder = new StringDecoder();
  this.regionList = [];
} // Try to parse input as a time stamp.


function parseTimeStamp(input) {
  function computeSeconds(h, m, s, f) {
    return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1000;
  }

  var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);

  if (!m) {
    return null;
  }

  if (m[3]) {
    // Timestamp takes the form of [hours]:[minutes]:[seconds].[milliseconds]
    return computeSeconds(m[1], m[2], m[3].replace(':', ''), m[4]);
  } else if (m[1] > 59) {
    // Timestamp takes the form of [hours]:[minutes].[milliseconds]
    // First position is hours as it's over 59.
    return computeSeconds(m[1], m[2], 0, m[4]);
  } else {
    // Timestamp takes the form of [minutes]:[seconds].[milliseconds]
    return computeSeconds(0, m[1], m[2], m[4]);
  }
} // A settings object holds key/value pairs and will ignore anything but the first
// assignment to a specific key.


function Settings() {
  this.values = Object.create(null);
}

Settings.prototype = {
  // Only accept the first assignment to any key.
  set: function set(k, v) {
    if (!this.get(k) && v !== '') {
      this.values[k] = v;
    }
  },
  // Return the value for a key, or a default value.
  // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
  // a number of possible default values as properties where 'defaultKey' is
  // the key of the property that will be chosen; otherwise it's assumed to be
  // a single value.
  get: function get(k, dflt, defaultKey) {
    if (defaultKey) {
      return this.has(k) ? this.values[k] : dflt[defaultKey];
    }

    return this.has(k) ? this.values[k] : dflt;
  },
  // Check whether we have a value for a key.
  has: function has(k) {
    return k in this.values;
  },
  // Accept a setting if its one of the given alternatives.
  alt: function alt(k, v, a) {
    for (var n = 0; n < a.length; ++n) {
      if (v === a[n]) {
        this.set(k, v);
        break;
      }
    }
  },
  // Accept a setting if its a valid (signed) integer.
  integer: function integer(k, v) {
    if (/^-?\d+$/.test(v)) {
      // integer
      this.set(k, parseInt(v, 10));
    }
  },
  // Accept a setting if its a valid percentage.
  percent: function percent(k, v) {
    var m;

    if (m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/)) {
      v = parseFloat(v);

      if (v >= 0 && v <= 100) {
        this.set(k, v);
        return true;
      }
    }

    return false;
  }
}; // Helper function to parse input into groups separated by 'groupDelim', and
// interprete each group as a key/value pair separated by 'keyValueDelim'.

function parseOptions(input, callback, keyValueDelim, groupDelim) {
  var groups = groupDelim ? input.split(groupDelim) : [input];

  for (var i in groups) {
    if (typeof groups[i] !== 'string') {
      continue;
    }

    var kv = groups[i].split(keyValueDelim);

    if (kv.length !== 2) {
      continue;
    }

    var k = kv[0];
    var v = kv[1];
    callback(k, v);
  }
}

var defaults = new vttcue(0, 0, 0); // 'middle' was changed to 'center' in the spec: https://github.com/w3c/webvtt/pull/244
//  Safari doesn't yet support this change, but FF and Chrome do.

var center = defaults.align === 'middle' ? 'middle' : 'center';

function parseCue(input, cue, regionList) {
  // Remember the original input if we need to throw an error.
  var oInput = input; // 4.1 WebVTT timestamp

  function consumeTimeStamp() {
    var ts = parseTimeStamp(input);

    if (ts === null) {
      throw new Error('Malformed timestamp: ' + oInput);
    } // Remove time stamp from input.


    input = input.replace(/^[^\sa-zA-Z-]+/, '');
    return ts;
  } // 4.4.2 WebVTT cue settings


  function consumeCueSettings(input, cue) {
    var settings = new Settings();
    parseOptions(input, function (k, v) {
      switch (k) {
        case 'region':
          // Find the last region we parsed with the same region id.
          for (var i = regionList.length - 1; i >= 0; i--) {
            if (regionList[i].id === v) {
              settings.set(k, regionList[i].region);
              break;
            }
          }

          break;

        case 'vertical':
          settings.alt(k, v, ['rl', 'lr']);
          break;

        case 'line':
          var vals = v.split(','),
              vals0 = vals[0];
          settings.integer(k, vals0);

          if (settings.percent(k, vals0)) {
            settings.set('snapToLines', false);
          }

          settings.alt(k, vals0, ['auto']);

          if (vals.length === 2) {
            settings.alt('lineAlign', vals[1], ['start', center, 'end']);
          }

          break;

        case 'position':
          vals = v.split(',');
          settings.percent(k, vals[0]);

          if (vals.length === 2) {
            settings.alt('positionAlign', vals[1], ['start', center, 'end', 'line-left', 'line-right', 'auto']);
          }

          break;

        case 'size':
          settings.percent(k, v);
          break;

        case 'align':
          settings.alt(k, v, ['start', center, 'end', 'left', 'right']);
          break;
      }
    }, /:/, /\s/); // Apply default values for any missing fields.

    cue.region = settings.get('region', null);
    cue.vertical = settings.get('vertical', '');
    var line = settings.get('line', 'auto');

    if (line === 'auto' && defaults.line === -1) {
      // set numeric line number for Safari
      line = -1;
    }

    cue.line = line;
    cue.lineAlign = settings.get('lineAlign', 'start');
    cue.snapToLines = settings.get('snapToLines', true);
    cue.size = settings.get('size', 100);
    cue.align = settings.get('align', center);
    var position = settings.get('position', 'auto');

    if (position === 'auto' && defaults.position === 50) {
      // set numeric position for Safari
      position = cue.align === 'start' || cue.align === 'left' ? 0 : cue.align === 'end' || cue.align === 'right' ? 100 : 50;
    }

    cue.position = position;
  }

  function skipWhitespace() {
    input = input.replace(/^\s+/, '');
  } // 4.1 WebVTT cue timings.


  skipWhitespace();
  cue.startTime = consumeTimeStamp(); // (1) collect cue start time

  skipWhitespace();

  if (input.substr(0, 3) !== '-->') {
    // (3) next characters must match '-->'
    throw new Error('Malformed time stamp (time stamps must be separated by \'-->\'): ' + oInput);
  }

  input = input.substr(3);
  skipWhitespace();
  cue.endTime = consumeTimeStamp(); // (5) collect cue end time
  // 4.1 WebVTT cue settings list.

  skipWhitespace();
  consumeCueSettings(input, cue);
}

function fixLineBreaks(input) {
  return input.replace(/<br(?: \/)?>/gi, '\n');
}

VTTParser.prototype = {
  parse: function parse(data) {
    var self = this; // If there is no data then we won't decode it, but will just try to parse
    // whatever is in buffer already. This may occur in circumstances, for
    // example when flush() is called.

    if (data) {
      // Try to decode the data that we received.
      self.buffer += self.decoder.decode(data, {
        stream: true
      });
    }

    function collectNextLine() {
      var buffer = self.buffer;
      var pos = 0;
      buffer = fixLineBreaks(buffer);

      while (pos < buffer.length && buffer[pos] !== '\r' && buffer[pos] !== '\n') {
        ++pos;
      }

      var line = buffer.substr(0, pos); // Advance the buffer early in case we fail below.

      if (buffer[pos] === '\r') {
        ++pos;
      }

      if (buffer[pos] === '\n') {
        ++pos;
      }

      self.buffer = buffer.substr(pos);
      return line;
    } // 3.2 WebVTT metadata header syntax


    function parseHeader(input) {
      parseOptions(input, function (k, v) {
        switch (k) {
          case 'Region':
            // 3.3 WebVTT region metadata header syntax
            // console.log('parse region', v);
            // parseRegion(v);
            break;
        }
      }, /:/);
    } // 5.1 WebVTT file parsing.


    try {
      var line;

      if (self.state === 'INITIAL') {
        // We can't start parsing until we have the first line.
        if (!/\r\n|\n/.test(self.buffer)) {
          return this;
        }

        line = collectNextLine(); // strip of UTF-8 BOM if any
        // https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8

        var m = line.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);

        if (!m || !m[0]) {
          throw new Error('Malformed WebVTT signature.');
        }

        self.state = 'HEADER';
      }

      var alreadyCollectedLine = false;

      while (self.buffer) {
        // We can't parse a line until we have the full line.
        if (!/\r\n|\n/.test(self.buffer)) {
          return this;
        }

        if (!alreadyCollectedLine) {
          line = collectNextLine();
        } else {
          alreadyCollectedLine = false;
        }

        switch (self.state) {
          case 'HEADER':
            // 13-18 - Allow a header (metadata) under the WEBVTT line.
            if (/:/.test(line)) {
              parseHeader(line);
            } else if (!line) {
              // An empty line terminates the header and starts the body (cues).
              self.state = 'ID';
            }

            continue;

          case 'NOTE':
            // Ignore NOTE blocks.
            if (!line) {
              self.state = 'ID';
            }

            continue;

          case 'ID':
            // Check for the start of NOTE blocks.
            if (/^NOTE($|[ \t])/.test(line)) {
              self.state = 'NOTE';
              break;
            } // 19-29 - Allow any number of line terminators, then initialize new cue values.


            if (!line) {
              continue;
            }

            self.cue = new vttcue(0, 0, '');
            self.state = 'CUE'; // 30-39 - Check if self line contains an optional identifier or timing data.

            if (line.indexOf('-->') === -1) {
              self.cue.id = line;
              continue;
            }

          // Process line as start of a cue.

          /* falls through */

          case 'CUE':
            // 40 - Collect cue timings and settings.
            try {
              parseCue(line, self.cue, self.regionList);
            } catch (e) {
              // In case of an error ignore rest of the cue.
              self.cue = null;
              self.state = 'BADCUE';
              continue;
            }

            self.state = 'CUETEXT';
            continue;

          case 'CUETEXT':
            var hasSubstring = line.indexOf('-->') !== -1; // 34 - If we have an empty line then report the cue.
            // 35 - If we have the special substring '-->' then report the cue,
            // but do not collect the line as we need to process the current
            // one as a new cue.

            if (!line || hasSubstring && (alreadyCollectedLine = true)) {
              // We are done parsing self cue.
              if (self.oncue) {
                self.oncue(self.cue);
              }

              self.cue = null;
              self.state = 'ID';
              continue;
            }

            if (self.cue.text) {
              self.cue.text += '\n';
            }

            self.cue.text += line;
            continue;

          case 'BADCUE':
            // BADCUE
            // 54-62 - Collect and discard the remaining cue.
            if (!line) {
              self.state = 'ID';
            }

            continue;
        }
      }
    } catch (e) {
      // If we are currently parsing a cue, report what we have.
      if (self.state === 'CUETEXT' && self.cue && self.oncue) {
        self.oncue(self.cue);
      }

      self.cue = null; // Enter BADWEBVTT state if header was not parsed correctly otherwise
      // another exception occurred so enter BADCUE state.

      self.state = self.state === 'INITIAL' ? 'BADWEBVTT' : 'BADCUE';
    }

    return this;
  },
  flush: function flush() {
    var self = this;

    try {
      // Finish decoding the stream.
      self.buffer += self.decoder.decode(); // Synthesize the end of the current cue or region.

      if (self.cue || self.state === 'HEADER') {
        self.buffer += '\n\n';
        self.parse();
      } // If we've flushed, parsed, and we're still on the INITIAL state then
      // that means we don't have enough of the stream to parse the first
      // line.


      if (self.state === 'INITIAL') {
        throw new Error('Malformed WebVTT signature.');
      }
    } catch (e) {
      throw e;
    }

    if (self.onflush) {
      self.onflush();
    }

    return this;
  }
};

/* harmony default export */ var vttparser = (VTTParser);
// CONCATENATED MODULE: ./src/utils/cues.ts

function newCue(track, startTime, endTime, captionScreen) {
  var result = [];
  var row; // the type data states this is VTTCue, but it can potentially be a TextTrackCue on old browsers

  var cue;
  var indenting;
  var indent;
  var text;
  var VTTCue = window.VTTCue || TextTrackCue;

  for (var r = 0; r < captionScreen.rows.length; r++) {
    row = captionScreen.rows[r];
    indenting = true;
    indent = 0;
    text = '';

    if (!row.isEmpty()) {
      for (var c = 0; c < row.chars.length; c++) {
        if (row.chars[c].uchar.match(/\s/) && indenting) {
          indent++;
        } else {
          text += row.chars[c].uchar;
          indenting = false;
        }
      } // To be used for cleaning-up orphaned roll-up captions


      row.cueStartTime = startTime; // Give a slight bump to the endTime if it's equal to startTime to avoid a SyntaxError in IE

      if (startTime === endTime) {
        endTime += 0.0001;
      }

      cue = new VTTCue(startTime, endTime, fixLineBreaks(text.trim()));

      if (indent >= 16) {
        indent--;
      } else {
        indent++;
      } // VTTCue.line get's flakey when using controls, so let's now include line 13&14
      // also, drop line 1 since it's to close to the top


      if (navigator.userAgent.match(/Firefox\//)) {
        cue.line = r + 1;
      } else {
        cue.line = r > 7 ? r - 2 : r + 1;
      }

      cue.align = 'left'; // Clamp the position between 0 and 100 - if out of these bounds, Firefox throws an exception and captions break

      cue.position = Math.max(0, Math.min(100, 100 * (indent / 32)));
      result.push(cue);

      if (track) {
        track.addCue(cue);
      }
    }
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/cea-608-parser.ts

/**
 *
 * This code was ported from the dash.js project at:
 *   https://github.com/Dash-Industry-Forum/dash.js/blob/development/externals/cea608-parser.js
 *   https://github.com/Dash-Industry-Forum/dash.js/commit/8269b26a761e0853bb21d78780ed945144ecdd4d#diff-71bc295a2d6b6b7093a1d3290d53a4b2
 *
 * The original copyright appears below:
 *
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2015-2016, DASH Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  1. Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  2. Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 *  Exceptions from regular ASCII. CodePoints are mapped to UTF-16 codes
 */

var specialCea608CharsCodes = {
  0x2a: 0xe1,
  // lowercase a, acute accent
  0x5c: 0xe9,
  // lowercase e, acute accent
  0x5e: 0xed,
  // lowercase i, acute accent
  0x5f: 0xf3,
  // lowercase o, acute accent
  0x60: 0xfa,
  // lowercase u, acute accent
  0x7b: 0xe7,
  // lowercase c with cedilla
  0x7c: 0xf7,
  // division symbol
  0x7d: 0xd1,
  // uppercase N tilde
  0x7e: 0xf1,
  // lowercase n tilde
  0x7f: 0x2588,
  // Full block
  // THIS BLOCK INCLUDES THE 16 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x11 AND LOW BETWEEN 0x30 AND 0x3F
  // THIS MEANS THAT \x50 MUST BE ADDED TO THE VALUES
  0x80: 0xae,
  // Registered symbol (R)
  0x81: 0xb0,
  // degree sign
  0x82: 0xbd,
  // 1/2 symbol
  0x83: 0xbf,
  // Inverted (open) question mark
  0x84: 0x2122,
  // Trademark symbol (TM)
  0x85: 0xa2,
  // Cents symbol
  0x86: 0xa3,
  // Pounds sterling
  0x87: 0x266a,
  // Music 8'th note
  0x88: 0xe0,
  // lowercase a, grave accent
  0x89: 0x20,
  // transparent space (regular)
  0x8a: 0xe8,
  // lowercase e, grave accent
  0x8b: 0xe2,
  // lowercase a, circumflex accent
  0x8c: 0xea,
  // lowercase e, circumflex accent
  0x8d: 0xee,
  // lowercase i, circumflex accent
  0x8e: 0xf4,
  // lowercase o, circumflex accent
  0x8f: 0xfb,
  // lowercase u, circumflex accent
  // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x12 AND LOW BETWEEN 0x20 AND 0x3F
  0x90: 0xc1,
  // capital letter A with acute
  0x91: 0xc9,
  // capital letter E with acute
  0x92: 0xd3,
  // capital letter O with acute
  0x93: 0xda,
  // capital letter U with acute
  0x94: 0xdc,
  // capital letter U with diaresis
  0x95: 0xfc,
  // lowercase letter U with diaeresis
  0x96: 0x2018,
  // opening single quote
  0x97: 0xa1,
  // inverted exclamation mark
  0x98: 0x2a,
  // asterisk
  0x99: 0x2019,
  // closing single quote
  0x9a: 0x2501,
  // box drawings heavy horizontal
  0x9b: 0xa9,
  // copyright sign
  0x9c: 0x2120,
  // Service mark
  0x9d: 0x2022,
  // (round) bullet
  0x9e: 0x201c,
  // Left double quotation mark
  0x9f: 0x201d,
  // Right double quotation mark
  0xa0: 0xc0,
  // uppercase A, grave accent
  0xa1: 0xc2,
  // uppercase A, circumflex
  0xa2: 0xc7,
  // uppercase C with cedilla
  0xa3: 0xc8,
  // uppercase E, grave accent
  0xa4: 0xca,
  // uppercase E, circumflex
  0xa5: 0xcb,
  // capital letter E with diaresis
  0xa6: 0xeb,
  // lowercase letter e with diaresis
  0xa7: 0xce,
  // uppercase I, circumflex
  0xa8: 0xcf,
  // uppercase I, with diaresis
  0xa9: 0xef,
  // lowercase i, with diaresis
  0xaa: 0xd4,
  // uppercase O, circumflex
  0xab: 0xd9,
  // uppercase U, grave accent
  0xac: 0xf9,
  // lowercase u, grave accent
  0xad: 0xdb,
  // uppercase U, circumflex
  0xae: 0xab,
  // left-pointing double angle quotation mark
  0xaf: 0xbb,
  // right-pointing double angle quotation mark
  // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x13 AND LOW BETWEEN 0x20 AND 0x3F
  0xb0: 0xc3,
  // Uppercase A, tilde
  0xb1: 0xe3,
  // Lowercase a, tilde
  0xb2: 0xcd,
  // Uppercase I, acute accent
  0xb3: 0xcc,
  // Uppercase I, grave accent
  0xb4: 0xec,
  // Lowercase i, grave accent
  0xb5: 0xd2,
  // Uppercase O, grave accent
  0xb6: 0xf2,
  // Lowercase o, grave accent
  0xb7: 0xd5,
  // Uppercase O, tilde
  0xb8: 0xf5,
  // Lowercase o, tilde
  0xb9: 0x7b,
  // Open curly brace
  0xba: 0x7d,
  // Closing curly brace
  0xbb: 0x5c,
  // Backslash
  0xbc: 0x5e,
  // Caret
  0xbd: 0x5f,
  // Underscore
  0xbe: 0x7c,
  // Pipe (vertical line)
  0xbf: 0x223c,
  // Tilde operator
  0xc0: 0xc4,
  // Uppercase A, umlaut
  0xc1: 0xe4,
  // Lowercase A, umlaut
  0xc2: 0xd6,
  // Uppercase O, umlaut
  0xc3: 0xf6,
  // Lowercase o, umlaut
  0xc4: 0xdf,
  // Esszett (sharp S)
  0xc5: 0xa5,
  // Yen symbol
  0xc6: 0xa4,
  // Generic currency sign
  0xc7: 0x2503,
  // Box drawings heavy vertical
  0xc8: 0xc5,
  // Uppercase A, ring
  0xc9: 0xe5,
  // Lowercase A, ring
  0xca: 0xd8,
  // Uppercase O, stroke
  0xcb: 0xf8,
  // Lowercase o, strok
  0xcc: 0x250f,
  // Box drawings heavy down and right
  0xcd: 0x2513,
  // Box drawings heavy down and left
  0xce: 0x2517,
  // Box drawings heavy up and right
  0xcf: 0x251b // Box drawings heavy up and left

};
/**
 * Utils
 */

var getCharForByte = function getCharForByte(_byte) {
  var charCode = _byte;

  if (specialCea608CharsCodes.hasOwnProperty(_byte)) {
    charCode = specialCea608CharsCodes[_byte];
  }

  return String.fromCharCode(charCode);
};

var NR_ROWS = 15;
var NR_COLS = 100; // Tables to look up row from PAC data

var rowsLowCh1 = {
  0x11: 1,
  0x12: 3,
  0x15: 5,
  0x16: 7,
  0x17: 9,
  0x10: 11,
  0x13: 12,
  0x14: 14
};
var rowsHighCh1 = {
  0x11: 2,
  0x12: 4,
  0x15: 6,
  0x16: 8,
  0x17: 10,
  0x13: 13,
  0x14: 15
};
var rowsLowCh2 = {
  0x19: 1,
  0x1A: 3,
  0x1D: 5,
  0x1E: 7,
  0x1F: 9,
  0x18: 11,
  0x1B: 12,
  0x1C: 14
};
var rowsHighCh2 = {
  0x19: 2,
  0x1A: 4,
  0x1D: 6,
  0x1E: 8,
  0x1F: 10,
  0x1B: 13,
  0x1C: 15
};
var backgroundColors = ['white', 'green', 'blue', 'cyan', 'red', 'yellow', 'magenta', 'black', 'transparent'];
var VerboseLevel;

(function (VerboseLevel) {
  VerboseLevel[VerboseLevel["ERROR"] = 0] = "ERROR";
  VerboseLevel[VerboseLevel["TEXT"] = 1] = "TEXT";
  VerboseLevel[VerboseLevel["WARNING"] = 2] = "WARNING";
  VerboseLevel[VerboseLevel["INFO"] = 2] = "INFO";
  VerboseLevel[VerboseLevel["DEBUG"] = 3] = "DEBUG";
  VerboseLevel[VerboseLevel["DATA"] = 3] = "DATA";
})(VerboseLevel || (VerboseLevel = {}));

var cea_608_parser_CaptionsLogger = /*#__PURE__*/function () {
  function CaptionsLogger() {
    this.time = null;
    this.verboseLevel = VerboseLevel.ERROR;
  }

  var _proto = CaptionsLogger.prototype;

  _proto.log = function log(severity, msg) {
    if (this.verboseLevel >= severity) {
      logger["logger"].log(this.time + " [" + severity + "] " + msg);
    }
  };

  return CaptionsLogger;
}();

var numArrayToHexArray = function numArrayToHexArray(numArray) {
  var hexArray = [];

  for (var j = 0; j < numArray.length; j++) {
    hexArray.push(numArray[j].toString(16));
  }

  return hexArray;
};

var PenState = /*#__PURE__*/function () {
  function PenState(foreground, underline, italics, background, flash) {
    this.foreground = void 0;
    this.underline = void 0;
    this.italics = void 0;
    this.background = void 0;
    this.flash = void 0;
    this.foreground = foreground || 'white';
    this.underline = underline || false;
    this.italics = italics || false;
    this.background = background || 'black';
    this.flash = flash || false;
  }

  var _proto2 = PenState.prototype;

  _proto2.reset = function reset() {
    this.foreground = 'white';
    this.underline = false;
    this.italics = false;
    this.background = 'black';
    this.flash = false;
  };

  _proto2.setStyles = function setStyles(styles) {
    var attribs = ['foreground', 'underline', 'italics', 'background', 'flash'];

    for (var i = 0; i < attribs.length; i++) {
      var style = attribs[i];

      if (styles.hasOwnProperty(style)) {
        this[style] = styles[style];
      }
    }
  };

  _proto2.isDefault = function isDefault() {
    return this.foreground === 'white' && !this.underline && !this.italics && this.background === 'black' && !this.flash;
  };

  _proto2.equals = function equals(other) {
    return this.foreground === other.foreground && this.underline === other.underline && this.italics === other.italics && this.background === other.background && this.flash === other.flash;
  };

  _proto2.copy = function copy(newPenState) {
    this.foreground = newPenState.foreground;
    this.underline = newPenState.underline;
    this.italics = newPenState.italics;
    this.background = newPenState.background;
    this.flash = newPenState.flash;
  };

  _proto2.toString = function toString() {
    return 'color=' + this.foreground + ', underline=' + this.underline + ', italics=' + this.italics + ', background=' + this.background + ', flash=' + this.flash;
  };

  return PenState;
}();
/**
 * Unicode character with styling and background.
 * @constructor
 */


var StyledUnicodeChar = /*#__PURE__*/function () {
  function StyledUnicodeChar(uchar, foreground, underline, italics, background, flash) {
    this.uchar = void 0;
    this.penState = void 0;
    this.uchar = uchar || ' '; // unicode character

    this.penState = new PenState(foreground, underline, italics, background, flash);
  }

  var _proto3 = StyledUnicodeChar.prototype;

  _proto3.reset = function reset() {
    this.uchar = ' ';
    this.penState.reset();
  };

  _proto3.setChar = function setChar(uchar, newPenState) {
    this.uchar = uchar;
    this.penState.copy(newPenState);
  };

  _proto3.setPenState = function setPenState(newPenState) {
    this.penState.copy(newPenState);
  };

  _proto3.equals = function equals(other) {
    return this.uchar === other.uchar && this.penState.equals(other.penState);
  };

  _proto3.copy = function copy(newChar) {
    this.uchar = newChar.uchar;
    this.penState.copy(newChar.penState);
  };

  _proto3.isEmpty = function isEmpty() {
    return this.uchar === ' ' && this.penState.isDefault();
  };

  return StyledUnicodeChar;
}();
/**
 * CEA-608 row consisting of NR_COLS instances of StyledUnicodeChar.
 * @constructor
 */


var Row = /*#__PURE__*/function () {
  function Row(logger) {
    this.chars = void 0;
    this.pos = void 0;
    this.currPenState = void 0;
    this.cueStartTime = void 0;
    this.logger = void 0;
    this.chars = [];

    for (var i = 0; i < NR_COLS; i++) {
      this.chars.push(new StyledUnicodeChar());
    }

    this.logger = logger;
    this.pos = 0;
    this.currPenState = new PenState();
  }

  var _proto4 = Row.prototype;

  _proto4.equals = function equals(other) {
    var equal = true;

    for (var i = 0; i < NR_COLS; i++) {
      if (!this.chars[i].equals(other.chars[i])) {
        equal = false;
        break;
      }
    }

    return equal;
  };

  _proto4.copy = function copy(other) {
    for (var i = 0; i < NR_COLS; i++) {
      this.chars[i].copy(other.chars[i]);
    }
  };

  _proto4.isEmpty = function isEmpty() {
    var empty = true;

    for (var i = 0; i < NR_COLS; i++) {
      if (!this.chars[i].isEmpty()) {
        empty = false;
        break;
      }
    }

    return empty;
  }
  /**
   *  Set the cursor to a valid column.
   */
  ;

  _proto4.setCursor = function setCursor(absPos) {
    if (this.pos !== absPos) {
      this.pos = absPos;
    }

    if (this.pos < 0) {
      this.logger.log(VerboseLevel.DEBUG, 'Negative cursor position ' + this.pos);
      this.pos = 0;
    } else if (this.pos > NR_COLS) {
      this.logger.log(VerboseLevel.DEBUG, 'Too large cursor position ' + this.pos);
      this.pos = NR_COLS;
    }
  }
  /**
   * Move the cursor relative to current position.
   */
  ;

  _proto4.moveCursor = function moveCursor(relPos) {
    var newPos = this.pos + relPos;

    if (relPos > 1) {
      for (var i = this.pos + 1; i < newPos + 1; i++) {
        this.chars[i].setPenState(this.currPenState);
      }
    }

    this.setCursor(newPos);
  }
  /**
   * Backspace, move one step back and clear character.
   */
  ;

  _proto4.backSpace = function backSpace() {
    this.moveCursor(-1);
    this.chars[this.pos].setChar(' ', this.currPenState);
  };

  _proto4.insertChar = function insertChar(_byte2) {
    if (_byte2 >= 0x90) {
      // Extended char
      this.backSpace();
    }

    var _char = getCharForByte(_byte2);

    if (this.pos >= NR_COLS) {
      this.logger.log(VerboseLevel.ERROR, 'Cannot insert ' + _byte2.toString(16) + ' (' + _char + ') at position ' + this.pos + '. Skipping it!');
      return;
    }

    this.chars[this.pos].setChar(_char, this.currPenState);
    this.moveCursor(1);
  };

  _proto4.clearFromPos = function clearFromPos(startPos) {
    var i;

    for (i = startPos; i < NR_COLS; i++) {
      this.chars[i].reset();
    }
  };

  _proto4.clear = function clear() {
    this.clearFromPos(0);
    this.pos = 0;
    this.currPenState.reset();
  };

  _proto4.clearToEndOfRow = function clearToEndOfRow() {
    this.clearFromPos(this.pos);
  };

  _proto4.getTextString = function getTextString() {
    var chars = [];
    var empty = true;

    for (var i = 0; i < NR_COLS; i++) {
      var _char2 = this.chars[i].uchar;

      if (_char2 !== ' ') {
        empty = false;
      }

      chars.push(_char2);
    }

    if (empty) {
      return '';
    } else {
      return chars.join('');
    }
  };

  _proto4.setPenStyles = function setPenStyles(styles) {
    this.currPenState.setStyles(styles);
    var currChar = this.chars[this.pos];
    currChar.setPenState(this.currPenState);
  };

  return Row;
}();
/**
 * Keep a CEA-608 screen of 32x15 styled characters
 * @constructor
 */

var CaptionScreen = /*#__PURE__*/function () {
  function CaptionScreen(logger) {
    this.rows = void 0;
    this.currRow = void 0;
    this.nrRollUpRows = void 0;
    this.lastOutputScreen = void 0;
    this.logger = void 0;
    this.rows = [];

    for (var i = 0; i < NR_ROWS; i++) {
      this.rows.push(new Row(logger));
    } // Note that we use zero-based numbering (0-14)


    this.logger = logger;
    this.currRow = NR_ROWS - 1;
    this.nrRollUpRows = null;
    this.lastOutputScreen = null;
    this.reset();
  }

  var _proto5 = CaptionScreen.prototype;

  _proto5.reset = function reset() {
    for (var i = 0; i < NR_ROWS; i++) {
      this.rows[i].clear();
    }

    this.currRow = NR_ROWS - 1;
  };

  _proto5.equals = function equals(other) {
    var equal = true;

    for (var i = 0; i < NR_ROWS; i++) {
      if (!this.rows[i].equals(other.rows[i])) {
        equal = false;
        break;
      }
    }

    return equal;
  };

  _proto5.copy = function copy(other) {
    for (var i = 0; i < NR_ROWS; i++) {
      this.rows[i].copy(other.rows[i]);
    }
  };

  _proto5.isEmpty = function isEmpty() {
    var empty = true;

    for (var i = 0; i < NR_ROWS; i++) {
      if (!this.rows[i].isEmpty()) {
        empty = false;
        break;
      }
    }

    return empty;
  };

  _proto5.backSpace = function backSpace() {
    var row = this.rows[this.currRow];
    row.backSpace();
  };

  _proto5.clearToEndOfRow = function clearToEndOfRow() {
    var row = this.rows[this.currRow];
    row.clearToEndOfRow();
  }
  /**
   * Insert a character (without styling) in the current row.
   */
  ;

  _proto5.insertChar = function insertChar(_char3) {
    var row = this.rows[this.currRow];
    row.insertChar(_char3);
  };

  _proto5.setPen = function setPen(styles) {
    var row = this.rows[this.currRow];
    row.setPenStyles(styles);
  };

  _proto5.moveCursor = function moveCursor(relPos) {
    var row = this.rows[this.currRow];
    row.moveCursor(relPos);
  };

  _proto5.setCursor = function setCursor(absPos) {
    this.logger.log(VerboseLevel.INFO, 'setCursor: ' + absPos);
    var row = this.rows[this.currRow];
    row.setCursor(absPos);
  };

  _proto5.setPAC = function setPAC(pacData) {
    this.logger.log(VerboseLevel.INFO, 'pacData = ' + JSON.stringify(pacData));
    var newRow = pacData.row - 1;

    if (this.nrRollUpRows && newRow < this.nrRollUpRows - 1) {
      newRow = this.nrRollUpRows - 1;
    } // Make sure this only affects Roll-up Captions by checking this.nrRollUpRows


    if (this.nrRollUpRows && this.currRow !== newRow) {
      // clear all rows first
      for (var i = 0; i < NR_ROWS; i++) {
        this.rows[i].clear();
      } // Copy this.nrRollUpRows rows from lastOutputScreen and place it in the newRow location
      // topRowIndex - the start of rows to copy (inclusive index)


      var topRowIndex = this.currRow + 1 - this.nrRollUpRows; // We only copy if the last position was already shown.
      // We use the cueStartTime value to check this.

      var lastOutputScreen = this.lastOutputScreen;

      if (lastOutputScreen) {
        var prevLineTime = lastOutputScreen.rows[topRowIndex].cueStartTime;
        var time = this.logger.time;

        if (prevLineTime && time !== null && prevLineTime < time) {
          for (var _i = 0; _i < this.nrRollUpRows; _i++) {
            this.rows[newRow - this.nrRollUpRows + _i + 1].copy(lastOutputScreen.rows[topRowIndex + _i]);
          }
        }
      }
    }

    this.currRow = newRow;
    var row = this.rows[this.currRow];

    if (pacData.indent !== null) {
      var indent = pacData.indent;
      var prevPos = Math.max(indent - 1, 0);
      row.setCursor(pacData.indent);
      pacData.color = row.chars[prevPos].penState.foreground;
    }

    var styles = {
      foreground: pacData.color,
      underline: pacData.underline,
      italics: pacData.italics,
      background: 'black',
      flash: false
    };
    this.setPen(styles);
  }
  /**
   * Set background/extra foreground, but first do back_space, and then insert space (backwards compatibility).
   */
  ;

  _proto5.setBkgData = function setBkgData(bkgData) {
    this.logger.log(VerboseLevel.INFO, 'bkgData = ' + JSON.stringify(bkgData));
    this.backSpace();
    this.setPen(bkgData);
    this.insertChar(0x20); // Space
  };

  _proto5.setRollUpRows = function setRollUpRows(nrRows) {
    this.nrRollUpRows = nrRows;
  };

  _proto5.rollUp = function rollUp() {
    if (this.nrRollUpRows === null) {
      this.logger.log(VerboseLevel.DEBUG, 'roll_up but nrRollUpRows not set yet');
      return; // Not properly setup
    }

    this.logger.log(VerboseLevel.TEXT, this.getDisplayText());
    var topRowIndex = this.currRow + 1 - this.nrRollUpRows;
    var topRow = this.rows.splice(topRowIndex, 1)[0];
    topRow.clear();
    this.rows.splice(this.currRow, 0, topRow);
    this.logger.log(VerboseLevel.INFO, 'Rolling up'); // this.logger.log(VerboseLevel.TEXT, this.get_display_text())
  }
  /**
   * Get all non-empty rows with as unicode text.
   */
  ;

  _proto5.getDisplayText = function getDisplayText(asOneRow) {
    asOneRow = asOneRow || false;
    var displayText = [];
    var text = '';
    var rowNr = -1;

    for (var i = 0; i < NR_ROWS; i++) {
      var rowText = this.rows[i].getTextString();

      if (rowText) {
        rowNr = i + 1;

        if (asOneRow) {
          displayText.push('Row ' + rowNr + ': \'' + rowText + '\'');
        } else {
          displayText.push(rowText.trim());
        }
      }
    }

    if (displayText.length > 0) {
      if (asOneRow) {
        text = '[' + displayText.join(' | ') + ']';
      } else {
        text = displayText.join('\n');
      }
    }

    return text;
  };

  _proto5.getTextAndFormat = function getTextAndFormat() {
    return this.rows;
  };

  return CaptionScreen;
}(); // var modes = ['MODE_ROLL-UP', 'MODE_POP-ON', 'MODE_PAINT-ON', 'MODE_TEXT'];

var Cea608Channel = /*#__PURE__*/function () {
  function Cea608Channel(channelNumber, outputFilter, logger) {
    this.chNr = void 0;
    this.outputFilter = void 0;
    this.mode = void 0;
    this.verbose = void 0;
    this.displayedMemory = void 0;
    this.nonDisplayedMemory = void 0;
    this.lastOutputScreen = void 0;
    this.currRollUpRow = void 0;
    this.writeScreen = void 0;
    this.cueStartTime = void 0;
    this.logger = void 0;
    this.chNr = channelNumber;
    this.outputFilter = outputFilter;
    this.mode = null;
    this.verbose = 0;
    this.displayedMemory = new CaptionScreen(logger);
    this.nonDisplayedMemory = new CaptionScreen(logger);
    this.lastOutputScreen = new CaptionScreen(logger);
    this.currRollUpRow = this.displayedMemory.rows[NR_ROWS - 1];
    this.writeScreen = this.displayedMemory;
    this.mode = null;
    this.cueStartTime = null; // Keeps track of where a cue started.

    this.logger = logger;
  }

  var _proto6 = Cea608Channel.prototype;

  _proto6.reset = function reset() {
    this.mode = null;
    this.displayedMemory.reset();
    this.nonDisplayedMemory.reset();
    this.lastOutputScreen.reset();
    this.outputFilter.reset();
    this.currRollUpRow = this.displayedMemory.rows[NR_ROWS - 1];
    this.writeScreen = this.displayedMemory;
    this.mode = null;
    this.cueStartTime = null;
  };

  _proto6.getHandler = function getHandler() {
    return this.outputFilter;
  };

  _proto6.setHandler = function setHandler(newHandler) {
    this.outputFilter = newHandler;
  };

  _proto6.setPAC = function setPAC(pacData) {
    this.writeScreen.setPAC(pacData);
  };

  _proto6.setBkgData = function setBkgData(bkgData) {
    this.writeScreen.setBkgData(bkgData);
  };

  _proto6.setMode = function setMode(newMode) {
    if (newMode === this.mode) {
      return;
    }

    this.mode = newMode;
    this.logger.log(VerboseLevel.INFO, 'MODE=' + newMode);

    if (this.mode === 'MODE_POP-ON') {
      this.writeScreen = this.nonDisplayedMemory;
    } else {
      this.writeScreen = this.displayedMemory;
      this.writeScreen.reset();
    }

    if (this.mode !== 'MODE_ROLL-UP') {
      this.displayedMemory.nrRollUpRows = null;
      this.nonDisplayedMemory.nrRollUpRows = null;
    }

    this.mode = newMode;
  };

  _proto6.insertChars = function insertChars(chars) {
    for (var i = 0; i < chars.length; i++) {
      this.writeScreen.insertChar(chars[i]);
    }

    var screen = this.writeScreen === this.displayedMemory ? 'DISP' : 'NON_DISP';
    this.logger.log(VerboseLevel.INFO, screen + ': ' + this.writeScreen.getDisplayText(true));

    if (this.mode === 'MODE_PAINT-ON' || this.mode === 'MODE_ROLL-UP') {
      this.logger.log(VerboseLevel.TEXT, 'DISPLAYED: ' + this.displayedMemory.getDisplayText(true));
      this.outputDataUpdate();
    }
  };

  _proto6.ccRCL = function ccRCL() {
    // Resume Caption Loading (switch mode to Pop On)
    this.logger.log(VerboseLevel.INFO, 'RCL - Resume Caption Loading');
    this.setMode('MODE_POP-ON');
  };

  _proto6.ccBS = function ccBS() {
    // BackSpace
    this.logger.log(VerboseLevel.INFO, 'BS - BackSpace');

    if (this.mode === 'MODE_TEXT') {
      return;
    }

    this.writeScreen.backSpace();

    if (this.writeScreen === this.displayedMemory) {
      this.outputDataUpdate();
    }
  };

  _proto6.ccAOF = function ccAOF() {// Reserved (formerly Alarm Off)
  };

  _proto6.ccAON = function ccAON() {// Reserved (formerly Alarm On)
  };

  _proto6.ccDER = function ccDER() {
    // Delete to End of Row
    this.logger.log(VerboseLevel.INFO, 'DER- Delete to End of Row');
    this.writeScreen.clearToEndOfRow();
    this.outputDataUpdate();
  };

  _proto6.ccRU = function ccRU(nrRows) {
    // Roll-Up Captions-2,3,or 4 Rows
    this.logger.log(VerboseLevel.INFO, 'RU(' + nrRows + ') - Roll Up');
    this.writeScreen = this.displayedMemory;
    this.setMode('MODE_ROLL-UP');
    this.writeScreen.setRollUpRows(nrRows);
  };

  _proto6.ccFON = function ccFON() {
    // Flash On
    this.logger.log(VerboseLevel.INFO, 'FON - Flash On');
    this.writeScreen.setPen({
      flash: true
    });
  };

  _proto6.ccRDC = function ccRDC() {
    // Resume Direct Captioning (switch mode to PaintOn)
    this.logger.log(VerboseLevel.INFO, 'RDC - Resume Direct Captioning');
    this.setMode('MODE_PAINT-ON');
  };

  _proto6.ccTR = function ccTR() {
    // Text Restart in text mode (not supported, however)
    this.logger.log(VerboseLevel.INFO, 'TR');
    this.setMode('MODE_TEXT');
  };

  _proto6.ccRTD = function ccRTD() {
    // Resume Text Display in Text mode (not supported, however)
    this.logger.log(VerboseLevel.INFO, 'RTD');
    this.setMode('MODE_TEXT');
  };

  _proto6.ccEDM = function ccEDM() {
    // Erase Displayed Memory
    this.logger.log(VerboseLevel.INFO, 'EDM - Erase Displayed Memory');
    this.displayedMemory.reset();
    this.outputDataUpdate(true);
  };

  _proto6.ccCR = function ccCR() {
    // Carriage Return
    this.logger.log(VerboseLevel.INFO, 'CR - Carriage Return');
    this.writeScreen.rollUp();
    this.outputDataUpdate(true);
  };

  _proto6.ccENM = function ccENM() {
    // Erase Non-Displayed Memory
    this.logger.log(VerboseLevel.INFO, 'ENM - Erase Non-displayed Memory');
    this.nonDisplayedMemory.reset();
  };

  _proto6.ccEOC = function ccEOC() {
    // End of Caption (Flip Memories)
    this.logger.log(VerboseLevel.INFO, 'EOC - End Of Caption');

    if (this.mode === 'MODE_POP-ON') {
      var tmp = this.displayedMemory;
      this.displayedMemory = this.nonDisplayedMemory;
      this.nonDisplayedMemory = tmp;
      this.writeScreen = this.nonDisplayedMemory;
      this.logger.log(VerboseLevel.TEXT, 'DISP: ' + this.displayedMemory.getDisplayText());
    }

    this.outputDataUpdate(true);
  };

  _proto6.ccTO = function ccTO(nrCols) {
    // Tab Offset 1,2, or 3 columns
    this.logger.log(VerboseLevel.INFO, 'TO(' + nrCols + ') - Tab Offset');
    this.writeScreen.moveCursor(nrCols);
  };

  _proto6.ccMIDROW = function ccMIDROW(secondByte) {
    // Parse MIDROW command
    var styles = {
      flash: false
    };
    styles.underline = secondByte % 2 === 1;
    styles.italics = secondByte >= 0x2e;

    if (!styles.italics) {
      var colorIndex = Math.floor(secondByte / 2) - 0x10;
      var colors = ['white', 'green', 'blue', 'cyan', 'red', 'yellow', 'magenta'];
      styles.foreground = colors[colorIndex];
    } else {
      styles.foreground = 'white';
    }

    this.logger.log(VerboseLevel.INFO, 'MIDROW: ' + JSON.stringify(styles));
    this.writeScreen.setPen(styles);
  };

  _proto6.outputDataUpdate = function outputDataUpdate(dispatch) {
    if (dispatch === void 0) {
      dispatch = false;
    }

    var time = this.logger.time;

    if (time === null) {
      return;
    }

    if (this.outputFilter) {
      if (this.cueStartTime === null && !this.displayedMemory.isEmpty()) {
        // Start of a new cue
        this.cueStartTime = time;
      } else {
        if (!this.displayedMemory.equals(this.lastOutputScreen)) {
          this.outputFilter.newCue(this.cueStartTime, time, this.lastOutputScreen);

          if (dispatch && this.outputFilter.dispatchCue) {
            this.outputFilter.dispatchCue();
          }

          this.cueStartTime = this.displayedMemory.isEmpty() ? null : time;
        }
      }

      this.lastOutputScreen.copy(this.displayedMemory);
    }
  };

  _proto6.cueSplitAtTime = function cueSplitAtTime(t) {
    if (this.outputFilter) {
      if (!this.displayedMemory.isEmpty()) {
        if (this.outputFilter.newCue) {
          this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory);
        }

        this.cueStartTime = t;
      }
    }
  };

  return Cea608Channel;
}();

var Cea608Parser = /*#__PURE__*/function () {
  function Cea608Parser(field, out1, out2) {
    this.channels = void 0;
    this.currentChannel = 0;
    this.cmdHistory = void 0;
    this.logger = void 0;
    var logger = new cea_608_parser_CaptionsLogger();
    this.channels = [null, new Cea608Channel(field, out1, logger), new Cea608Channel(field + 1, out2, logger)];
    this.cmdHistory = createCmdHistory();
    this.logger = logger;
  }

  var _proto7 = Cea608Parser.prototype;

  _proto7.getHandler = function getHandler(channel) {
    return this.channels[channel].getHandler();
  };

  _proto7.setHandler = function setHandler(channel, newHandler) {
    this.channels[channel].setHandler(newHandler);
  }
  /**
   * Add data for time t in forms of list of bytes (unsigned ints). The bytes are treated as pairs.
   */
  ;

  _proto7.addData = function addData(time, byteList) {
    var cmdFound;
    var a;
    var b;
    var charsFound = false;
    this.logger.time = time;

    for (var i = 0; i < byteList.length; i += 2) {
      a = byteList[i] & 0x7f;
      b = byteList[i + 1] & 0x7f;

      if (a === 0 && b === 0) {
        continue;
      } else {
        this.logger.log(VerboseLevel.DATA, '[' + numArrayToHexArray([byteList[i], byteList[i + 1]]) + '] -> (' + numArrayToHexArray([a, b]) + ')');
      }

      cmdFound = this.parseCmd(a, b);

      if (!cmdFound) {
        cmdFound = this.parseMidrow(a, b);
      }

      if (!cmdFound) {
        cmdFound = this.parsePAC(a, b);
      }

      if (!cmdFound) {
        cmdFound = this.parseBackgroundAttributes(a, b);
      }

      if (!cmdFound) {
        charsFound = this.parseChars(a, b);

        if (charsFound) {
          var currChNr = this.currentChannel;

          if (currChNr && currChNr > 0) {
            var channel = this.channels[currChNr];
            channel.insertChars(charsFound);
          } else {
            this.logger.log(VerboseLevel.WARNING, 'No channel found yet. TEXT-MODE?');
          }
        }
      }

      if (!cmdFound && !charsFound) {
        this.logger.log(VerboseLevel.WARNING, 'Couldn\'t parse cleaned data ' + numArrayToHexArray([a, b]) + ' orig: ' + numArrayToHexArray([byteList[i], byteList[i + 1]]));
      }
    }
  }
  /**
   * Parse Command.
   * @returns {Boolean} Tells if a command was found
   */
  ;

  _proto7.parseCmd = function parseCmd(a, b) {
    var cmdHistory = this.cmdHistory;
    var cond1 = (a === 0x14 || a === 0x1C || a === 0x15 || a === 0x1D) && b >= 0x20 && b <= 0x2F;
    var cond2 = (a === 0x17 || a === 0x1F) && b >= 0x21 && b <= 0x23;

    if (!(cond1 || cond2)) {
      return false;
    }

    if (hasCmdRepeated(a, b, cmdHistory)) {
      setLastCmd(null, null, cmdHistory);
      this.logger.log(VerboseLevel.DEBUG, 'Repeated command (' + numArrayToHexArray([a, b]) + ') is dropped');
      return true;
    }

    var chNr = a === 0x14 || a === 0x15 || a === 0x17 ? 1 : 2;
    var channel = this.channels[chNr];

    if (a === 0x14 || a === 0x15 || a === 0x1C || a === 0x1D) {
      if (b === 0x20) {
        channel.ccRCL();
      } else if (b === 0x21) {
        channel.ccBS();
      } else if (b === 0x22) {
        channel.ccAOF();
      } else if (b === 0x23) {
        channel.ccAON();
      } else if (b === 0x24) {
        channel.ccDER();
      } else if (b === 0x25) {
        channel.ccRU(2);
      } else if (b === 0x26) {
        channel.ccRU(3);
      } else if (b === 0x27) {
        channel.ccRU(4);
      } else if (b === 0x28) {
        channel.ccFON();
      } else if (b === 0x29) {
        channel.ccRDC();
      } else if (b === 0x2A) {
        channel.ccTR();
      } else if (b === 0x2B) {
        channel.ccRTD();
      } else if (b === 0x2C) {
        channel.ccEDM();
      } else if (b === 0x2D) {
        channel.ccCR();
      } else if (b === 0x2E) {
        channel.ccENM();
      } else if (b === 0x2F) {
        channel.ccEOC();
      }
    } else {
      // a == 0x17 || a == 0x1F
      channel.ccTO(b - 0x20);
    }

    setLastCmd(a, b, cmdHistory);
    this.currentChannel = chNr;
    return true;
  }
  /**
   * Parse midrow styling command
   * @returns {Boolean}
   */
  ;

  _proto7.parseMidrow = function parseMidrow(a, b) {
    var chNr = 0;

    if ((a === 0x11 || a === 0x19) && b >= 0x20 && b <= 0x2f) {
      if (a === 0x11) {
        chNr = 1;
      } else {
        chNr = 2;
      }

      if (chNr !== this.currentChannel) {
        this.logger.log(VerboseLevel.ERROR, 'Mismatch channel in midrow parsing');
        return false;
      }

      var channel = this.channels[chNr];

      if (!channel) {
        return false;
      }

      channel.ccMIDROW(b);
      this.logger.log(VerboseLevel.DEBUG, 'MIDROW (' + numArrayToHexArray([a, b]) + ')');
      return true;
    }

    return false;
  }
  /**
   * Parse Preable Access Codes (Table 53).
   * @returns {Boolean} Tells if PAC found
   */
  ;

  _proto7.parsePAC = function parsePAC(a, b) {
    var row;
    var cmdHistory = this.cmdHistory;
    var case1 = (a >= 0x11 && a <= 0x17 || a >= 0x19 && a <= 0x1F) && b >= 0x40 && b <= 0x7F;
    var case2 = (a === 0x10 || a === 0x18) && b >= 0x40 && b <= 0x5F;

    if (!(case1 || case2)) {
      return false;
    }

    if (hasCmdRepeated(a, b, cmdHistory)) {
      setLastCmd(null, null, cmdHistory);
      return true; // Repeated commands are dropped (once)
    }

    var chNr = a <= 0x17 ? 1 : 2;

    if (b >= 0x40 && b <= 0x5F) {
      row = chNr === 1 ? rowsLowCh1[a] : rowsLowCh2[a];
    } else {
      // 0x60 <= b <= 0x7F
      row = chNr === 1 ? rowsHighCh1[a] : rowsHighCh2[a];
    }

    var channel = this.channels[chNr];

    if (!channel) {
      return false;
    }

    channel.setPAC(this.interpretPAC(row, b));
    setLastCmd(a, b, cmdHistory);
    this.currentChannel = chNr;
    return true;
  }
  /**
   * Interpret the second byte of the pac, and return the information.
   * @returns {Object} pacData with style parameters.
   */
  ;

  _proto7.interpretPAC = function interpretPAC(row, _byte3) {
    var pacIndex = _byte3;
    var pacData = {
      color: null,
      italics: false,
      indent: null,
      underline: false,
      row: row
    };

    if (_byte3 > 0x5F) {
      pacIndex = _byte3 - 0x60;
    } else {
      pacIndex = _byte3 - 0x40;
    }

    pacData.underline = (pacIndex & 1) === 1;

    if (pacIndex <= 0xd) {
      pacData.color = ['white', 'green', 'blue', 'cyan', 'red', 'yellow', 'magenta', 'white'][Math.floor(pacIndex / 2)];
    } else if (pacIndex <= 0xf) {
      pacData.italics = true;
      pacData.color = 'white';
    } else {
      pacData.indent = Math.floor((pacIndex - 0x10) / 2) * 4;
    }

    return pacData; // Note that row has zero offset. The spec uses 1.
  }
  /**
   * Parse characters.
   * @returns An array with 1 to 2 codes corresponding to chars, if found. null otherwise.
   */
  ;

  _proto7.parseChars = function parseChars(a, b) {
    var channelNr;
    var charCodes = null;
    var charCode1 = null;

    if (a >= 0x19) {
      channelNr = 2;
      charCode1 = a - 8;
    } else {
      channelNr = 1;
      charCode1 = a;
    }

    if (charCode1 >= 0x11 && charCode1 <= 0x13) {
      // Special character
      var oneCode = b;

      if (charCode1 === 0x11) {
        oneCode = b + 0x50;
      } else if (charCode1 === 0x12) {
        oneCode = b + 0x70;
      } else {
        oneCode = b + 0x90;
      }

      this.logger.log(VerboseLevel.INFO, 'Special char \'' + getCharForByte(oneCode) + '\' in channel ' + channelNr);
      charCodes = [oneCode];
    } else if (a >= 0x20 && a <= 0x7f) {
      charCodes = b === 0 ? [a] : [a, b];
    }

    if (charCodes) {
      var hexCodes = numArrayToHexArray(charCodes);
      this.logger.log(VerboseLevel.DEBUG, 'Char codes =  ' + hexCodes.join(','));
      setLastCmd(a, b, this.cmdHistory);
    }

    return charCodes;
  }
  /**
   * Parse extended background attributes as well as new foreground color black.
   * @returns {Boolean} Tells if background attributes are found
   */
  ;

  _proto7.parseBackgroundAttributes = function parseBackgroundAttributes(a, b) {
    var case1 = (a === 0x10 || a === 0x18) && b >= 0x20 && b <= 0x2f;
    var case2 = (a === 0x17 || a === 0x1f) && b >= 0x2d && b <= 0x2f;

    if (!(case1 || case2)) {
      return false;
    }

    var index;
    var bkgData = {};

    if (a === 0x10 || a === 0x18) {
      index = Math.floor((b - 0x20) / 2);
      bkgData.background = backgroundColors[index];

      if (b % 2 === 1) {
        bkgData.background = bkgData.background + '_semi';
      }
    } else if (b === 0x2d) {
      bkgData.background = 'transparent';
    } else {
      bkgData.foreground = 'black';

      if (b === 0x2f) {
        bkgData.underline = true;
      }
    }

    var chNr = a <= 0x17 ? 1 : 2;
    var channel = this.channels[chNr];
    channel.setBkgData(bkgData);
    setLastCmd(a, b, this.cmdHistory);
    return true;
  }
  /**
   * Reset state of parser and its channels.
   */
  ;

  _proto7.reset = function reset() {
    for (var i = 0; i < Object.keys(this.channels).length; i++) {
      var channel = this.channels[i];

      if (channel) {
        channel.reset();
      }
    }

    this.cmdHistory = createCmdHistory();
  }
  /**
   * Trigger the generation of a cue, and the start of a new one if displayScreens are not empty.
   */
  ;

  _proto7.cueSplitAtTime = function cueSplitAtTime(t) {
    for (var i = 0; i < this.channels.length; i++) {
      var channel = this.channels[i];

      if (channel) {
        channel.cueSplitAtTime(t);
      }
    }
  };

  return Cea608Parser;
}();

function setLastCmd(a, b, cmdHistory) {
  cmdHistory.a = a;
  cmdHistory.b = b;
}

function hasCmdRepeated(a, b, cmdHistory) {
  return cmdHistory.a === a && cmdHistory.b === b;
}

function createCmdHistory() {
  return {
    a: null,
    b: null
  };
}

/* harmony default export */ var cea_608_parser = (Cea608Parser);
// CONCATENATED MODULE: ./src/utils/output-filter.ts
var OutputFilter = /*#__PURE__*/function () {
  function OutputFilter(timelineController, trackName) {
    this.timelineController = void 0;
    this.cueRanges = [];
    this.trackName = void 0;
    this.startTime = null;
    this.endTime = null;
    this.screen = null;
    this.timelineController = timelineController;
    this.trackName = trackName;
  }

  var _proto = OutputFilter.prototype;

  _proto.dispatchCue = function dispatchCue() {
    if (this.startTime === null) {
      return;
    }

    this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges);
    this.startTime = null;
  };

  _proto.newCue = function newCue(startTime, endTime, screen) {
    if (this.startTime === null || this.startTime > startTime) {
      this.startTime = startTime;
    }

    this.endTime = endTime;
    this.screen = screen;
    this.timelineController.createCaptionsTrack(this.trackName);
  };

  _proto.reset = function reset() {
    this.cueRanges = [];
  };

  return OutputFilter;
}();


// CONCATENATED MODULE: ./src/utils/webvtt-parser.js





 // String.prototype.startsWith is not supported in IE11

var startsWith = function startsWith(inputString, searchString, position) {
  return inputString.substr(position || 0, searchString.length) === searchString;
};

var webvtt_parser_cueString2millis = function cueString2millis(timeString) {
  var ts = parseInt(timeString.substr(-3));
  var secs = parseInt(timeString.substr(-6, 2));
  var mins = parseInt(timeString.substr(-9, 2));
  var hours = timeString.length > 9 ? parseInt(timeString.substr(0, timeString.indexOf(':'))) : 0;

  if (!Object(number["isFiniteNumber"])(ts) || !Object(number["isFiniteNumber"])(secs) || !Object(number["isFiniteNumber"])(mins) || !Object(number["isFiniteNumber"])(hours)) {
    throw Error("Malformed X-TIMESTAMP-MAP: Local:" + timeString);
  }

  ts += 1000 * secs;
  ts += 60 * 1000 * mins;
  ts += 60 * 60 * 1000 * hours;
  return ts;
}; // From https://github.com/darkskyapp/string-hash


var hash = function hash(text) {
  var hash = 5381;
  var i = text.length;

  while (i) {
    hash = hash * 33 ^ text.charCodeAt(--i);
  }

  return (hash >>> 0).toString();
};

var calculateOffset = function calculateOffset(vttCCs, cc, presentationTime) {
  var currCC = vttCCs[cc];
  var prevCC = vttCCs[currCC.prevCC]; // This is the first discontinuity or cues have been processed since the last discontinuity
  // Offset = current discontinuity time

  if (!prevCC || !prevCC.new && currCC.new) {
    vttCCs.ccOffset = vttCCs.presentationOffset = currCC.start;
    currCC.new = false;
    return;
  } // There have been discontinuities since cues were last parsed.
  // Offset = time elapsed


  while (prevCC && prevCC.new) {
    vttCCs.ccOffset += currCC.start - prevCC.start;
    currCC.new = false;
    currCC = prevCC;
    prevCC = vttCCs[currCC.prevCC];
  }

  vttCCs.presentationOffset = presentationTime;
};

var WebVTTParser = {
  parse: function parse(vttByteArray, syncPTS, vttCCs, cc, callBack, errorCallBack) {
    // Convert byteArray into string, replacing any somewhat exotic linefeeds with "\n", then split on that character.
    var re = /\r\n|\n\r|\n|\r/g; // Uint8Array.prototype.reduce is not implemented in IE11

    var vttLines = Object(id3["utf8ArrayToStr"])(new Uint8Array(vttByteArray)).trim().replace(re, '\n').split('\n');
    var cueTime = '00:00.000';
    var mpegTs = 0;
    var localTime = 0;
    var presentationTime = 0;
    var cues = [];
    var parsingError;
    var inHeader = true;
    var timestampMap = false; // let VTTCue = VTTCue || window.TextTrackCue;
    // Create parser object using VTTCue with TextTrackCue fallback on certain browsers.

    var parser = new vttparser();

    parser.oncue = function (cue) {
      // Adjust cue timing; clamp cues to start no earlier than - and drop cues that don't end after - 0 on timeline.
      var currCC = vttCCs[cc];
      var cueOffset = vttCCs.ccOffset; // Update offsets for new discontinuities

      if (currCC && currCC.new) {
        if (localTime !== undefined) {
          // When local time is provided, offset = discontinuity start time - local time
          cueOffset = vttCCs.ccOffset = currCC.start;
        } else {
          calculateOffset(vttCCs, cc, presentationTime);
        }
      }

      if (presentationTime) {
        // If we have MPEGTS, offset = presentation time + discontinuity offset
        cueOffset = presentationTime - vttCCs.presentationOffset;
      }

      if (timestampMap) {
        cue.startTime += cueOffset - localTime;
        cue.endTime += cueOffset - localTime;
      } // Create a unique hash id for a cue based on start/end times and text.
      // This helps timeline-controller to avoid showing repeated captions.


      cue.id = hash(cue.startTime.toString()) + hash(cue.endTime.toString()) + hash(cue.text); // Fix encoding of special characters. TODO: Test with all sorts of weird characters.

      cue.text = decodeURIComponent(encodeURIComponent(cue.text));

      if (cue.endTime > 0) {
        cues.push(cue);
      }
    };

    parser.onparsingerror = function (e) {
      parsingError = e;
    };

    parser.onflush = function () {
      if (parsingError && errorCallBack) {
        errorCallBack(parsingError);
        return;
      }

      callBack(cues);
    }; // Go through contents line by line.


    vttLines.forEach(function (line) {
      if (inHeader) {
        // Look for X-TIMESTAMP-MAP in header.
        if (startsWith(line, 'X-TIMESTAMP-MAP=')) {
          // Once found, no more are allowed anyway, so stop searching.
          inHeader = false;
          timestampMap = true; // Extract LOCAL and MPEGTS.

          line.substr(16).split(',').forEach(function (timestamp) {
            if (startsWith(timestamp, 'LOCAL:')) {
              cueTime = timestamp.substr(6);
            } else if (startsWith(timestamp, 'MPEGTS:')) {
              mpegTs = parseInt(timestamp.substr(7));
            }
          });

          try {
            // Calculate subtitle offset in milliseconds.
            if (syncPTS + (vttCCs[cc].start * 90000 || 0) < 0) {
              syncPTS += 8589934592;
            } // Adjust MPEGTS by sync PTS.


            mpegTs -= syncPTS; // Convert cue time to seconds

            localTime = webvtt_parser_cueString2millis(cueTime) / 1000; // Convert MPEGTS to seconds from 90kHz.

            presentationTime = mpegTs / 90000;
          } catch (e) {
            timestampMap = false;
            parsingError = e;
          } // Return without parsing X-TIMESTAMP-MAP line.


          return;
        } else if (line === '') {
          inHeader = false;
        }
      } // Parse line by default.


      parser.parse(line + '\n');
    });
    parser.flush();
  }
};
/* harmony default export */ var webvtt_parser = (WebVTTParser);
// CONCATENATED MODULE: ./src/controller/timeline-controller.ts



function timeline_controller_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function timeline_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }









var timeline_controller_TimelineController = /*#__PURE__*/function (_EventHandler) {
  timeline_controller_inheritsLoose(TimelineController, _EventHandler);

  function TimelineController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].MEDIA_ATTACHING, events["default"].MEDIA_DETACHING, events["default"].FRAG_PARSING_USERDATA, events["default"].FRAG_DECRYPTED, events["default"].MANIFEST_LOADING, events["default"].MANIFEST_LOADED, events["default"].FRAG_LOADED, events["default"].INIT_PTS_FOUND) || this;
    _this.media = null;
    _this.config = void 0;
    _this.enabled = true;
    _this.Cues = void 0;
    _this.textTracks = [];
    _this.tracks = [];
    _this.initPTS = [];
    _this.unparsedVttFrags = [];
    _this.captionsTracks = {};
    _this.nonNativeCaptionsTracks = {};
    _this.captionsProperties = void 0;
    _this.cea608Parser1 = void 0;
    _this.cea608Parser2 = void 0;
    _this.lastSn = -1;
    _this.prevCC = -1;
    _this.vttCCs = newVTTCCs();
    _this.hls = hls;
    _this.config = hls.config;
    _this.Cues = hls.config.cueHandler;
    _this.captionsProperties = {
      textTrack1: {
        label: _this.config.captionsTextTrack1Label,
        languageCode: _this.config.captionsTextTrack1LanguageCode
      },
      textTrack2: {
        label: _this.config.captionsTextTrack2Label,
        languageCode: _this.config.captionsTextTrack2LanguageCode
      },
      textTrack3: {
        label: _this.config.captionsTextTrack3Label,
        languageCode: _this.config.captionsTextTrack3LanguageCode
      },
      textTrack4: {
        label: _this.config.captionsTextTrack4Label,
        languageCode: _this.config.captionsTextTrack4LanguageCode
      }
    };

    if (_this.config.enableCEA708Captions) {
      var channel1 = new OutputFilter(timeline_controller_assertThisInitialized(_this), 'textTrack1');
      var channel2 = new OutputFilter(timeline_controller_assertThisInitialized(_this), 'textTrack2');
      var channel3 = new OutputFilter(timeline_controller_assertThisInitialized(_this), 'textTrack3');
      var channel4 = new OutputFilter(timeline_controller_assertThisInitialized(_this), 'textTrack4');
      _this.cea608Parser1 = new cea_608_parser(1, channel1, channel2);
      _this.cea608Parser2 = new cea_608_parser(3, channel3, channel4);
    }

    return _this;
  }

  var _proto = TimelineController.prototype;

  _proto.addCues = function addCues(trackName, startTime, endTime, screen, cueRanges) {
    // skip cues which overlap more than 50% with previously parsed time ranges
    var merged = false;

    for (var i = cueRanges.length; i--;) {
      var cueRange = cueRanges[i];
      var overlap = intersection(cueRange[0], cueRange[1], startTime, endTime);

      if (overlap >= 0) {
        cueRange[0] = Math.min(cueRange[0], startTime);
        cueRange[1] = Math.max(cueRange[1], endTime);
        merged = true;

        if (overlap / (endTime - startTime) > 0.5) {
          return;
        }
      }
    }

    if (!merged) {
      cueRanges.push([startTime, endTime]);
    }

    if (this.config.renderTextTracksNatively) {
      this.Cues.newCue(this.captionsTracks[trackName], startTime, endTime, screen);
    } else {
      var cues = this.Cues.newCue(null, startTime, endTime, screen);
      this.hls.trigger(events["default"].CUES_PARSED, {
        type: 'captions',
        cues: cues,
        track: trackName
      });
    }
  } // Triggered when an initial PTS is found; used for synchronisation of WebVTT.
  ;

  _proto.onInitPtsFound = function onInitPtsFound(data) {
    var _this2 = this;

    var frag = data.frag,
        id = data.id,
        initPTS = data.initPTS;
    var unparsedVttFrags = this.unparsedVttFrags;

    if (id === 'main') {
      this.initPTS[frag.cc] = initPTS;
    } // Due to asynchronous processing, initial PTS may arrive later than the first VTT fragments are loaded.
    // Parse any unparsed fragments upon receiving the initial PTS.


    if (unparsedVttFrags.length) {
      this.unparsedVttFrags = [];
      unparsedVttFrags.forEach(function (frag) {
        _this2.onFragLoaded(frag);
      });
    }
  };

  _proto.getExistingTrack = function getExistingTrack(trackName) {
    var media = this.media;

    if (media) {
      for (var i = 0; i < media.textTracks.length; i++) {
        var textTrack = media.textTracks[i];

        if (textTrack[trackName]) {
          return textTrack;
        }
      }
    }

    return null;
  };

  _proto.createCaptionsTrack = function createCaptionsTrack(trackName) {
    if (this.config.renderTextTracksNatively) {
      this.createNativeTrack(trackName);
    } else {
      this.createNonNativeTrack(trackName);
    }
  };

  _proto.createNativeTrack = function createNativeTrack(trackName) {
    if (this.captionsTracks[trackName]) {
      return;
    }

    var captionsProperties = this.captionsProperties,
        captionsTracks = this.captionsTracks,
        media = this.media;
    var _captionsProperties$t = captionsProperties[trackName],
        label = _captionsProperties$t.label,
        languageCode = _captionsProperties$t.languageCode; // Enable reuse of existing text track.

    var existingTrack = this.getExistingTrack(trackName);

    if (!existingTrack) {
      var textTrack = this.createTextTrack('captions', label, languageCode);

      if (textTrack) {
        // Set a special property on the track so we know it's managed by Hls.js
        textTrack[trackName] = true;
        captionsTracks[trackName] = textTrack;
      }
    } else {
      captionsTracks[trackName] = existingTrack;
      clearCurrentCues(captionsTracks[trackName]);
      sendAddTrackEvent(captionsTracks[trackName], media);
    }
  };

  _proto.createNonNativeTrack = function createNonNativeTrack(trackName) {
    if (this.nonNativeCaptionsTracks[trackName]) {
      return;
    } // Create a list of a single track for the provider to consume


    var trackProperties = this.captionsProperties[trackName];

    if (!trackProperties) {
      return;
    }

    var label = trackProperties.label;
    var track = {
      _id: trackName,
      label: label,
      kind: 'captions',
      default: trackProperties.media ? !!trackProperties.media.default : false,
      closedCaptions: trackProperties.media
    };
    this.nonNativeCaptionsTracks[trackName] = track;
    this.hls.trigger(events["default"].NON_NATIVE_TEXT_TRACKS_FOUND, {
      tracks: [track]
    });
  };

  _proto.createTextTrack = function createTextTrack(kind, label, lang) {
    var media = this.media;

    if (!media) {
      return;
    }

    return media.addTextTrack(kind, label, lang);
  };

  _proto.destroy = function destroy() {
    _EventHandler.prototype.destroy.call(this);
  };

  _proto.onMediaAttaching = function onMediaAttaching(data) {
    this.media = data.media;

    this._cleanTracks();
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    var captionsTracks = this.captionsTracks;
    Object.keys(captionsTracks).forEach(function (trackName) {
      clearCurrentCues(captionsTracks[trackName]);
      delete captionsTracks[trackName];
    });
    this.nonNativeCaptionsTracks = {};
  };

  _proto.onManifestLoading = function onManifestLoading() {
    this.lastSn = -1; // Detect discontiguity in fragment parsing

    this.prevCC = -1;
    this.vttCCs = newVTTCCs(); // Detect discontinuity in subtitle manifests

    this._cleanTracks();

    this.tracks = [];
    this.captionsTracks = {};
    this.nonNativeCaptionsTracks = {};
  };

  _proto._cleanTracks = function _cleanTracks() {
    // clear outdated subtitles
    var media = this.media;

    if (!media) {
      return;
    }

    var textTracks = media.textTracks;

    if (textTracks) {
      for (var i = 0; i < textTracks.length; i++) {
        clearCurrentCues(textTracks[i]);
      }
    }
  };

  _proto.onManifestLoaded = function onManifestLoaded(data) {
    var _this3 = this;

    this.textTracks = [];
    this.unparsedVttFrags = this.unparsedVttFrags || [];
    this.initPTS = [];

    if (this.cea608Parser1 && this.cea608Parser2) {
      this.cea608Parser1.reset();
      this.cea608Parser2.reset();
    }

    if (this.config.enableWebVTT) {
      var tracks = data.subtitles || [];
      var sameTracks = this.tracks && tracks && this.tracks.length === tracks.length;
      this.tracks = data.subtitles || [];

      if (this.config.renderTextTracksNatively) {
        var inUseTracks = this.media ? this.media.textTracks : [];
        this.tracks.forEach(function (track, index) {
          var textTrack;

          if (index < inUseTracks.length) {
            var inUseTrack = null;

            for (var i = 0; i < inUseTracks.length; i++) {
              if (canReuseVttTextTrack(inUseTracks[i], track)) {
                inUseTrack = inUseTracks[i];
                break;
              }
            } // Reuse tracks with the same label, but do not reuse 608/708 tracks


            if (inUseTrack) {
              textTrack = inUseTrack;
            }
          }

          if (!textTrack) {
            textTrack = _this3.createTextTrack('subtitles', track.name, track.lang);
          }

          if (track.default) {
            textTrack.mode = _this3.hls.subtitleDisplay ? 'showing' : 'hidden';
          } else {
            textTrack.mode = 'disabled';
          }

          _this3.textTracks.push(textTrack);
        });
      } else if (!sameTracks && this.tracks && this.tracks.length) {
        // Create a list of tracks for the provider to consume
        var tracksList = this.tracks.map(function (track) {
          return {
            label: track.name,
            kind: track.type.toLowerCase(),
            default: track.default,
            subtitleTrack: track
          };
        });
        this.hls.trigger(events["default"].NON_NATIVE_TEXT_TRACKS_FOUND, {
          tracks: tracksList
        });
      }
    }

    if (this.config.enableCEA708Captions && data.captions) {
      data.captions.forEach(function (captionsTrack) {
        var instreamIdMatch = /(?:CC|SERVICE)([1-4])/.exec(captionsTrack.instreamId);

        if (!instreamIdMatch) {
          return;
        }

        var trackName = "textTrack" + instreamIdMatch[1];
        var trackProperties = _this3.captionsProperties[trackName];

        if (!trackProperties) {
          return;
        }

        trackProperties.label = captionsTrack.name;

        if (captionsTrack.lang) {
          // optional attribute
          trackProperties.languageCode = captionsTrack.lang;
        }

        trackProperties.media = captionsTrack;
      });
    }
  };

  _proto.onFragLoaded = function onFragLoaded(data) {
    var frag = data.frag,
        payload = data.payload;
    var cea608Parser1 = this.cea608Parser1,
        cea608Parser2 = this.cea608Parser2,
        initPTS = this.initPTS,
        lastSn = this.lastSn,
        unparsedVttFrags = this.unparsedVttFrags;

    if (frag.type === 'main') {
      var sn = frag.sn; // if this frag isn't contiguous, clear the parser so cues with bad start/end times aren't added to the textTrack

      if (frag.sn !== lastSn + 1) {
        if (cea608Parser1 && cea608Parser2) {
          cea608Parser1.reset();
          cea608Parser2.reset();
        }
      }

      this.lastSn = sn;
    } // eslint-disable-line brace-style
    // If fragment is subtitle type, parse as WebVTT.
    else if (frag.type === 'subtitle') {
        if (payload.byteLength) {
          // We need an initial synchronisation PTS. Store fragments as long as none has arrived.
          if (!Object(number["isFiniteNumber"])(initPTS[frag.cc])) {
            unparsedVttFrags.push(data);

            if (initPTS.length) {
              // finish unsuccessfully, otherwise the subtitle-stream-controller could be blocked from loading new frags.
              this.hls.trigger(events["default"].SUBTITLE_FRAG_PROCESSED, {
                success: false,
                frag: frag
              });
            }

            return;
          }

          var decryptData = frag.decryptdata; // If the subtitles are not encrypted, parse VTTs now. Otherwise, we need to wait.

          if (decryptData == null || decryptData.key == null || decryptData.method !== 'AES-128') {
            this._parseVTTs(frag, payload);
          }
        } else {
          // In case there is no payload, finish unsuccessfully.
          this.hls.trigger(events["default"].SUBTITLE_FRAG_PROCESSED, {
            success: false,
            frag: frag
          });
        }
      }
  };

  _proto._parseVTTs = function _parseVTTs(frag, payload) {
    var _this4 = this;

    var hls = this.hls,
        prevCC = this.prevCC,
        textTracks = this.textTracks,
        vttCCs = this.vttCCs;

    if (!vttCCs[frag.cc]) {
      vttCCs[frag.cc] = {
        start: frag.start,
        prevCC: prevCC,
        new: true
      };
      this.prevCC = frag.cc;
    } // Parse the WebVTT file contents.


    webvtt_parser.parse(payload, this.initPTS[frag.cc], vttCCs, frag.cc, function (cues) {
      if (_this4.config.renderTextTracksNatively) {
        var currentTrack = textTracks[frag.level]; // WebVTTParser.parse is an async method and if the currently selected text track mode is set to "disabled"
        // before parsing is done then don't try to access currentTrack.cues.getCueById as cues will be null
        // and trying to access getCueById method of cues will throw an exception
        // Because we check if the mode is diabled, we can force check `cues` below. They can't be null.

        if (currentTrack.mode === 'disabled') {
          hls.trigger(events["default"].SUBTITLE_FRAG_PROCESSED, {
            success: false,
            frag: frag
          });
          return;
        } // Add cues and trigger event with success true.


        cues.forEach(function (cue) {
          // Sometimes there are cue overlaps on segmented vtts so the same
          // cue can appear more than once in different vtt files.
          // This avoid showing duplicated cues with same timecode and text.
          if (!currentTrack.cues.getCueById(cue.id)) {
            try {
              currentTrack.addCue(cue);

              if (!currentTrack.cues.getCueById(cue.id)) {
                throw new Error("addCue is failed for: " + cue);
              }
            } catch (err) {
              logger["logger"].debug("Failed occurred on adding cues: " + err);
              var textTrackCue = new window.TextTrackCue(cue.startTime, cue.endTime, cue.text);
              textTrackCue.id = cue.id;
              currentTrack.addCue(textTrackCue);
            }
          }
        });
      } else {
        var trackId = _this4.tracks[frag.level].default ? 'default' : 'subtitles' + frag.level;
        hls.trigger(events["default"].CUES_PARSED, {
          type: 'subtitles',
          cues: cues,
          track: trackId
        });
      }

      hls.trigger(events["default"].SUBTITLE_FRAG_PROCESSED, {
        success: true,
        frag: frag
      });
    }, function (e) {
      // Something went wrong while parsing. Trigger event with success false.
      logger["logger"].log("Failed to parse VTT cue: " + e);
      hls.trigger(events["default"].SUBTITLE_FRAG_PROCESSED, {
        success: false,
        frag: frag
      });
    });
  };

  _proto.onFragDecrypted = function onFragDecrypted(data) {
    var frag = data.frag,
        payload = data.payload;

    if (frag.type === 'subtitle') {
      if (!Object(number["isFiniteNumber"])(this.initPTS[frag.cc])) {
        this.unparsedVttFrags.push(data);
        return;
      }

      this._parseVTTs(frag, payload);
    }
  };

  _proto.onFragParsingUserdata = function onFragParsingUserdata(data) {
    var cea608Parser1 = this.cea608Parser1,
        cea608Parser2 = this.cea608Parser2;

    if (!this.enabled || !(cea608Parser1 && cea608Parser2)) {
      return;
    } // If the event contains captions (found in the bytes property), push all bytes into the parser immediately
    // It will create the proper timestamps based on the PTS value


    for (var i = 0; i < data.samples.length; i++) {
      var ccBytes = data.samples[i].bytes;

      if (ccBytes) {
        var ccdatas = this.extractCea608Data(ccBytes);
        cea608Parser1.addData(data.samples[i].pts, ccdatas[0]);
        cea608Parser2.addData(data.samples[i].pts, ccdatas[1]);
      }
    }
  };

  _proto.extractCea608Data = function extractCea608Data(byteArray) {
    var count = byteArray[0] & 31;
    var position = 2;
    var actualCCBytes = [[], []];

    for (var j = 0; j < count; j++) {
      var tmpByte = byteArray[position++];
      var ccbyte1 = 0x7F & byteArray[position++];
      var ccbyte2 = 0x7F & byteArray[position++];
      var ccValid = (4 & tmpByte) !== 0;
      var ccType = 3 & tmpByte;

      if (ccbyte1 === 0 && ccbyte2 === 0) {
        continue;
      }

      if (ccValid) {
        if (ccType === 0 || ccType === 1) {
          actualCCBytes[ccType].push(ccbyte1);
          actualCCBytes[ccType].push(ccbyte2);
        }
      }
    }

    return actualCCBytes;
  };

  return TimelineController;
}(event_handler);

function canReuseVttTextTrack(inUseTrack, manifestTrack) {
  return inUseTrack && inUseTrack.label === manifestTrack.name && !(inUseTrack.textTrack1 || inUseTrack.textTrack2);
}

function intersection(x1, x2, y1, y2) {
  return Math.min(x2, y2) - Math.max(x1, y1);
}

function newVTTCCs() {
  return {
    ccOffset: 0,
    presentationOffset: 0,
    0: {
      start: 0,
      prevCC: -1,
      new: false
    }
  };
}

/* harmony default export */ var timeline_controller = (timeline_controller_TimelineController);
// CONCATENATED MODULE: ./src/controller/subtitle-track-controller.js




function subtitle_track_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function subtitle_track_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) subtitle_track_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) subtitle_track_controller_defineProperties(Constructor, staticProps); return Constructor; }

function subtitle_track_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var subtitle_track_controller_SubtitleTrackController = /*#__PURE__*/function (_EventHandler) {
  subtitle_track_controller_inheritsLoose(SubtitleTrackController, _EventHandler);

  function SubtitleTrackController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].MEDIA_ATTACHED, events["default"].MEDIA_DETACHING, events["default"].MANIFEST_LOADED, events["default"].SUBTITLE_TRACK_LOADED) || this;
    _this.tracks = [];
    _this.trackId = -1;
    _this.media = null;
    _this.stopped = true;
    /**
     * @member {boolean} subtitleDisplay Enable/disable subtitle display rendering
     */

    _this.subtitleDisplay = true;
    /**
     * Keeps reference to a default track id when media has not been attached yet
     * @member {number}
     */

    _this.queuedDefaultTrack = null;
    return _this;
  }

  var _proto = SubtitleTrackController.prototype;

  _proto.destroy = function destroy() {
    event_handler.prototype.destroy.call(this);
  } // Listen for subtitle track change, then extract the current track ID.
  ;

  _proto.onMediaAttached = function onMediaAttached(data) {
    var _this2 = this;

    this.media = data.media;

    if (!this.media) {
      return;
    }

    if (Object(number["isFiniteNumber"])(this.queuedDefaultTrack)) {
      this.subtitleTrack = this.queuedDefaultTrack;
      this.queuedDefaultTrack = null;
    }

    this.trackChangeListener = this._onTextTracksChanged.bind(this);
    this.useTextTrackPolling = !(this.media.textTracks && 'onchange' in this.media.textTracks);

    if (this.useTextTrackPolling) {
      this.subtitlePollingInterval = setInterval(function () {
        _this2.trackChangeListener();
      }, 500);
    } else {
      this.media.textTracks.addEventListener('change', this.trackChangeListener);
    }
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    if (!this.media) {
      return;
    }

    if (this.useTextTrackPolling) {
      clearInterval(this.subtitlePollingInterval);
    } else {
      this.media.textTracks.removeEventListener('change', this.trackChangeListener);
    }

    if (Object(number["isFiniteNumber"])(this.subtitleTrack)) {
      this.queuedDefaultTrack = this.subtitleTrack;
    }

    var textTracks = filterSubtitleTracks(this.media.textTracks); // Clear loaded cues on media detachment from tracks

    textTracks.forEach(function (track) {
      clearCurrentCues(track);
    }); // Disable all subtitle tracks before detachment so when reattached only tracks in that content are enabled.

    this.subtitleTrack = -1;
    this.media = null;
  } // Fired whenever a new manifest is loaded.
  ;

  _proto.onManifestLoaded = function onManifestLoaded(data) {
    var _this3 = this;

    var tracks = data.subtitles || [];
    this.tracks = tracks;
    this.hls.trigger(events["default"].SUBTITLE_TRACKS_UPDATED, {
      subtitleTracks: tracks
    }); // loop through available subtitle tracks and autoselect default if needed
    // TODO: improve selection logic to handle forced, etc

    tracks.forEach(function (track) {
      if (track.default) {
        // setting this.subtitleTrack will trigger internal logic
        // if media has not been attached yet, it will fail
        // we keep a reference to the default track id
        // and we'll set subtitleTrack when onMediaAttached is triggered
        if (_this3.media) {
          _this3.subtitleTrack = track.id;
        } else {
          _this3.queuedDefaultTrack = track.id;
        }
      }
    });
  };

  _proto.onSubtitleTrackLoaded = function onSubtitleTrackLoaded(data) {
    var _this4 = this;

    var id = data.id,
        details = data.details;
    var trackId = this.trackId,
        tracks = this.tracks;
    var currentTrack = tracks[trackId];

    if (id >= tracks.length || id !== trackId || !currentTrack || this.stopped) {
      this._clearReloadTimer();

      return;
    }

    logger["logger"].log("subtitle track " + id + " loaded");

    if (details.live) {
      var reloadInterval = computeReloadInterval(currentTrack.details, details, data.stats.trequest);
      logger["logger"].log("Reloading live subtitle playlist in " + reloadInterval + "ms");
      this.timer = setTimeout(function () {
        _this4._loadCurrentTrack();
      }, reloadInterval);
    } else {
      this._clearReloadTimer();
    }
  };

  _proto.startLoad = function startLoad() {
    this.stopped = false;

    this._loadCurrentTrack();
  };

  _proto.stopLoad = function stopLoad() {
    this.stopped = true;

    this._clearReloadTimer();
  }
  /** get alternate subtitle tracks list from playlist **/
  ;

  _proto._clearReloadTimer = function _clearReloadTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  _proto._loadCurrentTrack = function _loadCurrentTrack() {
    var trackId = this.trackId,
        tracks = this.tracks,
        hls = this.hls;
    var currentTrack = tracks[trackId];

    if (trackId < 0 || !currentTrack || currentTrack.details && !currentTrack.details.live) {
      return;
    }

    logger["logger"].log("Loading subtitle track " + trackId);
    hls.trigger(events["default"].SUBTITLE_TRACK_LOADING, {
      url: currentTrack.url,
      id: trackId
    });
  }
  /**
   * Disables the old subtitleTrack and sets current mode on the next subtitleTrack.
   * This operates on the DOM textTracks.
   * A value of -1 will disable all subtitle tracks.
   * @param newId - The id of the next track to enable
   * @private
   */
  ;

  _proto._toggleTrackModes = function _toggleTrackModes(newId) {
    var media = this.media,
        subtitleDisplay = this.subtitleDisplay,
        trackId = this.trackId;

    if (!media) {
      return;
    }

    var textTracks = filterSubtitleTracks(media.textTracks);

    if (newId === -1) {
      [].slice.call(textTracks).forEach(function (track) {
        track.mode = 'disabled';
      });
    } else {
      var oldTrack = textTracks[trackId];

      if (oldTrack) {
        oldTrack.mode = 'disabled';
      }
    }

    var nextTrack = textTracks[newId];

    if (nextTrack) {
      nextTrack.mode = subtitleDisplay ? 'showing' : 'hidden';
    }
  }
  /**
     * This method is responsible for validating the subtitle index and periodically reloading if live.
     * Dispatches the SUBTITLE_TRACK_SWITCH event, which instructs the subtitle-stream-controller to load the selected track.
     * @param newId - The id of the subtitle track to activate.
     */
  ;

  _proto._setSubtitleTrackInternal = function _setSubtitleTrackInternal(newId) {
    var hls = this.hls,
        tracks = this.tracks;

    if (!Object(number["isFiniteNumber"])(newId) || newId < -1 || newId >= tracks.length) {
      return;
    }

    this.trackId = newId;
    logger["logger"].log("Switching to subtitle track " + newId);
    hls.trigger(events["default"].SUBTITLE_TRACK_SWITCH, {
      id: newId
    });

    this._loadCurrentTrack();
  };

  _proto._onTextTracksChanged = function _onTextTracksChanged() {
    // Media is undefined when switching streams via loadSource()
    if (!this.media || !this.hls.config.renderTextTracksNatively) {
      return;
    }

    var trackId = -1;
    var tracks = filterSubtitleTracks(this.media.textTracks);

    for (var id = 0; id < tracks.length; id++) {
      if (tracks[id].mode === 'hidden') {
        // Do not break in case there is a following track with showing.
        trackId = id;
      } else if (tracks[id].mode === 'showing') {
        trackId = id;
        break;
      }
    } // Setting current subtitleTrack will invoke code.


    this.subtitleTrack = trackId;
  };

  subtitle_track_controller_createClass(SubtitleTrackController, [{
    key: "subtitleTracks",
    get: function get() {
      return this.tracks;
    }
    /** get index of the selected subtitle track (index in subtitle track lists) **/

  }, {
    key: "subtitleTrack",
    get: function get() {
      return this.trackId;
    }
    /** select a subtitle track, based on its index in subtitle track lists**/
    ,
    set: function set(subtitleTrackId) {
      if (this.trackId !== subtitleTrackId) {
        this._toggleTrackModes(subtitleTrackId);

        this._setSubtitleTrackInternal(subtitleTrackId);
      }
    }
  }]);

  return SubtitleTrackController;
}(event_handler);

function filterSubtitleTracks(textTrackList) {
  var tracks = [];

  for (var i = 0; i < textTrackList.length; i++) {
    var track = textTrackList[i]; // Edge adds a track without a label; we don't want to use it

    if (track.kind === 'subtitles' && track.label) {
      tracks.push(textTrackList[i]);
    }
  }

  return tracks;
}

/* harmony default export */ var subtitle_track_controller = (subtitle_track_controller_SubtitleTrackController);
// EXTERNAL MODULE: ./src/crypt/decrypter.js + 3 modules
var decrypter = __webpack_require__("./src/crypt/decrypter.js");

// CONCATENATED MODULE: ./src/controller/subtitle-stream-controller.js
function subtitle_stream_controller_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function subtitle_stream_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @class SubtitleStreamController
 */








var subtitle_stream_controller_window = window,
    subtitle_stream_controller_performance = subtitle_stream_controller_window.performance;
var subtitle_stream_controller_TICK_INTERVAL = 500; // how often to tick in ms

var subtitle_stream_controller_SubtitleStreamController = /*#__PURE__*/function (_BaseStreamController) {
  subtitle_stream_controller_inheritsLoose(SubtitleStreamController, _BaseStreamController);

  function SubtitleStreamController(hls, fragmentTracker) {
    var _this;

    _this = _BaseStreamController.call(this, hls, events["default"].MEDIA_ATTACHED, events["default"].MEDIA_DETACHING, events["default"].ERROR, events["default"].KEY_LOADED, events["default"].FRAG_LOADED, events["default"].SUBTITLE_TRACKS_UPDATED, events["default"].SUBTITLE_TRACK_SWITCH, events["default"].SUBTITLE_TRACK_LOADED, events["default"].SUBTITLE_FRAG_PROCESSED, events["default"].LEVEL_UPDATED) || this;
    _this.fragmentTracker = fragmentTracker;
    _this.config = hls.config;
    _this.state = State.STOPPED;
    _this.tracks = [];
    _this.tracksBuffered = [];
    _this.currentTrackId = -1;
    _this.decrypter = new decrypter["default"](hls, hls.config); // lastAVStart stores the time in seconds for the start time of a level load

    _this.lastAVStart = 0;
    _this._onMediaSeeking = _this.onMediaSeeking.bind(subtitle_stream_controller_assertThisInitialized(_this));
    return _this;
  }

  var _proto = SubtitleStreamController.prototype;

  _proto.startLoad = function startLoad() {
    this.stopLoad();
    this.state = State.IDLE; // Check if we already have a track with necessary details to load fragments

    var currentTrack = this.tracks[this.currentTrackId];

    if (currentTrack && currentTrack.details) {
      this.setInterval(subtitle_stream_controller_TICK_INTERVAL);
      this.tick();
    }
  };

  _proto.onSubtitleFragProcessed = function onSubtitleFragProcessed(data) {
    var frag = data.frag,
        success = data.success;
    this.fragPrevious = frag;
    this.state = State.IDLE;

    if (!success) {
      return;
    }

    var buffered = this.tracksBuffered[this.currentTrackId];

    if (!buffered) {
      return;
    } // Create/update a buffered array matching the interface used by BufferHelper.bufferedInfo
    // so we can re-use the logic used to detect how much have been buffered


    var timeRange;
    var fragStart = frag.start;

    for (var i = 0; i < buffered.length; i++) {
      if (fragStart >= buffered[i].start && fragStart <= buffered[i].end) {
        timeRange = buffered[i];
        break;
      }
    }

    var fragEnd = frag.start + frag.duration;

    if (timeRange) {
      timeRange.end = fragEnd;
    } else {
      timeRange = {
        start: fragStart,
        end: fragEnd
      };
      buffered.push(timeRange);
    }
  };

  _proto.onMediaAttached = function onMediaAttached(_ref) {
    var media = _ref.media;
    this.media = media;
    media.addEventListener('seeking', this._onMediaSeeking);
    this.state = State.IDLE;
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    var _this2 = this;

    if (!this.media) {
      return;
    }

    this.media.removeEventListener('seeking', this._onMediaSeeking);
    this.fragmentTracker.removeAllFragments();
    this.currentTrackId = -1;
    this.tracks.forEach(function (track) {
      _this2.tracksBuffered[track.id] = [];
    });
    this.media = null;
    this.state = State.STOPPED;
  } // If something goes wrong, proceed to next frag, if we were processing one.
  ;

  _proto.onError = function onError(data) {
    var frag = data.frag; // don't handle error not related to subtitle fragment

    if (!frag || frag.type !== 'subtitle') {
      return;
    }

    if (this.fragCurrent && this.fragCurrent.loader) {
      this.fragCurrent.loader.abort();
    }

    this.state = State.IDLE;
  } // Got all new subtitle tracks.
  ;

  _proto.onSubtitleTracksUpdated = function onSubtitleTracksUpdated(data) {
    var _this3 = this;

    logger["logger"].log('subtitle tracks updated');
    this.tracksBuffered = [];
    this.tracks = data.subtitleTracks;
    this.tracks.forEach(function (track) {
      _this3.tracksBuffered[track.id] = [];
    });
  };

  _proto.onSubtitleTrackSwitch = function onSubtitleTrackSwitch(data) {
    this.currentTrackId = data.id;

    if (!this.tracks || !this.tracks.length || this.currentTrackId === -1) {
      this.clearInterval();
      return;
    } // Check if track has the necessary details to load fragments


    var currentTrack = this.tracks[this.currentTrackId];

    if (currentTrack && currentTrack.details) {
      this.setInterval(subtitle_stream_controller_TICK_INTERVAL);
    }
  } // Got a new set of subtitle fragments.
  ;

  _proto.onSubtitleTrackLoaded = function onSubtitleTrackLoaded(data) {
    var id = data.id,
        details = data.details;
    var currentTrackId = this.currentTrackId,
        tracks = this.tracks;
    var currentTrack = tracks[currentTrackId];

    if (id >= tracks.length || id !== currentTrackId || !currentTrack) {
      return;
    }

    if (details.live) {
      mergeSubtitlePlaylists(currentTrack.details, details, this.lastAVStart);
    }

    currentTrack.details = details;
    this.setInterval(subtitle_stream_controller_TICK_INTERVAL);
  };

  _proto.onKeyLoaded = function onKeyLoaded() {
    if (this.state === State.KEY_LOADING) {
      this.state = State.IDLE;
    }
  };

  _proto.onFragLoaded = function onFragLoaded(data) {
    var fragCurrent = this.fragCurrent;
    var decryptData = data.frag.decryptdata;
    var fragLoaded = data.frag;
    var hls = this.hls;

    if (this.state === State.FRAG_LOADING && fragCurrent && data.frag.type === 'subtitle' && fragCurrent.sn === data.frag.sn) {
      // check to see if the payload needs to be decrypted
      if (data.payload.byteLength > 0 && decryptData && decryptData.key && decryptData.method === 'AES-128') {
        var startTime = subtitle_stream_controller_performance.now(); // decrypt the subtitles

        this.decrypter.decrypt(data.payload, decryptData.key.buffer, decryptData.iv.buffer, function (decryptedData) {
          var endTime = subtitle_stream_controller_performance.now();
          hls.trigger(events["default"].FRAG_DECRYPTED, {
            frag: fragLoaded,
            payload: decryptedData,
            stats: {
              tstart: startTime,
              tdecrypt: endTime
            }
          });
        });
      }
    }
  };

  _proto.onLevelUpdated = function onLevelUpdated(_ref2) {
    var details = _ref2.details;
    var frags = details.fragments;
    this.lastAVStart = frags.length ? frags[0].start : 0;
  };

  _proto.doTick = function doTick() {
    if (!this.media) {
      this.state = State.IDLE;
      return;
    }

    switch (this.state) {
      case State.IDLE:
        {
          var config = this.config,
              currentTrackId = this.currentTrackId,
              fragmentTracker = this.fragmentTracker,
              media = this.media,
              tracks = this.tracks;

          if (!tracks || !tracks[currentTrackId] || !tracks[currentTrackId].details) {
            break;
          }

          var maxBufferHole = config.maxBufferHole,
              maxFragLookUpTolerance = config.maxFragLookUpTolerance;
          var maxConfigBuffer = Math.min(config.maxBufferLength, config.maxMaxBufferLength);
          var bufferedInfo = BufferHelper.bufferedInfo(this._getBuffered(), media.currentTime, maxBufferHole);
          var bufferEnd = bufferedInfo.end,
              bufferLen = bufferedInfo.len;
          var trackDetails = tracks[currentTrackId].details;
          var fragments = trackDetails.fragments;
          var fragLen = fragments.length;
          var end = fragments[fragLen - 1].start + fragments[fragLen - 1].duration;

          if (bufferLen > maxConfigBuffer) {
            return;
          }

          var foundFrag;
          var fragPrevious = this.fragPrevious;

          if (bufferEnd < end) {
            if (fragPrevious && trackDetails.hasProgramDateTime) {
              foundFrag = findFragmentByPDT(fragments, fragPrevious.endProgramDateTime, maxFragLookUpTolerance);
            }

            if (!foundFrag) {
              foundFrag = findFragmentByPTS(fragPrevious, fragments, bufferEnd, maxFragLookUpTolerance);
            }
          } else {
            foundFrag = fragments[fragLen - 1];
          }

          if (foundFrag && foundFrag.encrypted) {
            logger["logger"].log("Loading key for " + foundFrag.sn);
            this.state = State.KEY_LOADING;
            this.hls.trigger(events["default"].KEY_LOADING, {
              frag: foundFrag
            });
          } else if (foundFrag && fragmentTracker.getState(foundFrag) === FragmentState.NOT_LOADED) {
            // only load if fragment is not loaded
            this.fragCurrent = foundFrag;
            this.state = State.FRAG_LOADING;
            this.hls.trigger(events["default"].FRAG_LOADING, {
              frag: foundFrag
            });
          }
        }
    }
  };

  _proto.stopLoad = function stopLoad() {
    this.lastAVStart = 0;
    this.fragPrevious = null;

    _BaseStreamController.prototype.stopLoad.call(this);
  };

  _proto._getBuffered = function _getBuffered() {
    return this.tracksBuffered[this.currentTrackId] || [];
  };

  _proto.onMediaSeeking = function onMediaSeeking() {
    if (this.fragCurrent) {
      var currentTime = this.media ? this.media.currentTime : 0;
      var tolerance = this.config.maxFragLookUpTolerance;
      var fragStartOffset = this.fragCurrent.start - tolerance;
      var fragEndOffset = this.fragCurrent.start + this.fragCurrent.duration + tolerance; // check if position will be out of currently loaded frag range after seeking : if out, cancel frag load, if in, don't do anything

      if (currentTime < fragStartOffset || currentTime > fragEndOffset) {
        if (this.fragCurrent.loader) {
          this.fragCurrent.loader.abort();
        }

        this.fragmentTracker.removeFragment(this.fragCurrent);
        this.fragCurrent = null;
        this.fragPrevious = null; // switch to IDLE state to load new fragment

        this.state = State.IDLE; // speed up things

        this.tick();
      }
    }
  };

  return SubtitleStreamController;
}(base_stream_controller_BaseStreamController);
// CONCATENATED MODULE: ./src/utils/mediakeys-helper.ts
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess
 */
var KeySystems;

(function (KeySystems) {
  KeySystems["WIDEVINE"] = "com.widevine.alpha";
  KeySystems["PLAYREADY"] = "com.microsoft.playready";
})(KeySystems || (KeySystems = {}));

var requestMediaKeySystemAccess = function () {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.requestMediaKeySystemAccess) {
    return window.navigator.requestMediaKeySystemAccess.bind(window.navigator);
  } else {
    return null;
  }
}();


// CONCATENATED MODULE: ./src/controller/eme-controller.ts
function eme_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function eme_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) eme_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) eme_controller_defineProperties(Constructor, staticProps); return Constructor; }

function eme_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @author Stephan Hesse <disparat@gmail.com> | <tchakabam@gmail.com>
 *
 * DRM support for Hls.js
 */





var MAX_LICENSE_REQUEST_FAILURES = 3;
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaKeySystemConfiguration
 * @param {Array<string>} audioCodecs List of required audio codecs to support
 * @param {Array<string>} videoCodecs List of required video codecs to support
 * @param {object} drmSystemOptions Optional parameters/requirements for the key-system
 * @returns {Array<MediaSystemConfiguration>} An array of supported configurations
 */

var createWidevineMediaKeySystemConfigurations = function createWidevineMediaKeySystemConfigurations(audioCodecs, videoCodecs, drmSystemOptions) {
  /* jshint ignore:line */
  var baseConfig = {
    // initDataTypes: ['keyids', 'mp4'],
    // label: "",
    // persistentState: "not-allowed", // or "required" ?
    // distinctiveIdentifier: "not-allowed", // or "required" ?
    // sessionTypes: ['temporary'],
    audioCapabilities: [],
    // { contentType: 'audio/mp4; codecs="mp4a.40.2"' }
    videoCapabilities: [] // { contentType: 'video/mp4; codecs="avc1.42E01E"' }

  };
  audioCodecs.forEach(function (codec) {
    baseConfig.audioCapabilities.push({
      contentType: "audio/mp4; codecs=\"" + codec + "\"",
      robustness: drmSystemOptions.audioRobustness || ''
    });
  });
  videoCodecs.forEach(function (codec) {
    baseConfig.videoCapabilities.push({
      contentType: "video/mp4; codecs=\"" + codec + "\"",
      robustness: drmSystemOptions.videoRobustness || ''
    });
  });
  return [baseConfig];
};
/**
 * The idea here is to handle key-system (and their respective platforms) specific configuration differences
 * in order to work with the local requestMediaKeySystemAccess method.
 *
 * We can also rule-out platform-related key-system support at this point by throwing an error.
 *
 * @param {string} keySystem Identifier for the key-system, see `KeySystems` enum
 * @param {Array<string>} audioCodecs List of required audio codecs to support
 * @param {Array<string>} videoCodecs List of required video codecs to support
 * @throws will throw an error if a unknown key system is passed
 * @returns {Array<MediaSystemConfiguration>} A non-empty Array of MediaKeySystemConfiguration objects
 */


var eme_controller_getSupportedMediaKeySystemConfigurations = function getSupportedMediaKeySystemConfigurations(keySystem, audioCodecs, videoCodecs, drmSystemOptions) {
  switch (keySystem) {
    case KeySystems.WIDEVINE:
      return createWidevineMediaKeySystemConfigurations(audioCodecs, videoCodecs, drmSystemOptions);

    default:
      throw new Error("Unknown key-system: " + keySystem);
  }
};

/**
 * Controller to deal with encrypted media extensions (EME)
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API
 *
 * @class
 * @constructor
 */
var eme_controller_EMEController = /*#__PURE__*/function (_EventHandler) {
  eme_controller_inheritsLoose(EMEController, _EventHandler);

  /**
     * @constructs
     * @param {Hls} hls Our Hls.js instance
     */
  function EMEController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events["default"].MEDIA_ATTACHED, events["default"].MEDIA_DETACHED, events["default"].MANIFEST_PARSED) || this;
    _this._widevineLicenseUrl = void 0;
    _this._licenseXhrSetup = void 0;
    _this._emeEnabled = void 0;
    _this._requestMediaKeySystemAccess = void 0;
    _this._drmSystemOptions = void 0;
    _this._config = void 0;
    _this._mediaKeysList = [];
    _this._media = null;
    _this._hasSetMediaKeys = false;
    _this._requestLicenseFailureCount = 0;
    _this.mediaKeysPromise = null;

    _this._onMediaEncrypted = function (e) {
      logger["logger"].log("Media is encrypted using \"" + e.initDataType + "\" init data type");

      if (!_this.mediaKeysPromise) {
        logger["logger"].error('Fatal: Media is encrypted but no CDM access or no keys have been requested');

        _this.hls.trigger(events["default"].ERROR, {
          type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
          details: errors["ErrorDetails"].KEY_SYSTEM_NO_KEYS,
          fatal: true
        });

        return;
      }

      var finallySetKeyAndStartSession = function finallySetKeyAndStartSession(mediaKeys) {
        if (!_this._media) {
          return;
        }

        _this._attemptSetMediaKeys(mediaKeys);

        _this._generateRequestWithPreferredKeySession(e.initDataType, e.initData);
      }; // Could use `Promise.finally` but some Promise polyfills are missing it


      _this.mediaKeysPromise.then(finallySetKeyAndStartSession).catch(finallySetKeyAndStartSession);
    };

    _this._config = hls.config;
    _this._widevineLicenseUrl = _this._config.widevineLicenseUrl;
    _this._licenseXhrSetup = _this._config.licenseXhrSetup;
    _this._emeEnabled = _this._config.emeEnabled;
    _this._requestMediaKeySystemAccess = _this._config.requestMediaKeySystemAccessFunc;
    _this._drmSystemOptions = hls.config.drmSystemOptions;
    return _this;
  }
  /**
   * @param {string} keySystem Identifier for the key-system, see `KeySystems` enum
   * @returns {string} License server URL for key-system (if any configured, otherwise causes error)
   * @throws if a unsupported keysystem is passed
   */


  var _proto = EMEController.prototype;

  _proto.getLicenseServerUrl = function getLicenseServerUrl(keySystem) {
    switch (keySystem) {
      case KeySystems.WIDEVINE:
        if (!this._widevineLicenseUrl) {
          break;
        }

        return this._widevineLicenseUrl;
    }

    throw new Error("no license server URL configured for key-system \"" + keySystem + "\"");
  }
  /**
     * Requests access object and adds it to our list upon success
     * @private
     * @param {string} keySystem System ID (see `KeySystems`)
     * @param {Array<string>} audioCodecs List of required audio codecs to support
     * @param {Array<string>} videoCodecs List of required video codecs to support
     * @throws When a unsupported KeySystem is passed
     */
  ;

  _proto._attemptKeySystemAccess = function _attemptKeySystemAccess(keySystem, audioCodecs, videoCodecs) {
    var _this2 = this;

    // This can throw, but is caught in event handler callpath
    var mediaKeySystemConfigs = eme_controller_getSupportedMediaKeySystemConfigurations(keySystem, audioCodecs, videoCodecs, this._drmSystemOptions);
    logger["logger"].log('Requesting encrypted media key-system access'); // expecting interface like window.navigator.requestMediaKeySystemAccess

    var keySystemAccessPromise = this.requestMediaKeySystemAccess(keySystem, mediaKeySystemConfigs);
    this.mediaKeysPromise = keySystemAccessPromise.then(function (mediaKeySystemAccess) {
      return _this2._onMediaKeySystemAccessObtained(keySystem, mediaKeySystemAccess);
    });
    keySystemAccessPromise.catch(function (err) {
      logger["logger"].error("Failed to obtain key-system \"" + keySystem + "\" access:", err);
    });
  };

  /**
     * Handles obtaining access to a key-system
     * @private
     * @param {string} keySystem
     * @param {MediaKeySystemAccess} mediaKeySystemAccess https://developer.mozilla.org/en-US/docs/Web/API/MediaKeySystemAccess
     */
  _proto._onMediaKeySystemAccessObtained = function _onMediaKeySystemAccessObtained(keySystem, mediaKeySystemAccess) {
    var _this3 = this;

    logger["logger"].log("Access for key-system \"" + keySystem + "\" obtained");
    var mediaKeysListItem = {
      mediaKeysSessionInitialized: false,
      mediaKeySystemAccess: mediaKeySystemAccess,
      mediaKeySystemDomain: keySystem
    };

    this._mediaKeysList.push(mediaKeysListItem);

    var mediaKeysPromise = Promise.resolve().then(function () {
      return mediaKeySystemAccess.createMediaKeys();
    }).then(function (mediaKeys) {
      mediaKeysListItem.mediaKeys = mediaKeys;
      logger["logger"].log("Media-keys created for key-system \"" + keySystem + "\"");

      _this3._onMediaKeysCreated();

      return mediaKeys;
    });
    mediaKeysPromise.catch(function (err) {
      logger["logger"].error('Failed to create media-keys:', err);
    });
    return mediaKeysPromise;
  }
  /**
   * Handles key-creation (represents access to CDM). We are going to create key-sessions upon this
   * for all existing keys where no session exists yet.
   *
   * @private
   */
  ;

  _proto._onMediaKeysCreated = function _onMediaKeysCreated() {
    var _this4 = this;

    // check for all key-list items if a session exists, otherwise, create one
    this._mediaKeysList.forEach(function (mediaKeysListItem) {
      if (!mediaKeysListItem.mediaKeysSession) {
        // mediaKeys is definitely initialized here
        mediaKeysListItem.mediaKeysSession = mediaKeysListItem.mediaKeys.createSession();

        _this4._onNewMediaKeySession(mediaKeysListItem.mediaKeysSession);
      }
    });
  }
  /**
     * @private
     * @param {*} keySession
     */
  ;

  _proto._onNewMediaKeySession = function _onNewMediaKeySession(keySession) {
    var _this5 = this;

    logger["logger"].log("New key-system session " + keySession.sessionId);
    keySession.addEventListener('message', function (event) {
      _this5._onKeySessionMessage(keySession, event.message);
    }, false);
  }
  /**
   * @private
   * @param {MediaKeySession} keySession
   * @param {ArrayBuffer} message
   */
  ;

  _proto._onKeySessionMessage = function _onKeySessionMessage(keySession, message) {
    logger["logger"].log('Got EME message event, creating license request');

    this._requestLicense(message, function (data) {
      logger["logger"].log("Received license data (length: " + (data ? data.byteLength : data) + "), updating key-session");
      keySession.update(data);
    });
  }
  /**
   * @private
   * @param e {MediaEncryptedEvent}
   */
  ;

  /**
   * @private
   */
  _proto._attemptSetMediaKeys = function _attemptSetMediaKeys(mediaKeys) {
    if (!this._media) {
      throw new Error('Attempted to set mediaKeys without first attaching a media element');
    }

    if (!this._hasSetMediaKeys) {
      // FIXME: see if we can/want/need-to really to deal with several potential key-sessions?
      var keysListItem = this._mediaKeysList[0];

      if (!keysListItem || !keysListItem.mediaKeys) {
        logger["logger"].error('Fatal: Media is encrypted but no CDM access or no keys have been obtained yet');
        this.hls.trigger(events["default"].ERROR, {
          type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
          details: errors["ErrorDetails"].KEY_SYSTEM_NO_KEYS,
          fatal: true
        });
        return;
      }

      logger["logger"].log('Setting keys for encrypted media');

      this._media.setMediaKeys(keysListItem.mediaKeys);

      this._hasSetMediaKeys = true;
    }
  }
  /**
   * @private
   */
  ;

  _proto._generateRequestWithPreferredKeySession = function _generateRequestWithPreferredKeySession(initDataType, initData) {
    var _this6 = this;

    // FIXME: see if we can/want/need-to really to deal with several potential key-sessions?
    var keysListItem = this._mediaKeysList[0];

    if (!keysListItem) {
      logger["logger"].error('Fatal: Media is encrypted but not any key-system access has been obtained yet');
      this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
        details: errors["ErrorDetails"].KEY_SYSTEM_NO_ACCESS,
        fatal: true
      });
      return;
    }

    if (keysListItem.mediaKeysSessionInitialized) {
      logger["logger"].warn('Key-Session already initialized but requested again');
      return;
    }

    var keySession = keysListItem.mediaKeysSession;

    if (!keySession) {
      logger["logger"].error('Fatal: Media is encrypted but no key-session existing');
      this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
        details: errors["ErrorDetails"].KEY_SYSTEM_NO_SESSION,
        fatal: true
      });
      return;
    } // initData is null if the media is not CORS-same-origin


    if (!initData) {
      logger["logger"].warn('Fatal: initData required for generating a key session is null');
      this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
        details: errors["ErrorDetails"].KEY_SYSTEM_NO_INIT_DATA,
        fatal: true
      });
      return;
    }

    logger["logger"].log("Generating key-session request for \"" + initDataType + "\" init data type");
    keysListItem.mediaKeysSessionInitialized = true;
    keySession.generateRequest(initDataType, initData).then(function () {
      logger["logger"].debug('Key-session generation succeeded');
    }).catch(function (err) {
      logger["logger"].error('Error generating key-session request:', err);

      _this6.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
        details: errors["ErrorDetails"].KEY_SYSTEM_NO_SESSION,
        fatal: false
      });
    });
  }
  /**
   * @private
   * @param {string} url License server URL
   * @param {ArrayBuffer} keyMessage Message data issued by key-system
   * @param {function} callback Called when XHR has succeeded
   * @returns {XMLHttpRequest} Unsent (but opened state) XHR object
   * @throws if XMLHttpRequest construction failed
   */
  ;

  _proto._createLicenseXhr = function _createLicenseXhr(url, keyMessage, callback) {
    var xhr = new XMLHttpRequest();
    var licenseXhrSetup = this._licenseXhrSetup;

    try {
      if (licenseXhrSetup) {
        try {
          licenseXhrSetup(xhr, url);
        } catch (e) {
          // let's try to open before running setup
          xhr.open('POST', url, true);
          licenseXhrSetup(xhr, url);
        }
      } // if licenseXhrSetup did not yet call open, let's do it now


      if (!xhr.readyState) {
        xhr.open('POST', url, true);
      }
    } catch (e) {
      // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
      throw new Error("issue setting up KeySystem license XHR " + e);
    } // Because we set responseType to ArrayBuffer here, callback is typed as handling only array buffers


    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(this, xhr, url, keyMessage, callback);
    return xhr;
  }
  /**
   * @private
   * @param {XMLHttpRequest} xhr
   * @param {string} url License server URL
   * @param {ArrayBuffer} keyMessage Message data issued by key-system
   * @param {function} callback Called when XHR has succeeded
   */
  ;

  _proto._onLicenseRequestReadyStageChange = function _onLicenseRequestReadyStageChange(xhr, url, keyMessage, callback) {
    switch (xhr.readyState) {
      case 4:
        if (xhr.status === 200) {
          this._requestLicenseFailureCount = 0;
          logger["logger"].log('License request succeeded');

          if (xhr.responseType !== 'arraybuffer') {
            logger["logger"].warn('xhr response type was not set to the expected arraybuffer for license request');
          }

          callback(xhr.response);
        } else {
          logger["logger"].error("License Request XHR failed (" + url + "). Status: " + xhr.status + " (" + xhr.statusText + ")");
          this._requestLicenseFailureCount++;

          if (this._requestLicenseFailureCount > MAX_LICENSE_REQUEST_FAILURES) {
            this.hls.trigger(events["default"].ERROR, {
              type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
              details: errors["ErrorDetails"].KEY_SYSTEM_LICENSE_REQUEST_FAILED,
              fatal: true
            });
            return;
          }

          var attemptsLeft = MAX_LICENSE_REQUEST_FAILURES - this._requestLicenseFailureCount + 1;
          logger["logger"].warn("Retrying license request, " + attemptsLeft + " attempts left");

          this._requestLicense(keyMessage, callback);
        }

        break;
    }
  }
  /**
   * @private
   * @param {MediaKeysListItem} keysListItem
   * @param {ArrayBuffer} keyMessage
   * @returns {ArrayBuffer} Challenge data posted to license server
   * @throws if KeySystem is unsupported
   */
  ;

  _proto._generateLicenseRequestChallenge = function _generateLicenseRequestChallenge(keysListItem, keyMessage) {
    switch (keysListItem.mediaKeySystemDomain) {
      // case KeySystems.PLAYREADY:
      // from https://github.com/MicrosoftEdge/Demos/blob/master/eme/scripts/demo.js

      /*
        if (this.licenseType !== this.LICENSE_TYPE_WIDEVINE) {
          // For PlayReady CDMs, we need to dig the Challenge out of the XML.
          var keyMessageXml = new DOMParser().parseFromString(String.fromCharCode.apply(null, new Uint16Array(keyMessage)), 'application/xml');
          if (keyMessageXml.getElementsByTagName('Challenge')[0]) {
              challenge = atob(keyMessageXml.getElementsByTagName('Challenge')[0].childNodes[0].nodeValue);
          } else {
              throw 'Cannot find <Challenge> in key message';
          }
          var headerNames = keyMessageXml.getElementsByTagName('name');
          var headerValues = keyMessageXml.getElementsByTagName('value');
          if (headerNames.length !== headerValues.length) {
              throw 'Mismatched header <name>/<value> pair in key message';
          }
          for (var i = 0; i < headerNames.length; i++) {
              xhr.setRequestHeader(headerNames[i].childNodes[0].nodeValue, headerValues[i].childNodes[0].nodeValue);
          }
        }
        break;
      */
      case KeySystems.WIDEVINE:
        // For Widevine CDMs, the challenge is the keyMessage.
        return keyMessage;
    }

    throw new Error("unsupported key-system: " + keysListItem.mediaKeySystemDomain);
  }
  /**
   * @private
   * @param keyMessage
   * @param callback
   */
  ;

  _proto._requestLicense = function _requestLicense(keyMessage, callback) {
    logger["logger"].log('Requesting content license for key-system');
    var keysListItem = this._mediaKeysList[0];

    if (!keysListItem) {
      logger["logger"].error('Fatal error: Media is encrypted but no key-system access has been obtained yet');
      this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
        details: errors["ErrorDetails"].KEY_SYSTEM_NO_ACCESS,
        fatal: true
      });
      return;
    }

    try {
      var _url = this.getLicenseServerUrl(keysListItem.mediaKeySystemDomain);

      var _xhr = this._createLicenseXhr(_url, keyMessage, callback);

      logger["logger"].log("Sending license request to URL: " + _url);

      var challenge = this._generateLicenseRequestChallenge(keysListItem, keyMessage);

      _xhr.send(challenge);
    } catch (e) {
      logger["logger"].error("Failure requesting DRM license: " + e);
      this.hls.trigger(events["default"].ERROR, {
        type: errors["ErrorTypes"].KEY_SYSTEM_ERROR,
        details: errors["ErrorDetails"].KEY_SYSTEM_LICENSE_REQUEST_FAILED,
        fatal: true
      });
    }
  };

  _proto.onMediaAttached = function onMediaAttached(data) {
    if (!this._emeEnabled) {
      return;
    }

    var media = data.media; // keep reference of media

    this._media = media;
    media.addEventListener('encrypted', this._onMediaEncrypted);
  };

  _proto.onMediaDetached = function onMediaDetached() {
    var media = this._media;
    var mediaKeysList = this._mediaKeysList;

    if (!media) {
      return;
    }

    media.removeEventListener('encrypted', this._onMediaEncrypted);
    this._media = null;
    this._mediaKeysList = []; // Close all sessions and remove media keys from the video element.

    Promise.all(mediaKeysList.map(function (mediaKeysListItem) {
      if (mediaKeysListItem.mediaKeysSession) {
        return mediaKeysListItem.mediaKeysSession.close().catch(function () {// Ignore errors when closing the sessions. Closing a session that
          // generated no key requests will throw an error.
        });
      }
    })).then(function () {
      return media.setMediaKeys(null);
    }).catch(function () {// Ignore any failures while removing media keys from the video element.
    });
  } // TODO: Use manifest types here when they are defined
  ;

  _proto.onManifestParsed = function onManifestParsed(data) {
    if (!this._emeEnabled) {
      return;
    }

    var audioCodecs = data.levels.map(function (level) {
      return level.audioCodec;
    });
    var videoCodecs = data.levels.map(function (level) {
      return level.videoCodec;
    });

    this._attemptKeySystemAccess(KeySystems.WIDEVINE, audioCodecs, videoCodecs);
  };

  eme_controller_createClass(EMEController, [{
    key: "requestMediaKeySystemAccess",
    get: function get() {
      if (!this._requestMediaKeySystemAccess) {
        throw new Error('No requestMediaKeySystemAccess function configured');
      }

      return this._requestMediaKeySystemAccess;
    }
  }]);

  return EMEController;
}(event_handler);

/* harmony default export */ var eme_controller = (eme_controller_EMEController);
// CONCATENATED MODULE: ./src/config.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * HLS config
 */




 // import FetchLoader from './utils/fetch-loader';









// If possible, keep hlsDefaultConfig shallow
// It is cloned whenever a new Hls instance is created, by keeping the config
// shallow the properties are cloned, and we don't end up manipulating the default
var hlsDefaultConfig = _objectSpread(_objectSpread({
  autoStartLoad: true,
  // used by stream-controller
  startPosition: -1,
  // used by stream-controller
  defaultAudioCodec: void 0,
  // used by stream-controller
  debug: false,
  // used by logger
  capLevelOnFPSDrop: false,
  // used by fps-controller
  capLevelToPlayerSize: false,
  // used by cap-level-controller
  initialLiveManifestSize: 1,
  // used by stream-controller
  maxBufferLength: 30,
  // used by stream-controller
  maxBufferSize: 60 * 1000 * 1000,
  // used by stream-controller
  maxBufferHole: 0.5,
  // used by stream-controller
  lowBufferWatchdogPeriod: 0.5,
  // used by stream-controller
  highBufferWatchdogPeriod: 3,
  // used by stream-controller
  nudgeOffset: 0.1,
  // used by stream-controller
  nudgeMaxRetry: 3,
  // used by stream-controller
  maxFragLookUpTolerance: 0.25,
  // used by stream-controller
  liveSyncDurationCount: 3,
  // used by stream-controller
  liveMaxLatencyDurationCount: Infinity,
  // used by stream-controller
  liveSyncDuration: void 0,
  // used by stream-controller
  liveMaxLatencyDuration: void 0,
  // used by stream-controller
  liveDurationInfinity: false,
  // used by buffer-controller
  liveBackBufferLength: Infinity,
  // used by buffer-controller
  maxMaxBufferLength: 600,
  // used by stream-controller
  enableWorker: true,
  // used by demuxer
  enableSoftwareAES: true,
  // used by decrypter
  manifestLoadingTimeOut: 10000,
  // used by playlist-loader
  manifestLoadingMaxRetry: 1,
  // used by playlist-loader
  manifestLoadingRetryDelay: 1000,
  // used by playlist-loader
  manifestLoadingMaxRetryTimeout: 64000,
  // used by playlist-loader
  startLevel: void 0,
  // used by level-controller
  levelLoadingTimeOut: 10000,
  // used by playlist-loader
  levelLoadingMaxRetry: 4,
  // used by playlist-loader
  levelLoadingRetryDelay: 1000,
  // used by playlist-loader
  levelLoadingMaxRetryTimeout: 64000,
  // used by playlist-loader
  fragLoadingTimeOut: 20000,
  // used by fragment-loader
  fragLoadingMaxRetry: 6,
  // used by fragment-loader
  fragLoadingRetryDelay: 1000,
  // used by fragment-loader
  fragLoadingMaxRetryTimeout: 64000,
  // used by fragment-loader
  startFragPrefetch: false,
  // used by stream-controller
  fpsDroppedMonitoringPeriod: 5000,
  // used by fps-controller
  fpsDroppedMonitoringThreshold: 0.2,
  // used by fps-controller
  appendErrorMaxRetry: 3,
  // used by buffer-controller
  loader: xhr_loader,
  // loader: FetchLoader,
  fLoader: void 0,
  // used by fragment-loader
  pLoader: void 0,
  // used by playlist-loader
  xhrSetup: void 0,
  // used by xhr-loader
  licenseXhrSetup: void 0,
  // used by eme-controller
  // fetchSetup: void 0,
  abrController: abr_controller,
  bufferController: buffer_controller,
  capLevelController: cap_level_controller,
  fpsController: fps_controller,
  stretchShortVideoTrack: false,
  // used by mp4-remuxer
  maxAudioFramesDrift: 1,
  // used by mp4-remuxer
  forceKeyFrameOnDiscontinuity: true,
  // used by ts-demuxer
  abrEwmaFastLive: 3,
  // used by abr-controller
  abrEwmaSlowLive: 9,
  // used by abr-controller
  abrEwmaFastVoD: 3,
  // used by abr-controller
  abrEwmaSlowVoD: 9,
  // used by abr-controller
  abrEwmaDefaultEstimate: 5e5,
  // 500 kbps  // used by abr-controller
  abrBandWidthFactor: 0.95,
  // used by abr-controller
  abrBandWidthUpFactor: 0.7,
  // used by abr-controller
  abrMaxWithRealBitrate: false,
  // used by abr-controller
  maxStarvationDelay: 4,
  // used by abr-controller
  maxLoadingDelay: 4,
  // used by abr-controller
  minAutoBitrate: 0,
  // used by hls
  emeEnabled: false,
  // used by eme-controller
  widevineLicenseUrl: void 0,
  // used by eme-controller
  drmSystemOptions: {},
  // used by eme-controller
  requestMediaKeySystemAccessFunc: requestMediaKeySystemAccess,
  // used by eme-controller
  testBandwidth: true
}, timelineConfig()), {}, {
  subtitleStreamController:  true ? subtitle_stream_controller_SubtitleStreamController : undefined,
  subtitleTrackController:  true ? subtitle_track_controller : undefined,
  timelineController:  true ? timeline_controller : undefined,
  audioStreamController:  true ? audio_stream_controller : undefined,
  audioTrackController:  true ? audio_track_controller : undefined,
  emeController:  true ? eme_controller : undefined
});

function timelineConfig() {
  return {
    cueHandler: cues_namespaceObject,
    // used by timeline-controller
    enableCEA708Captions: true,
    // used by timeline-controller
    enableWebVTT: true,
    // used by timeline-controller
    captionsTextTrack1Label: 'English',
    // used by timeline-controller
    captionsTextTrack1LanguageCode: 'en',
    // used by timeline-controller
    captionsTextTrack2Label: 'Spanish',
    // used by timeline-controller
    captionsTextTrack2LanguageCode: 'es',
    // used by timeline-controller
    captionsTextTrack3Label: 'Unknown CC',
    // used by timeline-controller
    captionsTextTrack3LanguageCode: '',
    // used by timeline-controller
    captionsTextTrack4Label: 'Unknown CC',
    // used by timeline-controller
    captionsTextTrack4LanguageCode: '',
    // used by timeline-controller
    renderTextTracksNatively: true
  };
}
// CONCATENATED MODULE: ./src/hls.ts
function hls_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function hls_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { hls_ownKeys(Object(source), true).forEach(function (key) { hls_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { hls_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function hls_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hls_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function hls_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function hls_createClass(Constructor, protoProps, staticProps) { if (protoProps) hls_defineProperties(Constructor.prototype, protoProps); if (staticProps) hls_defineProperties(Constructor, staticProps); return Constructor; }

function hls_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }















/**
 * @module Hls
 * @class
 * @constructor
 */

var hls_Hls = /*#__PURE__*/function (_Observer) {
  hls_inheritsLoose(Hls, _Observer);

  /**
   * @type {boolean}
   */
  Hls.isSupported = function isSupported() {
    return is_supported_isSupported();
  }
  /**
   * @type {HlsEvents}
   */
  ;

  hls_createClass(Hls, null, [{
    key: "version",

    /**
     * @type {string}
     */
    get: function get() {
      return "0.14.17";
    }
  }, {
    key: "Events",
    get: function get() {
      return events["default"];
    }
    /**
     * @type {HlsErrorTypes}
     */

  }, {
    key: "ErrorTypes",
    get: function get() {
      return errors["ErrorTypes"];
    }
    /**
     * @type {HlsErrorDetails}
     */

  }, {
    key: "ErrorDetails",
    get: function get() {
      return errors["ErrorDetails"];
    }
    /**
     * @type {HlsConfig}
     */

  }, {
    key: "DefaultConfig",
    get: function get() {
      if (!Hls.defaultConfig) {
        return hlsDefaultConfig;
      }

      return Hls.defaultConfig;
    }
    /**
     * @type {HlsConfig}
     */
    ,
    set: function set(defaultConfig) {
      Hls.defaultConfig = defaultConfig;
    }
    /**
     * Creates an instance of an HLS client that can attach to exactly one `HTMLMediaElement`.
     *
     * @constructs Hls
     * @param {HlsConfig} config
     */

  }]);

  function Hls(userConfig) {
    var _this;

    if (userConfig === void 0) {
      userConfig = {};
    }

    _this = _Observer.call(this) || this;
    _this.config = void 0;
    _this._autoLevelCapping = void 0;
    _this.abrController = void 0;
    _this.capLevelController = void 0;
    _this.levelController = void 0;
    _this.streamController = void 0;
    _this.networkControllers = void 0;
    _this.audioTrackController = void 0;
    _this.subtitleTrackController = void 0;
    _this.emeController = void 0;
    _this.coreComponents = void 0;
    _this.media = null;
    _this.url = null;
    var defaultConfig = Hls.DefaultConfig;

    if ((userConfig.liveSyncDurationCount || userConfig.liveMaxLatencyDurationCount) && (userConfig.liveSyncDuration || userConfig.liveMaxLatencyDuration)) {
      throw new Error('Illegal hls.js config: don\'t mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration');
    } // Shallow clone


    _this.config = hls_objectSpread(hls_objectSpread({}, defaultConfig), userConfig);

    var _assertThisInitialize = hls_assertThisInitialized(_this),
        config = _assertThisInitialize.config;

    if (config.liveMaxLatencyDurationCount !== void 0 && config.liveMaxLatencyDurationCount <= config.liveSyncDurationCount) {
      throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
    }

    if (config.liveMaxLatencyDuration !== void 0 && (config.liveSyncDuration === void 0 || config.liveMaxLatencyDuration <= config.liveSyncDuration)) {
      throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
    }

    Object(logger["enableLogs"])(config.debug);
    _this._autoLevelCapping = -1; // core controllers and network loaders

    /**
     * @member {AbrController} abrController
     */

    var abrController = _this.abrController = new config.abrController(hls_assertThisInitialized(_this)); // eslint-disable-line new-cap

    var bufferController = new config.bufferController(hls_assertThisInitialized(_this)); // eslint-disable-line new-cap

    var capLevelController = _this.capLevelController = new config.capLevelController(hls_assertThisInitialized(_this)); // eslint-disable-line new-cap

    var fpsController = new config.fpsController(hls_assertThisInitialized(_this)); // eslint-disable-line new-cap

    var playListLoader = new playlist_loader(hls_assertThisInitialized(_this));
    var fragmentLoader = new fragment_loader(hls_assertThisInitialized(_this));
    var keyLoader = new key_loader(hls_assertThisInitialized(_this));
    var id3TrackController = new id3_track_controller(hls_assertThisInitialized(_this)); // network controllers

    /**
     * @member {LevelController} levelController
     */

    var levelController = _this.levelController = new level_controller_LevelController(hls_assertThisInitialized(_this)); // FIXME: FragmentTracker must be defined before StreamController because the order of event handling is important

    var fragmentTracker = new fragment_tracker_FragmentTracker(hls_assertThisInitialized(_this));
    /**
     * @member {StreamController} streamController
     */

    var streamController = _this.streamController = new stream_controller(hls_assertThisInitialized(_this), fragmentTracker);
    var networkControllers = [levelController, streamController]; // optional audio stream controller

    /**
     * @var {ICoreComponent | Controller}
     */

    var Controller = config.audioStreamController;

    if (Controller) {
      networkControllers.push(new Controller(hls_assertThisInitialized(_this), fragmentTracker));
    }
    /**
     * @member {INetworkController[]} networkControllers
     */


    _this.networkControllers = networkControllers;
    /**
     * @var {ICoreComponent[]}
     */

    var coreComponents = [playListLoader, fragmentLoader, keyLoader, abrController, bufferController, capLevelController, fpsController, id3TrackController, fragmentTracker]; // optional audio track and subtitle controller

    Controller = config.audioTrackController;

    if (Controller) {
      var audioTrackController = new Controller(hls_assertThisInitialized(_this));
      /**
       * @member {AudioTrackController} audioTrackController
       */

      _this.audioTrackController = audioTrackController;
      coreComponents.push(audioTrackController);
    }

    Controller = config.subtitleTrackController;

    if (Controller) {
      var subtitleTrackController = new Controller(hls_assertThisInitialized(_this));
      /**
       * @member {SubtitleTrackController} subtitleTrackController
       */

      _this.subtitleTrackController = subtitleTrackController;
      networkControllers.push(subtitleTrackController);
    }

    Controller = config.emeController;

    if (Controller) {
      var emeController = new Controller(hls_assertThisInitialized(_this));
      /**
       * @member {EMEController} emeController
       */

      _this.emeController = emeController;
      coreComponents.push(emeController);
    } // optional subtitle controllers


    Controller = config.subtitleStreamController;

    if (Controller) {
      networkControllers.push(new Controller(hls_assertThisInitialized(_this), fragmentTracker));
    }

    Controller = config.timelineController;

    if (Controller) {
      coreComponents.push(new Controller(hls_assertThisInitialized(_this)));
    }
    /**
     * @member {ICoreComponent[]}
     */


    _this.coreComponents = coreComponents;
    return _this;
  }
  /**
   * Dispose of the instance
   */


  var _proto = Hls.prototype;

  _proto.destroy = function destroy() {
    logger["logger"].log('destroy');
    this.trigger(events["default"].DESTROYING);
    this.detachMedia();
    this.coreComponents.concat(this.networkControllers).forEach(function (component) {
      component.destroy();
    });
    this.url = null;
    this.removeAllListeners();
    this._autoLevelCapping = -1;
  }
  /**
   * Attach a media element
   * @param {HTMLMediaElement} media
   */
  ;

  _proto.attachMedia = function attachMedia(media) {
    logger["logger"].log('attachMedia');
    this.media = media;
    this.trigger(events["default"].MEDIA_ATTACHING, {
      media: media
    });
  }
  /**
   * Detach from the media
   */
  ;

  _proto.detachMedia = function detachMedia() {
    logger["logger"].log('detachMedia');
    this.trigger(events["default"].MEDIA_DETACHING);
    this.media = null;
  }
  /**
   * Set the source URL. Can be relative or absolute.
   * @param {string} url
   */
  ;

  _proto.loadSource = function loadSource(url) {
    url = url_toolkit["buildAbsoluteURL"](window.location.href, url, {
      alwaysNormalize: true
    });
    logger["logger"].log("loadSource:" + url);
    this.url = url; // when attaching to a source URL, trigger a playlist load

    this.trigger(events["default"].MANIFEST_LOADING, {
      url: url
    });
  }
  /**
   * Start loading data from the stream source.
   * Depending on default config, client starts loading automatically when a source is set.
   *
   * @param {number} startPosition Set the start position to stream from
   * @default -1 None (from earliest point)
   */
  ;

  _proto.startLoad = function startLoad(startPosition) {
    if (startPosition === void 0) {
      startPosition = -1;
    }

    logger["logger"].log("startLoad(" + startPosition + ")");
    this.networkControllers.forEach(function (controller) {
      controller.startLoad(startPosition);
    });
  }
  /**
   * Stop loading of any stream data.
   */
  ;

  _proto.stopLoad = function stopLoad() {
    logger["logger"].log('stopLoad');
    this.networkControllers.forEach(function (controller) {
      controller.stopLoad();
    });
  }
  /**
   * Swap through possible audio codecs in the stream (for example to switch from stereo to 5.1)
   */
  ;

  _proto.swapAudioCodec = function swapAudioCodec() {
    logger["logger"].log('swapAudioCodec');
    this.streamController.swapAudioCodec();
  }
  /**
   * When the media-element fails, this allows to detach and then re-attach it
   * as one call (convenience method).
   *
   * Automatic recovery of media-errors by this process is configurable.
   */
  ;

  _proto.recoverMediaError = function recoverMediaError() {
    logger["logger"].log('recoverMediaError');
    var media = this.media;
    this.detachMedia();

    if (media) {
      this.attachMedia(media);
    }
  }
  /**
   * Remove a loaded level from the list of levels, or a level url in from a list of redundant level urls.
   * This can be used to remove a rendition or playlist url that errors frequently from the list of levels that a user
   * or hls.js can choose from.
   *
   * @param levelIndex {number} The quality level index to of the level to remove
   * @param urlId {number} The quality level url index in the case that fallback levels are available. Defaults to 0.
   */
  ;

  _proto.removeLevel = function removeLevel(levelIndex, urlId) {
    if (urlId === void 0) {
      urlId = 0;
    }

    this.levelController.removeLevel(levelIndex, urlId);
  }
  /**
   * @type {QualityLevel[]}
   */
  // todo(typescript-levelController)
  ;

  hls_createClass(Hls, [{
    key: "levels",
    get: function get() {
      return this.levelController.levels;
    }
    /**
     * Index of quality level currently played
     * @type {number}
     */

  }, {
    key: "currentLevel",
    get: function get() {
      return this.streamController.currentLevel;
    }
    /**
     * Set quality level index immediately .
     * This will flush the current buffer to replace the quality asap.
     * That means playback will interrupt at least shortly to re-buffer and re-sync eventually.
     * @param newLevel {number} -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      logger["logger"].log("set currentLevel:" + newLevel);
      this.loadLevel = newLevel;
      this.streamController.immediateLevelSwitch();
    }
    /**
     * Index of next quality level loaded as scheduled by stream controller.
     * @type {number}
     */

  }, {
    key: "nextLevel",
    get: function get() {
      return this.streamController.nextLevel;
    }
    /**
     * Set quality level index for next loaded data.
     * This will switch the video quality asap, without interrupting playback.
     * May abort current loading of data, and flush parts of buffer (outside currently played fragment region).
     * @type {number} -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      logger["logger"].log("set nextLevel:" + newLevel);
      this.levelController.manualLevel = newLevel;
      this.streamController.nextLevelSwitch();
    }
    /**
     * Return the quality level of the currently or last (of none is loaded currently) segment
     * @type {number}
     */

  }, {
    key: "loadLevel",
    get: function get() {
      return this.levelController.level;
    }
    /**
     * Set quality level index for next loaded data in a conservative way.
     * This will switch the quality without flushing, but interrupt current loading.
     * Thus the moment when the quality switch will appear in effect will only be after the already existing buffer.
     * @type {number} newLevel -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      logger["logger"].log("set loadLevel:" + newLevel);
      this.levelController.manualLevel = newLevel;
    }
    /**
     * get next quality level loaded
     * @type {number}
     */

  }, {
    key: "nextLoadLevel",
    get: function get() {
      return this.levelController.nextLoadLevel;
    }
    /**
     * Set quality level of next loaded segment in a fully "non-destructive" way.
     * Same as `loadLevel` but will wait for next switch (until current loading is done).
     * @type {number} level
     */
    ,
    set: function set(level) {
      this.levelController.nextLoadLevel = level;
    }
    /**
     * Return "first level": like a default level, if not set,
     * falls back to index of first level referenced in manifest
     * @type {number}
     */

  }, {
    key: "firstLevel",
    get: function get() {
      return Math.max(this.levelController.firstLevel, this.minAutoLevel);
    }
    /**
     * Sets "first-level", see getter.
     * @type {number}
     */
    ,
    set: function set(newLevel) {
      logger["logger"].log("set firstLevel:" + newLevel);
      this.levelController.firstLevel = newLevel;
    }
    /**
     * Return start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     * @type {number}
     */

  }, {
    key: "startLevel",
    get: function get() {
      return this.levelController.startLevel;
    }
    /**
     * set  start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     * @type {number} newLevel
     */
    ,
    set: function set(newLevel) {
      logger["logger"].log("set startLevel:" + newLevel); // if not in automatic start level detection, ensure startLevel is greater than minAutoLevel

      if (newLevel !== -1) {
        newLevel = Math.max(newLevel, this.minAutoLevel);
      }

      this.levelController.startLevel = newLevel;
    }
    /**
     * set  dynamically set capLevelToPlayerSize against (`CapLevelController`)
     *
     * @type {boolean}
     */

  }, {
    key: "capLevelToPlayerSize",
    set: function set(shouldStartCapping) {
      var newCapLevelToPlayerSize = !!shouldStartCapping;

      if (newCapLevelToPlayerSize !== this.config.capLevelToPlayerSize) {
        if (newCapLevelToPlayerSize) {
          this.capLevelController.startCapping(); // If capping occurs, nextLevelSwitch will happen based on size.
        } else {
          this.capLevelController.stopCapping();
          this.autoLevelCapping = -1;
          this.streamController.nextLevelSwitch(); // Now we're uncapped, get the next level asap.
        }

        this.config.capLevelToPlayerSize = newCapLevelToPlayerSize;
      }
    }
    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     * @type {number}
     */

  }, {
    key: "autoLevelCapping",
    get: function get() {
      return this._autoLevelCapping;
    }
    /**
     * get bandwidth estimate
     * @type {number}
     */
    ,

    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     * @type {number}
     */
    set: function set(newLevel) {
      logger["logger"].log("set autoLevelCapping:" + newLevel);
      this._autoLevelCapping = newLevel;
    }
    /**
     * True when automatic level selection enabled
     * @type {boolean}
     */

  }, {
    key: "bandwidthEstimate",
    get: function get() {
      var bwEstimator = this.abrController._bwEstimator;
      return bwEstimator ? bwEstimator.getEstimate() : NaN;
    }
  }, {
    key: "autoLevelEnabled",
    get: function get() {
      return this.levelController.manualLevel === -1;
    }
    /**
     * Level set manually (if any)
     * @type {number}
     */

  }, {
    key: "manualLevel",
    get: function get() {
      return this.levelController.manualLevel;
    }
    /**
     * min level selectable in auto mode according to config.minAutoBitrate
     * @type {number}
     */

  }, {
    key: "minAutoLevel",
    get: function get() {
      var levels = this.levels,
          minAutoBitrate = this.config.minAutoBitrate;
      var len = levels ? levels.length : 0;

      for (var i = 0; i < len; i++) {
        var levelNextBitrate = levels[i].realBitrate ? Math.max(levels[i].realBitrate, levels[i].bitrate) : levels[i].bitrate;

        if (levelNextBitrate > minAutoBitrate) {
          return i;
        }
      }

      return 0;
    }
    /**
     * max level selectable in auto mode according to autoLevelCapping
     * @type {number}
     */

  }, {
    key: "maxAutoLevel",
    get: function get() {
      var levels = this.levels,
          autoLevelCapping = this.autoLevelCapping;
      var maxAutoLevel;

      if (autoLevelCapping === -1 && levels && levels.length) {
        maxAutoLevel = levels.length - 1;
      } else {
        maxAutoLevel = autoLevelCapping;
      }

      return maxAutoLevel;
    }
    /**
     * next automatically selected quality level
     * @type {number}
     */

  }, {
    key: "nextAutoLevel",
    get: function get() {
      // ensure next auto level is between  min and max auto level
      return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel);
    }
    /**
     * this setter is used to force next auto level.
     * this is useful to force a switch down in auto mode:
     * in case of load error on level N, hls.js can set nextAutoLevel to N-1 for example)
     * forced value is valid for one fragment. upon succesful frag loading at forced level,
     * this value will be resetted to -1 by ABR controller.
     * @type {number}
     */
    ,
    set: function set(nextLevel) {
      this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, nextLevel);
    }
    /**
     * @type {AudioTrack[]}
     */
    // todo(typescript-audioTrackController)

  }, {
    key: "audioTracks",
    get: function get() {
      var audioTrackController = this.audioTrackController;
      return audioTrackController ? audioTrackController.audioTracks : [];
    }
    /**
     * index of the selected audio track (index in audio track lists)
     * @type {number}
     */

  }, {
    key: "audioTrack",
    get: function get() {
      var audioTrackController = this.audioTrackController;
      return audioTrackController ? audioTrackController.audioTrack : -1;
    }
    /**
     * selects an audio track, based on its index in audio track lists
     * @type {number}
     */
    ,
    set: function set(audioTrackId) {
      var audioTrackController = this.audioTrackController;

      if (audioTrackController) {
        audioTrackController.audioTrack = audioTrackId;
      }
    }
    /**
     * @type {Seconds}
     */

  }, {
    key: "liveSyncPosition",
    get: function get() {
      return this.streamController.liveSyncPosition;
    }
    /**
     * get alternate subtitle tracks list from playlist
     * @type {SubtitleTrack[]}
     */
    // todo(typescript-subtitleTrackController)

  }, {
    key: "subtitleTracks",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleTracks : [];
    }
    /**
     * index of the selected subtitle track (index in subtitle track lists)
     * @type {number}
     */

  }, {
    key: "subtitleTrack",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleTrack : -1;
    }
    /**
     * select an subtitle track, based on its index in subtitle track lists
     * @type {number}
     */
    ,
    set: function set(subtitleTrackId) {
      var subtitleTrackController = this.subtitleTrackController;

      if (subtitleTrackController) {
        subtitleTrackController.subtitleTrack = subtitleTrackId;
      }
    }
    /**
     * @type {boolean}
     */

  }, {
    key: "subtitleDisplay",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleDisplay : false;
    }
    /**
     * Enable/disable subtitle display rendering
     * @type {boolean}
     */
    ,
    set: function set(value) {
      var subtitleTrackController = this.subtitleTrackController;

      if (subtitleTrackController) {
        subtitleTrackController.subtitleDisplay = value;
      }
    }
  }]);

  return Hls;
}(Observer);

hls_Hls.defaultConfig = void 0;


/***/ }),

/***/ "./src/polyfills/number.js":
/*!*********************************!*\
  !*** ./src/polyfills/number.js ***!
  \*********************************/
/*! exports provided: isFiniteNumber, MAX_SAFE_INTEGER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFiniteNumber", function() { return isFiniteNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_SAFE_INTEGER", function() { return MAX_SAFE_INTEGER; });
var isFiniteNumber = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value);
};
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

/***/ }),

/***/ "./src/utils/get-self-scope.js":
/*!*************************************!*\
  !*** ./src/utils/get-self-scope.js ***!
  \*************************************/
/*! exports provided: getSelfScope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelfScope", function() { return getSelfScope; });
function getSelfScope() {
  // see https://stackoverflow.com/a/11237259/589493
  if (typeof window === 'undefined') {
    /* eslint-disable-next-line no-undef */
    return self;
  } else {
    return window;
  }
}

/***/ }),

/***/ "./src/utils/logger.js":
/*!*****************************!*\
  !*** ./src/utils/logger.js ***!
  \*****************************/
/*! exports provided: enableLogs, logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableLogs", function() { return enableLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
/* harmony import */ var _get_self_scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-self-scope */ "./src/utils/get-self-scope.js");


function noop() {}

var fakeLogger = {
  trace: noop,
  debug: noop,
  log: noop,
  warn: noop,
  info: noop,
  error: noop
};
var exportedLogger = fakeLogger; // let lastCallTime;
// function formatMsgWithTimeInfo(type, msg) {
//   const now = Date.now();
//   const diff = lastCallTime ? '+' + (now - lastCallTime) : '0';
//   lastCallTime = now;
//   msg = (new Date(now)).toISOString() + ' | [' +  type + '] > ' + msg + ' ( ' + diff + ' ms )';
//   return msg;
// }

function formatMsg(type, msg) {
  msg = '[' + type + '] > ' + msg;
  return msg;
}

var global = Object(_get_self_scope__WEBPACK_IMPORTED_MODULE_0__["getSelfScope"])();

function consolePrintFn(type) {
  var func = global.console[type];

  if (func) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args[0]) {
        args[0] = formatMsg(type, args[0]);
      }

      func.apply(global.console, args);
    };
  }

  return noop;
}

function exportLoggerFunctions(debugConfig) {
  for (var _len2 = arguments.length, functions = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    functions[_key2 - 1] = arguments[_key2];
  }

  functions.forEach(function (type) {
    exportedLogger[type] = debugConfig[type] ? debugConfig[type].bind(debugConfig) : consolePrintFn(type);
  });
}

var enableLogs = function enableLogs(debugConfig) {
  // check that console is available
  if (global.console && debugConfig === true || typeof debugConfig === 'object') {
    exportLoggerFunctions(debugConfig, // Remove out from list here to hard-disable a log-level
    // 'trace',
    'debug', 'log', 'info', 'warn', 'error'); // Some browsers don't allow to use bind on console object anyway
    // fallback to default if needed

    try {
      exportedLogger.log();
    } catch (e) {
      exportedLogger = fakeLogger;
    }
  } else {
    exportedLogger = fakeLogger;
  }
};
var logger = exportedLogger;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=hls.js.map