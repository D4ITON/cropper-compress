import { modalCropp } from "./template";

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

    document.getElementById("inputImage").onchange = function (e) {
        let files = this.files;
        // Debo mostrar el modal de la imagen
        console.log(files);

        if (files && files.length) {
            modalCropp();
        }
    };
}
