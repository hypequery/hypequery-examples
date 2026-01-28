import 'dotenv/config';
import { initServe } from '@hypequery/serve';
import { createQueryBuilder } from '@hypequery/clickhouse';
import { z } from 'zod';

const db = createQueryBuilder({
  url: process.env.CLICKHOUSE_HOST,
  username: process.env.CLICKHOUSE_USERNAME,
  password: process.env.CLICKHOUSE_PASSWORD,
  database: process.env.CLICKHOUSE_DATABASE,
});

const { define, queries, query } = initServe({
  context: () => ({ db }),
});

export const api = define({
  queries: queries({
    hello: query
      .describe('Simple greeting')
      .output(z.object({ message: z.string(), at: z.string() }))
      .query(async () => ({
        message: 'Hello from hypequery!',
        at: new Date().toISOString(),
      })),
  }),
});

api.route('/hello', api.queries.hello, { method: 'GET' })

export API