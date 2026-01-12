import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Paper, Typography, Box } from '@mui/material'
import type { TaskStats } from '~/types/stats'

interface StatusChartProps {
  stats: TaskStats
}

export function StatusChart({ stats }: StatusChartProps) {
  const data = [
    { name: 'Завершено', value: stats.by_status.completed, color: '#4caf50' },
    { name: 'В работе', value: stats.by_status.pending, color: '#2196f3' },
  ].filter(item => item.value > 0)

  if (data.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          Статус задач
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 4 }}>
          Нет данных
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Статус задач
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={ data }
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={ 80 }
              label
            >
              { data.map((data, index) => (
                <Cell key={ `cell-${ index }` } fill={ data.color }/>
              )) }
            </Pie>
            <Tooltip/>
            <Legend/>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}
