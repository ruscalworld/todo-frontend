import { apiClient } from '~/lib/api/client'
import type { Task, TaskCreateInput, TaskUpdateInput } from '~/types/task'

export const tasksApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks/')
    return response.data
  },

  getTodayTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks/today')
    return response.data
  },

  searchTasks: async (query: string): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>(`/tasks/search?q=${ encodeURIComponent(query) }`)
    return response.data
  },

  createTask: async (data: TaskCreateInput): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks/', data)
    return response.data
  },

  updateTask: async (id: number, data: TaskUpdateInput): Promise<Task> => {
    const response = await apiClient.put<Task>(`/tasks/${ id }`, data)
    return response.data
  },

  completeTask: async (id: number): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${ id }/complete`)
    return response.data
  },

  deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${ id }`)
  },
}
