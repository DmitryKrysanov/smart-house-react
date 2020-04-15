import React from 'react';
import './App.scss';
import { Switch, Route, Link } from 'react-router-dom';
import Devices from './components/Devices/Devices';
import DevicesHeader from './components/DevicesHeader/DevicesHeader'
import { routes } from './routes';

const App = () => {

  return (
    <div>
      <DevicesHeader />
      <div className='wrapper'>
        <div className='content'>

          <Switch >
            <Route path={routes.home}>
              <Devices />
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
