const viewRouter = require('koa-router')();
const viewHandlers = require('../controllers/view');

viewRouter.get('/', viewHandlers.Home);
viewRouter.get('/:id', viewHandlers.Detail);
viewRouter.get('/Home', viewHandlers.Home);
viewRouter.get('/Posts', viewHandlers.Posts);
viewRouter.get('/About', viewHandlers.About);
viewRouter.get('/Projects', viewHandlers.Projects);
viewRouter.get('/Tags', viewHandlers.Tags);

module.exports = viewRouter;
