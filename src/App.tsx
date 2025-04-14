import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigation from './navigation/Navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App; 