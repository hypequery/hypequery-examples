import './App.css'
import { useMutation } from './lib/hypequery'

export default function App() {
  const helloQuery = useMutation('hello')

  return (
    <main className="app">
      <h1>hypequery + Vite</h1>
      <div className="actions">
        <button disabled={helloQuery.isPending} onClick={() => helloQuery.mutate({})}>
          {helloQuery.isPending ? 'Loading…' : 'Greet'}
        </button>
      </div>

      {(helloQuery.error) && (
        <p className="error">
          {(helloQuery.error)?.message}
        </p>
      )}

      {helloQuery.data && (
        <section>
          <h2>Hello metric</h2>
          <pre>{JSON.stringify(helloQuery.data, null, 2)}</pre>
        </section>
      )}
    </main>
  )
}
