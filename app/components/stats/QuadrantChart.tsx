import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Paper, Typography, Box } from '@mui/material'
import type { TaskStats } from '~/types/stats'
import { quadrants } from '~/utils/quadrants'

interface QuadrantChartProps {
  stats: TaskStats
}

export function QuadrantChart({ stats }: QuadrantChartProps) {
  const data = quadrants
    .map(q => ({
      name: q.title,
      value: stats.by_quadrant[q.id],
      quadrant: q.id,
      color: q.color,
    }))
    .filter(item => item.value > 0)

  if (data.length === 0) {
    return (
      <Paper sx={ { p: 3 } }>
        <Typography variant='h6' gutterBottom>
          Распределение по квадрантам
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={ { textAlign: 'center', py: 4 } }>
          Нет данных
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Распределение по квадрантам
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
              { data.map((entry) => (
                <Cell key={ entry.quadrant } fill={ entry.color }/>
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
