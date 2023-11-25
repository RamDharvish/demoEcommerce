import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddProduct() {
    const [name,setName]=useState()
    const [description,setDescription] =useState()
    const [price,setPrice]=useState()
    const [image,setImage]=useState()
    const navigate=useNavigate()
    const handleAddProduct=(e)=> {
        e.preventDefault()
        const formData=new FormData()
        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("file",image)
        axios.post('http://localhost:5000/addProduct',formData)
        .then(res =>console.log(res))
        .then(navigate('/'))
        .catch(err =>console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center '>
        <div className="bg-white w-50 p-3">
            <form onSubmit={handleAddProduct}>
               <div className="mt-2">
               <label>Product Name</label>
                <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
               </div>

               <div className="mt-2">
               <label>Product Description</label>
                <input type="text" className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
               </div>

               <div className="mt-2">
               <label>Product Price</label>
                <input type="text" className='form-control' onChange={(e)=>setPrice(e.target.value)}/>
               </div>
                
               <div className="mt-2">
               <label>Product Image</label>
                <input type="file" className='form-control'  onChange={(e)=>setImage(e.target.files[0])}/>
               </div>
                <button type='submit' className='btn btn-success form-control mt-3'>Submit</button>
            </form>
            <button  className='btn btn-warning form-control mt-3' onClick={()=>navigate('/')}>Back</button>
        </div>

    </div>
  )
}

export default AddProduct