import express from "express";
import {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} from "../controller/UserController.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();
router.use(express.json());

// 회원가입
router.post("/join", join);
// 로그인
router.post("/login", login);

router
  .route("/reset")
  .post(
    // 비밀번호 초기화 요청
    passwordResetRequest
  )
  .put(
    // 비밀번호
    passwordReset
  );

export default router;
