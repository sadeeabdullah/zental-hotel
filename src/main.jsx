import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx
import './index.css'
// import Register from './Pages/AuthRelated/Register.jsx'
// import Navbar from './Components/Navbar.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './Router/Root.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider >
    <RouterProvider router={routes}/>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>,
)
