import conn from "../db.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;

  // 비밀번호 암호화
  const salt = crypto.randomBytes(16).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 16, "sha512")
    .toString("base64");

  let sql = `INSERT INTO users (email, password, salt) VALUES(?, ?, ?)`;
  let values = [email, hashPassword, salt];
  conn.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.affectedRows) {
      return res.status(StatusCodes.CREATED).json(results);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email=?`;
  let values = [email];
  conn.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const loginUser = results[0];
    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 16, "sha512")
      .toString("base64");

    if (loginUser && loginUser.password == hashPassword) {
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "10m",
          issuer: "sangha",
        }
      );

      res.cookie("token", token, { httpOnly: true });
      console.log(token);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const passwordResetRequest = (req, res) => {
  const { email } = req.body;
  let sql = `SELECT * FROM users WHERE email=?`;
  let values = [email];
  conn.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).json(email); // email passwordReset에서 사용
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const passwordReset = (req, res) => {
  const { password, email } = req.body;

  const salt = crypto.randomBytes(16).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 16, "sha512")
    .toString("base64");

  let sql = `UPDATE users SET password=?, salt=? WHERE email=?`;
  let values = [hashPassword, salt, email];
  conn.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      return res.status(StatusCodes.OK).json(results);
    }
  });
};

export { join, login, passwordResetRequest, passwordReset };
