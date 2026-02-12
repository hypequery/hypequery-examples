import { api } from './serve.js';

async function runDigestForTenant(tenantKey: string, tenantId: string) {
  const active = await api.run('activeUsers', {
    input: { region: 'us-east' },
    request: {
      method: 'POST',
      path: '/api/activeUsers',
      headers: {
        'x-tenant-key': tenantKey,
      },
      query: {},
    },
  });

  console.log(`[${tenantId}] Active users:`, active[0]?.active ?? 0);
}

await runDigestForTenant('acme-demo-key', 'acme');
await runDigestForTenant('globex-demo-key', 'globex');
