import conn from "../db.js";
import ensureAuthority from "../auth.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// 장바구니로 담기
const addToCart = (req, res) => {
  const { book_id, quantity } = req.body;
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
    let sql =
      "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
    let values = [book_id, quantity, decodedJwt.id];

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

// 장바구니 아이템 목록 조회 + 장바구니에서 주문서 작성하기
const getCartItems = (req, res) => {
  const { selected } = req.body;
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
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
    FROM cartItems LEFT JOIN books 
    ON cartItems.book_id = books.id
    WHERE user_id = ?`;
    let values = [decodedJwt.id];

    if (selected) {
      sql += ` AND cartItems.id IN (?)`;
      values.push(selected);
    }

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

// 장바구니에서 삭제
const removeCartItem = (req, res) => {
  const { id } = req.params;
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
    let sql = "DELETE FROM cartItems WHERE id = ?";
    let values = [id];

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

export { addToCart, removeCartItem, getCartItems };
