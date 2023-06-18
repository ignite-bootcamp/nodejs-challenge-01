// import { Database } from "./database";

// const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      console.log(req.body);
    },
  },
];
