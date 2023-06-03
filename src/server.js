import http from "http";

const PORT = 3000;

const requestListener = (req, res) => {
  res.end("Hello World");
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log("Running", PORT);
});
