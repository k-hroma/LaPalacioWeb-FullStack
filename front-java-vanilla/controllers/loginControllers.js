import { postLogUser } from "../api/loginService.js";
import { loadBooks } from "./bookControllers.js";

const loginUser = async (dataLogUser) => {
  try {
    // validar la dataLogUser
    const response = await postLogUser(dataLogUser);
    console.log(response);
    if (!response.success) {
      throw new Error(response.message);
    }
    alert(response.message);
    await loadBooks();
    return;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
    return { success: false, message: errMsg };
  }
};

export { loginUser };
