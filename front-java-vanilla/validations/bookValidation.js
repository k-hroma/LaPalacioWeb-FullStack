const isValidBook = (book) => {
  return (
    book &&
    typeof book.isbn === "number" &&
    typeof book.title === "string" &&
    book.writer &&
    typeof book.writer.firstName === "string" &&
    typeof book.writer.lastName === "string" &&
    typeof book.editorial === "string" &&
    typeof book.price === "number" &&
    typeof book.stock === "number"
  );
};

export { isValidBook };
