const express = require("express");
const { checkAuthentication, isBuyer } = require("../middleware/auth");
const { createOrder, getOrder } = require("../controller/order");
const router = express.Router()

router.get("/api/orders",checkAuthentication,isBuyer, getOrder)
router.post("/api/orders",checkAuthentication,isBuyer, createOrder)

module.exports = router;