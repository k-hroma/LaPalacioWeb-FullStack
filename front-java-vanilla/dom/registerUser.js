import { newUser } from "../controllers/userControllers.js";
import { validateDataUser } from "../validations/addUser.js";

const userForm = document.getElementById("user-form");
const handleUserSubmit = async (e) => {
  e.preventDefault();
  try {
    const dataUser = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    const validation = validateDataUser(dataUser);
    if (!validation.success) {
      alert("Errores de validación:\n" + validation.errors.join("\n"));
      return; // Detener si hay errores
    }

    await newUser(dataUser);
    userForm.reset();
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

export { userForm, handleUserSubmit };
