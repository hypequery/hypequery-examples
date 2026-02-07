import { createHooks } from '@hypequery/react';
import type { api } from '../../../analytics/src/serve';
import { getTenantKey } from './auth';

const { useQuery, useMutation } = createHooks<typeof api>({
  baseUrl: process.env.NEXT_PUBLIC_SERVE_URL ?? '/api',
  fetchFn: async (input, init) => {
    const tenantKey = getTenantKey();
    const url = typeof input === 'string' ? input : input.url;
    const baseHeaders = typeof input === 'string' ? undefined : input.headers;
    const headers = new Headers(init?.headers ?? baseHeaders);

    if (tenantKey) {
      headers.set('x-tenant-key', tenantKey);
    }

    return fetch(url, {
      ...init,
      headers,
    });
  },
});

export { useQuery, useMutation };
