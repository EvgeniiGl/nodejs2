import {injectable} from "inversify";
import {IBook, BookModel} from "../models/Book";
import {CreateBookDto} from "../routes/api/books";

@injectable()
class BooksRepository {
    async createBook(book: CreateBookDto): Promise<void> {
        const newBook = new BookModel(book);
        await newBook.save()
    }

    async getBook(id: number): Promise<IBook> {
        const book = await BookModel.findById(id);

        return book;
    }

    async getBooks(): Promise<IBook[]> {
        const books = await BookModel.find();

        return books;
    }

    async updateBook(id: number, book: CreateBookDto): Promise<void> {
        let updatedBook = await BookModel.findById(id);
        if (!updatedBook) {
            updatedBook.updateOne(book)
        }
    }

    async deleteBook(id: number): Promise<void> {
        await BookModel.deleteOne({_id: id});
    }
}

export {BooksRepository};