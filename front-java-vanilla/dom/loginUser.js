import { loginUser } from "../controllers/loginControllers.js";

const logForm = document.getElementById("logForm");
// !Colectivo53
const handleLogSubmit = async (e) => {
  e.preventDefault();
  try {
    const dataUserLog = {
      email: document.getElementById("logEmail").value,
      password: document.getElementById("logPass").value,
    };
    // validar la data

    await loginUser(dataUserLog);
    logForm.reset();
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
  }
};

export { logForm, handleLogSubmit };
