export interface Task {
  id: number
  title: string
  description: string | null
  is_important: boolean
  is_urgent: boolean
  quadrant: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  completed: boolean
  deadline_at: string | null
  completed_at: string | null
  days_remaining: number | null
  created_at: string
}

export interface TaskCreateInput {
  title: string
  description: string | null
  is_important: boolean
  deadline_at: string
}

export interface TaskUpdateInput {
  title?: string
  description?: string
  is_important?: boolean
  deadline_at?: string | null
  completed?: boolean
}
