import { createApiKeyStrategy, createAuthSystem } from '@hypequery/serve';
import type { AuthStrategy } from '@hypequery/serve';

const TENANT_KEYS = {
  acme: process.env.ACME_API_KEY ?? 'acme-demo-key',
  globex: process.env.GLOBEX_API_KEY ?? 'globex-demo-key',
  admin: process.env.ADMIN_API_KEY ?? 'admin-demo-key',
} as const;
const NO_SCOPES: never[] = [];

export type TenantId = 'acme' | 'globex';

const { useAuth, TypedAuth } = createAuthSystem({
  roles: ['admin', 'tenant'] as const,
  scopes: [] as const,
});

export type AppAuth = typeof TypedAuth & { tenantId?: TenantId };
export { useAuth };

export const authStrategy: AuthStrategy<AppAuth> = createApiKeyStrategy<AppAuth>({
  header: 'x-tenant-key',
  validate: (key) => {
    const entry = Object.entries(TENANT_KEYS).find(([, value]) => value === key);

    if (!entry) return null;

    const [id] = entry;

    if (id === 'admin') {
      return {
        userId: 'admin',
        roles: ['admin'] as const,
        scopes: NO_SCOPES,
      };
    }

    return {
      userId: `tenant:${id}`,
      roles: ['tenant'] as const,
      scopes: NO_SCOPES,
      tenantId: id as TenantId,
    };
  },
});
