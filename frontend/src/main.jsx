import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './routers/RouterApp'
import { AuthProvider } from './context/AuthContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterApp/>
    </AuthProvider>
  </StrictMode>,
)
