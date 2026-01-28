import { api } from '@/analytics/queries';

export default async function ReportPage() {
  const stats = await api.run('dailyStats', {
    input: {
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-01-31T23:59:59Z',
    },
  });

  const totalTrips = stats.reduce((sum, day) => sum + Number(day.trip_count), 0);
  const totalRevenue = stats.reduce((sum, day) => sum + Number(day.total_revenue), 0);

  return (
    <div>
      <h1>Monthly Report</h1>
      <p>Total Trips: {totalTrips.toLocaleString()}</p>
      <p>Total Revenue: ${totalRevenue.toLocaleString()}</p>
      <h2>Daily Breakdown</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
