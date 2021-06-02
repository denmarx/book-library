let myLibrary = [];
// Books
function Book(title, author, pages, didRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.didRead = didRead
}
const gridContainer = document.querySelector(".book-grid");

function createBook (e) {
  e.preventDefault();
  myLibrary.push(saveBook());
  updateGrid();
}

function saveBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const didRead = document.getElementById("didRead").checked;
  return new Book(title, author, pages, didRead);
}

function isBookInLibrary (bookTitle) {
  for (book of myLibrary) {
    if (book.title === bookTitle) {
      return book;
    }
  }
  return null;
}

function removeFromGrid (e) {
  removeFromLibrary(e.target.parentNode.firstChild.textContent);  
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}

// Funktion überschreibt Array mit allen Büchern, deren Titel nicht gleich dem Buhtitel sind, auf den das Klickevent ausgeführt wird
function removeFromLibrary (bookTitle) {
  myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
}

// Form
const popUp = document.querySelector(".pop-up");
const showBtn = document.querySelector(".btn-show-form");
const submitBtn = document.querySelector("#submit-btn");

showBtn.addEventListener("click", showForm);
submitBtn.addEventListener("click", createBook)

function showForm () {
  popUp.classList.add("pop-up-active");
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopUp();
});

function closePopUp () {
  popUp.classList.remove("pop-up-active");
}

// Book Grid
function updateGrid() {
  resetGrid();
  for (book of myLibrary) {
    createBookCard(book);
  }
}

function resetGrid () {
  gridContainer.innerHTML = "";
}

function createBookCard(book) {
  const gridDiv = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("h3");
  const pages = document.createElement("h3");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  gridDiv.classList.add("div-grid");
  title.classList.add("card-title");
  author.classList.add("card-author");
  pages.classList.add("card-pages");
  readBtn.classList.add("button");
  readBtn.classList.add("card-readBtn");
  removeBtn.classList.add("button");
  removeBtn.classList.add("card-removeBtn");

  title.textContent = book.title;
  author.textContent = book.author
  pages.textContent = `${book.pages} pages`
  author.textContent = book.author
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", removeFromGrid)
  readBtn.addEventListener("click", toggleReadStatus)

  if (book.didRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("card-readBtn");
  } else{
    readBtn.textContent = "Not read";
    readBtn.classList.add("card-removeBtn");
  }

  gridDiv.appendChild(title);
  gridDiv.appendChild(author);
  gridDiv.appendChild(pages);
  gridDiv.appendChild(readBtn);
  gridDiv.appendChild(removeBtn);
  gridContainer.appendChild(gridDiv);
  closePopUp();
}

function toggleReadStatus (e) {
  console.log((e.target.parentNode.firstChild.textContent).didRead)
 if (e.target.textContent === "Read") {
   isBookInLibrary(e.target.parentNode.firstChild.textContent).didRead = false;
   e.target.textContent = "Not read"
   e.target.classList.remove("card-readBtn")
   e.target.classList.add("card-removeBtn")
  } else {
  isBookInLibrary(e.target.parentNode.firstChild.textContent).didRead = true;
  e.target.textContent = "Read"
  e.target.classList.remove("card-removeBtn")
  e.target.classList.add("card-readBtn")
 }
}