/**
 * cropper_compress
 * https://github.com/D4ITON/cropper_compress
 * 
 * Compress and crop an image.
 * 
 * (c) 2020-present Dalthon. Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.CropperCompress = factory());
}(this, (function () { 'use strict';

var TEMPLATE = '<div class="cropper_compress-container" touch-action="none">' + '<div class="wrap-box">' + '<div class="cropper_compress-image"></div>' + "</div>" + '<div class="cropper_compress-actions">' + "<button>Subir imagen</button>" + '<span class="cropper-dashed dashed-h"></span>' + "</div>" + "</div>";

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var CropperCompress$1 = function () {
    /**
     * @constructor
     * Carga el template inicial.
     */
    function CropperCompress() {
        classCallCheck(this, CropperCompress);
        this.init();
    }
    createClass(CropperCompress, [{
        key: "init",
        value: function init() {
            var template = document.querySelector("#cropper_compress");
            template.innerHTML = TEMPLATE;
            console.log("message");
            return this;
        }
    }, {
        key: "getCropped",
        value: function getCropped() {
            return "getCropped function";
        }
    }]);
    return CropperCompress;
}();

return CropperCompress$1;

})));
