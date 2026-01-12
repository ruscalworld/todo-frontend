import { type FormEvent, useState } from 'react'
import { TextField, Button, Box, Typography, Alert } from '@mui/material'
import { authApi } from '~/lib/api/auth.api'
import { setToken } from '~/lib/auth/token'
import { useNavigate } from 'react-router'
import { parseApiError } from '~/utils/errorUtils'

export function LoginForm() {
  const navigate = useNavigate()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authApi.login({ username: email, password })
      setToken(response.access_token)
      navigate('/')
    } catch (err: any) {
      setError(parseApiError(err, 'Ошибка входа'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component='form' onSubmit={ handleSubmit } sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Вход
      </Typography>

      { error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert> }

      <TextField
        label='Email'
        type='email'
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        fullWidth
        required
        margin='normal'
      />

      <TextField
        label='Пароль'
        type='password'
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        fullWidth
        required
        margin='normal'
      />

      <Button
        type='submit'
        variant='contained'
        fullWidth
        sx={{ mt: 2 }}
        loading={ loading }
      >
        Войти
      </Button>

      <Button
        type='button'
        onClick={ () => navigate('/register') }
        fullWidth
        sx={{ mt: 1 }}
      >
        Нет аккаунта? Зарегистрируйтесь
      </Button>
    </Box>
  )
}
