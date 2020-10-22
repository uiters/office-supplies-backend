const categoryController = require("../controller/category.controller");
const requestService = require("../services/request.service");

const router = require("express").Router();

router.get("/", requestService(categoryController.getCategory));

router.post("/", requestService(categoryController.createCategory));
router.post(
    "/categories",
    requestService(categoryController.createManyCategory)
);

router.put("/:id", requestService(categoryController.updateCategory));
router.delete("/:id", requestService(categoryController.deleteCategory));

module.exports = router;
