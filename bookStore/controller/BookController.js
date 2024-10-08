import conn from "../db.js";
import { StatusCodes } from "http-status-codes";

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
  let { id: book_id } = req.params;
  book_id = parseInt(book_id);
  let { user_id } = req.body;
  let sql = `SELECT *,
(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes,
(SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked
  FROM books 
  LEFT JOIN category 
  ON books.category_id = category.category_id
   WHERE books.id = ?`;
  let values = [user_id, book_id, book_id];
  conn.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};

export { allBooks, bookDetail };
