import useSWR from 'swr'
import type { TaskStats, DeadlineStats } from '~/types/stats'

export function useTaskStats() {
  const { data, error } = useSWR<TaskStats>('/stats/')

  return {
    stats: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useDeadlineStats() {
  const { data, error } = useSWR<DeadlineStats>('/stats/deadlines')

  return {
    stats: data,
    isLoading: !error && !data,
    isError: error,
  }
}
