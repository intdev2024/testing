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
  const loading = document.querySelector(".loading");
  const text = document.querySelector(".pop-up-text");
  const btn = document.querySelector(".buttons");
  const loadCircle = document.querySelector('.loading .circle')
  const loadIcon = document.querySelector('.loading .fa-solid')

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
    popUp.style.display= "flex";
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
          btn.style.display = "none";
          text.style.display = "none";
          try {
            await deleteUserFromServer(user, tr);
            tr.classList.remove("highlight");
            text.style.display = "none";
            btn.style.display = "none";
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
          resolve(message.push(response));
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
    loading.innerHTML = message[0];
    setTimeout(() => {
      hidePopUp();
      text.style.display = "block";
      btn.style.display = "block";
      popUp.append(text,btn);
      loading.innerHTML = '';
      loading.style.display='none';
      loading.append(loadCircle,loadIcon);
      message = [];
    }, 1000);
    if (userId.includes(user.id)) {
      tableBody.removeChild(tr);
      userId = [];
    }
  }

  addUserToTable();
});
