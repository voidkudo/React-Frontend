import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import Home from './section/Home';
import Section1 from './section/Section1';
import { IconButton } from '@mui/material';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function App() {
  const [isBackToTopButtonShow, setIsBackToTopButtonShow] = useState<boolean>(false);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkScroll = () => {
    if (window.scrollY > 250) {
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
    <div>
      <Home />
      <div className='HorizontalLine' />
      <Section1 />
      <div className='HorizontalLine' />
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
