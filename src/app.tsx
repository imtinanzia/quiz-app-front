import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ProgressBar } from '@app/components';
import routes from '@app/routes';

const App = () => {
  const content = useRoutes(routes);

  return <ProgressBar>{content}</ProgressBar>;
};
export default App;
