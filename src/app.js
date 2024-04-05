const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const {
  addNewVisitor,
  viewLastVisitor,
  createTable,
} = require("./database_functions");

(async () => {
  await createTable();
})();

const app = express();
const port = 3000;
const directoryPath = path.join(__dirname, "../public");

app.use(express.static(directoryPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "pug");

app.get("/new_visitor", (req, res) => {
  res.sendFile(path.join(directoryPath, "index.html"));
});

app.post("/submit-form", async (req, res) => {
  const { fullName, age, dateOfVisit, timeOfVisit, nameOfAssistant, comments } =
    req.body;
  req.body.age = parseInt(age);

  await addNewVisitor(
    fullName,
    req.body.age,
    dateOfVisit,
    timeOfVisit,
    nameOfAssistant,
    comments
  );
  res.redirect("/thank-you");
});

app.get("/thank-you", async (req, res) => {
  const visitor = await viewLastVisitor();
  res.render("thank_you", { visitor: visitor[0] });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/new_visitor`);
});
