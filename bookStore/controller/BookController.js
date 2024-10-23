import conn from "../db.js";
import { StatusCodes } from "http-status-codes";
import ensureAuthority from "../auth.js";
import jwt from "jsonwebtoken";

const allBooks = (req, res) => {
  let { category_id, news, limit, currentPage } = req.query;
  let offset = (currentPage - 1) * limit;

  let sql =
    "SELECT *, (SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes FROM books";
  let values = [];
  if (category_id && news) {
    sql +=
      " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values.push(category_id);
  } else if (category_id) {
    sql += " WHERE category_id=? ";
    values.push(category_id);
  } else if (news) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }
  sql += " LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);

  conn.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.length) return res.status(StatusCodes.OK).json(results);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const bookDetail = (req, res) => {
  let book_id = req.params.id;
  book_id = parseInt(book_id);

  let decodedJwt = ensureAuthority(req, res);
  if (decodedJwt instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 세션이 만료되었습니다." });
  } else if (decodedJwt instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "잘못된 토큰입니다." });
  } else if (decodedJwt instanceof ReferenceError) {
    let sql = `SELECT *,
(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes
  FROM books LEFT JOIN category ON books.category_id = category.category_id WHERE books.id = ?`;
    let values = [book_id];
    conn.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
      else return res.status(StatusCodes.NOT_FOUND).end();
    });
  } else {
    let sql = `SELECT *,
(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes,
(SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked
  FROM books LEFT JOIN category 
  ON books.category_id = category.category_id
   WHERE books.id = ?`;
    let values = [decodedJwt.id, book_id, book_id];
    conn.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
      else return res.status(StatusCodes.NOT_FOUND).end();
    });
  }
};

export { allBooks, bookDetail };
