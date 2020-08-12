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

var URL = window.URL || window.webkitURL;
var CropperCompress$1 = function () {
    /**
     * @constructor
     * Carga el template inicial.
     */
    function CropperCompress(element) {
        var endPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var options = arguments[2];
        classCallCheck(this, CropperCompress);
        if (!element.nodeName) {
            element = document.querySelector(element);
            if (element == null) {
                throw "Unable to find element.";
            }
        }
        this.data = {
            loaded: null,
            name: "",
            type: "",
            url: ""
        };
        if (!endPoint) {
            throw "EndPoint don't found.";
        } else {
            this.endPoint = endPoint;
        }
        this.options = CropperCompress.parseOptions(options || {});
        if (!element.getAttribute("src")) {
            this.initialize("../noimage.png");
        } else {
            this.initialize(imageHasSrc);
        }
    }
    /**
     * Inicializa la instancia CropperCompress
     * @param {Element} targetEl
     */
    createClass(CropperCompress, [{
        key: "initialize",
        value: function initialize(elementSrc) {
            this.createDOM(elementSrc);
            this.attachHandlerEvents();
        }
        /**
         * Muestra la imagen si existe
         * @param {String} elementSrc
         */
    }, {
        key: "createDOM",
        value: function createDOM(elementSrc) {
            this.containerEl = document.querySelector("#cropper_compress");
            this.containerEl.outerHTML = "\n        <div class=\"cropper_compress-container\" touch-action=\"none\">\n          <div class=\"wrap-box\">\n            <div class=\"cropper_compress-image\">\n              <img src=\"" + elementSrc + "\" alt=\"\" id=\"sourceImage\">\n            </div>\n          </div>\n          <div class=\"cropper_compress-actions\">\n            <label class=\"cropper_compress-actions__button\">\n              <input type=\"file\" size=\"60\" id=\"inputImage\" accept=\"image/*\">\n              Subir imagen\n            </label>\n            <button class=\"cropper_compress-actions__button\">Quitar imagen</button>\n          </div>\n        </div>\n      ";
        }
    }, {
        key: "attachHandlerEvents",
        value: function attachHandlerEvents() {
            this.inputImage = document.getElementById("inputImage");
            this.inputImage.addEventListener("change", this.change.bind(this));
        }
        /**
         * Cuando hay un error al cargar la imagen
         * @param {Event} e
         */
    }, {
        key: "alert",
        value: function alert(e) {
            console.warn(e, e.message);
        }
        /**
         * Leer archivo
         * @param {Object} files
         */
    }, {
        key: "read",
        value: function read(files) {
            return new Promise(function (resolve, reject) {
                if (!files || files.length === 0) {
                    resolve();
                    return;
                }
                var file = files[0];
                if (/^image\/\w+$/.test(file.type)) {
                    if (URL) {
                        resolve({
                            loaded: true,
                            name: file.name,
                            type: file.type,
                            url: URL.createObjectURL(file)
                        });
                    } else {
                        reject(new Error("Your browser is not supported."));
                    }
                } else {
                    reject(new Error("Please choose an image file."));
                }
            });
        }
    }, {
        key: "change",
        value: function change(_ref) {
            var _this = this;
            var target = _ref.target;
            this.read(target.files).then(function (data) {
                target.value = "";
                _this.update(data);
            }).catch(function (e) {
                target.value = "";
                _this.alert(e);
            });
        }
        /**
         * Cuando se sube correctamente una imagen
         * @param {Object} data
         */
    }, {
        key: "update",
        value: function update(data) {
            Object.assign(this.data, data);
            this.start();
            console.log(this);
            console.log("message");
        }
    }, {
        key: "start",
        value: function start() {
            this.modalComponent = document.getElementById("cropper_compress_modal");
            this.modalComponent.innerHTML = "\n        <div class=\"cropper_compress_modal__container\">\n          <div class=\"cropper_compress_modal__container-box\">\n            <div class=\"cropper_compress_modal__container-box_header\">\n              <span>Recorta tu nueva imagen</span>\n              <button id=\"buttonCloseModal\">&times;</button>\n            </div>\n            <div class=\"cropper_compress_modal__container-box_body\">\n              <img src=\"\" crossorigin=\"anonymous\" id=\"imageToBeCropped\">\n            </div>\n            <div class=\"cropper_compress_modal__container-box_footer\"><button>Establecer mi nueva imagen</button></div>\n          </div>\n        </div>";
        }
    }], [{
        key: "parseOptions",
        value: function parseOptions(opts) {
            var defaults$$1 = {
                compression: true,
                clippingType: "circle"
            };
            var compression = null;
            if (opts.compression !== undefined && opts.compression !== null) {
                compression = opts.compression;
            }
            var clippingType = null;
            if (opts.clippingType !== undefined && opts.clippingType !== null) {
                clippingType = opts.clippingType;
            }
            var defaultValue = function defaultValue(v, d) {
                return v !== null ? v : d;
            };
            return {
                compression: defaultValue(compression, defaults$$1.compression),
                clippingType: defaultValue(clippingType, defaults$$1.clippingType)
            };
        }
    }]);
    return CropperCompress;
}();

return CropperCompress$1;

})));
