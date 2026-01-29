# hypequery Examples

<p align="center">
  <a href="https://hypequery.com/docs">Docs</a> •
  <a href="https://hypequery.featurebase.app/roadmap">Roadmap</a> •
  <a href="https://github.com/hypequery/hypequery-examples">Examples</a>
</p>

<p align="center">
[![GitHub stars](https://img.shields.io/github/stars/hypequery/hypequery)](https://github.com/hypequery/hypequery/stargazers)
[![Twitter Follow](https://img.shields.io/twitter/follow/hypequery?style=social)](https://twitter.com/hypequery)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
</p>


Collection of examples demonstrating how to use [Hypequery](https://github.com/hypequery/hypequery) with different frameworks and architectures for building type-safe analytics applications with ClickHouse.

## Examples Overview

| Example | Framework | Use Case | Key Features |
|---------|-----------|----------|--------------|
| **[next-js](./next-js/)** | Next.js 15 | Full-stack analytics dashboard with API routes | • Server-side API routes with Next.js App Router<br>• React Query integration for data fetching<br>• Real-time analytics dashboard<br>• Type-safe queries with Zod validation<br>• Route handlers at `/api/analytics` |
| **[node-js](./node-js/)** | Node.js + Hono | Backend API server for analytics queries | • REST API with Hono framework<br>• In-process query execution<br>• Lightweight, fast HTTP server<br>• Easy deployment to Node.js hosting<br>• Direct query integration with routes |
| **[vite](./vite/)** | React + Vite | Client-side app with dev API server | • Modern React build with Vite<br>• Development API server with hot reload<br>• Client-side mutations with React hooks<br>• Fast development experience<br>• Separate API and frontend processes |

## Quick Start

Each example is self-contained. Navigate to the example directory and follow its specific setup instructions:

```bash
cd next-js  # or node-js or vite
npm install
npm run dev
```

## Example Details

### Next.js
Full-featured analytics dashboard demonstrating:
- **API Routes**: Server-side route handlers at `/api/analytics/[...path]`
- **Queries**: Daily stats, top pickup locations, revenue by payment type
- **Frontend**: Dashboard pages with charts and data tables
- **Best for**: Production applications with both frontend and backend

**Run:**
```bash
cd next-js
npm install
npm run dev
# Visit http://localhost:3000
```

### Node.js
Lightweight backend API demonstrating:
- **Framework**: Hono for fast HTTP routing
- **Usage**: In-process query execution
- **Deployment**: Simple Node.js server
- **Best for**: API-only applications, microservices

**Run:**
```bash
cd node-js
npm install
npm run dev
# API available at http://localhost:3000
```

### Vite + React
Client-side application demonstrating:
- **Build Tool**: Vite for fast development
- **API**: Separate dev server for analytics queries
- **Frontend**: React with hooks for mutations
- **Best for**: SPA development, prototyping

**Run:**
```bash
cd vite
npm install
npm run dev:all  # Runs both Vite and API server
# Visit http://localhost:5173
```

## Database Setup

All examples use ClickHouse with the NYC Taxi dataset. Configure your environment variables:

```bash
# In each example directory, create .env.local:
CLICKHOUSE_HOST=your-clickhouse-host:8443
CLICKHOUSE_DATABASE=nyc_taxi
CLICKHOUSE_USERNAME=default
CLICKHOUSE_PASSWORD=your-password
```

See `.env.example` in each directory for reference.

## Key Hypequery Concepts Demonstrated

- **Type-Safe Queries**: End-to-end type safety from database to frontend
- **Query Definitions**: Declarative query definitions with Zod schemas
- **Multiple Runtimes**: Works with Next.js, Node.js, and React
- **ClickHouse Integration**: Native ClickHouse query builder
- **API Generation**: Automatic API route generation from query definitions

## Learn More

- [Hypequery Documentation](https://github.com/hypequery/hypequery)
- [ClickHouse Documentation](https://clickhouse.com/docs)
- [Zod Validation](https://zod.dev)

## License

MIT
