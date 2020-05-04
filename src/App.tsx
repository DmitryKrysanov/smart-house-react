import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Devices from './components/Devices/Devices';
import DevicesHeader from './components/Devices/DevicesHeader/DevicesHeader'
import { routes } from './routes';
import DeviceDetails from './components/DeviceDetails/DeviceDetails';
import ErrorPage from './components/ErrorPage';

const App = () => {

  return (
    <div>
      <div className='wrapper'>
        <div className='content'>

          <Switch >
            <Route path='/home/devices/:deviceType'>
              <Devices />
            </Route>
            <Route path='/home/device/:deviceId'>
              <DeviceDetails />
            </Route>
            <Route path='/'>
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
