const express = require("express");
const serveIndex = require("serve-index");

const app = express();
const port = 3000;
const wwwDir: string = ".";

app.use((req, res, next) => {
  console.log("req: ", req.method, req.url);
  next();
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});