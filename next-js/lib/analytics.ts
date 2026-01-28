'use client';

import { createHooks } from '@hypequery/react';
import type { InferApiType } from '@hypequery/serve';
import type { api } from '@/analytics/queries';

type AnalyticsApi = InferApiType<typeof api>;

const methodConfig = {
  dailyStats: { method: 'POST' },
  topPickupLocations: { method: 'POST' },
  revenueByPayment: { method: 'GET' },
};

export const { useQuery, useMutation } = createHooks<AnalyticsApi>({
  baseUrl: '/api/analytics',
  config: methodConfig,
});
