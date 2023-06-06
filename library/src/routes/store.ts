import {BookModel} from "../models/Book";

let books = new Array(3).fill(null).map(() => new BookModel());

books[0].fileBook = "public/uploads/1650108761146-test.html";

export {books};
