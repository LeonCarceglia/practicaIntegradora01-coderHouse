import Carts from "../src/Carts.js"
import {Router} from "express"

const router = Router()

const cart = new Carts()

router.post("/", (req, res) => { // Agrega un carro vacio
    cart.addCart()
    return res.status(201).json({ success: "Cart created" })
})

router.get ("/:cId", (req, res) => { // Devuelve los productos del carro con el ID especificado
    const { cId } = req.params
    const products = cart.getProductsCart(cId)
    return res.status(200).json(products)
})
router.post("/:cId/product/:pId", (req, res) =>{ // Agrega un producto al carrito con el Id asignado
    const ids = req.params
    const { quantity } = req.body
    cart.addProductCart(ids.cId, ids.pId, quantity)
    return res.status(201).json({ success: "Product added" })
})

export default router