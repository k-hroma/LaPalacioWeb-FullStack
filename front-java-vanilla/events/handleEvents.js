import { bookForm, handleSubmit } from "../dom/createElements.js";
import { logForm, handleLogSubmit } from "../dom/loginUser.js";
import { handleUserSubmit, userForm } from "../dom/registerUser.js";

const initEventsListeners = async () => {
  bookForm.addEventListener("submit", handleSubmit);
  userForm.addEventListener("submit", handleUserSubmit);
  logForm.addEventListener("submit", handleLogSubmit);
};

export { initEventsListeners };
