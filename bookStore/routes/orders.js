import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());

router
  .route("/")
  .get(
    // 주문 하기
    (req, res) => {}
  )
  .post(
    // 주문 목록 조회
    (req, res) => {}
  );

// 주문 상세 상품 조회
router.delete("/:id", (req, res) => {});

export default router;
