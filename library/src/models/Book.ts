import {Document, model, Schema} from "mongoose"

export interface IBook {
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName?: string,
    fileBook?: string,
}

export const BookSchema: Schema<IBook> = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
    fileBook: {
        type: String,
        default: "",
    },
});

export const BookModel  = model<IBook>("Book", BookSchema);
