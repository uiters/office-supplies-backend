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
router.get("/userid/:id", [auth, admin], requestService(getUserById));

router.post("/register", requestService(createUser));
router.post("/update_user/", auth, requestService(updateUser));

router.delete("/deleteuser/:id", [auth, admin], requestService(deleteUser));

module.exports = router;
