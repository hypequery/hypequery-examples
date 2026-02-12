import { createHooks } from '@hypequery/react';
import type { ApiDefinition } from '../../../analytics/src/serve';
import { getTenantKey } from './auth';

const { useQuery, useMutation } = createHooks<ApiDefinition>({
  baseUrl: process.env.NEXT_PUBLIC_SERVE_URL ?? '/api',
  headers: () => {
    const tenantKey = getTenantKey();
    return tenantKey ? { 'x-tenant-key': tenantKey } : {};
  },
});

export { useQuery, useMutation };
