const myLibrary = JSON.parse(localStorage.getItem("data")) || [];
let currentBook = {};


const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const ratingInput = document.getElementById("rating");
const libraryList = document.getElementById("libraryList");
const submitBook = document.getElementById("submit");
const formModal = document.getElementById("myModal");
const openForm = document.getElementById("form");
const closeForm = document.getElementById("close");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");

const addOrUpdateTask = () => {
  const dataArrIndex = myLibrary.findIndex((item) => item.id === currentBook.id);
  const bookObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    author: authorInput.value,
    pages: pagesInput.value,
    rating: ratingInput.value
  };

  if (dataArrIndex === -1) {
    myLibrary.unshift(bookObj);
    addPhoto();
  } else {
    myLibrary[dataArrIndex] = bookObj;
  }

  localStorage.setItem("data", JSON.stringify(myLibrary));
  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  libraryList.innerHTML = "";

  myLibrary.forEach(
    ({ id, title, author, pages, rating }) => {
        libraryList.innerHTML += `
        <div class="library" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Author:</strong> ${author}</p>
          <p><strong>Pages:</strong> ${pages}</p>
          <p><strong>Rating:</strong> ${rating}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `
    }
  );
};

const deleteTask = (buttonEl) => {
  const dataArrIndex = myLibrary.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove();
  myLibrary.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(myLibrary));
  removePhoto();
}

const editTask = (buttonEl) => {
    const dataArrIndex = myLibrary.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentBook = myLibrary[dataArrIndex];

  titleInput.value = currentBook.title;
  authorInput.value = currentBook.author;
  pagesInput.value = currentBook.pages;
  ratingInput.value = currentBook.rating;

  submitBook.innerText = "Update Book";

  myModal.classList.toggle("hidden");  
}


const reset = () => {

  submitBook.innerText = "Add Book";
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  ratingInput.value = "";
  myModal.classList.toggle("hidden");
  currentBook = {};
}

if (myLibrary.length) {
  updateTaskContainer();
}

openForm.addEventListener("click", () =>
  myModal.classList.toggle("hidden")
);


closeForm.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || authorInput.value || pagesInput.value || ratingInput.value;
  const formInputValuesUpdated = titleInput.value !== currentBook.title || authorInput.value !== currentBook.author || pagesInput.value !== currentBook.pages || ratingInput.value !== currentBook.rating;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});



cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

submitBook.addEventListener("click", (e) => {
  e.preventDefault();
  addOrUpdateTask();
});


ratingInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
  e.preventDefault();
  addOrUpdateTask();
};
});


var j=0;
function addPhoto() {
  if (j < 6){
  j++;
  $("#addBook").append($("<img class='bookshelf' src='book" + j + ".png' id='book" + j + "'>").css("margin-left", "70px").animate({marginLeft: "0px"}, 1000).css("margin-left", "0px"));
} else {
  j=0;
  j++;
  $("#addBook").append($("<img class='bookshelf' src='book" + j + ".png'>"));
}
}

function removePhoto() {
  const addBook = document.getElementById("addBook");
  addBook.removeChild(addBook.lastChild);
}









