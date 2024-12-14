function clientApi(port = 5000) {
  const baseUrl = `http://localhost:${port}`;

  const getAllBooks = () => {
    try {
      return fetch(`${baseUrl}/books`).then((response) => response.json());
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const addBook = (book) => {
    try {
      return fetch(`${baseUrl}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const removeBook = (book) => {
    try {
      return fetch(`${baseUrl}/books/${book.id}`, {
        method: "DELETE",
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const getAllComments = (book) => {
    try {
      return fetch(`${baseUrl}/books/${book.id}/comments`).then((response) =>
        response.json()
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const addComment = (book, comment) => {
    try {
      return fetch(`${baseUrl}/books/${book.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const updateComment = (book, comment) => {
    try {
      return fetch(`${baseUrl}/books/${book.id}/comments/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const removeComment = (book, comment) => {
    try {
      return fetch(`${baseUrl}/books/${book.id}/comments/${comment.id}`, {
        method: "DELETE",
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  return {
    getAllBooks,
    addBook,
    removeBook,
    getAllComments,
    addComment,
    updateComment,
    removeComment,
  };
}

const client = clientApi();
