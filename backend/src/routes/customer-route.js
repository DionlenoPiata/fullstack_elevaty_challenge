"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/customer-controller");

router.get("/customers", controller.get);
router.get("/customers/:id", controller.getById);
router.post("/customers", controller.post);
router.put("/customers/:id", controller.put);
router.delete("/customers/:id", controller.delete);

module.exports = router;
