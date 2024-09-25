import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
router.use(express.json());

const validation = (req, res, next) => {
  // next를 파라미터로 준다.
  const err = validationResult(req);

  if (err.isEmpty()) {
    next(); // err 비었으면 다음 콜백 실행
  } else {
    return res.status(400).json(err.array());
  }
};

// 로그인
router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("이메일 확인 필요"),
    body("password").notEmpty().isString().withMessage("비밀번호 확인 필요"),
    validation,
  ],
  (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;
    let values = [email];

    conn.query(sql, values, (err, results) => {
      if (err) {
        return res.status(400).end();
      }

      let loginUser = results[0];

      if (loginUser && loginUser.password === password) {
        // token 발급
        const token = jwt.sign(
          {
            email: loginUser.email,
            name: loginUser.name,
          },
          process.env.PRIVATE_KEY, {
            expiresIn: '1m',
            issuer: "shhwang",
          }
        );
        res.cookie("token", token, {
          httpOnly: true,
        }); // 토큰 헤더에 담아 발송

        res.status(200).json({
          message: `${loginUser.name}님, 로그인 되었습니다.`,
        });
      } else {
        res.status(403).json({
          // 접근 불인가 forbidden
          message: "아이디 또는 비밀번호가 틀렸습니다.",
        });
      }
    });
  }
);
// 회원가입
router.post(
  "/join",
  [
    body("email").notEmpty().isEmail().withMessage("이메일 확인 필요"),
    body("name").notEmpty().isString().withMessage("이름 확인 필요"),
    body("password").notEmpty().isString().withMessage("비밀번호 확인 필요"),
    body("contact").notEmpty().isString().withMessage("연락처 확인 필요"),
    validation,
  ],
  (req, res) => {
    const { email, name, password, contact } = req.body;
    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
    let values = [email, name, password, contact];

    conn.query(sql, values, (err, results, fields) => {
      if (err) {
        return res.status(400).end();
      }
      res.status(201).json(results);
    });
  }
);

// 회원 개별 조회
router
  .route("/users")
  .get(
    [body("email").notEmpty().isEmail().withMessage("이메일 필요"), validation],
    (req, res) => {
      let { email } = req.body;
      let sql = `SELECT * FROM users WHERE email = ?`;
      let values = [email];
      conn.query(sql, values, (err, results) => {
        if (err) {
          return res.status(400).end();
        }
        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: "회원 정보가 없습니다.",
          });
        }
      });
    }
  )
  .delete(
    // 회원 개별 삭제
    [body("email").notEmpty().isEmail().withMessage("이메일 필요"), validation],
    (req, res) => {
      let { email } = req.body;
      let sql = `DELETE FROM users WHERE email = ?`;
      let values = [email];
      conn.query(sql, values, (err, results) => {
        if (err) {
          return res.status(400).end();
        }
        if (results.affectedRows) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: "채널 정보를 찾을 수 없습니다.",
          });
        }
      });
    }
  );

export default router;
