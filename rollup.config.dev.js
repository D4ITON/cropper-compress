import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import cleanup from "rollup-plugin-cleanup";

var banner = `/**
 * cropper_compress
 * https://github.com/D4ITON/cropper_compress
 * 
 * Compress and crop an image.
 * 
 * (c) 2020-present Dalthon. Released under the MIT License.
 */
`;

export default {
    entry: "src/index.js",
    plugins: [
        json(),
        babel(),
        cleanup({
            comments: "jsdoc",
        }),
    ],
    format: "umd",
    moduleName: "CropperCompress",
    dest: "dist/cropper_compress.js",
    banner: banner,
};
