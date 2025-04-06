import express from "express";
import {
  createCheque,
  deleteCheque,
  updateCheque,
} from "../controllers/cheque.controller.js";

const router = express.Router();

router.post("/", createCheque);
router.put("/:id", updateCheque);
router.delete("/:id", deleteCheque);

export default router;
