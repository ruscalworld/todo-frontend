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
  Alert,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ru } from 'date-fns/locale'
import { useTaskMutation } from '~/hooks/useTaskMutation'
import { parseApiError } from '~/utils/errorUtils'
import { dateToLocalISOString } from '~/utils/dateUtils'

interface CreateTaskDialogProps {
  open: boolean
  onClose: () => void
}

export function CreateTaskDialog({ open, onClose }: CreateTaskDialogProps) {
  const { createTask } = useTaskMutation()
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ isImportant, setIsImportant ] = useState(false)
  const [ deadline, setDeadline ] = useState<Date | null>(null)
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if (open && !deadline) {
      setDeadline(new Date())
    }
  }, [ open, deadline ])

  const handleCreate = async () => {
    if (!deadline) {
      setError('Укажите дедлайн')
      return
    }

    setError('')
    setLoading(true)

    try {
      await createTask({
        title,
        description: description || null,
        is_important: isImportant,
        deadline_at: dateToLocalISOString(deadline),
      })
      setTitle('')
      setDescription('')
      setIsImportant(false)
      setDeadline(null)
      onClose()
    } catch (err: any) {
      setError(parseApiError(err, 'Ошибка при создании'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={ open } onClose={ onClose } maxWidth='sm' fullWidth>
      <DialogTitle>Создать задачу</DialogTitle>
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
            label='Дедлайн *'
            value={ deadline }
            onChange={ (newValue) => setDeadline(newValue) }
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                required: true,
              },
            }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose } disabled={ loading }>
          Отмена
        </Button>
        <Button
          onClick={ handleCreate }
          variant='contained'
          disabled={ loading || !title || !deadline }
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  )
}
