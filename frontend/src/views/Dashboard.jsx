import { useState } from 'react'
import { Layout } from '../layouts/Layout'
import '../styles/dashboard.css'
import { setRequestBooks } from '../services/booksServices.js'
const Dashboard = () => { 

  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    firstName: "",
    lastName: "",
    editorial: "",
    price: "",
    stock:""
  })

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newDataBook = {
        isbn: Number(formData.isbn),
        title: formData.title, 
        writer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        editorial: formData.editorial,
        price: Number(formData.price),
        stock: Number(formData.stock),
      }

      const resNewBook = await setRequestBooks(newDataBook)
      alert(resNewBook.message)
      setFormData({
        isbn: "",
        title: "",
        firstName: "",
        lastName: "",
        editorial: "",
        price: "",
        stock:""
      })
      
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      console.error(errMsg);
      alert(errMsg)
    }
  }
  
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    });
    
    setError("")
   }

  return (
    <>
      <Layout>
        <h1>Hola desde Dashboard</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="isbn">ISBN</label>
          <input type="text" id='isbn' value={formData.isbn} onChange={handleChange} />
          <label htmlFor="title">Title</label>
          <input type="text" id='title' value={formData.title} onChange={handleChange} />
          <label htmlFor="firstName">First Name</label>
          <input type="text" id='firstName' value={formData.firstName} onChange={handleChange} />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id='lastName' value={formData.lastName} onChange={handleChange}/>
          <label htmlFor="editorial">Editorial</label>
          <input type="text" id='editorial' value={formData.editorial} onChange={handleChange} />
          <label htmlFor="price">Price</label>
          <input type="text" id='price' value={formData.price} onChange={handleChange} />
          <label htmlFor="stock">Stock</label>
          <input type="text" id='stock' value={formData.stock}  onChange={handleChange}/>
          <button>Agregar Libro</button>
        </form>
      </Layout>
    </>
  )
}

export { Dashboard }