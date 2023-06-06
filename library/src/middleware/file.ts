import {Request} from "express";
import multer = require('multer');
import {FileFilterCallback} from 'multer'

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, "public/uploads");
    },
    filename(_req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes: string[] = ["text/plain", "text/html", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const Multer = multer({storage, fileFilter});

export {Multer}