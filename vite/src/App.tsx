import './App.css'
import { queryOptions } from '@hypequery/react'
import { useQuery } from './lib/hypequery'

const revenueRange = { startDate: '2024-01-01', endDate: '2024-01-31' }

export default function App() {
  const helloQuery = useQuery('hello', queryOptions({ enabled: false }))
  const revenueQuery = useQuery(
    'weeklyRevenue',
    revenueRange,
    queryOptions({ enabled: false }),
  )

  return (
    <main className="app">
      <h1>hypequery + Vite</h1>
      <div className="actions">
        <button disabled={helloQuery.isFetching} onClick={() => helloQuery.refetch()}>
          {helloQuery.isFetching ? 'Loading…' : 'Greet'}
        </button>
        <button
          disabled={revenueQuery.isFetching}
          onClick={() => revenueQuery.refetch()}
        >
          {revenueQuery.isFetching ? 'Loading…' : 'Load Revenue'}
        </button>
      </div>

      {(helloQuery.error || revenueQuery.error) && (
        <p className="error">
          {(helloQuery.error ?? revenueQuery.error)?.message}
        </p>
      )}

      {helloQuery.data && (
        <section>
          <h2>Hello metric</h2>
          <pre>{JSON.stringify(helloQuery.data, null, 2)}</pre>
        </section>
      )}

      {revenueQuery.data && (
        <section>
          <h2>Weekly revenue</h2>
          <pre>{JSON.stringify(revenueQuery.data, null, 2)}</pre>
        </section>
      )}
    </main>
  )
}
