import React, { Component, useState } from 'react';
import { devicesAPI } from '../../api/api';
import style from './Pagination.module.scss';
import { render } from '@testing-library/react';
import { Dispatch } from '../../redux/store';
import { DevicesState, Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { setDevices, SetCurrentPage } from '../../redux/actions/deviceActions/deviceActions';
import { connect } from 'react-redux';


interface ConnectedProps {
    totalPages: number,
    page: number,
    perPage: number,
    devicesType: string,
    totalItems: number
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;

const Pagination = (props: ComponentProps) => {

    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(props.totalItems / 4); i++) {
        pageNumbers.push(i);
    }

    const onChangePage = async (number: number): Promise<void> => {
        props.setCurrentPage(number);
        const devs: any = await devicesAPI.filter(props.page, props.devicesType);
        props.loadDevices(devs.data);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <button className={number === props.page
                ? `${style.pagination_btn} ${style.active}`
                : style.pagination_btn}
                onClick={() => { onChangePage(number) }} >
                {number}
            </button>
        );
    });

    return (
        <div>
            {/* {pageNumbers.length <= 1 ? null : renderPageNumbers} */}
            {renderPageNumbers}
        </div>
    )
}

const mapStateToProps = (state: { deviceReducer: DevicesState }): ConnectedProps => {
    return ({
        totalPages: state.deviceReducer.totalPages,
        page: state.deviceReducer.page,
        perPage: state.deviceReducer.perPage,
        devicesType: state.deviceReducer.devicesType,
        totalItems: state.deviceReducer.totalItems
    });
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadDevices: (p: Array<Oven | RobotHoover>) => {
        return dispatch(setDevices(p));
    },
    setCurrentPage: (p: number) => {
        return dispatch(SetCurrentPage(p))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

