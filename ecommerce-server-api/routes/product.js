const express = require("express");
const { getProducts, storeProducts,deleteProduct, updateProduct } = require("../controller/product");
const { checkAuthentication, isSeller } = require("../middleware/auth");
const router = express.Router()

router.get("/api/products", getProducts)
router.post("/api/products", checkAuthentication, isSeller, storeProducts)
router.delete("/api/products/:id", checkAuthentication, isSeller,deleteProduct )
router.put("/api/products/:id", checkAuthentication, isSeller,updateProduct )

module.exports = router;