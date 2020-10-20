const productController = require("../controller/product.controller");
const router = require("express").Router();

// router.get('/?sort', productController.getProductSort)
router.get('/:id', productController.getProductById)
router.get('/', productController.getAllProducts)
router.post('/', productController.createProduct)
router.delete('/:id', productController.deleteProductById)

module.exports = router
