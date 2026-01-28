import { initServe } from '@hypequery/serve';
import { z } from 'zod';
import { db } from './client';

const serve = initServe({
  context: () => ({ db }),
});
const { query } = serve;

export const api = serve.define({
  queries: serve.queries({
    tripsQuery: query
      .describe('Example query using the trips table')
      .query(async ({ ctx }) =>
        ctx.db
          .table('trips')
          .select('*')
          .limit(10)
          .execute()
      ),
  }),
});

/**
 * Inline usage example:
 *
 * const result = await api.execute('tripsQuery');
 * console.log(result);
 *
 * // import type { InferQueryResult } from '@hypequery/serve';
 * type TripsQueryResult = InferQueryResult<typeof api, 'tripsQuery'>;
 *
 * Dev server:
 *
 * npx hypequery dev
 */
