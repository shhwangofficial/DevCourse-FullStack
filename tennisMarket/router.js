function route(pathname, handle, response) {
    if (typeof(handle[pathname]) === 'function'){
        handle[pathname](response);
    } else {
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write('NOT FOUND');
        response.end();
    }
}

export default route;