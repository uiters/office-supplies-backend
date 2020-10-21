const router = require("express").Router();
const message = require("../constants/response.const");
const responseService = require("../services/response.service");
const requestService = require("../services/request.service");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/isAdmin.middleware");
const { User } = require("../mongoose/models/user.mongoose.model");
const {
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controller/user.controller");

router.get("/", [auth, admin], requestService(getUser));
router.get("/me", auth, requestService(getCurrentUser));

router.post("/register", requestService(createUser));

router.put("/:id", auth, requestService(updateUser));
router.put("/deleteuser", [auth, admin], requestService(deleteUser));



module.exports = router;
