import { ToggleButtonGroup, ToggleButton } from '@mui/material'

interface TaskStatusFilterProps {
  value: 'all' | 'pending' | 'completed'
  onChange: (value: 'all' | 'pending' | 'completed') => void
}

export function TaskStatusFilter({ value, onChange }: TaskStatusFilterProps) {
  return (
    <ToggleButtonGroup
      value={ value }
      exclusive
      onChange={ (_, newValue) => {
        if (newValue !== null) {
          onChange(newValue)
        }
      } }
      size='small'
    >
      <ToggleButton value='all'>
        Все
      </ToggleButton>
      <ToggleButton value='pending'>
        Активные
      </ToggleButton>
      <ToggleButton value='completed'>
        Завершённые
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
