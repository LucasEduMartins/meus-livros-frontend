function handleClickRemoveCommentButton(event, commentElement, book, comment) {
  event.preventDefault();
  event.stopPropagation();
  setSpinner(true);
  client.removeComment(book, comment).then((data) => {
    setSpinner(false);
    if (!data?.id) {
      data?.message && alert(data.message);
      return;
    }
    alert("Comentário removido com sucesso!");
    commentElement.remove();
  });
}

function createRemoveCommentButton({
  container: commentElement,
  book,
  comment,
}) {
  const removeCommentButtonElement = document.createElement("div");
  removeCommentButtonElement.classList.add("remove-comment-item-button");
  removeCommentButtonElement.textContent = "X";
  removeCommentButtonElement.addEventListener("click", (e) =>
    handleClickRemoveCommentButton(e, commentElement, book, comment)
  );

  commentElement.appendChild(removeCommentButtonElement);
}

function createCommentListItem({
  container: commentListElement,
  data: comment,
  book,
}) {
  const commentElement = document.createElement("textarea");
  commentElement.classList.add("comment-item");
  commentElement.textContent = comment.comment;

  const updateCommentFunction = () => {
    if (commentElement.value === "") {
      setSpinner(false);
      return;
    }

    client.updateComment(book, comment).then((data) => {
      setSpinner(false);
      if (!data?.id) {
        data?.message && alert(data.message);
        return;
      }
      alert("Comentário atualizado com sucesso!");
    });
  };

  commentElement.addEventListener("blur", (e) => {
    e.preventDefault();
    setSpinner(true);
    updateCommentFunction();
  });

  commentElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSpinner(true);
      updateCommentFunction();
    }
  });

  createRemoveCommentButton({
    container: commentElement,
    book,
    comment,
  });
  commentListElement.appendChild(commentElement);
}

function createAddCommentElement({ container: commentListElement, book }) {
  const addCommentElement = document.createElement("textarea");
  addCommentElement.classList.add("comment-item");
  addCommentElement.placeholder = "Adicionar comentário";

  const addCommentFunction = () => {
    if (addCommentElement.value === "") {
      setSpinner(false);
      return;
    }

    client
      .addComment(book, {
        comment: addCommentElement.value,
      })
      .then((data) => {
        setSpinner(false);
        if (!data?.id) {
          data?.message && alert(data.message);
          return;
        }
        alert("Comentário adicionado com sucesso!");
        addCommentElement.value = "";
        createCommentListItem({
          container: commentListElement,
          data,
          book,
        });
      });
  };

  addCommentElement.addEventListener("blur", (e) => {
    e.preventDefault();
    setSpinner(true);
    addCommentFunction();
  });

  addCommentElement.addEventListener("keydown", (e) => {
    if (event.key === "Enter") {
      e.preventDefault();
      setSpinner(true);
      addCommentFunction();
    }
  });

  commentListElement.appendChild(addCommentElement);
}

function createCommentListComponent({
  container: booksListElement,
  book,
  data,
}) {
  const container = booksListElement.parentNode;

  document.getElementsByClassName("comment-list")[0]?.remove();

  const commentListElement = document.createElement("div");
  commentListElement.classList.add("comment-list");

  createAddCommentElement({
    container: commentListElement,
    book,
  });

  data?.forEach((item) => {
    createCommentListItem({
      container: commentListElement,
      book,
      data: item,
    });
  });

  container.appendChild(commentListElement);
}

function clearCommentList() {
  document.getElementsByClassName("comment-list")[0]?.remove();
}
