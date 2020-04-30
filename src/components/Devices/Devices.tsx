import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { RobotHoover, Oven, DevicesState } from '../../redux/reducers/deviceReducer'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from './Filter/Filter';
import { addDevice, fetchDevices, addSagaOven, addSagaRobot } from '../../redux/actions/deviceActions/deviceActions';
import DevicesHeader from './DevicesHeader/DevicesHeader'
import Fab from '@material-ui/core/Fab';
import { Loader } from '../Loader/Loader';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import DevicesList from './DeviceList/DevicesList';
import { Switch, Route} from 'react-router-dom';
import { PostOven, PostRobot } from '../../api/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert/Alert';

interface ConnectedProps {
  devices: Array<Oven | RobotHoover>
  // currentType: string
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;

const Devices = (props: ComponentProps) => {

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ open, setOpen ] = useState(true);

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
          addDevice={props.addResourse}
          addSagaOven={props.addSagaOven}
          addSagaRobot={props.addSagaRobot}
        />,
        document.getElementById('modal-root') as HTMLInputElement
      ) : null}
      <Fragment>
        <div>
          {/* {
            isLoading ?
              <Loader /> : null
          } */}
          <Switch>
            <Route path='/home/devices/:deviceType'>
              <DevicesList devices={props.devices} />
            </Route>
          </Switch>
        </div>
      </Fragment>
      {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert text={'Alert text'}/>
      </Snackbar> */}
    </div>
  )
}

const mapStateToProps = (state: { deviceReducer: DevicesState }): ConnectedProps => {
  return ({
    devices: state.deviceReducer.devices
    //  currentType: state.deviceReducer.devicesType
  });
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addResourse: (p: Oven | RobotHoover) => {
    return dispatch(addDevice(p))
  },
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