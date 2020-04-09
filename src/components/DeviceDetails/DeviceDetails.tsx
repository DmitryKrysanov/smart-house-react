import React from 'react';
import style from './DeviceDetails.module.scss'
import DeviceDetailsHeader from '../DeviceDetailsHeader/DeviceDetailsHeader';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { useParams } from 'react-router-dom';
import RobotHooverContent from './RobotHooverContent/RobotHooverContent';
import OvenContent from './OvenContent/OvenContent'

interface Props {
    devices: Array<Oven | RobotHoover>
    deviceToggle: (id: number) => void,
    removeDevice: (id: number) => void
}

const DeviceDetails = (props: Props) => {

    const match: any = useParams();
    const deviceId: number = +match.deviceId;
    const device: Oven | RobotHoover | undefined = props.devices.find(({ id }) => id === deviceId);  // can be undefined!

    const content = (device: Oven | RobotHoover | undefined): JSX.Element => {
        if (device === undefined) {
            return <p>Something went wrong</p>
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