const express = require("express");
const app = express();

const path = require("path");
const staticRoot = path.resolve(__dirname, "../public");
app.use(express.static(staticRoot));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/blogArticle", require("./api/blogArticle"));

app.use("/api/tag", require("./api/tag"));

app.use("/api/comment", require("./api/comment"));

app.use("/api/leaveMessage", require("./api/leaveMessage"));

app.use("/api/catalog", require("./api/catalog"));

app.use("/api/login", require("./api/admin"));

app.use("/api/info", require("./api/personalInfo"));

app.use(require("./errorMiddleware"));


const port = 3000;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
