document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table");
  const tableBody = document.querySelector("#table-body");
  const form = document.querySelector("form");
  const popUp = document.querySelector(".pop-up");
  const no = document.querySelector(".no");
  const yes = document.querySelector(".yes");
  const idDisplay = document.querySelector("#id");
  const visitorDisplay = document.querySelector("#name");
  const overLayer = document.querySelector(".overlayer");
  const menuElements = document.querySelectorAll(".top-tools");

  menuElements[0].addEventListener("click", () => {
    menuElements[0].classList.add("active-tab");
    menuElements[1].classList.remove("active-tab");
    table.style.display = "none";
    form.style.display = "flex";
  });

  menuElements[1].addEventListener("click", () => {
    menuElements[0].classList.remove("active-tab");
    menuElements[1].classList.add("active-tab");
    table.style.display = "table";
    form.style.display = "none";
  });

  function hidePopUp() {
    popUp.style.transform = "scale(0)";
    overLayer.style.display = "none";
  }

  const users = [];
  const userId = [];

  function getAllUsers() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:3000/visitors",
        type: "GET",
        success: function (response) {
          users.push(response);
          console.log(users[0]);
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

            if (key === "id") {
              td.style.background = "rgb(220,220,220)";
              td.style.border = "none";
            }

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
          tr.style.background = "";
          tr.classList.add("highlight");
          userId.push(user.id);
          console.log(user.id);
        });

        no.addEventListener("click", () => {
          hidePopUp();
          tr.classList.remove("highlight");
        });

        yes.addEventListener("click", async () => {
          const text = document.querySelector(".pop-up-text");
          const loading = document.querySelector(".loading");
          const btn = document.querySelector(".buttons");
          btn.style.display = "none";
          text.style.display = "none";
          try {
            await deleteUserFromServer(user, tr);
            hidePopUp();
            tr.classList.remove("highlight");
            text.style.display = "flex";
            loading.style.display = "none";
            btn.style.display = "block";
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
    popUp.style.transform = "scale(1)";
    overLayer.style.display = "block";
  }

  function deleteUser() {
    const loading = document.querySelector(".loading");
    return new Promise((resolve, reject) => {
      loading.style.display = "block";
      $.ajax({
        url: `http://localhost:3000/visitors/${parseInt(userId[0])}`,
        type: "DELETE",
        success: function (response) {
          resolve((loading.innerHTML = response));
        },
        error: function (xhr, status, error) {
          console.error("Error deleting user:", error);
          reject(error);
        },
      });
    });
  }

  async function deleteUserFromServer(user, tr) {
    try {
      if (userId.includes(user.id)) {
        await deleteUser();
        const index = users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          users.splice(index, 1);
          tableBody.removeChild(tr);
          userId.splice(0, 1);
          await addUserToTable();
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error);
    }
  }

  addUserToTable();
});
