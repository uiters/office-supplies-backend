const addressController = require("../controller/address.controller");
const auth = require("../middleware/auth.middleware");
const requestService = require("../services/request.service");

const router = require("express").Router();

// localhost:3000/api/address/getaddress

router.get("/", auth, requestService(addressController.getAddress));

router.post("/", auth, requestService(addressController.createAddress));

router.put(
    "/update_address/:id",
    auth,
    requestService(addressController.updateAddress)
);

router.delete(
    "/remove_address/:id",
    auth,
    requestService(addressController.deleteAddress)
);

module.exports = router;
