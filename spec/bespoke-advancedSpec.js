/*global document:true, jasmine:true, bespoke:true, describe:true, it:true, expect:true, beforeEach:true */

(function(document, jasmine, bespoke, describe, it, expect, beforeEach) {
    "use strict";

    describe("bespoke-advanced", function() {

        var deck,

            createDeck = function() {
                var parent = document.createElement("article");
                for (var i = 0; i < 10; i++) {
                    parent.appendChild(document.createElement("section"));
                }

                deck = bespoke.from(parent, {
                    advanced: true
                });
            };

        beforeEach(createDeck);

        describe("XYZ", function() {
            it("should AZBC", function() {
                expect(true).toBe(true);
            });
        });
    });
}(document, jasmine, bespoke, describe, it, expect, beforeEach));
