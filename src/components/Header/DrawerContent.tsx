import React from 'react';
import {Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import Link from "next/link";
import {TNavItems} from "../../../types/structureTypes";

export type TDrawerContent = {
  navItems: TNavItems,
  handleDrawerToggle: () => void,
  themeSwitcher:  JSX.Element
}

const DrawerContent = ({navItems, handleDrawerToggle, themeSwitcher}: TDrawerContent) => {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        EVENTS
        {themeSwitcher}
      </Typography>
      <Divider />
      <List>
        {navItems.map(({title, link}) => (
          <ListItem key={link} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} href={link}>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrawerContent;