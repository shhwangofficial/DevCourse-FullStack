import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());

// 회원가입
router.post("/join", (req, res) => {});
// 로그인
router.post("/login", (req, res) => {});

router
  .route("/reset")
  .post(
    // 비밀번호 초기화 요청
    (req, res) => {}
  )
  .put(
    // 비밀번호
    (req, res) => {}
  );

export default router;
