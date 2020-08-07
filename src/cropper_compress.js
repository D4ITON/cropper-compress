import initPreview from "./preview";

export default class CropperCompress {
    /**
     * @constructor
     * Carga el template inicial.
     */
    constructor() {
        this.init();
    }

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
