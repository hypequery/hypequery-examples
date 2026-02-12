export const TENANT_STORAGE_KEY = 'tenantKey';
export const DEFAULT_TENANT_KEY =
  process.env.NEXT_PUBLIC_DEFAULT_TENANT_KEY ?? 'acme-demo-key';

export function getTenantKey(fallback?: string) {
  if (typeof window === 'undefined') {
    return process.env.DASHBOARD_TENANT_KEY ?? fallback ?? DEFAULT_TENANT_KEY;
  }

  return (
    localStorage.getItem(TENANT_STORAGE_KEY) ??
    fallback ??
    DEFAULT_TENANT_KEY
  );
}

export function setTenantKey(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TENANT_STORAGE_KEY, key);
}
