import cartModel from "../../models/cart.js"

export default class CartsManager{

    getCarts = () =>{
        return cartModel.find().lean()
    }

    getCart = (id) =>{
        return cartModel.findById(id)
    }

    createCart = (Cart) =>{
        return cartModel.create(Cart)
    }

    updateCart = (id, Cart) =>{
        return cartModel.findByIdAndUpdate(id, Cart)
    }

    deleteCart = (id) =>{
        return cartModel.findByIdAndDelete(id)
    }

    addProduct = (idCart, idProduct, quantity) =>{
        return cartModel.getCart(idCart) = {$push: {_id: idProduct, quantity}}
    }
}