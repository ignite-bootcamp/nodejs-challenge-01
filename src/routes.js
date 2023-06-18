import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { body } = req;

      const newTask = {
        id: randomUUID(),
        title: body.title,
        description: body.description,
        created_at: new Date().toISOString(),
        completed_at: null,
        updated_at: new Date().toISOString(),
      };

      database.insert("tasks", newTask);

      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              name: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
];
