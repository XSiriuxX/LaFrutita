const { Router } = require("express");
const router = Router();

const product = require("../controllers/product.controller");

router.get("/", product.getProducts);
router.get("/:id", product.getProduct);
router.post("/", product.postProduct);

module.exports = router;
