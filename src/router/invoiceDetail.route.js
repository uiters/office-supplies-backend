const router = require("express").Router();
const invoiceDetailController = require("../controller/invoice-detail.controller");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const requestService = require("../services/request.service");

router.get("/:id", auth, requestService(invoiceDetailController.getInvoiceDetailById));
router.post("/", auth, requestService(invoiceDetailController.createInvoiceDetail));

module.exports = router