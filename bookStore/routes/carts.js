import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());

router
  .route("/")
  .post(
    // 장바구니 담기
    (req, res) => {}
  )
  .get(
    // 장바구니 조회
    (req, res) => {}
  );

// 장바구니 도서 삭제
router.delete("/:id", (req, res) => {});

// 장바구니에서 주문서 작성하기
// router.get("/????", (req, res) => {});

export default router;
