import { createConnection } from 'mysql';

const conn = createConnection(
    {
       host: 'localhost',
       port: 3306, // mariadb 시작시 지정한 port
       user: 'root', // mariadb 시작시 지정한 username
       password: 'root', // mariadb 시작시 지정한 password
       database: 'Tennis' // DB 이름
    }
)

export default conn;