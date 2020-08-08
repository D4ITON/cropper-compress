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
        return createTemplate("../noimage.png");
    } else {
        const image = document.createElement("img");
        image.src = imageHasSrc;

        return createTemplate(imageHasSrc);
    }
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
`;
}
