const { errorMessages, regex, stringObject } = require("./helper_objects");
const { containsInitials } = errorMessages;

const hasInitials = (fullNameArray) => {
  for (let i = 0; i < fullNameArray.length; i++) {
    if (fullNameArray[i].length <= 2 || fullNameArray[i].includes(".")) {
      throw new Error(containsInitials);
    }
  }
};


const validateNumber = (number) => {
  if (typeof number !== "number") throw new Error(errorMessages.isNotNumber);
};

const isEmpty = (parameter, string) => {
  if (parameter === "") {
    throw new Error(errorMessages.empty(string));
  }
};

const inputValidation = (name, age, date, time, assistant, comments) => {
  isEmpty(name, stringObject.name);
  isEmpty(age, stringObject.age);
  isEmpty(date, stringObject.date);
  isEmpty(time, stringObject.time);
  isEmpty(assistant, stringObject.assistant);
  validateNumber(age);

  if (typeof name !== "string" || regex.numericalDigit.test(name)) {
    throw new Error(errorMessages.isNotAString(stringObject.name));
  } else {
    const namesArray = name.split(" ");
    if (namesArray.length < 2) throw new Error(errorMessages.bothNamesRequired);
  }

  const fullNameArray = name.toLowerCase().trim().split(" ");
  hasInitials(fullNameArray);

  if (typeof date !== "string") {
    throw new Error(errorMessages.isNotAString(stringObject.date));
  } else {
    if (!regex.validDateFormatOne.test(date) && !regex.validDateFormatTwo.test(date)) {
      throw new Error(errorMessages.invalidFormat(stringObject.date));
    }
  }

  if (typeof time !== "string") {
    throw new Error(errorMessages.invalidFormat(stringObject.time));
  } else {
    if (!regex.validTimeFormat.test(time)) {
      throw new Error(errorMessages.invalidFormat(stringObject.time));
    }
  }

  if (typeof comments !== "string") {
    throw new Error(errorMessages.isNotAString(stringObject.comments));
  }

  if (typeof assistant !== "string") {
    throw new Error(errorMessages.isNotAString(stringObject.assistant));
  }
};

module.exports = { hasInitials, inputValidation, validateNumber };
