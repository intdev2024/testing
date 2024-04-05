document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const fullName = document.querySelector("#visitor-names");
  const nameOfAssistant = document.querySelector("#name-assistant");
  const age = document.querySelector("#age");
  const errors = document.querySelectorAll(".error");
  const addButton = document.querySelector("#add");
  const comment = document.querySelector("#comment");

  const nameRegex = /^[A-Za-z]{3,}(?:\s[A-Za-z]{3,})+$/;
  const visibility = {
    visible: "visible",
    hidden: "hidden",
  };

  function removeNumbers(input) {
    return input.replace(/[0-9]/g, "");
  }

  fullName.addEventListener("input", () => {
    fullName.value = removeNumbers(fullName.value);
  });

  nameOfAssistant.addEventListener("input", () => {
    nameOfAssistant.value = removeNumbers(nameOfAssistant.value);
  });

  addButton.addEventListener("click", () => {
    errors[0].style.visibility = !fullName.value.trim().match(nameRegex)
      ? visibility.visible
      : visibility.hidden;

    errors[1].style.visibility =
      isNaN(parseInt(age.value)) || parseInt(age.value) <= 0
        ? visibility.visible
        : visibility.hidden;

    errors[2].style.visibility = !nameOfAssistant.value.trim().match(nameRegex)
      ? visibility.visible
      : visibility.hidden;
  });

  form.addEventListener("submit", function (event) {
    let isValid = true;

    if (comment.value.trim() === "") {
      comment.value = "No comment";
    }

    if (!fullName.value.trim().match(nameRegex)) {
      errors[0].style.visibility = visibility.visible;
      isValid = false;
    } else {
      errors[0].style.visibility = visibility.hidden;
    }

    if (isNaN(parseInt(age.value)) || parseInt(age.value) <= 0) {
      errors[1].style.visibility = visibility.visible;
      isValid = false;
    } else {
      errors[1].style.visibility = visibility.hidden;
    }

    if (!nameOfAssistant.value.trim().match(nameRegex)) {
      errors[2].style.visibility = visibility.visible;
      isValid = false;
    } else {
      errors[2].style.visibility = visibility.hidden;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});
