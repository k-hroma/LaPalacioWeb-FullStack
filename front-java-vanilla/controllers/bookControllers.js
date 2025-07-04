import {
  deleteBook,
  getBooks,
  patchBook,
  postBook,
} from "../api/booksService.js";
import { renderListBooks } from "../dom/renderBooks.js";
import { validateNewBook } from "../validations/addBook.js";
import { isValidBook } from "../validations/bookValidation.js";
import { validateUpdateBook } from "../validations/updateBook.js";

const loadBooks = async () => {
  try {
    const books = await getBooks();
    if (!books) {
      throw new Error("Error fetching books");
    }
    if (!Array.isArray(books)) {
      throw new Error("Error: books is not an array");
    }
    books.forEach((book) => {
      if (isValidBook(book)) {
        renderListBooks(book);
      } else {
        console.warn("Invalid dataBook:", book);
      }
    });
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

const addBook = async (dataNewBook) => {
  try {
    // validar dataNewBook
    const errors = validateNewBook(dataNewBook);
    if (errors.length > 0) {
      throw new Error(errors.join(" | "));
    }

    const response = await postBook(dataNewBook);
    if (!response.success) {
      throw new Error(response.message || "Error al crear el libro.");
    }

    alert("📚 Libro successfully created.");
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

const updateBook = async (id, dataUpdateBook) => {
  try {
    // validar id y dataUpdateBook
    if (!id) throw new Error("ID inválido");
    const errors = validateUpdateBook(dataUpdateBook);
    if (errors.length > 0) {
      throw new Error(errors.join(" | "));
    }
    const response = await patchBook(id, dataUpdateBook);

    if (!response.success) {
      throw new Error(
        `Error al actualizar el libro: ${response.message}` || "Unknown error"
      );
    }

    alert("✅ Libro actualizado correctamente.");
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

const delBook = async (id) => {
  try {
    const response = await deleteBook(id);
    if (!response.success) {
      throw new Error(
        `Error al eliminar el libro: ${response.message}` || "Unknown error"
      );
    }
    alert("Libro eliminado correctamente");
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

export { loadBooks, addBook, updateBook, delBook };
