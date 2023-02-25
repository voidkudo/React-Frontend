import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import Home from './page/Home';
import { IconButton } from '@mui/material';
import { createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import TopBar from './component/TopBar';

export const Pages = ['page1', 'page2', 'page3'];

// https://colorhunt.co/palette/2b3a55ce7777e8c4c4f2e5e5

function App() {
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
      <TopBar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/page1' element={<Home />} />
        <Route path='/page2' element={<Home />} />
        <Route path='/page3' element={<Home />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
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
