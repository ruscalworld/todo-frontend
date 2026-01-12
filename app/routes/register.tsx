import { Container } from '@mui/material'
import { RegisterForm } from '~/components/auth/RegisterForm'
import type { Route } from './+types/register'

export const meta: Route.MetaFunction = () => [
  { title: 'Регистрация | Матрица Эйзенхауэра' },
]

export default function RegisterPage() {
  return (
    <Container>
      <RegisterForm/>
    </Container>
  )
}
