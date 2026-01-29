import { formatDateTime } from '@hypequery/clickhouse';
import { initServe } from '@hypequery/serve';
import { z } from 'zod';
import { db } from './client';

const { define, queries, query } = initServe({
  context: () => ({ db }),
});

export const api = define({
  basePath: '/api/analytics',
  queries: queries({
    dailyStats: query
      .describe('Daily trip counts and revenue')
      .input(
        z.object({
          startDate: z.string().datetime(),
          endDate: z.string().datetime(),
        }),
      )
      .output(
        z.array(
          z.object({
            day: z.string(),
            trip_count: z.number(),
            total_revenue: z.number(),
            avg_fare: z.number(),
            avg_distance: z.number(),
          }),
        ),
      )
      .query(({ ctx, input }) => {
        const res = ctx.db
          .table('trips')
          .where('pickup_datetime', 'gte', input.startDate)
          .where('pickup_datetime', 'lte', input.endDate)
          .select([formatDateTime('pickup_datetime', '%Y-%m-%d', { alias: 'day' })])
          .count('trip_id', 'trip_count')
          .sum('total_amount', 'total_revenue')
          .avg('fare_amount', 'avg_fare')
          .avg('trip_distance', 'avg_distance')
          .orderBy('day', 'ASC')
          .groupByTimeInterval('pickup_datetime', '1 day')
          .toSQL()

        console.log(res)
      }
      ),

    topPickupLocations: query
      .describe('Top neighborhoods by trip volume')
      .input(
        z.object({
          limit: z.number().min(1).max(50).default(10),
        }),
      )
      .output(
        z.array(
          z.object({
            neighborhood: z.string(),
            trip_count: z.number(),
            total_revenue: z.number(),
            avg_fare: z.number(),
          }),
        ),
      )
      .query(({ ctx, input }) => {
        const limit = input.limit ?? 10;

        return ctx.db
          .table('trips')
          .select(['pickup_ntaname AS neighborhood'])
          .count('trip_id', 'trip_count')
          .sum('total_amount', 'total_revenue')
          .avg('fare_amount', 'avg_fare')
          .groupBy(['neighborhood'])
          .orderBy('trip_count', 'DESC')
          .limit(limit)
          .execute();
      }),

    revenueByPayment: query
      .describe('Revenue breakdown by payment method')
      .output(
        z.array(
          z.object({
            payment_type: z.string(),
            trip_count: z.number(),
            total_revenue: z.number(),
            avg_tip: z.number(),
          }),
        ),
      )
      .query(({ ctx }) =>
        ctx.db
          .table('trips')
          .select(['payment_type'])
          .count('trip_id', 'trip_count')
          .sum('total_amount', 'total_revenue')
          .avg('tip_amount', 'avg_tip')
          .groupBy(['payment_type'])
          .orderBy('total_revenue', 'DESC')
          .execute(),
      ),
  }),
});

api.route('/dailyStats', api.queries.dailyStats, { method: 'POST' });
api.route('/topPickupLocations', api.queries.topPickupLocations, { method: 'POST' });
api.route('/revenueByPayment', api.queries.revenueByPayment, { method: 'GET' });
