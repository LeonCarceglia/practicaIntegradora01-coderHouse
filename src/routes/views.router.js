import express from "express"
const router = express.Router()

router.get("/chat", (req, res) => {
  res.render("chat", {})
})


export default router
