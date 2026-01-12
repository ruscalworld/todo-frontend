import type { Task } from '~/types/task'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'

interface TaskCardProps {
  task: Task
  onClick: () => void
}

function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card onClick={ onClick } sx={{ cursor: 'pointer' }}>
      <CardContent>
        <Stack direction='row' justifyContent='space-between' spacing={ 2 }>
          <Box>
            <Typography variant='body1' fontWeight='bolder' component='h6'>
              { task.title }
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              { task.description || 'Нет описания' }
            </Typography>
          </Box>
          { !!task.days_remaining && task.days_remaining >= 0 && (
            <Chip label={ <>{ task.days_remaining } дн.</> }/>
          ) }
          { !!task.days_remaining && task.days_remaining < 0 && (
            <Chip label='Просрочено' color='error'/>
          ) }
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TaskCard
