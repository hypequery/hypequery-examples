'use client';

import { MetricCard } from '../components/MetricCard';
import { TenantSelector } from '../components/TenantSelector';
import { useQuery } from '../lib/hooks';

export default function TenantDashboard() {
  const { data, isLoading, error } = useQuery('activeUsers', {
    region: 'us-east',
  });

  if (error) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    return (
      <main className="panel">
        <h1>Tenant Metrics</h1>
        <p className="status">Auth error: {message}</p>
        <p className="status">Pick a tenant key from the selector to load data.</p>
        <TenantSelector />
      </main>
    );
  }

  return (
    <main className="panel">
      <div className="panel-header">
        <div>
          <h1>Tenant Metrics</h1>
          <p className="status">Scoped to your tenant key.</p>
        </div>
        <TenantSelector />
      </div>

      {isLoading && <p className="status">Loading...</p>}

      {data && (
        <section className="card-grid">
          {data.map((row) => (
            <MetricCard
              key={row.tenant_id}
              title={`${row.tenant_id} active`}
              value={row.active ?? 0}
              hint="Filtered by us-east"
            />
          ))}
        </section>
      )}
    </main>
  );
}
