import React, { Fragment } from 'react';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import style from './DevicesList.module.scss';
import Pagination from './Pagination';
import EmptyState from './EmptyState';


interface Props {
    devices: Array<Oven | RobotHoover>
}

const DevicesList = (props: Props) => {

    const renderDevices = props.devices.map(device => (
        <Fragment key={device.id}>
            <Link to={`/home/device/${device.id}`}>
                <Card device={device} />
            </Link>
        </Fragment>));

    return (
        <>
            {props.devices.length === 0 ?
                <EmptyState /> :
                <>
                    <div className={style.collection}>
                        {renderDevices}
                    </div>

                    <div className={style.pagination_buttons}>
                        <Pagination />
                    </div>
                </>}
        </>

    )
}

export default DevicesList;