import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'  // ← app.jsx로 수정
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
