import http from "http";
import { Database } from "./database.js";

const PORT = 3000;

const database = new Database();

const requestListener = (req, res) => {
  console.log(req.method);
  res.end("Hello World");
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log("Running", PORT);
});
