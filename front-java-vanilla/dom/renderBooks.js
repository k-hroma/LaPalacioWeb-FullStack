import { handleDelete, handleUpdate } from "./createElements.js";

const gridBook = document.getElementById("gridBook");

const renderListBooks = (book) => {
  console.log(book);
  const cardBook = document.createElement("div");
  gridBook.appendChild(cardBook);
  const ulItem = document.createElement("ul");

  const isbnLi = document.createElement("li");
  isbnLi.textContent = book.isbn;

  const titleLi = document.createElement("li");
  titleLi.textContent = book.title;

  const writerFirstNameLi = document.createElement("li");
  writerFirstNameLi.textContent = book.writer.firstName;

  const writerLastNameLi = document.createElement("li");
  writerLastNameLi.textContent = book.writer.lastName;

  const editorialLi = document.createElement("li");
  editorialLi.textContent = book.editorial;

  const priceLi = document.createElement("li");
  priceLi.textContent = book.price;

  const stockLi = document.createElement("li");
  stockLi.textContent = book.stock;

  const btnUpdate = document.createElement("button");
  const btnDelete = document.createElement("button");

  btnDelete.textContent = "Delete";
  btnDelete.classList = "btn-delete";
  btnDelete.dataset.id = book._id;
  btnDelete.addEventListener("click", handleDelete);

  btnUpdate.textContent = "Update";
  btnUpdate.classList = "btn-update";
  btnUpdate.dataset.id = book._id;
  btnUpdate.addEventListener("click", handleUpdate);

  cardBook.appendChild(ulItem);

  ulItem.appendChild(isbnLi);
  ulItem.appendChild(titleLi);
  ulItem.appendChild(writerFirstNameLi);
  ulItem.appendChild(writerLastNameLi);
  ulItem.appendChild(editorialLi);
  ulItem.appendChild(priceLi);
  ulItem.appendChild(stockLi);

  cardBook.appendChild(btnUpdate);
  cardBook.appendChild(btnDelete);
};

export { renderListBooks };
