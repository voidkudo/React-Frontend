import { Pause } from "@mui/icons-material";
import { Button, createTheme, LinearProgress, Tab, Tabs, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

enum FocusMode {
  FOCUS = 'FOCUS',
  BREAK = 'BREAK',
}

export default function Focus() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0073B7',
      },
    },
  });

  const [focusMode, setFocusMode] = useState(FocusMode.FOCUS);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [countDown, setCountDown] = useState(0);

  const modeList = Object.values(FocusMode) as Array<string>;

  const handleStartClick = () => {
    setIsStarted(true);
    setCountDown(timer);
  };

  const handlePauseResumeClick = () => {
    setIsPaused(!isPaused);
  };

  const handleResetClick = () => {
    setIsStarted(false);
    setIsPaused(false);
    setCountDown(0);
  };

  const setNextFocusMode = () => {
    switch (focusMode) {
      case FocusMode.FOCUS:
        setFocusMode(FocusMode.BREAK);
        break;
      case FocusMode.BREAK:
        setFocusMode(FocusMode.FOCUS);
        break;
      default:
        setFocusMode(FocusMode.FOCUS);
        break;
    }
  };

  useEffect(() => {
    if (focusMode === FocusMode.FOCUS) {
      setTimer(25 * 60);
    }
    else if (focusMode === FocusMode.BREAK) {
      setTimer(10 * 60);
    }
  }, [focusMode]);

  useEffect(() => {
    if (!isPaused && countDown > 0) {
      const countDownTimer = setTimeout(() => {
        setCountDown(countDown - 1);
        if (countDown - 1 === 0) {
          setIsStarted(false);
          setIsPaused(false);
          setNextFocusMode();
        }
      }, 1000);
      return () => clearTimeout(countDownTimer);
    }
  }, [countDown, isPaused]);

  return (
    <ThemeProvider theme={theme}>
      <div className='Focus'>
        <Tabs value={focusMode} onChange={(event, newValue) => setFocusMode(newValue)}>
          {
            modeList.map(mode => (
              <Tab key={mode} label={mode} value={mode} disabled={isStarted} />
            ))
          }
        </Tabs>
        {
          isStarted ?
            <h1>{(Math.floor(countDown / 60)).toString().padStart(2, '0') + ':' + (countDown % 60).toFixed(0).toString().padStart(2, '0')}</h1> :
            <h1>{(Math.floor(timer / 60)).toString().padStart(2, '0') + ':' + (timer % 60).toFixed(0).toString().padStart(2, '0')}</h1>
        }
        <LinearProgress className='TimeProgress' variant='determinate' value={((timer - countDown) / timer) * 100} />
        {
          isStarted ?
            (
              <div className='TimerControlContainer'>
                <Button style={{ margin: '0 2%' }} variant='outlined' onClick={() => handlePauseResumeClick()}>{isPaused ? 'Resume' : 'Pause'}</Button>
                <Button style={{ margin: '0 2%' }} variant='outlined' onClick={() => handleResetClick()}>Reset</Button>
              </div>
            ) :
            <Button style={{ margin: '0 2%' }} variant='outlined' onClick={() => handleStartClick()}>Start</Button>
        }
      </div>
    </ThemeProvider>
  )
};