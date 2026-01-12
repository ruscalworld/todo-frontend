import { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { isAuthenticated } from '~/lib/auth/token'
import { AppBar } from './AppBar'
import { Box } from '@mui/material'

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [ isChecking, setIsChecking ] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
    } else {
      setIsChecking(false)
    }
  }, [ navigate ])

  if (isChecking) {
    return null
  }

  return (
    <>
      <AppBar/>
      <Box component='main' sx={{ pt: 8, px: 2 }}>
        { children }
      </Box>
    </>
  )
}
