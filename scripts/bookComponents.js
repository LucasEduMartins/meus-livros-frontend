function handleRemoveBookButtonClick(event, bookElement, book) {
  event.preventDefault();
  event.stopPropagation();

  setSpinner(true);
  client.removeBook({ id: book.id }).then((data) => {
    setSpinner(false);
    if (!data?.id) {
      data?.message && alert(data.message);
      return;
    }

    alert(`Livro removido com sucesso!`);
    bookElement.remove();
    clearCommentList();
  });
}

function createRemoveBookButton({ container: bookElement, book }) {
  const removeBookButtonElement = document.createElement("div");
  removeBookButtonElement.classList.add("remove-book-button");
  removeBookButtonElement.textContent = "X";

  removeBookButtonElement.addEventListener("click", (e) =>
    handleRemoveBookButtonClick(e, bookElement, book)
  );

  bookElement.appendChild(removeBookButtonElement);
}

function handleBookListItemClick({
  event,
  bookElement,
  container: booksListElement,
  book,
}) {
  event.preventDefault();
  const bookElements = document.querySelectorAll(".book");
  bookElements.forEach((book) => {
    book.classList.remove("active");
  });
  bookElement.classList.add("active");
  setSpinner(true);
  client.getAllComments(book).then((comments) => {
    setSpinner(false);
    createCommentListComponent({
      container: booksListElement,
      book,
      data: comments,
    });
  });
}

function createBookListItem({ container: booksListElement, book }) {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");

  const bookNameElement = document.createElement("p");
  bookNameElement.classList.add("book-title");
  bookNameElement.innerHTML = book.title;

  bookElement.addEventListener("click", (e) =>
    handleBookListItemClick({
      event: e,
      bookElement,
      container: booksListElement,
      book,
    })
  );

  bookElement.appendChild(bookNameElement);

  createRemoveBookButton({ container: bookElement, book });
  booksListElement.appendChild(bookElement);
}

function createNoBookFound(booksListElement) {
  const noBooksMessageElement = document.createElement("p");
  noBooksMessageElement.textContent = "Nenhum livro encontrado.";
  booksListElement.appendChild(noBooksMessageElement);
}

function handleAddBookButtonClick({
  event,
  booksListElement,
  addBookButtonInputElement,
}) {
  event.preventDefault();
  if (addBookButtonInputElement.value === "") return;

  setSpinner(true);
  client.addBook({ title: addBookButtonInputElement.value }).then((data) => {
    setSpinner(false);
    if (!data?.id) {
      data?.message && alert(data.message);
      return;
    }

    addBookButtonInputElement.value = "";
    createBookListItem({
      container: booksListElement,
      book: data,
    });
    alert("Livro adicionado com sucesso!");
  });
}

function createAddBookButton({ container: booksListElement }) {
  const addBookButtonContainerElemenet = document.createElement("div");
  addBookButtonContainerElemenet.classList.add("add-book-button-container");

  const addBookButtonInputElement = document.createElement("input");
  addBookButtonInputElement.classList.add("add-book-button-input");
  addBookButtonInputElement.placeholder = "Adicionar livro";

  const addBookButtonElement = document.createElement("div");
  addBookButtonElement.classList.add("add-book-button");
  addBookButtonElement.textContent = "+";
  addBookButtonElement.addEventListener("click", (e) =>
    handleAddBookButtonClick({
      event: e,
      booksListElement,
      addBookButtonInputElement,
    })
  );

  addBookButtonContainerElemenet.appendChild(addBookButtonInputElement);
  addBookButtonContainerElemenet.appendChild(addBookButtonElement);
  booksListElement.appendChild(addBookButtonContainerElemenet);
}

function createBookListComponent({ container, data }) {
  const bookListElement = document.createElement("div");
  bookListElement.classList.add("books");

  createAddBookButton({
    container: bookListElement,
  });

  if (!data || data?.length === 0) {
    createNoBookFound(bookListElement);
  }

  data?.forEach((item) => {
    createBookListItem({
      container: bookListElement,
      book: item,
    });
  });

  container.appendChild(bookListElement);
}
