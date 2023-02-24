import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import Home from './page/Home';
import { AppBar, createTheme, IconButton, ThemeProvider, Toolbar } from '@mui/material';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
// https://colorhunt.co/palette/2b3a55ce7777e8c4c4f2e5e5

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2B3A55',
      },
    },
  });

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

  useEffect(() => {
    AOS.init();
    window.addEventListener('scroll', checkScroll)
  }, [])

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <AppBar className='AppBar' position='sticky' color='primary'>
          <Toolbar>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Home />
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
