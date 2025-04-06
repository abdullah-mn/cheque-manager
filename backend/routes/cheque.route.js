import express from "express";
import {
  createCheque,
  deleteCheque,
  fetchAllCheque,
  searchCheque,
  updateCheque,
} from "../controllers/cheque.controller.js";

const router = express.Router();

router.post("/", createCheque);
router.put("/:id", updateCheque);
router.delete("/:id", deleteCheque);
router.get("/", fetchAllCheque);

router.get("/search?", searchCheque);

export default router;
