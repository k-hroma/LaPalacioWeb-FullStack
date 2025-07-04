const fillForm = (book) => {
  const {
    title,
    isbn,
    writerFirstName,
    writerLastName,
    editorial,
    price,
    stock,
  } = book;
  document.getElementById("title").value = title;
  document.getElementById("isbn").value = isbn;
  document.getElementById("writerFirstName").value = writerFirstName;
  document.getElementById("writerLastName").value = writerLastName;
  document.getElementById("editorial").value = editorial;
  document.getElementById("price").value = price;
  document.getElementById("stock").value = stock;
};

export { fillForm };
