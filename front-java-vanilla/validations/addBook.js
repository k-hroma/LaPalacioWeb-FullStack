const validateNewBook = (book) => {
  const errors = [];

  if (typeof book.isbn !== "number" || isNaN(book.isbn)) {
    errors.push("ISBN debe ser un número válido.");
  }

  if (typeof book.title !== "string" || book.title.trim().length === 0) {
    errors.push("El título es obligatorio.");
  }

  if (
    !book.writer ||
    typeof book.writer.firstName !== "string" ||
    book.writer.firstName.trim().length === 0
  ) {
    errors.push("El nombre del autor es obligatorio.");
  }

  if (
    !book.writer ||
    typeof book.writer.lastName !== "string" ||
    book.writer.lastName.trim().length === 0
  ) {
    errors.push("El apellido del autor es obligatorio.");
  }

  if (
    typeof book.editorial !== "string" ||
    book.editorial.trim().length === 0
  ) {
    errors.push("La editorial es obligatoria.");
  }

  if (typeof book.price !== "number" || book.price < 0) {
    errors.push("El precio debe ser un número mayor o igual a 0.");
  }

  if (
    typeof book.stock !== "number" ||
    !Number.isInteger(book.stock) ||
    book.stock < 0
  ) {
    errors.push("El stock debe ser un número entero mayor o igual a 0.");
  }

  return errors;
};

export { validateNewBook };
