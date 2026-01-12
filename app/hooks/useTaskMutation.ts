import { useSWRConfig } from 'swr'
import { tasksApi } from '~/lib/api/tasks.api'
import type { TaskCreateInput, TaskUpdateInput } from '~/types/task'

export function useTaskMutation() {
  const { mutate } = useSWRConfig()

  const createTask = async (input: TaskCreateInput) => {
    const newTask = await tasksApi.createTask(input)
    mutate('/tasks/').then()
    mutate('/tasks/today').then()
    return newTask
  }

  const updateTask = async (id: number, input: TaskUpdateInput) => {
    const updatedTask = await tasksApi.updateTask(id, input)
    mutate('/tasks/').then()
    mutate('/tasks/today').then()
    return updatedTask
  }

  const completeTask = async (id: number) => {
    await tasksApi.completeTask(id)
    mutate('/tasks/').then()
    mutate('/tasks/today').then()
  }

  const deleteTask = async (id: number) => {
    await tasksApi.deleteTask(id)
    mutate('/tasks/').then()
    mutate('/tasks/today').then()
  }

  return {
    createTask,
    updateTask,
    completeTask,
    deleteTask,
  }
}
