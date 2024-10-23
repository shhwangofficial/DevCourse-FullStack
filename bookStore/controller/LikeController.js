import conn from "../db.js";
import ensureAuthority from "../auth.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const addLike = (req, res) => {
  const book_id = req.params.id;

  let decodedJwt = ensureAuthority(req, res);
  if (decodedJwt instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 세션이 만료되었습니다." });
  } else if (decodedJwt instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "잘못된 토큰입니다." });
  } else {
    let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
    let values = [decodedJwt.id, book_id];

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

const removeLike = (req, res) => {
  const book_id = req.params.id;

  let decodedJwt = ensureAuthority(req, res);
  if (decodedJwt instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 세션이 만료되었습니다." });
  } else if (decodedJwt instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "잘못된 토큰입니다." });
  } else {
    let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
    let values = [decodedJwt.id, book_id];

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

export { addLike, removeLike };
