import { apiClient } from '~/lib/api/client'
import type { TaskStats, DeadlineStats } from '~/types/stats'

export const statsApi = {
  getTaskStats: async (): Promise<TaskStats> => {
    const response = await apiClient.get<TaskStats>('/stats/')
    return response.data
  },

  getDeadlineStats: async (): Promise<DeadlineStats> => {
    const response = await apiClient.get<DeadlineStats>('/stats/deadlines')
    return response.data
  },
}
