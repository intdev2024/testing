const errorMessages = {
  containsInitials: "Enter names in full, initials are not allowed!",
  invalidDataType: "Sorry you have entered an invalid name!",
  isNotAString: (property) => `Sorry, ${property} should be a string!`,
  isNotNumber: "Sorry, input is not a number!",
  bothNamesRequired: "Both the first and last names are required!",
  invalidFormat: (property) => `Use a valid ${property} format!`,
  empty: (text) => `${text} cannot be empty!`,
};

const stringObject = {
  name: "Full name",
  age: "Age",
  date: "Date",
  time: "Time",
  comments: "A comment",
  assistant: "Assistant's name",
};

const regex = {
  numericalDigit: /\d/,
  validDateFormatOne: /^\d{4}-\d{2}-\d{2}$/,
  validDateFormatTwo: /^\d{2}-\d{2}-\d{4}$/,
  validTimeFormat: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
};

const queryObject = {
  createTable: `
  CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    date_of_visit DATE NOT NULL,
    time_of_visit TIME NOT NULL,
    name_of_assistant VARCHAR(255) NOT NULL,
    comments VARCHAR(255) NOT NULL
  )
`,
  insertValues: `
    INSERT INTO visitors (full_name, age, date_of_visit, time_of_visit, name_of_assistant, comments)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
`,
  //listAll: `SELECT id,full_name FROM visitors`,
  listAll: `SELECT * FROM visitors`,
  deleteVisitor: `DELETE FROM visitors WHERE id = $1 RETURNING *`,
  deleteAll: `DELETE FROM visitors RETURNING *`,
  update: (text) => `UPDATE visitors SET ${text} = $1 WHERE id = $2 RETURNING *`,
  viewOne: `SELECT * FROM visitors WHERE id = $1`,
  viewLast: `
  SELECT * FROM visitors 
  ORDER By id DESC
  LIMIT 1
`,
  checkVisitor: `SELECT id FROM visitors WHERE id = $1`,
};

const databaseErrors = {
  errorCreatingTable: "Error creating a table!",
  addingVisitor: "Error adding a visitor!",
  listingVisitors: "Visitors not found. The table is empty!",
  deletingAVisitor: "Error deleting visitor!",
  deletingAll: "Error deleting all visitors. The table is empty!",
  updating: "Error updating visitor!",
  viewing: "Error viewing visitor!",
  viewingLast: "Error viewing last visitor. The table is empty!",
  columnDoesNotExist: (text) => `Column '${text}' does not exist!`,
  visitorDoesNotExist: (visitorID) => `Visitor with ID: ${visitorID} does not exist!`,
  noRelations: 'relation "visitors" does not exist!',
  tableDoesNotExist: `Table 'visitors' does not exist.`,
};

const successMessages = {
  tableCreated: 'Table created successfully!',
  newVisitorAdded: 'A visitor added successfully!',
  visitorDeleted: 'Visitor deleted successfully!',
  allVisitorsDeleted: 'All visitors deleted successfully!',
  visitorUpdated: 'Visitor updated successfully!'
}


module.exports = {
  errorMessages,
  regex,
  queryObject,
  databaseErrors,
  stringObject,
  successMessages
};
