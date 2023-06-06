import "reflect-metadata";
import express = require('express');
import mongoose from "mongoose"
import errorMiddleware from "./middleware/error"
import {router as userApiRouter} from "./routes/api/user"
import {router as booksApiRouter} from "./routes/api/books"

const app = express();

app.use("/api/user", userApiRouter);
app.use("/api/books", booksApiRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const dbName = process.env.MONGO_URL || "mongodb://mongo:27017";

async function start() {
    try {
        await mongoose.connect(dbName);

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
