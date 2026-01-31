import 'dotenv/config';
import { InferApiType, initServe } from '@hypequery/serve';
import { z } from 'zod';

const { define, queries, query } = initServe({
  context: () => ({}),
  basePath: '/'
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

api.route('/hello', api.queries.hello, { method: 'POST' })

export type ApiDefinition = InferApiType<typeof api>