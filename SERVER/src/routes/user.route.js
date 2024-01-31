const { Router } = require("express");
const router = Router();

const user = require("../controllers/user.controller");

router.get("/", user.getusers);
router.get("/:id", user.getuser);

router.post("/register", user.createuser);
router.post("/login", user.loginuser);
router.post("/reset", user.resetPassword);

router.post("/cart", user.addToCart);
router.get("/cart/:id", user.getCart);
router.delete("/cart", user.removeCart);

module.exports = router;
