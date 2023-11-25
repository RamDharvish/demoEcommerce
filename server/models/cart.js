const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String
})
const cartModel=mongoose.model('cart',cartSchema)

module.exports=cartModel