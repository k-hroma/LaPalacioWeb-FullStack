const API_LOG = "http://localhost:1234/api/auth/login";

const postLogUser = async (dataLogUser) => {
  try {
    const response = await fetch(API_LOG, {
      method: "POST",
      body: JSON.stringify(dataLogUser),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result);
    if (!result.success) {
      throw new Error(result.message);
    }
    localStorage.setItem("token", result.token);

    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
    return { success: false, message: errMsg };
  }
};

export { postLogUser };
