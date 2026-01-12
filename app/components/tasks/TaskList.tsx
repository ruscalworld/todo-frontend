import { useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { TaskCard } from './TaskCard'
import { TaskStatusFilter } from './TaskStatusFilter'
import type { Task } from '~/types/task'

interface TaskListProps {
  tasks: Task[] | undefined
  isLoading: boolean
  onTaskClick: (task: Task) => void
}

export function TaskList({ tasks, isLoading, onTaskClick }: TaskListProps) {
  const [ filter, setFilter ] = useState<'all' | 'pending' | 'completed'>('all')

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress/>
      </Box>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'center', py: 4 }}>
        Задачи не найдены
      </Typography>
    )
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TaskStatusFilter value={ filter } onChange={ setFilter }/>
      </Box>

      { filteredTasks.length === 0 ? (
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'center', py: 4 }}>
          Нет задач с выбранным статусом
        </Typography>
      ) : (
        filteredTasks.map(task => (
          <TaskCard key={ task.id } task={ task } onClick={ onTaskClick }/>
        ))
      ) }
    </Box>
  )
}
