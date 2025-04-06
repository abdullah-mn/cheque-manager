import express from "express";
import { createCheque } from "../controllers/cheque.controller.js";

const router = express.Router();

router.post("/", createCheque);

export default router;
