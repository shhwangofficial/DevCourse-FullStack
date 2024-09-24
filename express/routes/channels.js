import express from "express";
import conn from "../db.js";
import { body, param, validationResult } from "express-validator";
const router = express.Router();
router.use(express.json());

router
  .route("/")
  .get(
    [body("userId").notEmpty().isInt().withMessage("숫자 입력 필요")],
    (req, res) => {
      // 채널 전체 조회 (소유주)
      const err = validationResult(req);

      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }

      let { userId } = req.body;
      let sql = `SELECT * FROM channels WHERE user_id = ?`;
      let values = userId;

      conn.query(sql, values, (err, results) => {
        if (err) {
          // 유효성 검사는 ok이지만, 틀린 SQL이어서 에러가 나면 여기로
          return res.status(400).end();
        }

        if (results.length) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: "채널 정보를 찾을 수 없습니다.",
          });
        }
      });
    }
  )
  .post(
    // 채널 개별 생성
    [
      // 배열을 post의 첫 파라미터로 넣어준다.
      body("userId") // body 메소드는 req.body에서 해당 프로퍼티를 찾는다
        .notEmpty() // not empty 이어야하고
        .isInt() // int형이어야한다.
        .withMessage("userId는 숫자이어야합니다."), // 그렇지 못한 경우, validationResult(req)에 이런 메세지가 들어간 에러json이 들어간다.
      body("name")
        .notEmpty()
        .isString()
        .withMessage("name은 문자열이어야합니다."),
    ],
    (req, res) => {
      // 두번째 파라미터에 비로소 친숙한 콜백함수
      const err = validationResult(req);

      if (!err.isEmpty()) {
        // 위에서 규정한 유효성 검사에 탈락하면 err에는 무언가가 담긴다.
        return res.status(400).json(err.array()); // 에러 배열 출력
      }

      const { name, userId } = req.body;
      // if (name && userId) {  // 더이상 필요없는 if문으로 유효성 검사하기
      let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
      let values = [name, userId];

      conn.query(sql, values, (err, results, fields) => {
        if (err) {
          // 유효성 검사는 ok이지만, 틀린 SQL이어서 에러가 나면 여기로
          return res.status(400).end();
        }
        res.status(201).json(results);
      });
      // }
    }
  );

router
  .route("/:id")
  .put(
    [
      param("id").notEmpty().withMessage("체널아이디 입력 필요"),
      body("name").notEmpty().isString().withMessage("채널명 오류"),
    ],
    (req, res) => {
      // 채널 개별 수정
      const err = validationResult(req);

      if (!err.isEmpty()) {
        // 위에서 규정한 유효성 검사에 탈락하면 err에는 무언가가 담긴다.
        return res.status(400).json(err.array()); // 에러 배열 출력
      }

      let { id } = req.params;
      id = parseInt(id);
      let { name } = req.body;
      let sql = `UPDATE channels set name = ? WHERE id = ?`;
      let values = [name, id];

      conn.query(sql, values, (err, results) => {
        // UPDATE 쿼리의 경우 results는 업데이트된 레코드의 정보를 반환하는 대신 영향을 받은 행(row)의 수를 포함한 객체를 반환.
        if (err) {
          // 유효성 검사는 ok이지만, 틀린 SQL이어서 에러가 나면 여기로
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
  )
  .delete([param("id").notEmpty().withMessage("id 입력 필요")], (req, res) => {
    // 채널 개별 삭제
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json(err.array());
    }

    let { id } = req.params;
    id = parseInt(id);

    let sql = `DELETE FROM channels where id = ?`;
    let values = [id];
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
  })
  .get(
    [param("id").notEmpty().withMessage("체널아이디 입력 필요")],
    (req, res) => {
      // 채널 개별 조회
      const err = validationResult(req);

      if (!err.isEmpty()) {
        // 위에서 규정한 유효성 검사에 탈락하면 err에는 무언가가 담긴다.
        return res.status(400).json(err.array()); // 에러 배열 출력
      }

      let { id } = req.params;
      id = parseInt(id);

      let sql = `SELECT * FROM channels WHERE id = ?`;
      let values = [id];

      conn.query(sql, values, (err, results) => {
        if (err) {
          // 유효성 검사는 ok이지만, 틀린 SQL이어서 에러가 나면 여기로
          return res.status(400).end();
        }
        if (results.length) {
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
