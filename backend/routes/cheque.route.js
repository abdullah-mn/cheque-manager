import express from "express";
import {
  createCheque,
  updateCheque,
} from "../controllers/cheque.controller.js";

const router = express.Router();

router.post("/", createCheque);
router.put("/:id", updateCheque);

export default router;
