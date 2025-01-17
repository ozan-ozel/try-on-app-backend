import express from "express";
import multer from "multer";
import { executeTryOn } from "../controllers/tryOnController.js";
import authHandler from "../middlewares/authHandler.js";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Define the /init route
router.post(
  "/execute",
  authHandler.verifyToken,
  upload.single("file"),
  executeTryOn
);

export default router;
