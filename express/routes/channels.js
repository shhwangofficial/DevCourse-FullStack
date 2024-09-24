import express from "express";
import conn from "../db.js";
const router = express.Router();
router.use(express.json());

router
  .route("/")
  .get((req, res) => {
    // 채널 전체 조회 (소유주)
    let { userId } = req.body;
    let sql = `SELECT * FROM channels WHERE user_id = ?`;
    let values = userId;
    if (userId) {
      conn.query(sql, values, (err, results) => {
        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: "채널 정보를 찾을 수 없습니다.",
          });
        }
      });
    } else {
      res.status(400).end();
    }
  })
  .post((req, res) => {
    // 채널 개별 생성
    const { name, userId } = req.body;
    if (name && userId) {
      let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
      let values = [name, userId];

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

    let sql = `SELECT * FROM channels WHERE id = ?`;
    let values = [id];

    conn.query(sql, values, (err, results) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "채널 정보를 찾을 수 없습니다.",
        });
      }
    });
  });

export default router;
