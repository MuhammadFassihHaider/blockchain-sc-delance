import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
    return res.send("hello world");
});

app.listen(4000);
