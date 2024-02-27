const { Router } = require("express");
const router = Router();

const cart = require("../controllers/cart.controller");

router.post("/", cart.getCart);
router.post("/createtoken", cart.gettemptoken);
router.post("/addproduct", cart.addcart);
router.delete("/:id", cart.removecart);

module.exports = router;
