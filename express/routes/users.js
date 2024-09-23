import express from "express";
import conn from "../db.js";
const router = express.Router();
router.use(express.json());

// 로그인
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?`;
  let values = [email];

  conn.query(sql, values, (err, results) => {
    let loginUser = results[0];

    if (loginUser && loginUser.password === password) {
      res.status(200).json({
        message: `${loginUser.name}님, 로그인 되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: "아이디 또는 비밀번호가 틀렸습니다.",
      });
    }
  });
});
// 회원가입
router.post("/join", (req, res) => {
  if (req.body != {}) {
    const { email, name, password, contact } = req.body;
    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
    let values = [email, name, password, contact];

    conn.query(sql, values, (err, results, fields) => {
      res.status(201).json(results);
    });
  } else {
    res.status(400).json({
      message: "입력 값을 확인하세요",
    });
  }
});

router
  .route("/users")
  .get((req, res) => {
    let { email } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;
    let values = [email];
    conn.query(sql, values, (err, results) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "회원 정보가 없습니다.",
        });
      }
    });
  })
  .delete((req, res) => {
    let { email } = req.body;
    let sql = `DELETE FROM users WHERE email = ?`;
    let values = [email];
    conn.query(sql, values, (err, results) => {
      res.status(200).json(results);
    });
  });

export default router;
