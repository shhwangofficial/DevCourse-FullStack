import start from './server.js'
import route from './router.js'
import handle from './requestHandler.js'

start(route, handle);