const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const {
  addNewVisitor,
  createTable,
  deleteAVisitor,
  updateAVisitor,
  deleteAllVisitors,
  viewLastVisitor,
  listAllVisitors,
  viewOneVisitor,
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

app.get("/app", (req, res) => {
  res.sendFile(path.join(directoryPath, "index.html"));
});

app.post("/submit-form", async (req, res) => {
  const { fullName, age, dateOfVisit, timeOfVisit, nameOfAssistant, comments } = req.body;
  req.body.age = parseInt(age);

  const result = await addNewVisitor(
    fullName,
    req.body.age,
    dateOfVisit,
    timeOfVisit,
    nameOfAssistant,
    comments
  );
  res.redirect("/thank-you");
});

app.post("/visitors", async (req, res) => {
  const { fullName, age, dateOfVisit, timeOfVisit, nameOfAssistant, comments } = req.body;
  req.body.age = parseInt(age);

  const result = await addNewVisitor(
    fullName,
    req.body.age,
    dateOfVisit,
    timeOfVisit,
    nameOfAssistant,
    comments
  );
  res.send(result);
});

app.get("/thank-you", async (req, res) => {
  const visitor = await viewLastVisitor();
  res.render("thank_you", { visitor: visitor[0] });
});

app.get("/visitors", async (req, res) => {
  const result = await listAllVisitors();
  res.send(result);
});

app.delete("/visitors", async (req, res) => {
  const result = await deleteAllVisitors();
  res.send(result);
});

app.delete("/visitors/:id", async (req, res) => {
  const visitorID = req.params.id;
  const result = await deleteAVisitor(parseInt(visitorID));
  res.send(result);
});

app.put("/visitors/:id", async (req, res) => {
  const visitorID = req.params.id;
  const { columnToUpdate, newValue } = req.body;
  const result = await updateAVisitor(parseInt(visitorID), columnToUpdate, newValue);
  res.send(result);
});

app.get("/visitors/:id", async (req, res) => {
  const visitorID = req.params.id;
  const result = await viewOneVisitor(parseInt(visitorID));
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/app`);
});
