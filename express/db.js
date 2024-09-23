import { createConnection } from "mysql2";

const connection = createConnection({
  host: "localhost",
  port: 3306, // mariadb 시작시 지정한 port
  user: "root", // mariadb 시작시 지정한 username
  password: "root", // mariadb 시작시 지정한 password
  database: "Youtube",
  dateStrings: true,
});

export default connection;
