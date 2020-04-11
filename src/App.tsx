import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Devices from './components/Devices/Devices';
import DevicesHeader from './components/DevicesHeader/DevicesHeader';
import Filter from './components/Tabs/Filter';

const App = () => {

  return (
    <div>
      {/* <DevicesHeader /> */}
      <div className='wrapper'>
        <div className='content'>
        {/* <Filter /> */}
          <Switch >
            <Route path='/home/devices'>
              <Devices />
            </Route>
            <Route path='/home/device/:deviceId'>
              {/* <DeviceDetails
                devices={props.devices}
                deviceToggle={props.deviceToggle}
                removeDevice={props.removeDevice}
              /> */}
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
