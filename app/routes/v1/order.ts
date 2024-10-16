import express, { Router } from "express";
import {
  createOrder,
  getSpecificOrder,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from "../../controllers/order";
import { protect, admin } from "../../middlewares/authMiddleware";

export const router: Router = express.Router();

router.post("/", protect, createOrder);

router.get("/all", protect, admin, getOrders);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getSpecificOrder);

router.put("/:id/pay", protect, updateOrderToPaid);