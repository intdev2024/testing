const table = document.querySelector(".table");
const popUp = document.querySelector(".pop-up");
const no = document.querySelector(".no");
const yes = document.querySelector(".yes");
const idDisplay = document.querySelector("#id");
const visitorDisplay = document.querySelector("#name");
const overLayer = document.querySelector(".overlayer");
const comments = document.querySelectorAll(".comments");

function hidePopUp() {
  popUp.style.transform = "scale(0)";
  overLayer.style.display = "none";
}

const users = [
  {
    id: 1,
    fullName: "John Molele",
    age: 40,
    dateOfVisit: "13 March 2020",
    timeOfVisit: "13 March 2020",
    nameOfAssistant: "Tshepo Kgomo",
    comments: "I have been through it all",
  },
  {
    id: 2,
    fullName: "John Molele",
    age: 40,
    dateOfVisit: "13 March 2020",
    timeOfVisit: "13 March 2020",
    nameOfAssistant: "Tshepo Kgomo",
    comments: "I have been through it all",
  },
  {
    id: 3,
    fullName: "Joseph Malete",
    age: 40,
    dateOfVisit: "13 March 2020",
    timeOfVisit: "13 March 2020",
    nameOfAssistant: "Tshepo Kgomo",
    comments: "I have been through it all",
  },
  {
    id: 5,
    fullName: "Lethabo Pele",
    age: 40,
    dateOfVisit: "13 March 2020",
    timeOfVisit: "13 March 2020",
    nameOfAssistant: "Tshepo Kgomo",
    comments: "I have been through it all",
  },
  {
    id: 12,
    fullName: "Lethabo Pele",
    age: 40,
    dateOfVisit: "13 March 2020",
    timeOfVisit: "13 March 2020",
    nameOfAssistant: "Tshepo Kgomo",
    comments: "I have been through it all",
  },
  {
    id: 11,
    fullName: "Lethabo Pele",
    age: 40,
    dateOfVisit: "13 March 2020",
    timeOfVisit: "13 March 2020",
    nameOfAssistant: "Tshepo Kgomo",
    comments: "I have been through it all",
  },
  {
    id: 8,
    fullName: "Lethabo Pele",
    age: 40,
    dateOfVisit: "13 March 2020",
    timeOfVisit: "13 March 2020",
    nameOfAssistant: "Tshepo Kgomo",
    comments:
      "I have been through it all I have been through it all I have been through it allI have been through it allI have been through it all I have been through it allI have been through it all I have been through it allI have been through it allI have been through it all ",
  },
  {
    id: 40,
    fullName: "Lethabo Pele",
    age: 40,
    dateOfVisit: "13 March 2020",
    timeOfVisit: "13 March 2020",
    nameOfAssistant: "Tshepo Kgomo",
    comments: "I have been through it all",
  },
];

let userId = [];

function addUserToTable() {
  users.forEach((user, i) => {
    const tr = document.createElement("tr");
    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        const td = document.createElement("td");
        td.textContent = user[key];
        tr.appendChild(td);

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
    });

    no.addEventListener("click", () => {
      hidePopUp();
      tr.classList.remove("highlight");
    });

    yes.addEventListener("click", () => {
      const text = document.querySelector(".pop-up-text");
      const loading = document.querySelector(".loading");
      const btn = document.querySelector(".buttons");
      btn.style.display = "none";
      text.style.display = "none";
      loading.style.display = "block";
      setTimeout(() => {
        hidePopUp();
        deleteUser(user, tr);
        tr.classList.remove("highlight");
        text.style.display = "flex";
        loading.style.display = "none";
        btn.style.display = "block";
      }, 3000);
    });

    tr.append(edit, del);
    table.append(tr);
  });
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
  visitorDisplay.textContent = user.fullName;
  popUp.style.transform = "scale(1)";
  overLayer.style.display = "block";
}

function deleteUser(user, tr) {
  if (userId.includes(user.id)) {
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users.splice(index, 1);
      table.removeChild(tr);
    }
  }
}

addUserToTable();

const formBtn = document.querySelectorAll(".left button")[0];
const tableBtn = document.querySelectorAll(".left button")[1];
const databaseTable = document.querySelector(".table");
const databaseForm = document.querySelector("form");

tableBtn.addEventListener("click", () => {
  databaseTable.style.display = "block";
  databaseForm.style.display = "none";
});

formBtn.addEventListener("click", () => {
  databaseTable.style.display = "none";
  databaseForm.style.display = "flex";
});
