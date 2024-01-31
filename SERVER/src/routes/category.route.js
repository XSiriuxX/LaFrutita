const { Router } = require("express");
const router = Router();

const category = require("../controllers/category.controller");

router.get("/", category.getCategories);

module.exports = router;
