// crear y usar un contexto
import { createContext, useContext, useState } from "react"; 
// npm install jwt-decode
import { jwtDecode } from "jwt-decode"


// creo un contexto
const AuthContext = createContext()

// funcion que va a proveer un token/usuario (es de alcance global)
// el children es para poder envlver mi RouterApp
const AuthProvider = ({ children }) => {
  // token
  const [token, setToken] = useState(null)
  // usuario
  const [user, setUser] = useState(null)

  // handleToken->guarda el token
  const handleToken = (token) => { 
    if (token !== undefined) {
    localStorage.setItem("token", token);
    }
    setToken(token)
    setUser(jwtDecode(token))
  }
  console.log(token, user)

  const handleLogout = () => { 
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    alert("Sesión cerrada")
  }

  return (
    <AuthContext.Provider value={{user, handleToken, handleLogout}}>
      { children }
    </AuthContext.Provider>
  )
 }


// custom hook: es por donde accedo a los elementos que voy a facilitar desde el contexto
const useAuth = () => useContext(AuthContext)


export { useAuth, AuthProvider }