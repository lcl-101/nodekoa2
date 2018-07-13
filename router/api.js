const apiRouter = require('koa-router')();
const apiHandlers = require('../controllers/api');

apiRouter.get('/api/getList', apiHandlers.getList);

module.exports = apiRouter;
