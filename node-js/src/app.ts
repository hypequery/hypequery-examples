import { Hono } from "hono";
import { api } from "./analytics/queries.js";
import { createFetchHandler } from "@hypequery/serve";

const hypequery = createFetchHandler(api.handler);
export const app = new Hono();

app.get("/", (c) => {
  return c.json({
    status: "ok",
    runtime: "node",
  });
});

app.get("/trips", async (c) => {
  // call in process!!
  const result = await api.run('tripsQuery');
  return c.json(result)
})

// Wire /tripsQuery into Hono’s router
app.all('/tripsQuery', (c) => hypequery(c.req.raw));

app.get("/hello/:name", async (c) => {
  const name = c.req.param("name");
  return c.text(`Hello ${name}!`);
});