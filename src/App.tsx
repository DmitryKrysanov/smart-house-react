import React from 'react';
import Devices from './components/Devices/Devices';
import './App.scss';
import DeviceDetails from './components/DeviceDetails/DeviceDetails';

const App = () => {
  return (
    <div>
      <div className='wrapper'>
        <div className='content'>
        {/* <Devices /> */}
        <DeviceDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
