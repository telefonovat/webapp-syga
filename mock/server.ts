import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('./routes.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((request, _response, next) => {
  if (request.method === 'POST') {
    request.method = 'GET';
  }
  next();
});

server.use(
  jsonServer.rewriter({
    '/algorithm/execute': '/successfulVisualization',
  })
);

server.use(router);
server.listen(8000, () => {
  console.log('Mock server is listening at port 8000');
});
