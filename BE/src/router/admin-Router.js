const router = require("express").Router();
const adminController = require("../controllers/admin-controller");

const verifyToken = require("../middleware/verifyToken-Middleware");

router.get("/", verifyToken, adminController.getIndex)

module.exports = router;