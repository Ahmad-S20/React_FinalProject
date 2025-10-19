import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import theme from './Theme.jsx';
import ThemeContextProvider from './Context/ThemeContext.jsx';
import './i18n.jsx';

createRoot(document.getElementById('root')).render(
  <>
   
      <ThemeContextProvider>
      <ToastContainer/>
      <App />
      </ThemeContextProvider>
  </>
)
