import express, { Request, Response } from "express";
import employerRoutes from "./routes/api/employer";
import adminRoutes from "./routes/api/admin";
import { config } from "./config/config";

export const initObject = config();
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
    return res.send("hello world");
});

app.use("/api/employers", employerRoutes);
app.use("/api/admin", adminRoutes);

app.listen(4000);
