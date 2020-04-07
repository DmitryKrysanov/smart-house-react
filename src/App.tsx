import React from 'react';
import Devices from './components/Devices/Devices';
import './App.scss';
import DeviceDetails from './components/DeviceDetails/DeviceDetails';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { Oven, RobotHoover, DevicesState } from './redux/reducers/deviceReducer';
import { Dispatch } from './redux/store';
import { addDevice, turnOffAllDevices, turnOnOffDevice } from './redux/actions/deviceActions/deviceActions';
import { connect } from 'react-redux';

interface ConnectedProps {
  devices: Array<Oven | RobotHoover>
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;


const App = (props: ComponentProps) => {
  return (
    <div>
      <div className='wrapper'>
        <div className='content'>
          <Switch >
            <Route path='/home'>
              <Devices 
              devices={props.devices} 
              addResourse={props.addResourse} 
              offDevices={props.offDevices} 
              deviceToggle={props.deviceToggle}
              />
            </Route>
            <Route path='/device/:deviceId'>
              <DeviceDetails devices={props.devices} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: { deviceReducer: DevicesState }): ConnectedProps => {
  return ({
      devices: state.deviceReducer.devices
  });
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addResourse: (p: Oven | RobotHoover) => {
      return dispatch(addDevice(p));
  },
  offDevices: () => {
      return dispatch(turnOffAllDevices());
  },
  deviceToggle: (id: number) => {
      return dispatch(turnOnOffDevice(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);