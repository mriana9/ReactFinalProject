import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeContextProvider from './context/ThemeContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  </ThemeContextProvider>
)
