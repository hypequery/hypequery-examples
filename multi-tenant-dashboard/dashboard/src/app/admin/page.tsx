'use client';

import { useQuery } from '../../lib/hooks';

export default function AdminPage() {
  const { data, error } = useQuery('revenueByPlan');

  if (error) {
    return (
      <main className="panel">
        <h1>Revenue by plan</h1>
        <p className="status">Requires admin key.</p>
      </main>
    );
  }

  return (
    <main className="panel">
      <div className="panel-header">
        <div>
          <h1>Revenue by plan</h1>
          <p className="status">Admin-only overview.</p>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>MRR</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.plan}>
              <td>{row.plan}</td>
              <td>${row.total_mrr.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
