import express from "express";
import conn from "../db.js";
const router = express.Router();
router.use(express.json());

// 로그인
function Exists(obj) {
  if (Object.keys(loginUser).length) {
    return true;
  } else {
    return false;
  }
}

router.post("/login", (req, res) => {
  const { userId, password } = req.body;
  let loginUser = {};

  db.forEach((user) => {
    if (user.userId === userId) {
      loginUser = user;
    }
  });
  if (Exists(loginUser)) {
    if (loginUser.password === password) {
      res.json({
        message: `${loginUser.name}님, 로그인 되었습니다.`,
      });
    } else {
      res.json({
        message: "틀린 비밀번호입니다.",
      });
    }
  } else {
    res.json({
      message: "없는 아이디입니다.",
    });
  }
});
// 회원가입
router.post("/join", (req, res) => {
  if (req.body != {}) {
    db.set(id++, req.body);
    res.status(201).json({
      message: `${db.get(id - 1).name}님 환영합니다.`,
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

    conn.query(
      `SELECT * FROM users WHERE email = ?`,
      email,
      function (err, results, fields) {
        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: "회원 정보가 없습니다.",
          });
        }
      }
    );
  })
  .delete((req, res) => {
    let { userId } = req.body;

    if (user) {
      db.delete(id);
      res.status(200).json({
        message: `${user.name}님 잘가요.`,
      });
    } else {
      res.status(404).json({
        message: "회원 정보가 없습니다.",
      });
    }
  });

export default router;
