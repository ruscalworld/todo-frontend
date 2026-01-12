import { Card, CardContent, Typography, Chip, Box } from '@mui/material'
import type { Task } from '~/types/task'
import { formatDate } from '~/utils/dateUtils'

interface TaskCardProps {
  task: Task
  onClick: (task: Task) => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case 'Q1':
        return 'error'
      case 'Q2':
        return 'warning'
      case 'Q3':
        return 'info'
      case 'Q4':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <Card
      sx={ {
        mb: 2,
        cursor: 'pointer',
        opacity: task.completed ? 0.6 : 1,
        '&:hover': { boxShadow: 3 },
      } }
      onClick={ () => onClick(task) }
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography
            variant='h6'
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              flexGrow: 1,
            }}
          >
            { task.title }
          </Typography>
          <Chip
            label={ task.quadrant }
            color={ getQuadrantColor(task.quadrant) }
            size='small'
          />
        </Box>

        { task.description && (
          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
            { task.description }
          </Typography>
        ) }

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          { task.is_important && (
            <Chip label='Важно' size='small' color='warning' variant='outlined'/>
          ) }
          { task.is_urgent && (
            <Chip label='Срочно' size='small' color='error' variant='outlined'/>
          ) }
          { task.deadline_at && (
            <Chip
              label={ `До ${ formatDate(task.deadline_at) }` }
              size='small'
              variant='outlined'
            />
          ) }
          { task.completed && (
            <Chip label='Завершено' size='small' color='success'/>
          ) }
        </Box>
      </CardContent>
    </Card>
  )
}
