import http from "http";
import { routes } from "./routes.js";
import { json } from "./middlewares/json.js";
import { extractQueryParams } from "./utils/extract-query.js";

const PORT = 3000;

const requestListener = async (req, res) => {
  await json(req, res);

  const route = routes.find((route) => {
    return route.method === req.method && route.path.test(req.url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    console.log(routeParams);
    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    console.log(req.query);

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log("Running", PORT);
});
