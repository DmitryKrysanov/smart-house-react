import React from 'react';
import Devices from './components/Devices/Devices';
import './App.scss';

const App = () => {
  return (
    <div>
      <div className='wrapper'>
        <div className='content'>
        <Devices />
        </div>
      </div>
    </div>
  );
}

export default App;
