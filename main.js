const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleread = function () {
  if (this.read === "yes") {
    this.read = "No";
  } else {
    this.read = "yes";
  }
};
// Function to add book to library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderBooks(); // Update the display after adding a new book
}

// Function to render all books
function renderBooks() {
  const cardRow = document.getElementById("cardRow");
  cardRow.innerHTML = ""; // Clear existing cards before re-rendering

  myLibrary.forEach((element, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3", "col-md-4", "ms-4");
    card.style.width = "18rem";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = element.title;

    const author = document.createElement("h6");
    author.classList.add("card-subtitle", "mb-2", "text-body-secondary");
    author.textContent = `Author: ${element.author}`;

    const pages = document.createElement("p");
    pages.classList.add("card-text");
    pages.textContent = `Pages: ${element.pages}`;

    const readStatus = document.createElement("p");
    readStatus.classList.add("card-text");
    readStatus.textContent = `Read: ${element.read}`;

    const togglebtn = document.createElement("button");
    togglebtn.classList.add("btn", "btn-light", "me-2");
    togglebtn.textContent = "Read?";

    togglebtn.addEventListener("click", () => {
      element.toggleread();
      readStatus.textContent = `Read: ${element.read}`;
    });

    const del = document.createElement("button");
    del.type = "button";
    del.classList.add("btn", "btn-danger", "me-5");
    del.textContent = "remove";

    del.addEventListener("click", function () {
      const index = myLibrary.indexOf(element);
      if (index > -1) {
        myLibrary.splice(index, 1); // Remove 1 item at the found index
      }
      cardRow.removeChild(card);
    });
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(author);
    cardBody.appendChild(pages);
    cardBody.appendChild(readStatus);
    cardBody.appendChild(del);
    cardBody.appendChild(togglebtn);
    card.appendChild(cardBody);
    cardRow.appendChild(card);
  });
}

// Display function to initialize Add Book button
function display() {
  const container = document.getElementById("navbarid");

  // Add Book button
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn", "btn-secondary", "btn-lg", "me-5");
  button.textContent = "Add Book";
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#mymodal");
  container.appendChild(button);

  // Save button event listener
  document.getElementById("savebook").addEventListener("click", function () {
    const title = document.getElementById("booktitle").value;
    const author = document.getElementById("bookauthor").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("bookread").value;

    if (title && author && pages && read) {
      addBookToLibrary(title, author, pages, read); // Add to library
    }

    // Close the modal after adding
    const myModal = bootstrap.Modal.getInstance(
      document.getElementById("mymodal")
    );
    myModal.hide();

    // Clear the form fields
    document.getElementById("booktitle").value = "";
    document.getElementById("bookauthor").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("bookread").value = "";
  });

  // Initial render
  renderBooks();
}

display();
