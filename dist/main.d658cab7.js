// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $searchBtn = $('.search-btn');
var $searchInput = $('.search-input');
var $navList = $('.nav-list');
var $addBtn = $navList.find('li.last');
var navStr = localStorage.getItem('nav');
var navObj = JSON.parse(navStr); // data

var hashMap = navObj || []; // utils

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // 删除 / 开头的内容
}; // search


$searchBtn.on('click', function () {
  var inputValue = $searchInput.val();

  if (!inputValue.trim()) {
    return;
  }

  location.href = "https://www.baidu.com/s?wd=".concat(inputValue);
}); // render

var render = function render() {
  $navList.find('li:not(.last)').remove();
  hashMap.forEach(function (item, index) {
    var $node = $("\n            <li>\n                <p class=\"logo\">".concat(item.logo, "</p>\n                <p class=\"hostname\">").concat(simplifyUrl(item.url), "</p>\n                <div class=\"del-wrap\">\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icondel\"></use>\n                    </svg>\n                </div>\n            </li>\n        ")).insertBefore($addBtn);
    $node.on('click', function () {
      window.open(item.url);
    });
    $node.on('click', '.del-wrap', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render(); // add

$addBtn.on('click', function () {
  var url = window.prompt('请输入您要添加的网址');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
}); // keypress 

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
}); // localStorage

window.onbeforeunload = function () {
  var dataString = JSON.stringify(hashMap);
  localStorage.setItem('nav', dataString);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.d658cab7.js.map