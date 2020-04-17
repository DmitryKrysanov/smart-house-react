import React from 'react';
import './App.scss';
import { Switch, Route, Link } from 'react-router-dom';
import Devices from './components/Devices/Devices';
import DevicesHeader from './components/DevicesHeader/DevicesHeader'
import { routes } from './routes';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
            <Route path='/home/device/:deviceId'>
              <DeviceDetails />
              {/* <div>
                <Link to={routes.allDevices}>
                  <IconButton> <ArrowBackIcon /> </IconButton>
                </Link>
                <br />
                Details of some device...
              </div> */}
            </Route>

            {/* <Route path='/home/devices/:deviceId'>
              <div>
                <Link to={routes.allDevices}>
                  <IconButton> Back </IconButton>
                </Link>
                <br />
                Details of some device...
              </div>
            </Route> */}

          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
