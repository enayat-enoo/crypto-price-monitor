import { Router } from "express";
import { createAlert } from "../controllers/alertController";

const router = Router();
router.post("/", createAlert);

export default router;
