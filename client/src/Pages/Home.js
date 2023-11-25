import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import './style.css'
import axios from 'axios'
function Home() {
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/getProduct')
            .then(res => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch(err => (console.error()))
    }, [])

    const addToCart=(productId)=> {
        console.log(productId)
        axios.post('http://localhost:5000/addToCart', { productId })
            .then(res => {
                console.log(res.data);
                navigate('/cart')
            })
            .catch(err => console.error(err));
    }
    return (
        <div>
            <Navbar />
            <div className="w-100 bg-secondary d-flex justify-content-between text-white">
                <h3 onClick={() => navigate('/addProduct')}>Add product</h3>
                <h3 onClick={() => navigate('/cart')}>Cart</h3>
            </div>
            <div className="body vh-100 bg-primary d-flex justify-content-around flex-wrap ">
                {product.map((value, index) => (
            
                <div className="box  mt-5" key={index}>
                    <div className="top">
                        <img src={`http://localhost:5000/images/${value.image}`} style={{width:"100%",height:"100%"}} alt="" />
                    </div>
                    <div className="bottom text-white ">
                        <h3>Name :{value.name} </h3>
                        <h4>Description : {value.description}</h4>
                        <h5>Price : {value.price}</h5>
                        <button className='form-control btn btn-success' onClick={()=>addToCart(value._id)} >Add to Cart</button>
                    </div>
                </div>
        ))}
            </div>
        </div>
    )
}

export default Home