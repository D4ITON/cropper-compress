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

/**
 * Pre visualiza la imagen cargada para mostrar
 * @param {Element} sourceElementImage  - The target element for cropping.
 */
function initPreview() {
    var sourceElementImage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var imageHasSrc = sourceElementImage.getAttribute("src");
    if (!imageHasSrc) {
        createTemplate("../noimage.png");
        return false;
    } else {
        var image = document.createElement("img");
        image.src = imageHasSrc;
        createTemplate(imageHasSrc);
        return true;
    }
}
/**
 * Muestra la imagen si existe
 * @param {String} imageSource
 */
function createTemplate(imageSource) {
    var template = document.querySelector("#cropper_compress");
    template.innerHTML = "\n    <div class=\"cropper_compress-container\" touch-action=\"none\">\n    <div class=\"wrap-box\">\n      <div class=\"cropper_compress-image\">\n        <img src=\"" + imageSource + "\" alt=\"\" id=\"sourceImage\">\n      </div>\n    </div>\n    <div class=\"cropper_compress-actions\">\n      <label class=\"cropper_compress-actions__button\">\n        <input type=\"file\" size=\"60\" id=\"inputImage\" accept=\"image/*\">\n        Subir imagen\n      </label>\n      <button class=\"cropper_compress-actions__button\">Quitar imagen</button>\n    </div>\n    </div>\n";
}

/**
 * Muestra la imagen si existe
 * @param {Element} imageSource - Imagen que se mostrara o no
 */
function modalCropp() {
  var modal = document.createElement("div");
  modal.innerHTML = "\n    <div class=\"cropper_compress_modal\">\n      <div class=\"cropper_compress_modal__box\">\n        <div class=\"box_header\">\n          <span>Recorta tu nueva imagen</span>\n          <button id=\"btnCloseModal\">x</button>\n        </div>\n        <div class=\"box_body\">\n          <img src=\"\" id=\"newImageToBeCropped\">\n        </div>\n        <div class=\"box_footer\"><button>Establecer mi nueva imagen</button></div>\n      </div>\n    </div>\n    ";
  var template = document.querySelector("#cropper_compress");
  template.appendChild(modal);
  document.getElementById("btnCloseModal").onclick = function () {
    document.querySelector(".cropper_compress_modal").style.display = "none";
    document.querySelector(".cropper_compress_modal").innerHTML = "";
  };
}

function handlers() {
    var options = {
        viewMode: 1,
        aspectRatio: NaN,
        toggleDragModeOnDblclick: false,
        ready: function ready(event) {
            cropper.setDragMode("move");
            cropper.clear();
        }
    };
    document.getElementById("inputImage").onchange = function (e) {
        var files = this.files;
        console.log(files);
        if (files && files.length) {
            modalCropp();
        }
    };
}

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
        handlers();
    }
    createClass(CropperCompress, [{
        key: "init",
        value: function init() {
            var sourceImage = document.getElementById("sourceImage");
            this.sourceImage = sourceImage;
            var hasPreview = initPreview(sourceImage);
            console.log(hasPreview);
            if (hasPreview) {
                this.showModal();
            }
        }
    }, {
        key: "getCropped",
        value: function getCropped() {
            return "getCropped function";
        }
        /**
         * Changes the image src.
         * @param {String} src
         */
    }, {
        key: "showModal",
        value: function showModal() {
            console.log("Show modal");
        }
    }]);
    return CropperCompress;
}();

return CropperCompress$1;

})));
