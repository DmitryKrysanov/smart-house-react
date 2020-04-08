import React, { Fragment } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import style from './DeviceDetails.module.scss'
import DeviceDetailsHeader from '../DeviceDetailsHeader/DeviceDetailsHeader';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { useParams } from 'react-router-dom';
import { devicesAPI } from '../../api/api';
import Modes from './Modes/Modes';
import Temperature from './Temperature/Temperature';
import Image from './Image/Image';
import GeneralInfo from './GeneralInfo/GeneralInfo';

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
                    <Fragment>
                        <Image image={oven.image} />
                        <div className={style.device_details__content}>
                            <GeneralInfo device={oven} deviceToggle={props.deviceToggle}/>
                            <Temperature temp={oven.temp} />
                            <Modes modes={oven.modes} />
                            {remove()}
                        </div>
                    </Fragment>
                )
            } else {
                const robotHoover = device as RobotHoover;
                return (
                    <Fragment>
                        <Image image={robotHoover.image} />
                        <div className={style.device_details__content}>
                        <GeneralInfo device={robotHoover} deviceToggle={props.deviceToggle}/>
                            <Modes modes={robotHoover.modes} />
                            {remove()}
                        </div>
                    </Fragment>
                )
            }
        }
    }

    const remove = (): JSX.Element => {
        return (
            <div className={style.row}>
                <h6>Remove device</h6>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={handleDelete}>
                    <DeleteIcon />
                </Button>
            </div>
        )
    }

    const handleDelete = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (typeof device != 'undefined') {
            await devicesAPI.deleteDevice(device.id);
            console.log(device, device.id);
            props.removeDevice(device.id);
        } else {
            console.log('nothing to delete');
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