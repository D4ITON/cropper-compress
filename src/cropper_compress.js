/**
 * Cropper compress main
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
              <img src="${elementSrc}" alt="" id="sourceImage">
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
            <button class="cropper_compress_modal__container-box_footer">Establecer mi nueva imagen</button>
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
        if (data.cropped || this.cropper) {
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
            this.stop();
        }
    }

    updateCrop(data) {
        Object.assign(this.data, data);
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
}
