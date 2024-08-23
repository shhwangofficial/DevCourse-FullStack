import conn from "./database/connect/mariadb.js";
import fs from "fs";

const main_view = fs.readFileSync("./main.html");
const orderlist_view = fs.readFileSync("./orderlist.html");

function main(response) {

    conn.query("SELECT * FROM product", (err, rows) => {console.log(rows)});

    response.writeHead(200, {'content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', (err, data) => {
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
    
}
function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', (err, data) => {
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
    
}
function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', (err, data) => {
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
    
}

function order(response, productId) {
    conn.query("INSERT INTO orderlist VALUES (" + productId + ", '"+ new Date().toLocaleDateString() +"');", (err, rows) => {console.log(rows)});

    response.writeHead(200, {'content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function orderlist(response) {
    conn.query("SELECT * FROM orderlist", (err, rows)=>{
        response.write(orderlist_view);
        rows.forEach((element)=>{
            response.write("<tr>" 
                + "<td>"+element.productId+"</td>" 
                + "<td>"+element.orderDate+"</td>"
                + "<tr>" );
        })
        response.write("</table>");
        response.end();
    });
}

let handle = {};
handle['/'] = main;
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

export default handle;