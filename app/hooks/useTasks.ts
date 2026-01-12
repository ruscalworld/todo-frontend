import useSWR from 'swr'
import type { Task } from '~/types/task'

export function useTasks() {
  const { data, error, mutate } = useSWR<Task[]>('/tasks/')

  return {
    tasks: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useTodayTasks() {
  const { data, error, mutate } = useSWR<Task[]>('/tasks/today')

  return {
    tasks: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useSearchTasks(query: string) {
  const { data, error } = useSWR<Task[]>(
    query && query.length >= 2 ? `/tasks/search?q=${ encodeURIComponent(query) }` : null,
  )

  return {
    tasks: data,
    isLoading: !error && !data,
    isError: error,
  }
}
