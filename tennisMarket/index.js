import start from './server.js';
import route from './router.js';
import handle from './requestHandler.js';
import conn from './database/connect/mariadb.js';

conn.connect();

start(route, handle);