const { pool } = require("./db_config");
const { databaseErrors, queryObject, successMessages } = require("./helper_objects");
const { inputValidation, validateNumber } = require("./helper_functions");

const createTable = async () => {
  await pool.query(queryObject.createTable);
  return successMessages.tableCreated;
};

const addNewVisitor = async (
  fullName,
  age,
  dateOfVisit,
  timeOfVisit,
  nameOfAssistant,
  comments
) => {
  inputValidation(fullName, age, dateOfVisit, timeOfVisit, nameOfAssistant, comments);
  await pool.query(queryObject.insertValues, [
    fullName,
    age,
    dateOfVisit,
    timeOfVisit,
    nameOfAssistant,
    comments,
  ]);

  return successMessages.newVisitorAdded;
};

const listAllVisitors = async () => {
  const result = await pool.query(queryObject.listAll);
  if (result.rows.length === 0) return databaseErrors.listingVisitors;
  return result.rows;
};

const deleteAVisitor = async (visitorID) => {
  validateNumber(visitorID);
  const result = await pool.query(queryObject.checkVisitor, [visitorID]);
  if (result.rows.length === 0) {
    return databaseErrors.visitorDoesNotExist(visitorID);
  }
  await pool.query(queryObject.deleteVisitor, [visitorID]);
  return successMessages.visitorDeleted;
};

const updateAVisitor = async (visitorID, columnToUpdate, newValue) => {
  validateNumber(visitorID);
  const result = await pool.query(queryObject.checkVisitor, [visitorID]);

  if (result.rows.length === 0) {
    return databaseErrors.visitorDoesNotExist(visitorID);
    // throw new Error(databaseErrors.visitorDoesNotExist(visitorID));
  }
  await pool.query(queryObject.update(columnToUpdate), [newValue, visitorID]);
  return successMessages.visitorUpdated;
};

const viewOneVisitor = async (visitorID) => {
  validateNumber(visitorID);
  const result = await pool.query(queryObject.viewOne, [visitorID]);

  if (result.rows.length === 0) {
    return databaseErrors.visitorDoesNotExist(visitorID);
  }
  return result.rows;
};

const deleteAllVisitors = async () => {
  const result = await pool.query(queryObject.listAll);
  if (result.rows.length === 0) return databaseErrors.deletingAll;
  await pool.query(queryObject.deleteAll);
  return successMessages.allVisitorsDeleted;
};

const viewLastVisitor = async () => {
  const allVisitors = await pool.query(queryObject.listAll);
  const result = await pool.query(queryObject.viewLast);
  if (allVisitors.rows.length === 0) return databaseErrors.viewingLast;
  return result.rows;
};

module.exports = {
  addNewVisitor,
  createTable,
  deleteAVisitor,
  updateAVisitor,
  deleteAllVisitors,
  viewLastVisitor,
  listAllVisitors,
  viewOneVisitor,
};
