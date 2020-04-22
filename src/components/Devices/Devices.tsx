import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { RobotHoover, Oven, DevicesState } from '../../redux/reducers/deviceReducer'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Filter';
import { addDevice, fetchDevices } from '../../redux/actions/deviceActions/deviceActions';
import DevicesHeader from '../DevicesHeader/DevicesHeader'
import Fab from '@material-ui/core/Fab';
import { Loader } from '../Loader/Loader';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import DevicesList from './DevicesList';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { routes } from '../../routes';

interface ConnectedProps {
  devices: Array<Oven | RobotHoover>,
  currentType: string
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;
const Devices = (props: ComponentProps) => {

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { path, url } = useRouteMatch();

  const handleToggleDialog = (): void => {
    setShowModal(!showModal)
  }
  return (
    <div>
      <DevicesHeader />
      <div className={style.filter}>
        <Filter />
      </div>
      <div className={style.fab}>
        <Fab color="secondary" aria-label="add" onClick={handleToggleDialog}>
          <AddIcon color='inherit' />
        </Fab>
      </div>
      {showModal ? ReactDOM.createPortal(
        <AddDeviceContainer handleToggleDialog={handleToggleDialog} addDevice={props.addResourse} />,
        document.getElementById('modal-root') as HTMLInputElement
      ) : null}

      <Fragment>
        <div>
          {
            isLoading ?
              <Loader /> : null
          }

          <Switch>
            <Route path={routes.allDevices}>
              <DevicesList devices={props.devices} />
            </Route>

            <Route path={routes.ovens}>
              <DevicesList devices={props.devices} />
            </Route>

            <Route path={routes.robots}>
              <DevicesList devices={props.devices} />
            </Route>
          </Switch>
        </div>
      </Fragment>
    </div>
  )
}

const mapStateToProps = (state: { deviceReducer: DevicesState }): ConnectedProps => {
  return ({
    devices: state.deviceReducer.devices,
    currentType: state.deviceReducer.devicesType
  });
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addResourse: (p: Oven | RobotHoover) => {
    return dispatch(addDevice(p))
  },
  getAllDevices: () => {
    return dispatch(fetchDevices());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);