import { Cropper } from "cropperjs";

export default function handlers() {
    /**
     * Obtengo la imagen
     */

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

    // console.log(cropper);

    document.getElementById("inputImage").onchange = function (e) {
        let files = this.files;
        // Debo mostrar el modal de la imagen.
        console.log(files);

        if (files && files.length) {
            let sourceImage = document.getElementById("imageToBeCropped");
            console.log(sourceImage);

            // Muestra el modal
            cropperCompressModal.style.display = "block";
            // cargar la imagen con el filereader

            const cropper = new Cropper(sourceImage, options);
            console.log(cropper);
        }
    };
}
