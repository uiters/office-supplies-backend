const router = require("express").Router();
const requestService = require("../services/request.service");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/isAdmin.middleware");
const {
    getUser,
    getCurrentUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
} = require("../controller/user.controller");

router.get("/", [auth, admin], requestService(getUser));
router.get("/me", auth, requestService(getCurrentUser));
router.get("/userid:id", requestService(getUserById));

router.post("/register", requestService(createUser));
router.post("/userid:id", auth, requestService(updateUser));
router.post("/deleteuser", [auth, admin], requestService(deleteUser));

module.exports = router;
