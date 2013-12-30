/*global document:true, jasmine:true, bespoke:true, describe:true, it:true, expect:true, beforeEach:true, runs:true, waitsFor:true, spyOn:true */

(function(document, jasmine, bespoke, describe, it, expect, beforeEach, runs, waitsFor, spyOn) {
    "use strict";

    describe("bespoke-advanced", function() {

        var deck,

            createDeck = function(options) {
                var parent = document.createElement("article");
                for (var i = 0; i < 10; i++) {
                    parent.appendChild(document.createElement("section"));
                }

                options = options || true;

                deck = bespoke.from(parent, {
                    advanced: options
                });
            },

            createDeckWith50msInterval = function() {
                createDeck({
                    interval: 50
                });
            };

        describe("deck.advanced", function() {
            beforeEach(createDeckWith50msInterval);

            describe("advance", function() {
                it("should advance", function() {
                    var fired = jasmine.createSpy("eventListener");

                    deck.on("activate", fired);
                    deck.advanced.advance();

                    expect(fired).toHaveBeenCalled();
                    expect(fired.callCount).toEqual(1);
                    expect(fired).toHaveBeenCalledWith({
                        index: 1,
                        slide: jasmine.any(Object)
                    });
                });
            });

            describe("isEnabled", function() {
                it("should change when enabled", function() {
                    var before = deck.advanced.isEnabled(),
                        after, last;

                    deck.advanced.enable();
                    after = deck.advanced.isEnabled();
                    deck.advanced.disable();
                    last = deck.advanced.isEnabled();

                    expect(before).toBe(false);
                    expect(after).toBe(true);
                    expect(last).toBe(false);
                });
            });

            describe("toggle", function() {
                it("should toggle on and off", function() {
                    var before = deck.advanced.isEnabled(),
                        after, last;

                    deck.advanced.toggle();
                    after = deck.advanced.isEnabled();
                    deck.advanced.toggle();
                    last = deck.advanced.isEnabled();

                    expect(before).toBe(false);
                    expect(after).toBe(true);
                    expect(last).toBe(false);
                });
            });

            describe("enable", function() {
                it("should auto advance", function() {
                    spyOn(deck.advanced, "advance");

                    runs(function() {
                        deck.advanced.enable();
                    });

                    waitsFor(function() {
                        return deck.advanced.advance.callCount > 0;
                    }, "The advanced didn't activate", 100);

                    runs(function() {
                        var enabled = deck.advanced.isEnabled();

                        expect(enabled).toBe(true);
                        expect(deck.advanced.advance).toHaveBeenCalled();
                        expect(deck.advanced.advance.callCount).toEqual(1);
                    });
                });
            });

            describe("disable", function() {
                it("should not auto advance after being disabled", function() {
                    var hasBeenDisabled = false;

                    spyOn(deck.advanced, "advance");

                    runs(function() {
                        deck.advanced.enable();
                    });

                    waitsFor(function() {
                        return deck.advanced.advance.callCount > 0;
                    }, "The advanced didn't activate", 100);

                    runs(function() {
                        deck.advanced.disable();

                        setTimeout(function() {
                            hasBeenDisabled = true;
                        }, 125);
                    });

                    waitsFor(function() {
                        return hasBeenDisabled;
                    }, "The advanced didn't activate", 200);

                    runs(function() {
                        var enabled = deck.advanced.isEnabled();

                        expect(enabled).toBe(false);
                        expect(deck.advanced.advance).toHaveBeenCalled();
                        expect(deck.advanced.advance.callCount).toEqual(1);
                    });
                });
            });
        });
    });
}(document, jasmine, bespoke, describe, it, expect, beforeEach, runs, waitsFor, spyOn));
