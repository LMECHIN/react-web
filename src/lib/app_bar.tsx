import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const drawerWidth = 240

export default function DrawerAppBar(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleItemClick = (item: string) => {
    if (item === 'Home') {
      navigate('/home')
    }
    if (item === 'Profile') {
      navigate('/profile')
    }
    setMobileOpen(false)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav' style={{ backgroundColor: '#000000DB' }}>
        <Toolbar>
          <img
            src={`${process.env.PUBLIC_URL}/home.png`}
            alt='Logo'
            style={{
              height: '40px',
              marginRight: '10px',
              transition: 'transform 0.3s',
            }}
            onClick={() => handleItemClick('Home')}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.1)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <Box sx={{ marginLeft: 'auto' }}>
            <img
              src={`${process.env.PUBLIC_URL}/settings.png`}
              alt='Logo'
              style={{
                height: '40px',
                marginRight: '10px',
                transition: 'transform 0.3s',
              }}
              onClick={() => handleItemClick('Profile')}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        ></Drawer>
      </nav>
    </Box>
  )
}
