import { useState } from 'react'
import type { Task } from '~/types/task'

export function useTaskModal() {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ selectedTask, setSelectedTask ] = useState<Task | null>(null)

  const openModal = (task: Task) => {
    setSelectedTask(task)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setTimeout(() => setSelectedTask(null), 200)
  }

  return {
    isOpen,
    selectedTask,
    openModal,
    closeModal,
  }
}
