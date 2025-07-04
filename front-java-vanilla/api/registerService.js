const API_URL = "http://localhost:1234/api/auth/register";

const postUser = async (dataUser) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
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

export { postUser };
