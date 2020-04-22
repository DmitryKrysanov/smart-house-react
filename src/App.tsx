import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Devices from './components/Devices/Devices';
import DevicesHeader from './components/DevicesHeader/DevicesHeader'
import { routes } from './routes';
import DeviceDetails from './components/DeviceDetails/DeviceDetails';

const App = () => {

  return (
    <div>
      {/* <DevicesHeader /> */}
      <div className='wrapper'>
        <div className='content'>

          <Switch >
            <Route path={routes.home}>
              <DevicesHeader />
              <Devices />
            </Route>
            <Route path={`${routes.home}/:deviceId`}>
              <DeviceDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
