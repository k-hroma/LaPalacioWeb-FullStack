import { useState } from 'react'
import { Layout } from '../layouts/Layout'
import { setRequest } from '../services/loginServices.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const Login = () => { 
  const { handleToken } = useAuth()

  const [error, setError] = useState("")  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPass, setShowPass] = useState(false)

  const handleVisibilityPass = () => {
    setShowPass(!showPass)
   }
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const dataLogUser = {
        email: formData.email,
        password: formData.password
      }

      // validaciones
      const loginResponse = await setRequest(dataLogUser)
      alert(loginResponse.message)
      handleToken(loginResponse.token)
      navigate("/dashboard")

      
      setFormData({email: "", password: ""})
         
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      console.error(errMsg);
      setError(errMsg)
      
    }
   }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    setError("")
   }


  return (
    <>
      <Layout>
        <h1>Hola desde Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input type={showPass ? "text" : "password"} id='password' value={formData.password} onChange={handleChange} />
          <button type='button' onClick={handleVisibilityPass}>Ver contraseña</button>
          <button type='submit'>Login</button>
          {error && <p>{ error }</p>}
        </form>
      </Layout>
    </>
  )
}

export {Login} 