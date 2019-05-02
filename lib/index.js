"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fontfaceobserver = _interopRequireDefault(require("fontfaceobserver"));

var _uniq2 = _interopRequireDefault(require("lodash/uniq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Santa's little helpers
var resolveWeights = function resolveWeights(font) {
  var declared = font.weights || [];
  var single = font.weight ? [font.weight] : [];
  var all = (0, _uniq2["default"])(declared.concat(single));
  return all.length ? all : [400];
};

var resolveStyles = function resolveStyles(font) {
  var declared = font.styles || [];
  var single = font.style ? [font.style] : [];
  var all = (0, _uniq2["default"])(declared.concat(single));
  return all.length ? all : ['normal'];
}; // Primary load function


var _default = function _default(ops) {
  var fonts = ops instanceof Array ? ops : [ops];
  var families = []; // declare all fonts

  fonts.forEach(function (font) {
    // resolve weights & styles
    var weights = resolveWeights(font);
    var styles = resolveStyles(font); // split all into separate declarations

    weights.forEach(function (weight) {
      styles.forEach(function (style) {
        families.push({
          name: font.name,
          weight: weight,
          style: style
        });
      });
    });
  }); // Load all in parallel

  return Promise.all(families.map(function (fam) {
    var font = new _fontfaceobserver["default"](fam.name, {
      weight: fam.weight,
      style: fam.style
    });
    return font.load();
  }));
};

exports["default"] = _default;