import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();  // 사용한다고 알리기

const token = jwt.sign({foo: 'bar'}, process.env.PRIVATE_KEY);

const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);