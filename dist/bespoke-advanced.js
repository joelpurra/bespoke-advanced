/*!
 * bespoke-advanced v0.1.0
 * https://github.com/joelpurra/bespoke-advanced
 *
 * Copyright 2013, Joel Purra
 * This content is released under the MIT license
 */

(function(document, bespoke, convenient, ns, pluginName, undefined) {
    "use strict";

    var cv = convenient.builder(pluginName),

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
                    result = !! storage.timer;

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

        plugin = function(deck, options) {
            var publicDeckMethods = ["advance", "isEnabled", "toggle", "enable", "disable"],

                mergedOptions = {},

                prepareOptions = function() {
                    Object.keys(defaultOptions).forEach(function(key) {
                        mergedOptions[key] = options[key] || defaultOptions[key];
                    });
                },

                storeOptions = function() {
                    var storage = cv.getStorage(deck);
                    storage.options = mergedOptions;
                },

                registerDeckExtensions = function() {
                    deck.advanced = {};

                    publicDeckMethods.forEach(function(methodName) {
                        deck.advanced[methodName] = unboundDeckMethods[methodName].bind(deck);
                    });
                },

                keyDownListener = function(e) {
                    var storage = cv.getStorage(deck),
                        eventHandled = false;

                    eventHandled = eventHandled || (e.which === storage.options.key && cv.fire(deck, "toggle", e) && !deck.advanced.toggle());

                    if (eventHandled) {
                        e.preventDefault();
                    }

                    return !eventHandled;
                },

                enable = function() {
                    document.addEventListener("keydown", keyDownListener, false);
                },

                init = function() {
                    cv.activateDeck(deck);
                    prepareOptions();
                    storeOptions();
                    registerDeckExtensions();
                    enable();
                };

            init();
        };

    ns[pluginName] = plugin;
}(document, bespoke, bespoke.plugins.convenient, bespoke.plugins, "advanced"));
