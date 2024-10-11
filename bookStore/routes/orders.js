import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {
  order,
  getOrders,
  getOrderDetail,
} from "../controller/OrderController.js";

const router = express.Router();
router.use(express.json());

router
  .route("/")
  .post(
    // 주문 하기
    order
  )
  .get(
    // 주문 목록 조회
    getOrders
  );

// 주문 상세 상품 조회
router.get("/:id", getOrderDetail);

export default router;
