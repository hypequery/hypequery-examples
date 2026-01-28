import { Hono } from "hono";
import { api } from "./analytics/queries.js";

export const app = new Hono();

app.get("/", (c) => {
  return c.json({
    status: "ok",
    runtime: "node",
  });
});

app.get("/trips", async (c) => {
  const result = await api.run('tripsQuery');
  return c.json(result)
})

app.get("/hello/:name", async (c) => {
  const name = c.req.param("name");
  return c.text(`Hello ${name}!`);
});