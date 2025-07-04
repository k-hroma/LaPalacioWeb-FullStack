const validateUpdateBook = (book) => {
  const errors = [];

  if ("isbn" in book && (typeof book.isbn !== "number" || isNaN(book.isbn))) {
    errors.push("ISBN debe ser un número válido.");
  }

  if (
    "title" in book &&
    (typeof book.title !== "string" || book.title.trim().length === 0)
  ) {
    errors.push("El título no puede estar vacío.");
  }

  if ("writer" in book) {
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
  }

  if (
    "editorial" in book &&
    (typeof book.editorial !== "string" || book.editorial.trim().length === 0)
  ) {
    errors.push("La editorial no puede estar vacía.");
  }

  if ("price" in book && (typeof book.price !== "number" || book.price < 0)) {
    errors.push("El precio debe ser un número mayor o igual a 0.");
  }

  if (
    "stock" in book &&
    (typeof book.stock !== "number" ||
      !Number.isInteger(book.stock) ||
      book.stock < 0)
  ) {
    errors.push("El stock debe ser un número entero mayor o igual a 0.");
  }

  return errors;
};

export { validateUpdateBook };
