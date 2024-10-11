import conn from "../db.js";
import { StatusCodes } from "http-status-codes";

const order = (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  let delivery_id;
  let order_id;

  let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
  let values = [delivery.address, delivery.receiver, delivery.contact];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    delivery_id = results.insertId;

    return res.status(StatusCodes.OK).json(results);
  });

  sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
  values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    order_id = results.insertId;
    return res.status(StatusCodes.OK).json(results);
  });

  sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  values = [];
  items.forEach((item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });
  conn.query(sql, [values], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

const getOrders = (req, res) => {};

const getOrderDetail = (req, res) => {};

export { order, getOrders, getOrderDetail };

// // 주문하기
// // 배송 정보 입력
// INSERT INTO delivery (address, receiver, contact) VALUES ("서울시 중구", "김송아", "010-1234-5678");
// const delivery_id = SELECT max(id) FROM delivery;

// // 주문 정보 입력
// INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
// VALUES ("어린왕자들", 3, 60000, 1, delivery_id);
// const order_id = SELECT max(id) FROM orders;

// // 주문 상세 목록 입력
// INSERT INTO orderedBook (order_id, book_id, quantity)
// VALUES (order_id, 1, 1);
// INSERT INTO orderedBook (order_id, book_id, quantity)
// VALUES (order_id, 3, 2);
