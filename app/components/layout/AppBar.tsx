import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router'
import { clearToken } from '~/lib/auth/token'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { CreateTaskDialog } from '~/components/tasks/CreateTaskDialog'

export function AppBar() {
  const navigate = useNavigate()
  const [ createDialogOpen, setCreateDialogOpen ] = useState(false)

  const handleLogout = () => {
    clearToken()
    navigate('/login')
  }

  return (
    <>
      <MuiAppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 0, mr: 4 }}>
            ToDo App
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button color='inherit' onClick={ () => navigate('/') }>
              Сегодня
            </Button>
            <Button color='inherit' onClick={ () => navigate('/matrix') }>
              Матрица
            </Button>
            <Button color='inherit' onClick={ () => navigate('/search') }>
              Поиск
            </Button>
            <Button color='inherit' onClick={ () => navigate('/stats') }>
              Статистика
            </Button>
          </Box>

          <Button
            color='inherit'
            startIcon={ <AddIcon/> }
            sx={ { mr: 2 } }
            onClick={ () => setCreateDialogOpen(true) }
          >
            Создать задачу
          </Button>

          <Button color='inherit' onClick={ handleLogout }>
            Выход
          </Button>
        </Toolbar>
      </MuiAppBar>

      <CreateTaskDialog
        open={ createDialogOpen }
        onClose={ () => setCreateDialogOpen(false) }
      />
    </>
  )
}
