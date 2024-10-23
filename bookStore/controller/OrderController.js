// import conn from "../db.js";
import { StatusCodes } from "http-status-codes";
import { createConnection } from "mysql2/promise";
import ensureAuthority from "../auth.js";
import jwt from "jsonwebtoken";

const order = async (req, res) => {
  const conn = await createConnection({
    host: "127.0.0.1",
    port: 3306, // mariadb 시작시 지정한 port
    user: "root", // mariadb 시작시 지정한 username
    password: "root", // mariadb 시작시 지정한 password
    database: "bookstore",
    dateStrings: true,
  });

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
    const { items, delivery, totalQuantity, totalPrice, firstBookTitle } =
      req.body;

    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let [results] = await conn.execute(sql, values);

    let delivery_id = results.insertId;

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
    values = [
      firstBookTitle,
      totalQuantity,
      totalPrice,
      decodedJwt.id,
      delivery_id,
    ];
    [results] = await conn.execute(sql, values);

    let order_id = results.insertId;

    sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
    let [orderItems, fields] = await conn.query(sql, [items]);

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
    values = [];
    orderItems.forEach((item) => {
      values.push([order_id, item.book_id, item.quantity]);
    });
    results = await conn.query(sql, [values]);

    let result = await deleteCartItems(conn, items);

    return res.status(StatusCodes.OK).json(result);
  }
};

const deleteCartItems = async (conn, items) => {
  let sql = `DELETE FROM cartItems WHERE id in (?)`;
  let result = await conn.query(sql, [items]);
  return result;
};

const getOrders = async (req, res) => {
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
    const conn = await createConnection({
      host: "127.0.0.1",
      port: 3306, // mariadb 시작시 지정한 port
      user: "root", // mariadb 시작시 지정한 username
      password: "root", // mariadb 시작시 지정한 password
      database: "bookstore",
      dateStrings: true,
    });

    let sql = `SELECT orders.id, created_at, address, receiver, contact, book_title, total_quantity, total_price FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id`;
    let [rows, fields] = await conn.query(sql);

    return res.status(StatusCodes.OK).json(rows);
  }
};

const getOrderDetail = async (req, res) => {
  const orderId = req.params.id;
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
    const conn = await createConnection({
      host: "127.0.0.1",
      port: 3306, // mariadb 시작시 지정한 port
      user: "root", // mariadb 시작시 지정한 username
      password: "root", // mariadb 시작시 지정한 password
      database: "bookstore",
      dateStrings: true,
    });

    let sql = `SELECT book_id, title, author, price, quantity FROM orderedBook LEFT JOIN books ON orderedBook.book_id = books.id WHERE order_id = ?`;
    let [rows, fields] = await conn.query(sql, [orderId]);

    return res.status(StatusCodes.OK).json(rows);
  }
};

export { order, getOrders, getOrderDetail };
