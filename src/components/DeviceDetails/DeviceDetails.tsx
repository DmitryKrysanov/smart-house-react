import React from 'react';
import style from './DeviceDetails.module.scss'
import DeviceDetailsHeader from './DeviceDetailsHeader/DeviceDetailsHeader';
import { Oven, RobotHoover, DevicesState } from '../../redux/reducers/deviceReducer';
import { useParams } from 'react-router-dom';
import RobotHooverContent from './RobotHooverContent/RobotHooverContent';
import OvenContent from './OvenContent/OvenContent'
import { connect } from 'react-redux';
import { Dispatch } from '../../redux/store';
import { turnOnOffDevice, removeDevice, updateOven, updateRobot } from '../../redux/actions/deviceActions/deviceActions';
import { PostOven, PostRobot } from '../../api/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert/Alert';
import { Loader } from '../Loader/Loader';
import { AlertState } from '../../redux/reducers/alertReducer';
import { LoaderState } from '../../redux/reducers/loaderReducer';

interface ConnectedProps {
    devices: Array<Oven | RobotHoover>,
    alert: string,
    isLoad: boolean
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;

const DeviceDetails = (props: ComponentProps) => {

    const match: any = useParams();
    const deviceId: number = +match.deviceId;
    const device: Oven | RobotHoover | undefined = props.devices.find(({ id }) => id === deviceId);  // can be undefined!

    const content = (device: Oven | RobotHoover | undefined): JSX.Element => {
        if (device === undefined) {
            return <p>Something went wrong</p>
        } else {
            if (device.category === 'oven') {
                const oven = device as Oven;
                return (
                    <OvenContent
                        device={oven}
                        deviceToggle={props.deviceToggle}
                        removeDevice={props.removeDevice}
                        updateOven={props.updateOven}
                    />
                )
            } else {
                const robotHoover = device as RobotHoover;
                return (
                    <RobotHooverContent
                        device={robotHoover}
                        deviceToggle={props.deviceToggle}
                        removeDevice={props.removeDevice}
                        updateRobot={props.updateRobot}
                    />
                )
            }
        }
    }

    return (
        <div>
            <DeviceDetailsHeader />
            <div className={style.device_details}>
                {content(device)}
            </div>
            {
                props.isLoad ?
                  <Loader /> : null
              }
              {props.alert.length === 0 ? null :
                <Snackbar open={true}>
                  <Alert text={props.alert} />
                </Snackbar>
              }
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
    deviceToggle: (id: number) => {
        return dispatch(turnOnOffDevice(id));
    },
    removeDevice: (id: number) => {
        return dispatch(removeDevice(id));
    },
    updateOven: (p: { device: PostOven, id: number }) => {
        return dispatch(updateOven(p));
    },
    updateRobot: (p: { device: PostRobot, id: number }) => {
        return dispatch(updateRobot(p));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetails);