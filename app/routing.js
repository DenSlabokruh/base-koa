const Router = require('koa-router');

const _ = new Router();

module.exports = (app) => {
  const { users, tasks, categories } = require('./routes');

  _.get('/', (ctx) => {
    ctx.body = { data: 'Hello Easy User' };
  });

  _.get('/users', users.get);
  _.get('/users/:id', users.getById);
  _.post('/public/user', users.create);
  _.put('/user', users.update);

  _.get('/tasks', tasks.get);
  _.get('/info', tasks.getInfo);
  _.get('/tasks/:id', tasks.getById);
  _.post('/tasks', tasks.create);
  _.put('/tasks/:id', tasks.update);
  _.delete('/tasks/:id', tasks.delete);

  _.get('/public/categories', categories.get);
  _.get('/public/categories/:id', categories.getById);
  _.post('/public/categories', categories.create);
  _.put('/public/categories/:id', categories.update);
  _.delete('/public/categories/:id', categories.delete);

  app.use(_.routes());

  return _;
};
