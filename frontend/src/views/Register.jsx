import { useState } from 'react'
import { Layout } from '../layouts/Layout'
import { setRequestRegister } from '../services/registerServices.js';

const Register = () => { 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState("")

  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    setError("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) {
      setError("Debe ingresar todos los campos")
      // faltan agregar las validaciones
      return
    }
    
    try {
      const dataUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }

      const registerUser = await setRequestRegister(dataUser)
      alert(registerUser.message)
    
      setFormData({
    name: '',
    email: '',
    password: ''
  })
      
    } catch (error) {
      const errMsg =
      error instanceof Error ? error.message : "Unknown error";
      console.log(error)
      setError(errMsg)
      setFormData({
      name: '',
      email: '',
      password: ''
      })
      return {
      success: false,
      message: errMsg,
    };
      
    }

  }
  
  const handleVisibilityPass = () => {
    setShowPass(!showPass)
   }

  return (
    <>
      <Layout>
        <h1>Hola desde Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' value={formData.name} onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input type="email" id='email' value={formData.email} onChange={handleChange} />
          </div>
          <div>
          <label htmlFor="password">Password</label>
            <input type={showPass ? "text": "password" } id='password' value={formData.password} onChange={handleChange} />
          <button type='button' onClick={handleVisibilityPass}>Ver</button>
          </div>
          <button>Registrar</button> 
          {error && <p>{ error }</p>}
        </form>
      </Layout>
    </>
  )
}

export { Register }