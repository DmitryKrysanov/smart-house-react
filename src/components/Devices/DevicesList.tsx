import React, { Fragment } from 'react';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import style from './DevicesList.module.scss';

interface Props {
    devices: Array<Oven | RobotHoover>
}

const DevicesList = (props: Props) => {
    const devices = props.devices.map(device => (
        <Fragment key={device.id}>
            <Link to={`/home/devices/${device.id}`}>
                <Card device={device} />
            </Link>
        </Fragment>));

    return (
        <div className={style.collection}>{devices}</div>
    )
}

export default DevicesList;