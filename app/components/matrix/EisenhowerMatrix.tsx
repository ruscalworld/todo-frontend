import { Grid } from '@mui/material'
import { MatrixQuadrant } from './MatrixQuadrant'
import type { Task } from '~/types/task'
import { quadrants } from '~/utils/quadrants'

interface EisenhowerMatrixProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

export function EisenhowerMatrix({ tasks, onTaskClick }: EisenhowerMatrixProps) {
  const tasksByQuadrant = Object.fromEntries(quadrants.map((quadrant) => {
    return [ quadrant.id, tasks.filter((t) => t.quadrant === quadrant.id && !t.completed) ]
  }))

  return (
    <Grid container spacing={ 2 }>
      { quadrants.map((quadrant) => (
        <Grid size={{ xs: 12, md: 6 }} key={ quadrant.id }>
          <MatrixQuadrant
            title={ quadrant.title }
            tasks={ tasksByQuadrant[quadrant.id] }
            onTaskClick={ onTaskClick }
            color={ quadrant.color }
          />
        </Grid>
      )) }
    </Grid>
  )
}
