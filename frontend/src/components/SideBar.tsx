import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard';


const generateListIcon = (text: string, icon: JSX.Element) => {
  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </>
  )
}

export const mainListItems = (
  <>
    {generateListIcon('nothing', <DashboardIcon />)}
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component='div' inset>
      Nothing
    </ListSubheader>
    {generateListIcon('nothing', <DashboardIcon />)}
  </>
);