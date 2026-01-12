import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Alert,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ru } from 'date-fns/locale'
import type { Task } from '~/types/task'
import { useTaskMutation } from '~/hooks/useTaskMutation'
import { parseApiError } from '~/utils/errorUtils'
import { localISOStringToDate, dateToLocalISOString } from '~/utils/dateUtils'

interface TaskModalProps {
  task: Task | null
  open: boolean
  onClose: () => void
}

export function TaskModal({ task, open, onClose }: TaskModalProps) {
  const { updateTask, completeTask, deleteTask } = useTaskMutation()
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ isImportant, setIsImportant ] = useState(false)
  const [ deadline, setDeadline ] = useState<Date | null>(null)
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
      setIsImportant(task.is_important)
      setDeadline(task.deadline_at ? localISOStringToDate(task.deadline_at) : null)
    }
  }, [ task ])

  const handleSave = async () => {
    if (!task) return

    setError('')
    setLoading(true)

    try {
      await updateTask(task.id, {
        title,
        description: description || undefined,
        is_important: isImportant,
        deadline_at: deadline ? dateToLocalISOString(deadline) : null,
      })
      onClose()
    } catch (err: any) {
      setError(parseApiError(err, 'Ошибка при сохранении'))
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    if (!task) return

    setLoading(true)
    try {
      await completeTask(task.id)
      onClose()
    } catch (err: any) {
      setError(parseApiError(err, 'Ошибка при завершении'))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!task || !confirm('Удалить задачу?')) return

    setLoading(true)
    try {
      await deleteTask(task.id)
      onClose()
    } catch (err: any) {
      setError(parseApiError(err, 'Ошибка при удалении'))
    } finally {
      setLoading(false)
    }
  }

  if (!task) return null

  return (
    <Dialog open={ open } onClose={ onClose } maxWidth='sm' fullWidth>
      <DialogTitle>Редактирование задачи</DialogTitle>
      <DialogContent>
        { error && <Alert severity='error' sx={ { mb: 2 } }>{ error }</Alert> }

        <TextField
          label='Название'
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
          fullWidth
          required
          margin='normal'
          slotProps={{
            htmlInput: { minLength: 3, maxLength: 100 }
          }}
        />

        <TextField
          label='Описание'
          value={ description }
          onChange={ (e) => setDescription(e.target.value) }
          fullWidth
          multiline
          rows={ 3 }
          margin='normal'
          slotProps={{
            htmlInput: { maxLength: 500 }
          }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={ isImportant }
              onChange={ (e) => setIsImportant(e.target.checked) }
            />
          }
          label='Важная задача'
        />

        <LocalizationProvider dateAdapter={ AdapterDateFns } adapterLocale={ ru }>
          <DateTimePicker
            label='Дедлайн'
            value={ deadline }
            onChange={ (newValue) => setDeadline(newValue) }
            slotProps={ {
              textField: {
                fullWidth: true,
                margin: 'normal',
              },
              actionBar: {
                actions: [ 'clear', 'accept' ],
              },
            } }
          />
        </LocalizationProvider>

        { !task.completed && (
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={ handleComplete }
              variant='outlined'
              color='success'
              fullWidth
              disabled={ loading }
            >
              Отметить как завершённую
            </Button>
          </Box>
        ) }
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleDelete } color='error' disabled={ loading }>
          Удалить
        </Button>
        <Button onClick={ onClose } disabled={ loading }>
          Отмена
        </Button>
        <Button onClick={ handleSave } variant='contained' disabled={ loading }>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
