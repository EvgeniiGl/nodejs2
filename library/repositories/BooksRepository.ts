import {Book} from "../models/Book";

const BookScheme = require("../../models/Book");

abstract class BooksRepository {
    createBook(book: Book): Book {
        return new BookScheme(book);
    }

    async getBook(id: number): Promise<Book> {
        const book = await BookScheme.findById(id).select("-__v");

        return book;
    }

    async getBooks(): Promise<Book[]> {
        const books = await BookScheme.find().select("-__v");

        return books;
    }

    async updateBook(id: number, book: Book): Promise<void> {
        let updatedBook = await BookScheme.findById(id).select("-__v");
        if (updatedBook) {

            Object.keys(book).forEach((p) => {
                if (updatedBook[p] !== undefined) {
                    updatedBook[p] = book[p];
                }
            });
        }
    }

    async deleteBook(id: number): Promise<void> {
        await BookScheme.deleteOne({_id: id});
    }
}