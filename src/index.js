const http = require("http");
const dotenv = require("dotenv");
const getUsers = require("./modules/users");

dotenv.config();

const { PORT } = process.env;

const server = http.createServer((request, response) => {
  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");

  if (request.url === "/?hello=") {
    response.statusCode = 400;
    response.statusMessage = "Incorrect Data";
    response.header = "Content-Type: text/plain";
    response.write("Enter a name");
    response.end();
    return;
  }

  if (request.url === `/?hello=${userName}`) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${userName}!`);
    response.end();
    return;
  }

  if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }

  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello, World!");
    response.end();
    return;
  }

  response.statusCode = 500;
//   response.statusMessage = "Server Error";
  response.header = "Content-Type: text/plain";
  response.write("");
  response.end();
});

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});
