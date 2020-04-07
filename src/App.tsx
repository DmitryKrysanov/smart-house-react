import React from 'react';
import Devices from './components/Devices/Devices';
import './App.scss';
import DeviceDetails from './components/DeviceDetails/DeviceDetails';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <div className='wrapper'>
        <div className='content'>
          <Switch>
            <Route path='/home'>
              <Devices />
            </Route>
            <Route path='/id'>
              <DeviceDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;