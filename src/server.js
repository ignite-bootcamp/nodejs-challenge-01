import http from "http";
import { routes } from "./routes.js";
import { json } from "./middlewares/json.js";

const PORT = 3000;

const requestListener = async (req, res) => {
  await json(req, res);

  const route = routes.find((route) => {
    return route.method === req.method && route.path === req.url;
  });

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log("Running", PORT);
});
