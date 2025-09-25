import { Router } from "express";
import { fetchPrice } from "../controllers/fetchController";

const router = Router();
router.get("/price", fetchPrice);
export default router;
