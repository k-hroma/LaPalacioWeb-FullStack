const URL_API = "http://localhost:1234/api/books";

const getBooks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(URL_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      throw new Error(result.message || "Unknown error");
    }
    const books = result.data;
    return books;
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

const postBook = async (book) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(book),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unknown error");
    }
    return result;
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

const patchBook = async (id, dataBook) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${URL_API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataBook),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Unknown error");
    }
    return result;
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

const deleteBook = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${URL_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Unknown error");
    }
    console.log(result);
    return result;
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

export { getBooks, postBook, patchBook, deleteBook };
