const express = require("express");
const { getProducts, storeProducts } = require("../controller/product");
const { checkAuthentication, isSeller } = require("../middleware/auth");
const router = express.Router()

router.get("/api/products", getProducts)
router.post("/api/products", checkAuthentication, isSeller, storeProducts)

module.exports = router;