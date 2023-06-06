import {container} from "../../container";
import {BooksRepository} from "../../repositories/BooksRepository";
import {Router} from "express";
import {Multer} from "../../middleware/file";
import path from "path";
import {IBook} from "../../models/Book";

const router = Router();

export interface CreateBookDto {
    title: IBook['title']
    description: IBook['description']
    authors: IBook['authors']
    favorite: IBook['favorite']
    fileBook: IBook['fileCover']
    fileName: IBook['fileName']
};

router.get("/", async (_req, res) => {
    const repo = container.get(BooksRepository);
    const books = await repo.getBooks();

    res.status(200).json(books);
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(+id);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send("not found");
    }
});

router.post("/", Multer.single("fileBook"), async (req, res) => {
    const {body, file} = req;
    const newBook: CreateBookDto = {
        title: body.title,
        description: body.description,
        authors: body.authors,
        favorite: body.favorite,
        fileBook: file?.path ,
        fileName: file?.filename,
    };

    const repo = container.get(BooksRepository);

    try {
        const book = await repo.createBook(newBook);
        res.status(201).json(book);
    } catch (e) {
        console.error(e);
    }
});

router.put("/:id", Multer.single("fileBook"), async (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(+id);

    if (!book || !id) {
        res.status(404).send("not found");
    }
    const {body, file} = req;

    const newBook: CreateBookDto = {
        title: body.title,
        description: body.description,
        authors: body.authors,
        favorite: body.favorite,
        fileBook: file?.path ,
        fileName: file?.filename,
    };

    try {
        const book = await repo.updateBook(+id, newBook);
        res.status(200).json(book);
    } catch (e) {
        console.error(e);
    }

    res.status(200).json(book);
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);

    try {
        await repo.deleteBook(+id);
        res.status(200).send("ok");
    } catch (e) {
        console.error(e);
        res.status(404).send("not found");
    }
});

router.get("/:id/download", async (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(+id);

    if (book) {
        res.download(path.join(__dirname, "../..", book.fileBook), (err) => {
            if (err) {
                res.status(404).send("not found");
            }
        });
    } else {
        res.status(404).send("not found");
    }
});

export {router};
