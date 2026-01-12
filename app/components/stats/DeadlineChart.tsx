import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Paper, Typography, Box } from '@mui/material'
import type { DeadlineStats } from '~/types/stats'

interface DeadlineChartProps {
  stats: DeadlineStats
}

export function DeadlineChart({ stats }: DeadlineChartProps) {
  const data = [
    { name: 'Завершено вовремя', value: stats.completed_on_time, color: '#4caf50' },
    { name: 'Завершено с опозданием', value: stats.completed_late, color: '#ff9800' },
    { name: 'В работе', value: stats.on_plan_pending, color: '#2196f3' },
    { name: 'Просрочено', value: stats.overtime_pending, color: '#f44336' },
  ].filter(item => item.value > 0)

  if (data.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          Статистика по дедлайнам
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
        Статистика по дедлайнам
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
