'use client';

import { useQuery } from '@/lib/analytics';

export default function DashboardPage() {
  const { data: dailyStats, isLoading, error } = useQuery('dailyStats', {
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-31T23:59:59Z',
  });

  const { data: topLocations } = useQuery('topPickupLocations', { limit: 10 });
  const { data: paymentBreakdown } = useQuery('revenueByPayment');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>NYC Taxi Dashboard</h1>

      <section>
        <h2>Daily Statistics</h2>
        {dailyStats?.map((day) => (
          <div key={day.day}>
            <strong>{day.day}</strong>: {day.trip_count.toLocaleString()} trips,{' '}
            ${day.total_revenue.toLocaleString()} revenue (avg $
            {day.avg_fare.toFixed(2)}/trip, {day.avg_distance.toFixed(1)} mi)
          </div>
        ))}
      </section>

      <section>
        <h2>Top Pickup Locations</h2>
        <ul>
          {topLocations?.map((location) => (
            <li key={location.neighborhood}>
              <strong>{location.neighborhood}</strong>: ${
                location.total_revenue.toLocaleString()
              } ({location.trip_count.toLocaleString()} trips)
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Revenue by Payment Type</h2>
        <ul>
          {paymentBreakdown?.map((payment) => (
            <li key={payment.payment_type}>
              <strong>{payment.payment_type}</strong>: ${
                payment.total_revenue.toLocaleString()
              } ({payment.trip_count.toLocaleString()} trips, avg tip: ${
                payment.avg_tip.toFixed(2)
              })
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
