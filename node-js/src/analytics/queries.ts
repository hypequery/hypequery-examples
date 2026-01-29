import { initServe } from '@hypequery/serve';
import { db } from './client';

const serve = initServe({
  basePath: '',
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
          .limit(1)
          .execute()
      ),
  }),
});

api.route('/tripsQuery', api.queries.tripsQuery)

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
