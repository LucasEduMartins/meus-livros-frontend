async function appInit() {
  const bookListData = await client.getAllBooks();

  const container = document.createElement("div");
  container.classList.add("container");

  const { setSpinner } = createSpinner(container);

  createBookListComponent({
    container,
    data: bookListData,
    setSpinner,
  });

  document.body.appendChild(container);
}
