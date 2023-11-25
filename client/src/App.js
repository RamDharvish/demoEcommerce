import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddProduct from './Pages/AddProduct'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/addProduct' element={<AddProduct/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App