function main(response) {
    console.log('main');
    response.writeHead(200, {'content-Type' : 'text/html'});
    response.write('Hello Sangha main');
    response.end();
}

function login(response) {
    console.log('login');
    response.writeHead(200, {'content-Type' : 'text/html'});
    response.write('Hello Sangha login');
    response.end();
}

let handle = {};
handle['/'] = main;
handle['/login'] = login;

export default handle;