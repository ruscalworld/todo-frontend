export interface TaskStats {
  total_tasks: number
  by_quadrant: { [key: string]: number }
  by_status: {
    completed: number
    pending: number
  }
}

export interface DeadlineStats {
  completed_on_time: number
  completed_late: number
  on_plan_pending: number
  overtime_pending: number
}
