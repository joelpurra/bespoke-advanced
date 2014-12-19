/*global module:true, require:true, document:true, setInterval:true, clearInterval:true */

"use strict";


var pluginName = "advanced",
    // Hack to get around having to write all browser code with require().
    browserGlobal = (function(f) {
        return f("return this")();
    }(Function)),
    convenient = ((browserGlobal.bespoke && browserGlobal.bespoke.plugins && browserGlobal.bespoke.plugins.convenient) || require("bespoke-convenient")),
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
