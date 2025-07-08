const URL_API = "http://localhost:1234/api/books";

const getRequest = async () => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   throw new Error("No token found in localStorage");
    // }

    const fetchBooks = await fetch(URL_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    const response = await fetchBooks.json();

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch books");
    }

    return response.data;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
    return {
      success: false,
      message: errMsg,
    };
  }
};

const setRequestBooks = async (newDataBook) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await fetch(URL_API, {
      method: "POST",
      body: JSON.stringify(newDataBook),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unexpected error");
    }

    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
    return {
      success: false,
      message: errMsg,
    };
  }
};

const deleteRequest = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    const response = await fetch(`${URL_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Unexpected error");
    }
    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
    return {
      success: false,
      message: errMsg,
    };
  }
};

const patchRequest = async (dataBook, id) => {};

export { getRequest, setRequestBooks, deleteRequest, patchRequest };
