import { useEffect, useState } from 'react';
import { Layout } from '../layouts/Layout'
const Home = () => { 
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWVmZTZiOWVhMzBmOGIxOTliNjY3ZiIsIm5hbWUiOiJLcm9hYW0iLCJlbWFpbCI6Imtyb21hczEyM0BnbWFpbC5jb20iLCJpYXQiOjE3NTE2NjEyODIsImV4cCI6MTc1MTY2NzI4Mn0.Jyt1nFonW13zHvtlNwsZagYcxF9605bnUhw5lBOqo3k"
  const URL_API = "http://localhost:1234/api/books";
  const [books, setBooks] = useState([])

  const getBooks = async () => {
    try {
      // const token = localStorage.getItem("token");
      const fetchBooks = await fetch(URL_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await fetchBooks.json()
      if (!response.success) {
        throw new Error(response.message)
      }
      const books = response.data
      setBooks(books)
      console.log(books)
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Unexpected error";
      console.error(errMsg);
      return {
        success: false,
        message: errMsg,
      };
    };
  };

  useEffect(() => {getBooks() }, [])

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
                <p>Apellido: {book.writer.lastName }</p>
              </div>
            ))
          }
        </section>
      </Layout>
      
    </>
  )
}

export { Home }