import { initServe } from '@hypequery/serve';
import { z } from 'zod';
import { db } from './db.js';
import { authStrategy, useAuth } from './auth.js';

const serve = initServe({
  auth: useAuth(authStrategy),
  tenant: {
    extract: (auth) => auth.tenantId,
    column: 'tenant_id',
    mode: 'auto-inject',
  },
  context: async () => ({ db }),
});

const { define, queries, query } = serve;

export const api = define({
  basePath: '/api',
  docs: { enabled: true, path: '/docs' },
  openapi: { enabled: true, path: '/openapi.json' },
  queries: queries({
    activeUsers: query
      .requireRole('tenant', 'admin')
      .tenant({
        extract: (auth) => auth.tenantId,
        column: 'tenant_id',
        mode: 'auto-inject',
        required: false,
      })
      .describe('Active users per tenant')
      .input(z.object({ region: z.string().optional() }))
      .output(
        z.array(
          z.object({
            tenant_id: z.string(),
            active: z.number(),
          }),
        ),
      )
      .query(({ ctx, input }) => {
        if (ctx.auth?.roles?.includes('tenant') && !ctx.auth?.tenantId) {
          throw new Error('Tenant required');
        }

        let builder = ctx.db
          .table('analytics.users')
          .where('status', 'eq', 'active');

        if (input.region) {
          builder = builder.where('region', 'eq', input.region);
        }

        return builder
          .select(['tenant_id'])
          .count('id', 'active')
          .groupBy(['tenant_id'])
          .execute();
      }),

    revenueByPlan: query
      .describe('MRR by plan (admin only)')
      .requireRole('admin')
      .tenant({
        extract: (auth) => auth.tenantId,
        column: 'tenant_id',
        mode: 'auto-inject',
        required: false,
      })
      .output(
        z.array(
          z.object({
            plan: z.string(),
            total_mrr: z.number(),
          }),
        ),
      )
      .query(({ ctx }) =>
        ctx.db
          .table('analytics.users')
          .innerJoin(
            'analytics.tenants',
            'analytics.users.tenant_id',
            'analytics.tenants.tenant_id',
          )
          .select(['analytics.tenants.plan as plan'])
          .sum('mrr', 'total_mrr')
          .groupBy(['plan'])
          .execute(),
      ),
  }),
});

api.route('/activeUsers', api.queries.activeUsers);
api.route('/revenueByPlan', api.queries.revenueByPlan);
