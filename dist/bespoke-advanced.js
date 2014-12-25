/*!
 * bespoke-advanced v1.0.1
 *
 * Copyright 2014, Joel Purra
 * This content is released under the MIT license
 * http://joelpurra.mit-license.org/2013-2014
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self);var o=n;o=o.bespoke||(o.bespoke={}),o=o.plugins||(o.plugins={}),o.advanced=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*global module:true, require:true, document:true, setInterval:true, clearInterval:true */

"use strict";


var pluginName = "advanced",
    // Hack to get around having to write all browser code with require().
    browserGlobal = (function(f) {
        return f("return this")();
    }(Function)),
    convenient = ((browserGlobal.bespoke && browserGlobal.bespoke.plugins && browserGlobal.bespoke.plugins.convenient) || _dereq_("bespoke-convenient")),
    cv = convenient.builder(pluginName),

    KeyConstants = {
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Virtual_key_codes
        A: 0x41, // (65) "A" key.
    },

    defaultOptions = {
        interval: 3000,
        key: KeyConstants.A
    },

    unboundDeckMethods = {
        // Plugin functions expect to be executed in a deck context
        advance: function() {
            this.next();
        },

        isEnabled: function() {
            var storage = cv.getStorage(this),
                result = !!storage.timer;

            return result;
        },

        toggle: function() {
            if (this.advanced.isEnabled()) {
                this.advanced.disable();
            } else {
                this.advanced.enable();
            }
        },

        enable: function(customData) {
            var storage = cv.getStorage(this),
                result = cv.fire(this, "enable", null, undefined, customData);

            if (result !== false) {
                storage.timer = setInterval(this.advanced.advance, storage.options.interval);
            }

            return result;
        },

        disable: function(customData) {
            var storage = cv.getStorage(this),
                result = cv.fire(this, "disable", null, undefined, customData);

            if (result !== false) {
                clearInterval(storage.timer);
                storage.timer = null;
            }

            return result;
        }
    },

    plugin = function(options) {
        var decker = function(deck) {
            var cvBoundToDeck = cv.activateDeck(deck),

                publicDeckMethods = ["advance", "isEnabled", "toggle", "enable", "disable"],

                mergedOptions = {},

                prepareOptions = function() {
                    Object.keys(defaultOptions).forEach(function(key) {
                        mergedOptions[key] = options[key] || defaultOptions[key];
                    });
                },

                storeOptions = function() {
                    var storage = cvBoundToDeck.getStorage();
                    storage.options = mergedOptions;
                },

                registerDeckExtensions = function() {
                    deck.advanced = {};

                    publicDeckMethods.forEach(function(methodName) {
                        deck.advanced[methodName] = unboundDeckMethods[methodName].bind(deck);
                    });
                },

                keyDownListener = function(e) {
                    var storage = cvBoundToDeck.getStorage(),
                        eventHandled = false;

                    eventHandled = eventHandled || (e.which === storage.options.key && cvBoundToDeck.fire("toggle", e) && !deck.advanced.toggle());

                    if (eventHandled) {
                        e.preventDefault();
                    }

                    return !eventHandled;
                },

                enable = function() {
                    document.addEventListener("keydown", keyDownListener, false);
                },

                init = function() {
                    prepareOptions();
                    storeOptions();
                    registerDeckExtensions();
                    enable();
                };
            init();
        };

        return decker;
    };

module.exports = plugin;

},{}]},{},[1])
(1)
});