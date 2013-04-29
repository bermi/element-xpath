(function (root) {

  var
    is_commons_js = typeof module !== "undefined" && module.exports,
    getElementByXPath = function (path) {
      result = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      return result.singleNodeValue;
    },
    expect = is_commons_js ? require('expect.js') : root.expect,
    getElementXpath = is_commons_js ? require('./element-xpath.js') : root.getElementXpath;


  describe('getElementXpath', function () {

    describe("Should generate consistent xpaths", function () {
      var i,
        entries = [
          ["One", 'id("test-markup")/p[contains(concat(" ", @class, " ")," a ")]/span[contains(concat(" ", @class, " ")," b ")]/strong[1]'],
          ["Two", 'id("test-markup")/p[contains(concat(" ", @class, " ")," a ")]/span[2]/strong[1]'],
          ["Three", 'id("test-markup")/p[contains(concat(" ", @class, " ")," b ")]/span[contains(concat(" ", @class, " ")," b ")]/strong[1]'],
          ["Four",  'id("bar")']
        ];

      before(function (done) {
        for (i = 0; entries.length > i; i = i + 1) {
          entries[i].push(getElementByXPath(entries[i][1]));
        }
        done();
      });

      it("should find generated xpaths", function () {
        for (i = 0; entries.length > i; i = i + 1) {
          expect(entries[i][2].innerText).to.be(entries[i][0]);
        }
      });

      it("should generate xpaths", function () {
        for (i = 0; entries.length > i; i = i + 1) {
          expect(getElementXpath(entries[i][2])).to.be(entries[i][1]);
        }
      });

      it("should generate xpaths asynchronously", function (done) {
        getElementXpath(entries[0][2], function (err, xpath) {
          expect(xpath).to.be(entries[0][1]);
          done();
        });
      });
    });

    describe('No conflict', function () {
      it('should restore original getElementXpath', function () {
        var b = root.getElementXpath,
          currentVersion = b.noConflict();
        expect(currentVersion).to.be(b);
        expect(root.getElementXpath).to.be("original");
        root.getElementXpath = currentVersion;
      });
    });

  });

}(this));
