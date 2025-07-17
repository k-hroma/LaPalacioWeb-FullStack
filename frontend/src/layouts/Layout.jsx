
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Layout = ({ children }) => { 
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()
  const handleClose = () => { 
    handleLogout()
    navigate("/")
  }

  return (
    <>
      <header>
        <nav>
        { 
          !user &&
          <div>
            <h1 style={{ color: 'red', fontSize: '2rem' }}>Soy el header</h1>
            <ul>
              <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/'>Home</Link></li>
              <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/register'>Register</Link></li>
              <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/login'>Login</Link></li>
            </ul> 
          </div>
          }
          { user &&
          <div>
            <h1 style={{ color: 'red', fontSize: '2rem' }}>Soy el header</h1>
            <ul>
              <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/'>Home</Link></li>
              <li style={{ color: 'red', fontSize: '1rem' }}><Link to='/dashboard'>Dashboard</Link></li>
              </ul>
              <button type="button" onClick={handleClose}>Cerrar sesión</button>
          </div>
          }
        </nav>
      </header>
      <main>
        <h1 style={{ color: 'red', fontSize: '2rem' }}>Soy el main y tengo los children:</h1>
        { children }
      </main>
      <footer>
        <h1 style={{ color: 'red', fontSize: '2rem' }}>Soy el footer</h1>
      </footer>
    </>
  )

}

export {Layout}