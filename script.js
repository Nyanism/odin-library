let myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function () {
    let read = "not read yet";

    if (this.hasRead === true) {
      read = "read";
    }

    return title + " by " + author + ", " + pages + " pages, " + read;
  };
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function showLibraryBooks() {
  let bookRows = document.querySelectorAll(".book-row");
  bookRows.forEach((row) => {
    row.remove();
  });

  for (book of myLibrary) {
    let tableRow = document.querySelector("table").insertRow();
    tableRow.classList.add("book-row");

    let titleCell = tableRow.insertCell();
    titleCell.textContent = book.title;

    let authorCell = tableRow.insertCell();
    authorCell.textContent = book.author;

    let pagesCell = tableRow.insertCell();
    pagesCell.textContent = book.pages;

    let readCell = tableRow.insertCell();
    if (book.hasRead) {
      readCell.textContent = "Yes";
    } else {
      readCell.textContent = "No";
    }

    let deleteCell = tableRow.insertCell();
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.setAttribute("data-index", myLibrary.indexOf(book));
    deleteCell.appendChild(deleteButton);

    let readButtonCell = tableRow.insertCell();
    let readButton = document.createElement("button");
    readButton.textContent = "Toggle Read";
    readButton.classList.add("toggle");
    readButton.setAttribute("data-index", myLibrary.indexOf(book));
    readButtonCell.appendChild(readButton);
  }

  let bookDeleteButtons = document.querySelectorAll(".delete");
    bookDeleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        myLibrary.splice(button.dataset.index, 1);
        showLibraryBooks();
      });
    });

    let readToggleButtons = document.querySelectorAll(".toggle");
    readToggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let book = myLibrary[button.dataset.index];
        if (book.hasRead) {
          book.hasRead = false;
        } else {
          book.hasRead = true;
        }

        showLibraryBooks();
      });
    });
}

document.querySelector(".book-form").style.display = "none";
let newBookButton = document.querySelector(".new-book");
newBookButton.addEventListener("click", () => {
  document.querySelector(".book-form").style.display = "block";
});
let submitBookButton = document.querySelector(".submit");
submitBookButton.addEventListener("click", () => {
  document.querySelector(".book-form").style.display = "none";
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let hasRead = false;
  if (document.querySelector("#hasRead").value === "Yes") {
    let hasRead = true;
  }

  let book = new Book(title, author, pages, hasRead);
  addBookToLibrary(book);

  let tableRow = document.querySelector("table").insertRow();
  tableRow.classList.add("book-row");

  let titleCell = tableRow.insertCell();
  titleCell.textContent = book.title;

  let authorCell = tableRow.insertCell();
  authorCell.textContent = book.author;

  let pagesCell = tableRow.insertCell();
  pagesCell.textContent = book.pages;

  let readCell = tableRow.insertCell();
  if (book.hasRead) {
    readCell.textContent = "Yes";
  } else {
    readCell.textContent = "No";
  }

  let deleteCell = tableRow.insertCell();
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.setAttribute("data-index", myLibrary.indexOf(book));
  deleteCell.appendChild(deleteButton);

  let readButtonCell = tableRow.insertCell();
  let readButton = document.createElement("button");
  readButton.textContent = "Toggle Read";
  readButton.classList.add("toggle");
  readButton.setAttribute("data-index", myLibrary.indexOf(book));
  readButtonCell.appendChild(readButton);

  showLibraryBooks();

  document.querySelector(".book-form").reset();
});

let book1 = new Book("Title 1", "Author 1", 40, true);
let book2 = new Book("Title 2", "Author 2", 50, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
showLibraryBooks();
