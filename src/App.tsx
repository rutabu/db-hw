import React,  { FC } from 'react';
import { Container } from '@material-ui/core';
import Credit from './components/Credit/Credit';

const App: FC = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Credit />
    </Container>
  );
}

export default App;
