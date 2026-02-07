import 'dotenv/config.js';
import { serveDev } from '@hypequery/serve';
import { api } from './serve.js';

const port = process.env.PORT ? Number(process.env.PORT) : 4200;
const host = process.env.HOSTNAME ?? 'localhost';

await serveDev(api, { port });

const baseUrl = `http://${host}:${port}`;
console.log(`[analytics] Server: ${baseUrl}`);
console.log(`[analytics] API base: ${baseUrl}/api`);
console.log(`[analytics] Docs: ${baseUrl}/api/docs`);
console.log(`[analytics] OpenAPI: ${baseUrl}/api/openapi.json`);
