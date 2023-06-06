import {Router} from "express";

const router = Router()

router.post("/login", (_req, res) => {
    res.status(201).json({id: 1, mail: "test@mail.ru"});
});

export {router};
