const productController = require("../controller/product.controller");
const router = require("express").Router();
const requestService = require("../services/request.service");

// router.get('/?sort', productController.getProductSort)
router.get("/productid:id", requestService(productController.getProductById));
router.get("/", requestService(productController.getAllProducts));

// localhost:3000/api/product/productname?name='keyword'
router.get(
    "/productname",
    requestService(productController.getProductByName)
);

// localhost:3000/api/product/producttype?type='keyword'
router.get("/producttype", requestService(productController.getProductByType))

router.post("/", requestService(productController.createProduct));
router.delete("/:id", requestService(productController.deleteProductById));

module.exports = router;
