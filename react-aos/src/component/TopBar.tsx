import { Box, createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import { Pages } from "../App";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TopBar() {
  const navigate = useNavigate();

  const currentPage = Pages.includes(window.location.pathname.replace('/', '')) ? window.location.pathname.replace('/', '') : 'home';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#CE7777',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ position: 'fixed', width: '100vw', backgroundColor: '#2B3A55' }}>
        <Tabs value={currentPage} onChange={(event, newValue) => navigate('/' + newValue)} centered indicatorColor='primary'>
          <Tab label={<span className='Tab'>HOME</span>} value='home' icon={<HomeIcon className='Tab' />} iconPosition='start' />
          {
            Pages.map(tab =>
              <Tab key={tab} label={<span className='Tab'>{tab.toUpperCase()}</span>} value={tab} />
            )
          }
        </Tabs>
      </Box>
    </ThemeProvider>
  )
};