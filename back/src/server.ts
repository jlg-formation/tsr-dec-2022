import express, { Request, Response, NextFunction } from "express";
import serveIndex from "serve-index";
import { api } from "./api";

const app = express();
const port = 3000;
const wwwDir: string = "../front/dist";

const logAccess = (req: Request, res: Response, next: NextFunction) => {
  console.log("req: ", req.method, req.url);
  next();
};

app.use(logAccess);

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
