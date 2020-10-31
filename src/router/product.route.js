const productController = require("../controller/product.controller");
const auth = require("../middleware/auth.middleware");
const router = require("express").Router();
const requestService = require("../services/request.service");

/**
 * @swagger
 *
 * path:
 *  /api/product:
 *      get:
 *          tags:
 *              - "products"
 *          summary: "get all Products"
 *          operationId: "getProduct"
 *          proceduces:
 *          -   "application/json"
 *          parameters: []
 *          responses:
 *              "200":
 *                  description: "success"
 *              "404":
 *                  description: "not found!"
 *              "500":
 *                  description: "DB_Error!"
 *
 *  /api/product/productid/{productId}:
 *      get:
 *          tags:
 *              - "products"
 *          summary: "get product by id"
 *          operationId: "getProductById"
 *          proceduces:
 *          -   "application/json"
 *          parameters:
 *          -   name: "productId"
 *              in: "path"
 *              description: "ID of product to return"
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: "success"
 *              "404":
 *                  description: "not found"
 *              "500":
 *                  description: "server error"
 */

router.get("/", requestService(productController.getAllProducts));

// localhost:3000/api/product/find?keyword='keyword'
router.get("/find", requestService(productController.getProductByKeyword));

// localhost:3000/api/product/producttype?type='keyword'
router.post("/", auth, requestService(productController.createProduct));
router.post("/create_many", auth, requestService(productController.insertMany));
router.delete("/:id", auth, requestService(productController.deleteProductById));

module.exports = router;
// router.get("/productid/:id", requestService(productController.getProductById));
// router.get('/?sort', productController.getProductSort)
// router.get("/producttype", requestService(productController.getProductByType));
