/**
 * Pre visualiza la imagen cargada para mostrar
 * @param {Element} sourceElementImage  - The target element for cropping.
 */

export default function initPreview(sourceElementImage = null) {
    // Pregunta si existe una imagen que se este enviado

    /**
     * Pregunta si hay una imagen que se este enviando
     * Es necesario que exista la imagen con el id sourceImage
     */
    const imageHasSrc = sourceElementImage.getAttribute("src");
    if (!imageHasSrc) {
        createTemplate("../noimage.png");
    } else {
        const image = document.createElement("img");
        image.src = imageHasSrc;
        createTemplate(imageHasSrc);
    }
    // Luego de crear el template creamos la funcionalidad principal
    mainFuncionality();
}

/**
 * Muestra la imagen si existe
 * @param {String} imageSource
 */
function createTemplate(imageSource) {
    // Muestra el template
    const template = document.querySelector("#cropper_compress");
    template.innerHTML = `
    <div class="cropper_compress-container" touch-action="none">
      <div class="wrap-box">
        <div class="cropper_compress-image">
          <img src="${imageSource}" alt="" id="sourceImage">
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
    <!-- Modal que se muestra cuando sube una imagen. -->
    <div id="cropper_compress_modal">
      <div class="box_header">
        <span>Recorta tu nueva imagen</span>
        <button id="buttonCloseModal">&times;</button>
      </div>
      <div class="box_body">
        <img src="" crossorigin="anonymous" id="imageToBeCropped">
      </div>
      <div class="box_footer"><button>Establecer mi nueva imagen</button></div>
    </div>
`;
}

function mainFuncionality() {
    /**
     * Declara variables
     * ===================
     * Llama a la dependecia cropperjs
     * Importante requerir en el html al pluggin
     * para que funcione.
     */
    var Cropper = window.Cropper;
    const buttonInputImage = document.getElementById("inputImage");
    const sourceImage = document.getElementById("imageToBeCropped");
    const buttonCloseModal = document.getElementById("buttonCloseModal");
    const cropper_compress_modal = document.getElementById(
        "cropper_compress_modal"
    );
    // Initialize options de cropper
    const options = {
        viewMode: 1,
        aspectRatio: NaN,
        toggleDragModeOnDblclick: false,
        ready: function (event) {
            cropper.setDragMode("move");
            cropper.clear();
            // console.log(getImageLive());
        },
    };

    // var Cropper = window.Cropper;
    // console.log(Cropper);

    // Inicia con el modal oculto
    cropper_compress_modal.style.display = "none";

    // Boton que se carga cuando se introduce una nueva imagen.
    buttonInputImage.addEventListener("change", change);

    // buttonInputImage.onchange = function (e) {
    //     let files = this.files;
    //     // Debo mostrar el modal de la imagen.
    //     console.log(files);

    //     if (files && files.length) {
    //         let sourceImage = document.getElementById("imageToBeCropped");
    //         console.log(sourceImage);

    //         // Muestra el modal
    //         cropper_compress_modal.style.display = "block";
    //         // cargar la imagen con el filereader

    //         const cropper = new Cropper(sourceImage, options);
    //         console.log(cropper);
    //     }
    // };

    /**
     * Leer archivo
     * @param {Object} files
     */
    function read(files) {
        console.log(typeof files);
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

    function change({ target }) {
        read(target.files)
            .then((data) => {
                target.value = "";
                update(data);
            })
            .catch((e) => {
                target.value = "";
                alert(e);
            });
    }

    function update(data) {
        // Object.assign(data);
        console.log(data);
    }

    function alert(e) {
        window.alert(e && e.message ? e.message : e);
    }

    buttonCloseModal.onclick = function () {
        cropper_compress_modal.outerHTML = "";
    };
}
