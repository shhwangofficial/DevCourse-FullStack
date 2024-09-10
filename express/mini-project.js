import express, { json } from "express";
const app = express();
const port = 3000;

app.listen(port);
app.use(express.json());

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

app.post("/login", (req, res) => {
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
app.post("/join", (req, res) => {
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
app.get("/users/:id", (req, res) => {
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
app.delete("/users/:id", (req, res) => {
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

// db = new Map();
// id = 1;

app
  .route("/channels")
  .get((req, res) => {
    // 채널 전체 조회
    if (db.size) {
      let channels = [];
      db.forEach((val, key) => {
        channels.push(val);
      });
      res.status(200).json(channels);
    } else {
      res.status(404).json({
        message: "조회할 채널이 없습니다.",
      });
    }
  })
  .post((req, res) => {
    // 채널 개별 생성
    if (req.body.channelTitle) {
      db.set(id++, req.body);
      res.status(201).json({
        message: `${db.get(id - 1).channelTitle}채널을 응원합니다.`,
      });
    } else {
      res.status(400).json({
        message: "요청을 제대로 보내주세요.",
      });
    }
  });

app
  .route("/channels/:id")
  .put((req, res) => {
    // 채널 개별 수정
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);
    let oldTitle = channel.channelTitle;

    if (channel) {
      const newTitle = req.body.channelTitle;
      db.set(id, channel);
      res.status(200).json({
        message: `${oldTitle}에서 ${newTitle}로 정상적으로 수정 되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: "채널 정보를 찾을 수 없습니다.",
      });
    }
  })
  .delete((req, res) => {
    // 채널 개별 삭제
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);
    if (channel) {
      db.delete(id);
      res.status(200).json({
        message: `${channel.channelTitle}이 정상적으로 삭제되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: "채널 정보를 찾을 수 없습니다.",
      });
    }
  })
  .get((req, res) => {
    // 채널 개별 조회
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);
    if (channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({
        message: "채널 정보를 찾을 수 없습니다.",
      });
    }
  });
