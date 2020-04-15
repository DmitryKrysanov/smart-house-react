import React, { Fragment, useState, useEffect } from 'react';
import { Oven, RobotHoover, DevicesState, deviceReducer } from '../../redux/reducers/deviceReducer';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import style from './DevicesList.module.scss';
import Pagination from './Pagination';
import { Dispatch } from '../../redux/store';
import { addDevice, SetCurrentPage, setDevices, fetchDevices } from '../../redux/actions/deviceActions/deviceActions';
import { connect } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/actions/loaderActions/loaderActions';
import { devicesAPI } from '../../api/api';

interface ConnectedProps {
    devices: Array<Oven | RobotHoover>,
    totalPages: number,
    page: number,
    perPage: number
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;

const DevicesList = (props: ComponentProps) => {

    const [page, setPage] = useState(2);
    const [totalPages, setTotalPages] = useState(0);

    const onChangePage = async (number: number): Promise<void> => {
        setPage(number);
        const devs: any = await devicesAPI.serverDevices(number);
        props.loadDevices(devs.data);
    }

    useEffect(() => {
        props.fetchingDevices()
    }, []);

    console.log(props.devices);

    const renderDevices = props.devices.map(device => (
        <Fragment key={device.id}>
            <Link to={`/home/devices/${device.id}`}>
                <Card device={device} />
            </Link>
        </Fragment>));

    return (
        <div className={style.collection}>
            {renderDevices}
            {/* <div className={style.pagination_buttons}>
                <Pagination totalPages={props.totalPages}
                    page={props.page} onChangePage={onChangePage} />
            </div> */}

        </div>
    )
}

const mapStateToProps = (state: { deviceReducer: DevicesState }): ConnectedProps => {
    return ({
        totalPages: state.deviceReducer.totalPages,
        page: state.deviceReducer.page,
        perPage: state.deviceReducer.perPage,
        devices: state.deviceReducer.devices
    });
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showLoader: () => {
        return dispatch(showLoader());
    },
    hideLoader: () => {
        return dispatch(hideLoader());
    },
    loadDevices: (p: Array<Oven | RobotHoover>) => {
        return dispatch(setDevices(p));
    },
    setCurrentPage: (p: number) => {
        return dispatch(SetCurrentPage(p))
    },
    fetchingDevices: () => {
        return dispatch(fetchDevices());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DevicesList);