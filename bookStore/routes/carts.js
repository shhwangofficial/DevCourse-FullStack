import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {
  addToCart,
  getCartItems,
  removeCartItem,
} from "../controller/CartController.js";
const router = express.Router();
router.use(express.json());

router
  .route("/")
  .post(
    // 장바구니로 담기
    addToCart
  )
  .get(
    // 장바구니 아이템 목록 조회 + 장바구니에서 주문서 작성하기
    getCartItems
  );

// 장바구니에서 삭제
router.delete("/:id", removeCartItem);

export default router;
