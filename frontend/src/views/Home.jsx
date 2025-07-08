import { useEffect, useState } from 'react';
import { Layout } from '../layouts/Layout'
import { getRequest, deleteRequest, patchRequest } from '../services/booksServices.js';
import { useAuth } from '../context/AuthContext.jsx';
const Home = () => { 
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [error, setError] = useState("")

  const getBooks = async () => {
    try {
      const books = await getRequest()
      setBooks(books)

    } catch (error) {
      const errMsg =
      error instanceof Error ? error.message : "Unexpected error";
      console.error(errMsg);
      setError(errMsg)
    };
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("¿Estás seguro de borrar el producto?");
    if (!confirmed) return;
    try {
      const resDeleteBook = await deleteRequest(id)
      if (!resDeleteBook.success) {
        alert("Error: libro no borrado")
        return
      } else {
        alert(resDeleteBook.message)
        await getBooks()
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      console.error(errMsg); 
    }
  }
  
  const handleUpdate = (dataBook, id) => {

   }

  useEffect(() => { getBooks() }, [])

  return (
    <>
      <Layout>
        <h1>Hola desde Home como children</h1>
        <section>
          { 
            books.map(book => (
              <div key={book._id}>
                <p>ISBN: {book.isbn}</p>
                <p>Título: {book.title}</p>
                <p>Apellido: {book.writer.lastName}</p>
                {user &&
                  <div>
                    <button type='button' onClick={handleUpdate}>Update</button>
                    <button type='button' onClick={() => handleDelete(book._id)}>Delete</button>
                  </div>}
              </div>
            ))
          }
          {error && <p>{ error }</p>}
        </section>
      </Layout>
      
    </>
  )
}

export { Home }