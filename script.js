// adjust grid gap for different screen sizes
["resize", "load"].forEach((el) =>
  window.addEventListener(el, () => {
    document.querySelector("main").style.gridTemplateColumns = `repeat(${
      Math.floor(window.innerWidth / 300) || 1
    }, 1fr)`;
  })
);

// show/hide form on button click
const form = document.querySelector("form");
let formStatus = 0;

document.querySelector("#show-form").onclick = () => {
  form.display = formStatus ? "none" : "flex";
  form.style.transform = formStatus ? "translateY(-100%)" : "translateY(0)";
  formStatus = 1 - formStatus;
};

// library constructor & prototypes
let myLibrary = [];

function Book(id, title, author, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.changeReadStatus = function () {
  this.isRead = !this.isRead;
};

Book.prototype.createCard = function () {
  let card = document.createElement("div"),
    bookTitle = document.createElement("h3"),
    bookAuthor = document.createElement("h4"),
    bookPages = document.createElement("p"),
    buttonContainer = document.createElement("div"),
    readButton = document.createElement("button"),
    deleteButton = document.createElement("button");

  bookTitle.textContent = this.title;
  bookAuthor.textContent = `by ${this.author}`;
  bookPages.textContent = `Pages: ${this.pages}`;
  readButton.textContent = this.isRead ? "Read" : "Not Read";
  readButton.className = this.isRead ? "" : "not-read";
  deleteButton.textContent = "X";

  // button events
  readButton.onclick = function () {
    let thisBook = myLibrary.filter(
      (book) =>
        book.id === this.parentElement.parentElement.getAttribute("data-id")
    )[0];
    thisBook.changeReadStatus();
    this.textContent = thisBook.isRead ? "Read" : "Not Read";
    this.classList.toggle("not-read");
  };

  deleteButton.onclick = function () {
    removeBookFromLibrary(this.parentElement.getAttribute("data-id"));
  };

  buttonContainer.appendChild(readButton);

  card.append(bookTitle, bookAuthor, bookPages, buttonContainer, deleteButton);
  card.setAttribute("data-id", this.id);
  card.className = "card";

  document.querySelector("main").appendChild(card);
};

// functions to add and remove books
function addBookToLibrary(e) {
  const formData = new FormData(form);
  let book = new Book(
    `${formData.get("title")}${Math.floor(Math.random() * 10000)}`,
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read") ? true : false
  );

  myLibrary = [...myLibrary, book];
  book.createCard();
}

function removeBookFromLibrary(bookId) {
  document.querySelector(`.card[data-id=${bookId}]`).remove();
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
}

form.onsubmit = function (e) {
  e.preventDefault();
  addBookToLibrary(e);
  this.reset();
};
