import { Link } from "react-router-dom"

const Layout = ({ children }) => { 
  return (
    <>
      <header>
        <h1 style={{ color: 'red', fontSize: '2rem' }}>Soy el header</h1>
        <ul>
          <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/'>Home</Link></li>
          <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/register'>Register</Link></li>
          <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/login'>Login</Link></li>
          <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/dashboard'>Dashboard</Link></li>
        </ul>
      </header>
      <main>
        <h1 style={{ color: 'red', fontSize: '2rem' }}>Soy el main y tengo los children</h1>
        { children }
      </main>
      <footer>
        <h1 style={{ color: 'red', fontSize: '2rem' }}>Soy el footer</h1>
      </footer>
    </>
  )

}

export {Layout}