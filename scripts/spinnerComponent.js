function createSpinner(container) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("loader-overlay");
  overlayElement.id = "loader";

  const spinnerElement = document.createElement("div");
  spinnerElement.classList.add("spinner");

  overlayElement.appendChild(spinnerElement);
  container.appendChild(overlayElement);

  const setSpinner = (flag) => {
    flag
      ? (overlayElement.style.display = "flex")
      : (overlayElement.style.display = "none");
  };

  setSpinner(false);

  return { setSpinner };
}

const { setSpinner } = createSpinner(document.body);
