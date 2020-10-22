const typeController = require("../controller/type.controller");
const requestService = require("../services/request.service");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const router = require("express").Router();

router.get("/", requestService(typeController.getType));
router.post("/", [auth, isAdmin], requestService(typeController.createType));
router.post("/:id", [auth, isAdmin], requestService(typeController.updateType));
router.delete(
    "/:id",
    [auth, isAdmin],
    requestService(typeController.deleteType)
);

module.exports = router;
