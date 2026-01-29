import { createHooks } from '@hypequery/react'
import type { ApiDefinition } from '../../api/queries'

export const { useQuery, useMutation } = createHooks<ApiDefinition>({
  baseUrl: '/api',
})
