import React, { Fragment } from 'react';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import style from './DevicesList.module.scss';
import Pagination from './Pagination';

interface Props {
    page: number;
    totalPages: number;
    devices: Array<Oven | RobotHoover>

}

const DevicesList = (props: Props) => {
    const devices = props.devices.map(device => (
        <Fragment key={device.id}>
            <Link to={`/${device.id}`}>
                <Card device={device} />
            </Link>
        </Fragment>));

    return (
        <div className={style.collection}>
            {devices}
            {console.log(props.page, props.totalPages)}
            {/* <div className={style.pagination_buttons}>
                <Pagination totalPages={props.totalPages}
                    page={props.page} onChangePage={() => { }} />
            </div> */}

        </div>
    )
}

export default DevicesList;