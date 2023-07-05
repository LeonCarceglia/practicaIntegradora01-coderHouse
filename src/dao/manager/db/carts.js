import cartModel from "../../models/cart.js"

export default class cartsManager{

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

}