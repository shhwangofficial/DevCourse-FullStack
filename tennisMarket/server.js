import http from 'http';

function start(route, handle) {
    function onRequest(request, response) {
        let url = new URL(request.url,  `http://${request.headers.host}`);
        let productId = Number(url.searchParams.get("productId")); 
        
        if (url.pathname === '/favicon.ico') {  // 귀찮게 하는 favicon GET을 block했음
            return response.end();
           }
        
        route(url.pathname, handle, response, productId);
        
    }
    
    http.createServer(onRequest).listen(8888);
}

export default start;