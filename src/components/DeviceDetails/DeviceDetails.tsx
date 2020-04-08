import React from 'react';
// import Button from '@material-ui/core/Button';
// import DeleteIcon from '@material-ui/icons/Delete';
import style from './DeviceDetails.module.scss'
import DeviceDetailsHeader from '../DeviceDetailsHeader/DeviceDetailsHeader';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { useParams } from 'react-router-dom';
// import { devicesAPI } from '../../api/api';
// import Modes from './Modes/Modes';
// import Temperature from './Temperature/Temperature';
// import Image from './Image/Image';
// import GeneralInfo from './GeneralInfo/GeneralInfo';
import RobotHooverContent from './RobotHooverContent/RobotHooverContent';
import OvenContent from './OvenContent/OvenContent'

interface Props {
    devices: Array<Oven | RobotHoover>
    deviceToggle: (id: number) => void,
    removeDevice: (id: number) => void
}

interface MatchParams {

}

const DeviceDetails = (props: Props) => {

    const match: any = useParams();
    const deviceId: number = +match.deviceId;
    const device: Oven | RobotHoover | undefined = props.devices.find(({ id }) => id === deviceId);  // can be undefined!

    const content = (device: Oven | RobotHoover | undefined) => {
        if (device === undefined) {
            return <h4>Error</h4>
        } else {
            if (device.type === 'oven') {
                const oven = device as Oven;
                return (
                    <OvenContent 
                    device={oven} 
                    deviceToggle={props.deviceToggle} 
                    removeDevice={props.removeDevice} />
                )
            } else {
                const robotHoover = device as RobotHoover;
                return (
                    <RobotHooverContent 
                    device={robotHoover} 
                    deviceToggle={props.deviceToggle} 
                    removeDevice={props.removeDevice} />
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
        </div>
    )
}

export default DeviceDetails;