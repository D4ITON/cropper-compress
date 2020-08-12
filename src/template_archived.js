/**
 * Muestra la imagen si existe
 * @param {Element} imageSource - Imagen que se mostrara o no
 */

export default function createTemplate(imageSource) {
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
  <div>
  <div class="cropper_compress_modal">
    <div class="box_header">
      <span>Recorta tu nueva imagen</span>
      <button onclick="closeModal">x</button>
    </div>
    <div class="box_body">
      <img src="" id="imageToBeCropped">
    </div>
      <div class="box_footer"><button>Establecer mi nueva imagen</button></div>
    </div>
  </div>`;
}
