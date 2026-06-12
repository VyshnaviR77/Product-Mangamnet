import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import ProductDetails from './Product/ProductDetails'
import { ToastContainer } from 'react-toastify'
import EditProduct from './Product/EditProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/edit-product/:id" element={<EditProduct />}/>


      </Routes>


    </>
  )
}

export default App
