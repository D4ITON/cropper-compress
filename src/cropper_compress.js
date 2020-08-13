/**
 * cropper_compress
 * https://github.com/D4ITON/cropper_compress
 *
 * Compress and crop an image.
 *
 * (c) 2020-present Dalthon. Released under the MIT License.
 */

const URL = window.URL || window.webkitURL;

export default class CropperCompress {
    /**
     * @constructor
     * Carga el template inicial.
     */

    constructor(element, endPoint = "", options) {
        // Get target img element
        if (!element.nodeName) {
            element = document.querySelector(element);
            if (element == null) {
                throw "Unable to find element.";
            }
        }

        // Objeto que se muestra cuando la imagen esta cargada.
        this.data = {
            loaded: null,
            name: "",
            type: "",
            url: "",
        };

        // Guarda endpoint
        if (!endPoint) {
            throw "EndPoint don't found.";
        } else {
            this.endPoint = endPoint;
        }

        // Obtiene el src de la imagen.
        const imageHasSrc = element.getAttribute("src");

        // Parse options
        this.options = CropperCompress.parseOptions(options || {});

        // Verifica si se envia una imagen por el atributo src
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
    initialize(elementSrc) {
        this.createDOM(elementSrc);
        this.attachHandlerEvents();
    }

    /**
     * Muestra la imagen si existe
     * @param {String} elementSrc
     */
    createDOM(elementSrc) {
        // Muestra el template
        this.containerEl = document.querySelector("#cropper_compress");

        this.containerEl.outerHTML = `
        <div class="cropper_compress-container" touch-action="none">
          <div class="wrap-box">
            <div class="cropper_compress-image">
              <img src="${elementSrc}">
            </div>
          </div>
          <div class="cropper_compress-actions">
            <label class="cropper_compress-actions__button">
              <input type="file" size="60" id="inputImage" accept="image/*">
              Subir imagen
            </label>
            <button class="cropper_compress-actions__button">Quitar imagen</button>
          </div>
        </div>
      `;
    }

    attachHandlerEvents() {
        this.inputImage = document.getElementById("inputImage");
        this.inputImage.addEventListener("change", this.change.bind(this));
    }

    /**
     * Cuando hay un error al cargar la imagen
     * @param {Event} e
     */
    alert(e) {
        console.warn(e, e.message);
        // window.alert(e && e.message ? e.message : e);
    }

    /**
     * Leer archivo
     * @param {Object} files
     */
    read(files) {
        // console.log(typeof files);
        return new Promise((resolve, reject) => {
            if (!files || files.length === 0) {
                resolve();
                return;
            }
            const file = files[0];

            if (/^image\/\w+$/.test(file.type)) {
                if (URL) {
                    resolve({
                        loaded: true,
                        name: file.name,
                        type: file.type,
                        url: URL.createObjectURL(file),
                    });
                } else {
                    reject(new Error("Your browser is not supported."));
                }
            } else {
                reject(new Error("Please choose an image file."));
            }
        });
    }

    // On change
    change({ target }) {
        this.read(target.files)
            .then((data) => {
                target.value = "";
                this.updateCreateDOM(data);
            })
            .catch((e) => {
                target.value = "";
                this.alert(e);
            });
    }

    /**
     * Cuando se sube correctamente una imagen
     * @param {Object} data
     */
    updateCreateDOM(data) {
        Object.assign(this.data, data);
        this.createModalDOM();
        this.start();
        this.attachHandlerEventsAfterOnModal();
    }

    /**
     * Crea la estructura del modal
     */
    createModalDOM() {
        this.modalComponent = document.getElementById("cropper_compress_modal");
        this.modalComponent.innerHTML = `
        <div class="cropper_compress_modal__container">
          <div class="cropper_compress_modal__container-box">
            <div class="cropper_compress_modal__container-box_header">
              <span>Recorta tu nueva imagen</span>
              <button id="buttonCloseModal">&times;</button>
            </div>
            <div class="cropper_compress_modal__container-box_body">
              <img src="${this.data.url}" ref="image" alt="${this.data.name}" crossorigin="anonymous" id="imageToBeCropped">
            </div>
            <button id="buttonCropImage" class="cropper_compress_modal__container-box_footer">Establecer mi nueva imagen</button>
          </div>
        </div>`;
    }

    deleteModalDOM() {
        this.modalComponent.innerHTML = ``;
    }

    /**
     * Inicializa la funcionalidad del croper
     */
    start() {
        this.imageToBeCropped = document.getElementById("imageToBeCropped");

        const { data } = this;
        // if (data.cropped || this.cropper) // Quitamos data.cropped para que recorte mas de una vez.
        if (this.cropper) {
            return;
        }

        this.cropper = new Cropper(this.imageToBeCropped, {
            autoCrop: true,
            aspectRatio: 1,
            viewMode: 1,
            background: false,

            ready: () => {
                if (this.croppedData) {
                    this.cropper
                        .crop()
                        .setData(this.croppedData)
                        .setCanvasData(this.canvasData)
                        .setCropBoxData(this.cropBoxData);

                    this.croppedData = null;
                    this.canvasData = null;
                    this.cropBoxData = null;
                }
            },

            crop: ({ detail }) => {
                if (detail.width > 0 && detail.height > 0 && !data.cropping) {
                    this.updateCrop({
                        cropping: true,
                    });
                }
            },
        });
    }

    attachHandlerEventsAfterOnModal() {
        this.buttonCloseModal = document.getElementById("buttonCloseModal");
        this.buttonCloseModal.addEventListener("click", this.stop.bind(this));
        this.buttonCropImage = document.getElementById("buttonCropImage");
        this.buttonCropImage.addEventListener("click", this.crop.bind(this));
    }

    /**
     * Cancela el recorte de la imagen.
     */
    stop() {
        this.deleteModalDOM();
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    }

    /**
     * Recorta la imagen.
     */
    crop() {
        const { cropper, data } = this;

        if (data.cropping) {
            this.croppedData = cropper.getData();
            this.canvasData = cropper.getCanvasData();
            this.cropBoxData = cropper.getCropBoxData();
            this.updateCrop({
                cropped: true,
                cropping: false,
                previousUrl: data.url,
                url: cropper
                    .getCroppedCanvas(
                        data.type === "image/png"
                            ? {}
                            : {
                                  fillColor: "#fff",
                              }
                    )
                    .toDataURL(data.type),
            });
            console.log(this);
            this.sendToEndPoint();
            this.stop();
        }
    }

    updateCrop(data) {
        Object.assign(this.data, data);
    }

    async sendToEndPoint() {
        // Fetch function
        const { data } = this;
        if (!data.url) {
            throw "No url image.";
        }

        const block = data.url.split(";");
        const contentType = block[0].split(":")[1];
        const realData = block[1].split(",")[1];

        const blob = CropperCompress.b64toBlob(realData, contentType);
        const formData = new FormData();
        formData.append("image", blob);

        try {
            const response = await fetch(this.endPoint, {
                method: "POST",
                body: formData,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Parse user options and set default values.
     */
    static parseOptions(opts) {
        const defaults = {
            compression: true,
            clippingType: "circle",
        };

        // Parse compression
        let compression = null;
        if (opts.compression !== undefined && opts.compression !== null) {
            compression = opts.compression;
        }

        // Parse compression
        let clippingType = null;
        if (opts.clippingType !== undefined && opts.clippingType !== null) {
            clippingType = opts.clippingType;
        }

        const defaultValue = (v, d) => (v !== null ? v : d);
        return {
            compression: defaultValue(compression, defaults.compression),
            clippingType: defaultValue(clippingType, defaults.clippingType),
        };
    }

    /**
     * Convert a base64 string in a Blob according to the data and contentType.
     *
     * @param b64Data {String} Pure base64 string without contentType
     * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
     * @param sliceSize {Int} SliceSize to process the byteCharacters
     * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
     * @see https://ourcodeworld.com/articles/read/322/how-to-convert-a-base64-image-into-a-image-file-and-upload-it-with-an-asynchronous-form-using-jquery
     * @return Blob
     */
    static b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (
            var offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}
