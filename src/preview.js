import createTemplate from "./template";

export default function initPreview(sourceElementImage = null) {
    // Pregunta si existe una imagen que se este enviado

    const imageHasSrc = sourceElementImage.getAttribute("src");
    if (!imageHasSrc) {
        return createTemplate("../noimage.png");
    } else {
        console.log(typeof sourceElementImage);

        const image = document.createElement("img");
        image.src = imageHasSrc;

        console.log(image);

        return createTemplate(imageHasSrc);
    }
}
