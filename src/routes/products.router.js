// import ProductManager from "../dao/manager/filesystem/ProductManager.js"
import ProductsManager from "../dao/manager/db/products.js"
import {Router} from "express"

const router = Router()

/* const PM = new ProductManager()

router.get("/", (req,res) =>{ // Devuelve todos los productos
const limit = parseInt(req.query.limit)
    const products = PM.getProducts()
    if (!limit){
        return res.status(200).json(products) 
    }
    else{
        return res.status(200).json(products.slice(0, parseInt(limit)))
    }
})

router.get("/:pId", (req,res) => { // Devuelve producto con el id buscado
    const {pId} = req.params
    const product = PM.getProductByld(pId)
    return res.status(200).json(product)
})

router.post("/", (req, res) => { // Agrega producto si no existe    
    const product = req.body
    const success = PM.addProduct(product)
    if(success){
        return res.status(201).json(product)
    }
    else{
        return res.status(404).json({ error: "Product already exists" })
    }
    
})

router.put("/:pId", (req, res) =>{ // Actualiza un producto si existe
    const {pId} = req.params
    let product = PM.getProductByld(pId)
    if (product) {
        product = req.body
        PM.updateProduct(pId, product)
        return res.status(200).json(product)
    }
    else{
        return res.status(404).json({ error: "Product not found" })
    }
})

router.delete("/:pId", (req, res) => { // Borra el producto si existe su Id
    const {pId} = req.params
    const product = PM.getProductByld(pId)
    if(product){
        PM.deleteProduct(pId)
        return res.sendStatus(200).json({ success: "Product deleted" })
    }
    else{
        return res.status(404).json({ error: "Product not found" })
    }
}) */

const productsManager = new ProductsManager()

router.get("/", async (req, res) => {
    const products = await productsManager.getProducts()
    res.json({status: "ok", data: products})
})

router.get("/:id", async (req,res) =>{
    const {id} = req.params
    const product = await productsManager.getProduct(id)
    res.json({status: "ok", data: product})
})

router.put("/:id", async (req,res) =>{
    const {title, description, code, price, stock, category, thumbnails} = req.body
    if(!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({status: "error", message: "No data sent!"})
    }
    const {id} = req.params
    const newProduct = req.body
    const updatedProduct = await productsManager.updateProduct(id, newProduct)
    res.json({status: "ok", data: updatedProduct})
})

router.post("/", async (req,res) =>{
    const product = req.body
    const createdProduct = await productsManager.createProduct(product)
    res.status(201).json({status: "ok", data: createdProduct})
})

router.delete("/:id", async (req,res) => {
    const {id} = req.params
    await productsManager.deleteProduct(id)
    res.sendStatus(204)
})

export default router