// element-xpath
// -----------------
// Copyright(c) 2013 Bermi Ferrer <bermi@bermilabs.com>
// MIT Licensed

(function (root) {
  "use strict";

  var
    // Commons JS environment flag
    is_commons_js = typeof module !== "undefined" && module.exports,

    // Save the previous value of the `getElementXpath` variable.
    previousgetElementXpath = root.getElementXpath,

    emptyFunction = function () {},

    // Create a safe reference to the getElementXpath object for use below.
    getElementXpath = function (el, callback) {
      var err, result, nodes, i, n, segments, siblings, id_count;
      try {
        if (callback && (typeof callback !== "function")) {
          throw new Error("Invalid callback supplied");
        }

        // We need to get all the tags on the document,
        nodes = getElementXpath.getNodes(el);

        segments = [];
        while (el && el.nodeType === 1) {
          if (el.hasAttribute("id")) {
            segments = addIdSegments(el, nodes, segments);
            if (typeof segments === 'string') {
              result = segments;
              break;
            }
          } else if (el.hasAttribute("class")) {
            segments = addClassSegment(el, nodes, segments);
          } else {
            segments = addSiblingSegment(el, nodes, segments);
          }
          el = el.parentNode;
        }

        if (!result && segments.length) {
          result = "/" + segments.join("/");
        }

      } catch (err) {
        // On sync mode the error will be included on the callback
        // remove if only async is supported
        if (!callback) {
          throw err;
        }
      }

      // Async mode, remove condition if only async is supported
      if (callback) {
        callback(err, result);
      } else {
        return result;
      }
    };


  // Run getElementXpath in *noConflict* mode, returning the `getElementXpath`
  // variable to its previous owner. Returns a reference to
  // the getElementXpath object.
  getElementXpath.noConflict = function () {
    root.getElementXpath = previousgetElementXpath;
    return getElementXpath;
  };

  // Returns a list of nodes on the document
  // you might want to memoizee or throttle this method
  // if your DOM will not change between getElementXpath calls
  getElementXpath.getNodes = function (el) {
    return document.getElementsByTagName("*");
  };

  // Adds ID segments to the segments array
  // if the current element has an ID it will return a string
  // with the element path
  function addIdSegments(el, nodes, segments) {
    var id_count = 0,
      n = 0;
    while (n < nodes.length) {
      if (nodes[n].hasAttribute("id") && nodes[n].id === el.id) {
        id_count = id_count + 1;
      }
      if (id_count > 1) {
        break;
      }
      n = n + 1;
    }
    if (id_count === 1) {
      // The target element has an ID, that's the last node we need
      if (false && segments.length === 0) {
        segments.unshift("//[@id=\"" + el.getAttribute("id") + "\"]");
      } else {
        segments.unshift("id(\"" + el.getAttribute("id") + "\")");
      }
      return segments.join("/");
    } else {
      segments.unshift(el.localName.toLowerCase() + "[@id=\"" + el.getAttribute("id") + "\"]");
    }
    return segments;
  }

  // Gets the element positions among it's siblings
  function addSiblingSegment(el, nodes, segments) {
    var i = 1,
      siblings = el.previousSibling;
    while (siblings) {
      if (siblings.localName === el.localName) {
        i = i + 1;
      }
      siblings = siblings.previousSibling;
    }
    segments.unshift(el.localName.toLowerCase() + "[" + i + "]");
    return segments;
  }

  function addClassSegment(el, nodes, segments) {
    segments.unshift(el.localName.toLowerCase() + "[contains(concat(\" \", @class, \" \"),\" " + el.getAttribute("class") + " \")]");
    return segments;
  }

  if (is_commons_js) {
    module.exports = getElementXpath;
  } else {
    // Set getElementXpath on the browser window or as a member of the wrapping closure
    root.getElementXpath = getElementXpath;
  }

// Establish the root object, `window` in the browser or the closure that wraps the code
}(this));