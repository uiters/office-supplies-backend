const categoryController = require("../controller/category.controller");
const requestService = require("../services/request.service");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");

const router = require("express").Router();

router.get("/", requestService(categoryController.getCategory));

router.post(
    "/",
    [auth, isAdmin],
    requestService(categoryController.createCategory)
);
router.post(
    "/categories",
    requestService(categoryController.createManyCategory)
);

router.put(
    "/:id",
    [auth, isAdmin],
    requestService(categoryController.updateCategory)
);
router.delete(
    "/:id",
    [auth, isAdmin],
    requestService(categoryController.deleteCategory)
);

module.exports = router;
