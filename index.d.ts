// Type definitions for Croppr.js
// Definitions by: James Ooi https://github.com/jamesssooi
// Based on the template: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html

/*~ Expose this module as a UMD */
export as namespace CropperCompress;

/*~ Specify the class constructor function */
export = CropperCompress;

declare class CropperCompress {
    /** @constructor */
    constructor(
        element: string | HTMLElement,
        options?: CropperCompress.CropperCompressOptions
    );

    /** Gets the value of the crop region */
    getCropped(): CropperCompress.GetCropped;
}

/*~ Declare type modules */
declare namespace CropperCompress {
    export interface CropperCompressOptions {
        compression?: boolean;
        clippingType?: "circle" | "square" | "free";
    }

    // getCropped
    export interface GetCropped {
        element: string | HTMLElement;
    }
}
