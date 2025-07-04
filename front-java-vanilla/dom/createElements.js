import {
  addBook,
  delBook,
  loadBooks,
  updateBook,
} from "../controllers/bookControllers.js";
import { isValidBook } from "../validations/bookValidation.js";
import { fillForm } from "./fillForm.js";
let editingBookId = null;
const bookForm = document.getElementById("bookForm");

const handleSubmit = async (e) => {
  e.preventDefault();
  const newBook = {
    isbn: Number(document.getElementById("isbn").value),
    title: document.getElementById("title").value,
    writer: {
      firstName: document.getElementById("writerFirstName").value,
      lastName: document.getElementById("writerLastName").value,
    },
    editorial: document.getElementById("editorial").value,
    price: Number(document.getElementById("price").value),
    stock: Number(document.getElementById("stock").value),
  };

  try {
    if (!isValidBook(newBook)) throw new Error("Invalid data input");

    if (editingBookId) {
      // Actualizar libro existente
      await updateBook(editingBookId, newBook);
      editingBookId = null;
      const btnCrear = document.getElementById("btnCrear");
      btnCrear.textContent = "Crear";
    } else {
      // Crear nuevo libro
      await addBook(newBook);
    }
    document.getElementById("gridBook").innerHTML = "";
    await loadBooks();
    bookForm.reset();
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown fetching books error";
    console.error(errMsg);
    return {
      success: false,
      message: errMsg,
    };
  }
};

const handleUpdate = async (e) => {
  const bookId = e.target.dataset.id;
  editingBookId = bookId;
  const card = e.target.closest("div");
  const lis = card.querySelectorAll("li");
  const isbn = Number(lis[0]?.textContent);
  const title = lis[1]?.textContent;
  const writerFirstName = lis[2]?.textContent;
  const writerLastName = lis[3]?.textContent;
  const editorial = lis[4]?.textContent;
  const price = Number(lis[5]?.textContent);
  const stock = Number(lis[6]?.textContent);
  const book = {
    isbn,
    title,
    writerFirstName,
    writerLastName,
    editorial,
    price,
    stock,
  };
  fillForm(book);
  const btnCrear = document.getElementById("btnCrear");
  btnCrear.textContent = "Update";
};

const handleDelete = async (e) => {
  // try catch
  const bookId = e.target.dataset.id;
  await delBook(bookId);
  document.getElementById("gridBook").innerHTML = "";
  await loadBooks();
};

export { bookForm, handleSubmit, handleUpdate, handleDelete };
