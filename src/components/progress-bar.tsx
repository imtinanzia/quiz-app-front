import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

type ProgressProps = {
  children?: React.ReactNode;
};

const ProgressBar = ({ children }: ProgressProps): JSX.Element => {
  const [progress, setProgress] = useState<boolean>(false);
  const [prevLoc, setPrevLoc] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc('');
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return (
    <React.Fragment>
      {progress && <TopBarProgress />}
      {children}
    </React.Fragment>
  );
};

export default ProgressBar;
