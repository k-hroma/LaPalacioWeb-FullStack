const validateDataUser = ({ name, email, password }) => {
  const errors = [];

  // Nombre
  if (!name || name.trim() === "") {
    errors.push("El nombre es obligatorio.");
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Debe ser un email válido.");
  }

  // Contraseña
  if (!password || password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una letra mayúscula.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("La contraseña debe contener al menos un número.");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("La contraseña debe contener al menos un carácter especial.");
  }
  if (/\s/.test(password)) {
    errors.push("La contraseña no debe contener espacios.");
  }

  return {
    success: errors.length === 0,
    errors,
  };
};

export { validateDataUser };
