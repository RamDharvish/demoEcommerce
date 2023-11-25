import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Cart() {
    const [product,setProduct]=useState([])
    const navigate=useNavigate()
    const [count,setCount]=useState(0)

    useEffect(()=> {
     axios.get('http://localhost:5000/getCart')
     .then(res =>setProduct(res.data))
     .catch(err => console.log(err))
    },[])

const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/deleteCart/${id}`)
        .then(() => window.location.reload())
        .catch(err => console.log(err));
};
 const buyProduct=(id)=> {
    axios.get('http://localhost:5000/getCart')
    axios.delete(`http://localhost:5000/deleteCart/${id}`)
        .then(() => window.location.reload())
        .then(alert("item purchased successfully"))
        .then(navigate('/'))
        .catch(err => console.log(err));
 }

  return (
    <div className="">
    <div className='w-100 bg-black d-flex justify-content-center text-white fw-bold '>
        <h1>My Cart</h1>
    </div>
    <div className="body vh-100 bg-primary d-flex justify-content-around flex-wrap ">
                {product.map((value, index) => (
            
                <div className="cartbox  mt-5" key={index}>
                    <div className="top">
                        <img src={`http://localhost:5000/images/${value.image}`} style={{width:"100%",height:"100%"}} alt="" />
                    </div>
                    <div className="bottom text-white ">
                        <h3>Name :{value.name} </h3>
                        <h4>Description : {value.description}</h4>
                        <h5>Price : {value.price} 
                        {/* <span className='ms-2 btn btn-success' >Add</span>
                        <span className='ms-2'>{count}</span>
                        <span className='ms-2 btn btn-danger'>Less</span> */}
                        </h5>
                        <button className='form-control btn btn-success' onClick={()=>buyProduct(value._id)}>Buy</button>
                        <button className='form-control btn btn-danger mt-2' onClick={()=>handleRemove(value._id)} >Remove</button>
                    </div>
                </div>
        ))}
            </div>
    </div>
  )
}

export default Cart