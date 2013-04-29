# element-xpath

Gets a consistent xpath for a single DOM element.

This library promotes the use of class names in xpaths
in order to target dynamic DOM's element whose siblings might
change depending on the application state.

[![Build Status](https://secure.travis-ci.org/bermi/element-xpath.png?branch=master)](http://travis-ci.org/bermi/element-xpath)

## Usage

Include the script

     <script src="https://raw.github.com/bermi/element-xpath/master/element-xpath.min.js" type="text/javascript"></script>

Display the xpath on the console for clicked elements

    document.body.addEventListener("click", function (ev) {
      console.log(getElementXpath(ev.toElement));
    });

Async mode

    document.body.addEventListener("click", function (ev) {
      getElementXpath(ev.toElement, function (err, xpath) {
        console.log(err, xpath);
      });
    });


## Tests

Open test.html on your browser or install

## License

(The MIT License)

Copyright (c) 2013 Bermi Ferrer &lt;bermi@bermilabs.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.