const { model, Schema } = require("mongoose");

interface Field {
    type: string,
    default: string,
}

export interface Book {
    title: Field,
    description: Field,
    authors: Field,
    favorite: Field,
    fileCover: Field,
    fileName: Field,
    fileBook: Field,
}

const bookSchema: Book = new Schema({
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

module.exports = model("Book", bookSchema);
