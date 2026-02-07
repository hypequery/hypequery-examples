import { createAuthSystem } from '@hypequery/serve';
import type { AuthStrategy } from '@hypequery/serve';

const TENANT_KEYS = {
  acme: process.env.ACME_API_KEY ?? 'acme-demo-key',
  globex: process.env.GLOBEX_API_KEY ?? 'globex-demo-key',
  admin: process.env.ADMIN_API_KEY ?? 'admin-demo-key',
} as const;

export type TenantId = 'acme' | 'globex';

const { useAuth, TypedAuth } = createAuthSystem({
  roles: ['admin', 'tenant'] as const,
  scopes: [] as const,
});

export type AppAuth = typeof TypedAuth & { tenantId?: TenantId };
export { useAuth };

export const authStrategy: AuthStrategy<AppAuth> = async ({ request }) => {
  const headerValue =
    request.headers?.['x-tenant-key'] ??
    request.headers?.['X-Tenant-Key'] ??
    '';
  const key = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  const entry = Object.entries(TENANT_KEYS).find(([, value]) => value === key);

  if (!entry) return null;

  const [id] = entry;

  if (id === 'admin') {
    return {
      userId: 'admin',
      roles: ['admin'],
      scopes: [],
    };
  }

  return {
    userId: `tenant:${id}`,
    roles: ['tenant'],
    scopes: [],
    tenantId: id as TenantId,
  };
};
