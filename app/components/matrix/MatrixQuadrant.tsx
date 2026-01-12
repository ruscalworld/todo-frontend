import { Box, Paper, Typography } from '@mui/material'
import type { Task } from '~/types/task'
import TaskCard from '~/components/matrix/TaskCard'

interface MatrixQuadrantProps {
  title: string
  tasks: Task[]
  onTaskClick: (task: Task) => void
  color: string
}

export function MatrixQuadrant({ title, tasks, onTaskClick, color }: MatrixQuadrantProps) {
  return (
    <Paper
      sx={{
        p: 2,
        minHeight: 300,
        border: 2,
        borderColor: color,
      }}
    >
      <Typography variant='h5' gutterBottom sx={{ color }}>
        { title }
      </Typography>
      <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 2 }}>
        { tasks.length } { tasks.length === 1 ? 'задача' : 'задач' }
      </Typography>
      <Box>
        { tasks.map((task) => (
          <TaskCard
            key={ task.id }
            task={ task }
            onClick={ () => onTaskClick(task) }
          />
        )) }
      </Box>
    </Paper>
  )
}
