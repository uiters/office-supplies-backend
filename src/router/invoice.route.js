const invoiceController = require("../controller/invoice.controller");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const requestService = require("../services/request.service");
const router = require("express").Router();

router.get("/", [auth, isAdmin], requestService(invoiceController.getAllInvoices));
router.get("/by_userid/:id", auth, requestService(invoiceController.getInvoiceBy));
router.post("/", auth, requestService(invoiceController.createInvoice));

module.exports = router;
