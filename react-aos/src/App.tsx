import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import Home from './section/Home';
import Section1 from './section/Section1';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='App'>
      <Home />
      <Section1 />
    </div>
  );
}

export default App;
