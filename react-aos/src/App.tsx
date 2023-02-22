import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import Home from './section/Home';
import Section1 from './section/Section1';
import { IconButton } from '@mui/material';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function App() {
  const backToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='App'>
      <Home />
      <Section1 />
      <div className='BackToTop'>
        <IconButton onClick={() => backToTop()}>
          <KeyboardDoubleArrowUpIcon/>
        </IconButton>
      </div>
    </div>
  );
}

export default App;
