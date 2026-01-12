import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material'
import { useTasks } from '~/hooks/useTasks'
import { useTaskModal } from '~/hooks/useTaskModal'
import { EisenhowerMatrix } from '~/components/matrix/EisenhowerMatrix'
import { TaskModal } from '~/components/tasks/TaskModal'
import type { Route } from './+types/_app.matrix'

export const meta: Route.MetaFunction = () => [
  { title: 'Матрица | Матрица Эйзенхауэра' },
]

export default function MatrixPage() {
  const { tasks, isLoading } = useTasks()
  const { isOpen, selectedTask, openModal, closeModal } = useTaskModal()

  return (
    <Container maxWidth='xl'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Матрица Эйзенхауэра
        </Typography>

        { isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress/>
          </Box>
        ) : tasks && tasks.length > 0 ? (
          <EisenhowerMatrix tasks={ tasks } onTaskClick={ openModal }/>
        ) : (
          <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'center', py: 4 }}>
            Нет задач. Создайте задачу, чтобы увидеть её в матрице.
          </Typography>
        ) }
      </Box>

      <TaskModal
        task={ selectedTask }
        open={ isOpen }
        onClose={ closeModal }
      />
    </Container>
  )
}
