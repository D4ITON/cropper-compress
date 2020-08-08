import initPreview from "./preview";
import modalToCrop from "./modal_to_crop";

export default class CropperCompress {
    /**
     * @constructor
     * Carga el template inicial.
     */
    constructor() {
        this.init();
        modalToCrop();
    }

    /**
     * Crea el template inicial
     */
    init() {
        const sourceImage = document.querySelector("#sourceImage");

        // Inicia el preview
        initPreview(sourceImage);
        return this;
    }

    getCropped() {
        return "getCropped function";
    }
}
