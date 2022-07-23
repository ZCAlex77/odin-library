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

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}
