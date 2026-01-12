import { Container, Typography, Box } from '@mui/material'
import { useTodayTasks } from '~/hooks/useTasks'
import { useTaskModal } from '~/hooks/useTaskModal'
import { TaskList } from '~/components/tasks/TaskList'
import { TaskModal } from '~/components/tasks/TaskModal'
import type { Route } from './+types/_app.home'

export const meta: Route.MetaFunction = () => [
  { title: 'Сегодня | Матрица Эйзенхауэра' },
]

export default function HomePage() {
  const { tasks, isLoading } = useTodayTasks()
  const { isOpen, selectedTask, openModal, closeModal } = useTaskModal()

  return (
    <Container maxWidth='lg'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Задачи на сегодня
        </Typography>

        <TaskList
          tasks={ tasks }
          isLoading={ isLoading }
          onTaskClick={ openModal }
        />
      </Box>

      <TaskModal
        task={ selectedTask }
        open={ isOpen }
        onClose={ closeModal }
      />
    </Container>
  )
}
