import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import Home from './page/Home';
import {  Box, createTheme, IconButton, Tab, Tabs, ThemeProvider } from '@mui/material';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HomeIcon from '@mui/icons-material/Home';

export const Pages = ['Page1', 'Page2', 'Page3'];

// https://colorhunt.co/palette/2b3a55ce7777e8c4c4f2e5e5

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#CE7777',
      },
    },
  });

  const [selectedTab, setSelectedTab] = useState('Home');
  const [isBackToTopButtonShow, setIsBackToTopButtonShow] = useState<boolean>(false);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkScroll = () => {
    if (window.scrollY > 100) {
      setIsBackToTopButtonShow(true);
    } else {
      setIsBackToTopButtonShow(false);
    }
  };

  const handleTabClick = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const getPage = (page: string) => {
    switch(page) {
      case 'Home':
        return <Home />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    AOS.init();
    window.addEventListener('scroll', checkScroll)
  }, [])

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100vw', backgroundColor: '#2B3A55' }}>
          <Tabs value={selectedTab} onChange={(event, newValue) => handleTabClick(event, newValue)} centered indicatorColor='primary'>
            <Tab label={<span className='Tab'>HOME</span>} value='Home' icon={<HomeIcon className='Tab' />} iconPosition='start' />
            {
              Pages.map(tab =>
                <Tab key={tab} label={<span className='Tab'>{tab}</span>} value={tab} />
              )
            }
          </Tabs>
        </Box>
      </ThemeProvider>
      {getPage(selectedTab)}
      {isBackToTopButtonShow ?
        <div className='BackToTop'>
          <IconButton onClick={() => backToTop()}>
            <KeyboardDoubleArrowUpIcon />
          </IconButton>
        </div> : null
      }
    </div>
  );
}

export default App;
