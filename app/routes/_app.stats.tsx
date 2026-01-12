import { Container, Typography, Box, Grid, CircularProgress, Paper } from '@mui/material'
import { useTaskStats, useDeadlineStats } from '~/hooks/useStats'
import { QuadrantChart } from '~/components/stats/QuadrantChart'
import { StatusChart } from '~/components/stats/StatusChart'
import { DeadlineChart } from '~/components/stats/DeadlineChart'

export default function StatsPage() {
  const { stats: taskStats, isLoading: taskStatsLoading } = useTaskStats()
  const { stats: deadlineStats, isLoading: deadlineStatsLoading } = useDeadlineStats()

  const isLoading = taskStatsLoading || deadlineStatsLoading

  if (isLoading) {
    return (
      <Container maxWidth='lg'>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress/>
        </Box>
      </Container>
    )
  }

  if (!taskStats || !deadlineStats) {
    return (
      <Container maxWidth='lg'>
        <Box sx={{ my: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Статистика
          </Typography>
          <Typography>Не удалось загрузить статистику</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth='lg'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Статистика
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant='h5' gutterBottom>
            Всего задач: { taskStats.total_tasks }
          </Typography>
        </Paper>

        <Grid container spacing={ 3 }>
          <Grid size={{ xs: 12, md: 6 }}>
            <QuadrantChart stats={ taskStats }/>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatusChart stats={ taskStats }/>
          </Grid>
          <Grid size={ 12 }>
            <DeadlineChart stats={ deadlineStats }/>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
