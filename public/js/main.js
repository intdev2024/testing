document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table");
  const tableBody = document.querySelector("#table-body");
  const form = document.querySelector("form");
  const updateForm = document.querySelector(".update");
  const popUp = document.querySelector(".pop-up");
  const no = document.querySelector(".no");
  const yes = document.querySelector(".yes");
  const cancel = document.querySelector(".cancel");
  const save = document.querySelector(".save");
  const idDisplay = document.querySelector("#id");
  const visitorDisplay = document.querySelector("#name");
  const overLayer = document.querySelector(".overlayer");
  const menuElements = document.querySelectorAll(".top-tools");
  const loading = document.querySelector(".loading");
  const text = document.querySelector(".pop-up-text");
  const btn = document.querySelector(".buttons");
  const loadCircle = document.querySelector(".loading .circle");
  const loadIcon = document.querySelector(".loading .fa-solid");

  const fullNameInputUpdated = document.querySelector("#name-updated");
  const ageInputUpdated = document.querySelector("#age-updated");
  const dateInputUpdated = document.querySelector("#date-updated");
  const timeInputUpdated = document.querySelector("#time-updated");
  const assistantNameInputUpdated = document.querySelector(
    "#name-assistant-updated"
  );
  const commentTextareaUpdated = document.querySelector("#comment-updated");

  menuElements[0].addEventListener("click", () => {
    menuElements[0].classList.add("active");
    menuElements[1].classList.remove("active");
    table.style.display = "none";
    form.style.display = "flex";
  });

  menuElements[1].addEventListener("click", () => {
    menuElements[0].classList.remove("active");
    menuElements[1].classList.add("active");
    table.style.display = "table";
    form.style.display = "none";
  });

  function hidePopUp() {
    popUp.style.display = "none";
    overLayer.style.display = "none";
  }

  const users = [];
  let userId = [];
  let message = [];

  function getAllUsers() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "https://silver-memory-v6p779xp7j742p9vv-3000.app.github.dev/visitors",
        type: "GET",
        success: function (response) {
          users.push(response);
          resolve(users[0]);
        },
        error: function (xhr, status, error) {
          console.error("Error retrieving data:", error);
          reject(error);
        },
      });
    });
  }

  async function addUserToTable() {
    try {
      const allUsers = await getAllUsers();
      allUsers.forEach((user) => {
        const tr = document.createElement("tr");
        tr.setAttribute("id", user.id);
        for (const key in user) {
          if (Object.hasOwnProperty.call(user, key)) {
            const td = document.createElement("td");
            td.textContent = user[key];
            tr.appendChild(td);

            if (key === "date_of_visit") {
              td.innerHTML = td.innerHTML.slice(0, 10);
            }

            if (key === "comments") {
              let commentText = td.textContent;
              let truncatedComment = commentText.substring(0, 40);
              if (commentText.length > 40) {
                truncatedComment += '<span class="more">...</span>';
              }
              td.innerHTML = truncatedComment;
            }
          }
        }

        const edit = createIconButton("fa-edit", "Edit");
        const del = createIconButton("fa-trash", "Delete");

        del.addEventListener("click", () => {
          showPopUp(user);
          tr.classList.add("highlight");
          userId.push(user.id);
          console.log(user.id);
        });

        edit.addEventListener("click", () => {
          updateForm.style.display = "flex";
          overLayer.style.display = "block";
          userId.push(user.id);

          function validateDate() {
            let date = new Date(user.date_of_visit);
            let formattedDate =
              date.getFullYear() +
              "/" +
              ("0" + (date.getMonth() + 1)).slice(-2) +
              "/" +
              ("0" + date.getDate()).slice(-2);
            return formattedDate;
          }

          fullNameInputUpdated.value = user.full_name;
          ageInputUpdated.value = user.age;
          dateInputUpdated.value = validateDate();
          timeInputUpdated.value = user.time_of_visit;
          assistantNameInputUpdated.value = user.name_of_assistant;
          commentTextareaUpdated.value = user.comments;
        });

        cancel.addEventListener("click", () => {
          updateForm.style.display = "none";
          overLayer.style.display = "none";
          userId = [];

          fullNameInputUpdated.value = "";
          ageInputUpdated.value = "";
          dateInputUpdated.value = "";
          timeInputUpdated.value = "";
          assistantNameInputUpdated.value = "";
          commentTextareaUpdated.value = "";
        });

        save.addEventListener("click", () => {
          alert('yes')
        })

        no.addEventListener("click", () => {
          hidePopUp();
          userId = [];
          tr.classList.remove("highlight");
        });

        yes.addEventListener("click", async () => {
          btn.style.display = "none";
          text.style.display = "none";
          try {
            await deleteUserFromServer(user, tr);
            tr.classList.remove("highlight");
          } catch (error) {
            alert(error);
          }
        });

        tr.append(edit, del);
        tableBody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error adding users to table:", error);
    }
  }

  function createIconButton(iconClass, content) {
    const td = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("button");
    const span = document.createElement("span");
    span.innerHTML = content;
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", iconClass);
    button.append(icon, span);
    td.appendChild(button);
    td.classList.add("icon");
    return td;
  }

  function showPopUp(user) {
    idDisplay.textContent = user.id;
    visitorDisplay.textContent = user.full_name;
    overLayer.style.display = "block";
    popUp.style.display = "flex";
  }

  function deleteUser(id) {
    loading.style.display = "block";
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://silver-memory-v6p779xp7j742p9vv-3000.app.github.dev/visitors/${parseInt(
          id
        )}`,
        type: "DELETE",
        success: function (response) {
          resolve(
            message.push(response),
            (loading.innerHTML = `<div class="success"><i class="fa-solid fa-check"></i><p>${message[0]}<p></div>`)
          );
        },
        error: function (error) {
          console.error("Error deleting user:", error);
          reject(error);
        },
      });
    });
  }

  function updateUser(id) {
    loading.style.display = "block";
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://silver-memory-v6p779xp7j742p9vv-3000.app.github.dev/visitors/${parseInt(
          id
        )}`,
        type: "PUT",
        success: function (response) {
          resolve(
            message.push(response),
            (loading.innerHTML = `<div class="success"><i class="fa-solid fa-check"></i><p>${message[0]}<p></div>`)
          );
        },
        error: function (error) {
          console.error("Error deleting user:", error);
          reject(error);
        },
      });
    });
  }

  async function deleteUserFromServer(user, tr) {
    await deleteUser(userId[0]);

    setTimeout(() => {
      hidePopUp();
      message = [];
      text.style.display = "flex";
      btn.style.display = "block";
      popUp.append(text, btn);
      loading.innerHTML = "";
      loading.style.display = "none";
      loading.append(loadCircle, loadIcon);
    }, 1300);
    if (userId.includes(user.id)) {
      tableBody.removeChild(tr);
      userId = [];
    }
  }

  addUserToTable();
});
