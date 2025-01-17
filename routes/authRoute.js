import authController from "../controllers/authController.js";
import authValidator from "../validators/authValidator.js";

import express from "express";

const router = express.Router();

// Define routes and map them to controller methods
router.post("/", authValidator.validatePassCode, authController.authenticate);
router.post("/reset", authValidator.validatePassCode, authController.reset);

export default router;