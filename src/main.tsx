import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CookiesProvider } from 'react-cookie'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <noscript>Sorry, you need to enable JavaScript to use this site.</noscript>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>
)