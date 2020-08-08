import initPreview from "./preview";
import boostrap from "./handlers";

export default class CropperCompress {
    /**
     * @constructor
     * Carga el template inicial.
     */
    constructor() {
        this.init();
        boostrap();
    }

    /**
     * Crea el template inicial
     */
    init() {
        // Inicia el preview
        const sourceImage = document.getElementById("sourceImage");
        this.sourceImage = sourceImage;
        const hasPreview = initPreview(sourceImage);

        console.log(hasPreview);

        if (hasPreview) {
            this.showModal();
        }
    }

    getCropped() {
        return "getCropped function";
    }

    /**
     * Changes the image src.
     * @param {String} src
     */
    showModal() {
        // Add onload listener to reinitialize box
        console.log("Show modal");
    }
}
