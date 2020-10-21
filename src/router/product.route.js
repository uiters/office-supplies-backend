const productController = require("../controller/product.controller");
const router = require("express").Router();
const requestService = require("../services/request.service");

// router.get('/?sort', productController.getProductSort)
router.get("/:id", requestService(productController.getProductById));
router.get("/", requestService(productController.getAllProducts));
router.post("/", requestService(productController.createProduct));
router.delete("/:id", requestService(productController.deleteProductById));

module.exports = router;
