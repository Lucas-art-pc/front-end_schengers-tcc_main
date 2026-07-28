import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './router/index.jsx'
import { AuthProvider } from './contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
)
