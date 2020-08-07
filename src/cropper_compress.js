import TEMPLATE from "./template";

export default class CropperCompress {
    /**
     * @constructor
     * Carga el template inicial.
     */
    constructor() {
        this.init();
    }

    init() {
        const template = document.querySelector("#cropper_compress");
        template.innerHTML = TEMPLATE;
        console.log("message");
        return this;
    }

    getCropped() {
        return "getCropped function";
    }
}
