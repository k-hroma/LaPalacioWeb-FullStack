import { postUser } from "../api/registerService.js";

const newUser = async (dataUser) => {
  try {
    const result = await postUser(dataUser);
    if (!result.success) {
      throw new Error(result.message || "Unknown error");
    }
    console.log(result.message);
    alert("User successfully created.");
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

export { newUser };
