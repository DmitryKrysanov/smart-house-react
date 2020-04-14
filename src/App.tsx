import React from 'react';
import './App.scss';
import { Switch, Route, Link } from 'react-router-dom';
import Devices from './components/Devices/Devices';
import DevicesHeader from './components/DevicesHeader/DevicesHeader';
import Filter from './components/Tabs/Filter';
import { routes } from './routes';
import { OvenFilter } from './components/Devices/OvenFilter';
import { RobotFilter } from './components/Devices/RobotFilter';
import { IconButton } from '@material-ui/core';

const App = () => {

  return (
    <div>
      <DevicesHeader />
      <div className='wrapper'>
        <div className='content'>
          {/* <Filter /> */}
          <Switch >
            <Route path={routes.allDevices}>
              <Devices />
            </Route>
            {/* <Route path={routes.ovens}>
              <OvenFilter />
            </Route>
            <Route path={routes.robots}>
              <RobotFilter />
            </Route> */}
            <Route path={routes.deviceDetails}>
              <div>
                <Link to={'/home/devices'}>
                  <IconButton> Back </IconButton>
                </Link>
                <br />
                Details of some device...
              </div>
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
