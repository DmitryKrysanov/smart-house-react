import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { RobotHoover, Oven, DevicesState } from '../../redux/reducers/deviceReducer'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from './Filter/Filter';
import { fetchDevices, addSagaOven, addSagaRobot } from '../../redux/actions/deviceActions/deviceActions';
import DevicesHeader from './DevicesHeader/DevicesHeader'
import Fab from '@material-ui/core/Fab';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import DevicesList from './DeviceList/DevicesList';
import { Switch, Route } from 'react-router-dom';
import { PostOven, PostRobot } from '../../api/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert/Alert';
import { AlertState } from '../../redux/reducers/alertReducer';
import { LoaderState } from '../../redux/reducers/loaderReducer';
import { Loader } from '../Loader/Loader';

interface ConnectedProps {
  devices: Array<Oven | RobotHoover>,
  alert: string,
  isLoad: boolean
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;

const Devices = (props: ComponentProps) => {

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(true);

  const handleToggleDialog = (): void => {
    setShowModal(!showModal)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
        <AddDeviceContainer
          handleToggleDialog={handleToggleDialog}
          addSagaOven={props.addSagaOven}
          addSagaRobot={props.addSagaRobot}
        />,
        document.getElementById('modal-root') as HTMLInputElement
      ) : null}
      <Fragment>
        <div>
          {
            props.isLoad ?
              <Loader /> : null
          }
          {props.alert.length === 0 ? null :
            <Snackbar open={true}>
              <Alert text={props.alert} />
            </Snackbar>
          }
          <Switch>
            <Route path='/home/devices/:deviceType'>
              <DevicesList devices={props.devices} />
            </Route>
          </Switch>
        </div>
      </Fragment>
    </div>
  )
}

const mapStateToProps = (state: {
  deviceReducer: DevicesState,
  alertReducer: AlertState,
  loaderReducer: LoaderState
}): ConnectedProps => {
  return ({
    devices: state.deviceReducer.devices,
    alert: state.alertReducer.alert,
    isLoad: state.loaderReducer.isLoad
  });
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllDevices: () => {
    return dispatch(fetchDevices())
  },
  addSagaOven: (p: PostOven) => {
    return dispatch(addSagaOven(p))
  },
  addSagaRobot: (p: PostRobot) => {
    return dispatch(addSagaRobot(p))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);