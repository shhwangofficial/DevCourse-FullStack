import conn from "../db.js";
import { StatusCodes } from "http-status-codes";

const allCategory = (req, res) => {
  let sql = `SELECT * FROM category`;
  conn.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

export { allCategory };
