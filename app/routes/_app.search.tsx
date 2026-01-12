import { useState } from 'react'
import { Container, Typography, Box, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchTasks } from '~/hooks/useTasks'
import { useTaskModal } from '~/hooks/useTaskModal'
import { TaskList } from '~/components/tasks/TaskList'
import { TaskModal } from '~/components/tasks/TaskModal'
import type { Route } from './+types/_app.search'

export const meta: Route.MetaFunction = () => [
  { title: 'Поиск | Матрица Эйзенхауэра' },
]

export default function SearchPage() {
  const [ query, setQuery ] = useState('')
  const { tasks, isLoading } = useSearchTasks(query)
  const { isOpen, selectedTask, openModal, closeModal } = useTaskModal()

  return (
    <Container maxWidth='lg'>
      <Box sx={ { my: 4 } }>
        <Typography variant='h4' component='h1' gutterBottom>
          Поиск задач
        </Typography>

        <TextField
          fullWidth
          placeholder='Введите текст для поиска (минимум 2 символа)'
          value={ query }
          onChange={ (e) => setQuery(e.target.value) }
          sx={ { mb: 4 } }
          InputProps={ {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon/>
              </InputAdornment>
            ),
          } }
        />

        { query && query.length >= 2 && (
          <TaskList
            tasks={ tasks }
            isLoading={ isLoading }
            onTaskClick={ openModal }
          />
        ) }

        { query && query.length < 2 && (
          <Typography variant='body1' color='text.secondary' sx={ { textAlign: 'center', py: 4 } }>
            Введите минимум 2 символа для поиска
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
