/**
 * Muestra modal cuando se sube una imagen y
 * esta esta para lista para ser recortada
 */

// const inputImage = document.getElementById('inputImage');

document.getElementById("inputImage").onchange = (e) => {
    let files = this.files;
    fileImagen = files[0];

    console.log(fileImagen);
};
