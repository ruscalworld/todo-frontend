import { useState } from 'react'
import { TextField, Button, Box, Typography, Alert } from '@mui/material'
import { authApi } from '~/lib/api/auth.api'
import { setToken } from '~/lib/auth/token'
import { useNavigate } from 'react-router'
import { parseApiError } from '~/utils/errorUtils'

export function RegisterForm() {
  const navigate = useNavigate()
  const [ nickname, setNickname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authApi.register({ nickname, email, password })
      const loginResponse = await authApi.login({ username: email, password })
      setToken(loginResponse.access_token)
      navigate('/')
    } catch (err: any) {
      setError(parseApiError(err, 'Ошибка регистрации'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component='form' onSubmit={ handleSubmit } sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Регистрация
      </Typography>

      { error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert> }

      <TextField
        label='Никнейм'
        value={ nickname }
        onChange={ (e) => setNickname(e.target.value) }
        fullWidth
        required
        margin='normal'
        slotProps={{
          htmlInput: { minLength: 3, maxLength: 50 },
        }}
      />

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
        slotProps={{
          htmlInput: { minLength: 6 },
        }}
      />

      <Button
        type='submit'
        variant='contained'
        fullWidth
        loading={ loading }
        sx={{ mt: 2 }}
      >
        Зарегистрироваться
      </Button>

      <Button
        type='button'
        onClick={ () => navigate('/login') }
        fullWidth
        sx={{ mt: 1 }}
      >
        Уже есть аккаунт? Войдите
      </Button>
    </Box>
  )
}
