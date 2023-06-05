import {container} from "../../container";
import {BooksRepository} from "../../repositories/BooksRepository";

const router = require("express").Router();
const fileMiddleware = require("../../middleware/file");
const path = require("path");

const Book = require("../../models/Book");

const props = [
	"title",
	"description",
	"authors",
	"favorite",
	"fileCover",
	"fileName",
];

router.get("/", async (_req, res) => {
	const repo = container.get(BooksRepository);
	const books = await repo.getBooks();

	res.status(200).json(books);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const repo = container.get(BooksRepository);
	const book = await repo.getBook(id);

	if (book) {
		res.status(200).json(book);
	} else {
		res.status(404).send("not found");
	}
});

router.post("/", fileMiddleware.single("fileBook"), async (req, res) => {
	const newBook = {};

	const { body, file } = req;
	const repo = container.get(BooksRepository);
	props.forEach((p) => {
		if (body[p] !== undefined) {
			newBook[p] = body[p];
		}
	});

	if (file) {
		newBook.fileBook = file.path;
	}

	try {
		const book = await repo.createBook(newBook);
		res.status(201).json(book);
	} catch (e) {
		console.error(e);
	}
});

router.put("/:id", fileMiddleware.single("fileBook"), async (req, res) => {
	const { id } = req.params;
	const repo = container.get(BooksRepository);
	const book = await repo.getBook(id);
	const newBook = {};
	
	if (!book) {
		res.status(404).send("not found");
	}
    const {body, file} = req;

    props.forEach((p) => {
        if (body[p] !== undefined) {
            newBook[p] = body[p];
        }
    });

    if (file) {
        book.fileBook = file.path;
    }
    
    try {
        const book = await repo.updateBook(id, newBook);
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
        await repo.deleteBook(id);
        res.status(200).send("ok");
	} catch (e) {
		console.error(e);
		res.status(404).send("not found");
	}
});

router.get("/:id/download", async (req, res) => {
    const {id} = req.params;
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(id);

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

module.exports = router;
