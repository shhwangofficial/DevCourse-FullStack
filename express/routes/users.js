import express from "express";
const router = express.Router();
router.use(express.json());

let db = new Map();
let id = 1;

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
// 개별 회원 조회
router.get("/users/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let user = db.get(id);
  if (user) {
    res.status(200).json({
      userId: user.userId,
      name: user.name,
    });
  } else {
    res.status(401).json({
      message: "회원 정보가 없습니다.",
    });
  }
});
// 개별 회원 탈퇴
router.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let user = db.get(id);
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
