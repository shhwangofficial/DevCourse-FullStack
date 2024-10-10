import conn from "../db.js";
import { StatusCodes } from "http-status-codes";

// 장바구니로 담기
const addToCart = (req, res) => {
  const { book_id, quantity, user_id } = req.body;

  let sql =
    "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
  let values = [book_id, quantity, user_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

// 장바구니 아이템 목록 조회 + 장바구니에서 주문서 작성하기
const getCartItems = (req, res) => {
  const { user_id, selected } = req.body;
  let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
    FROM cartItems LEFT JOIN books 
    ON cartItems.book_id = books.id
    WHERE user_id = ?`;
  if (selected) sql += ` AND cartItems.id IN (?)`;
  let values = [user_id, selected];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

// 장바구니에서 삭제
const removeCartItem = (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM cartItems WHERE id = ?";
  let values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

export { addToCart, removeCartItem, getCartItems };
