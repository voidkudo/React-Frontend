import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import Home from './page/Home';
import { IconButton } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import TopBar from './component/TopBar';
import Footer from './page/section/Footer';

export const Pages = ['about'];

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
        <Route path='/about' element={<Home />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
      <Footer />
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
