["resize", "load"].forEach((el) =>
  window.addEventListener(el, () => {
    document.querySelector("main").style.gridTemplateColumns = `repeat(${
      Math.floor(window.innerWidth / 300) || 1
    }, 1fr)`;
  })
);

const form = document.querySelector("form");
let formStatus = 0;

document.querySelector("#show-form").onclick = () => {
  form.display = formStatus ? "none" : "flex";
  form.style.transform = formStatus ? "translateY(-100%)" : "translateY(0)";
  formStatus = 1 - formStatus;
};

let myLibrary = [];

function Book(id, title, author, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.changeReadStatus = function (readButton) {
  this.isRead = !this.isRead;
  readButton.textContent = this.isRead ? "Read" : "Not Read";
  readButton.classList.toggle("not-read");
};

Book.prototype.createCard = function () {
  let card = document.createElement("div"),
    h3 = document.createElement("h3"),
    h4 = document.createElement("h4"),
    p = document.createElement("p"),
    div = document.createElement("div"),
    button = document.createElement("button");

  card.className = "card";
  h3.textContent = this.title;
  h4.textContent = `by ${this.author}`;
  p.textContent = `Pages: ${this.pages}`;
  button.textContent = this.isRead ? "Read" : "Not Read";
  button.className = this.isRead ? "" : "not-read";
  button.onclick = function () {
    myLibrary[
      this.parentElement.parentElement.getAttribute("data-id")
    ].changeReadStatus(this);
  };
  div.appendChild(button);
  card.append(h3, h4, p, div);
  card.setAttribute("data-id", this.id);

  document.querySelector("main").appendChild(card);
};

function addBookToLibrary(e) {
  const formData = new FormData(form);
  let book = new Book(
    myLibrary.length,
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read") ? true : false
  );
  console.log(book.isRead);
  myLibrary.push(book);
  book.createCard();
}

function removeCardFromLibrary(bookId) {
  myLibrary.filter((book) => book.id !== bookId);
  updateCards();
}

function updateCards() {
  document.querySelector("main").textContent = "";
  myLibrary.forEach((book) => book.createCard());
}

form.onsubmit = function (e) {
  e.preventDefault();
  addBookToLibrary(e);
  this.reset();
};
