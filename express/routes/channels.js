import express from "express";
const router = express.Router();
router.use(express.json());

let db = new Map();
let id = 1;

router
  .route("/")
  .get((req, res) => {
    // 채널 전체 조회
    if (db.size) {
      let channels = [];
      let { userId } = req.body;
      if (userId) {
        db.forEach((val, key) => {
          if (val.userId === userId) channels.push(val);
        });
        if (channels.length) {
          res.status(200).json(channels);
        } else {
          res.status(404).json({
            message: "조회할 채널이 없습니다.",
          });
        }
      } else {
        res.status(404).json({
          message: "로그인이 필요합니다.",
        });
      }
    } else {
      res.status(404).json({
        message: "조회할 채널이 없습니다.",
      });
    }
  })
  .post((req, res) => {
    // 채널 개별 생성
    if (req.body.channelTitle) {
      let channel = req.body;
      db.set(id++, channel);
      res.status(201).json({
        message: `${db.get(id - 1).channelTitle}채널을 응원합니다.`,
      });
    } else {
      res.status(400).json({
        message: "요청을 제대로 보내주세요.",
      });
    }
  });

router
  .route("/:id")
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

export default router;
