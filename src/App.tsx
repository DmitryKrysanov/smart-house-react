import React from 'react';
import './App.scss';
import DeviceDetails from './components/DeviceDetails/DeviceDetails';
import { Switch, Route } from 'react-router-dom';
import { Oven, RobotHoover, DevicesState } from './redux/reducers/deviceReducer';
import { Dispatch } from './redux/store';
import { addDevice, turnOffAllDevices, turnOnOffDevice, setDevices } from './redux/actions/deviceActions/deviceActions';
import { connect } from 'react-redux';
import { showLoader, hideLoader } from './redux/actions/loaderActions/loaderActions';
import Devices from './components/Devices/Devices';

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
                loadDevices={props.loadDevices}
                showLoader={props.showLoader}
                hideLoader={props.hideLoader}

              />
            </Route>
            <Route path='/device/:deviceId'>
              <DeviceDetails 
              devices={props.devices} 
              deviceToggle={props.deviceToggle}
              />
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
  },
  showLoader: () => {
    return dispatch(showLoader());
  },
  hideLoader: () => {
    return dispatch(hideLoader());
  },
  loadDevices: (p: Array<Oven | RobotHoover>) => {
    return dispatch(setDevices(p));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
