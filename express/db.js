import { createConnection } from 'mysql2';

const connection = createConnection(
    {
       host: 'localhost',
       port: 3306,        // mariadb 시작시 지정한 port
       user: 'root',      // mariadb 시작시 지정한 username
       password: 'root',  // mariadb 시작시 지정한 password
       database: 'Youtube', 
       dateStrings : true
    }
)

// A simple SELECT query  
connection.query(  
	'SELECT * FROM `users`',  
	function (err, results, fields) {  
		console.log(results); // results contains rows returned by server  
		console.log(fields); // fields contains extra meta data about results
	}  
);