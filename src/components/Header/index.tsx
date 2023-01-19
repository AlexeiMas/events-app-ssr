import React from "react";
import Link from "next/link";
import {AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import DrawerContent from "./DrawerContent";
import MenuIcon from '@mui/icons-material/Menu';
import {TNavItems} from "../../../types/structureTypes";
import {ColorModeContext} from "../../layouts/MainLayout";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext)

  const navItems: TNavItems = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Events',
      link: '/events'
    },
    {
      title: 'About Us',
      link: '/about-us'
    }
  ]

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);

  };

  const themeSwitcher = React.useMemo(() => {
    return (theme.palette.mode === 'dark' ? <Brightness7Icon onClick={colorMode} /> : <Brightness4Icon onClick={colorMode} />)
  }, [theme.palette.mode, colorMode])

  return (
    <>
      <AppBar component="nav" color={"default"} enableColorOnDark>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, userSelect: "none" }}
          >
            EVENTS
            {themeSwitcher}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({title, link}) => (
              <Button key={link} component={Link} href={link}>
                {title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerContent navItems={navItems} handleDrawerToggle={handleDrawerToggle} themeSwitcher={themeSwitcher}/>
        </Drawer>
      </Box>
    </>
  )
}
