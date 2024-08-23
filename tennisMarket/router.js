function route(pathname, handle, response, productId) {
    if (typeof(handle[pathname]) === 'function'){
        handle[pathname](response, productId);
    } else {
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write('NOT FOUND');
        response.end();
    }
}

export default route;