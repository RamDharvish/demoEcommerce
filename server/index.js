const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const userModel = require('./models/user')
const path = require('path')
const cartModel = require('./models/cart')
const app = express()

app.use('/images', express.static(path.join(__dirname, './Images')));
app.use(express.json())
app.use(cors())



mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(console.log("DB connected"))
    .catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" +Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})



app.post('/addProduct', upload.single('file'), (req, res) => {
    const { name, description, price } = req.body
    const { filename } = req.file
    userModel.create({
        name: name,
        description: description,
        price: price,
        image: filename
    })
        .then(result =>res.json(result))
        .catch(err =>res.json(err))
})

app.get('/getProduct',(req,res)=> {
    userModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/addToCart', (req, res) => {
    const { productId } = req.body;
    userModel.findById(productId)
        .then(product => {
            
            cartModel.create({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image
            })
                .then(cartItem => res.json(cartItem))
                .catch(err => res.json(err));
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
app.get('/getCart',(req,res)=> {
    cartModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/deleteCart/:id',(req,res)=> {
    const {id}=req.params
    cartModel.findByIdAndDelete({_id:id})
    .then(result =>res.json(result))
    .catch(err =>res.json(err))
})

app.listen(5000, () => console.log("server is running on 5000"))