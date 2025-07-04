import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../views/Home'
import { Register } from '../views/Register'
import { Login } from '../views/Login'
import { Dashboard } from '../views/Dashboard'

const RouterApp = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/dashboard' element={ <Dashboard/> } />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }