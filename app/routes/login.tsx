import { Container } from '@mui/material'
import { LoginForm } from '~/components/auth/LoginForm'
import type { Route } from './+types/login'

export const meta: Route.MetaFunction = () => [
  { title: 'Вход | Матрица Эйзенхауэра' },
]

export default function LoginPage() {
  return (
    <Container>
      <LoginForm/>
    </Container>
  )
}
