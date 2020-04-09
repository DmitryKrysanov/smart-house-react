import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { RobotHoover, Oven } from '../../redux/reducers/deviceReducer'
import Card from '../Card/Card'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Filter';
import { AddDeviceAction, SetDevicesAction } from '../../redux/actions/deviceActions/deviceActions';
import DevicesHeader from '../DevicesHeader/DevicesHeader'
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import { devicesAPI } from '../../api/api';
import { Loader } from '../Loader/Loader';
import { Button } from '@material-ui/core';

interface Props {
    devices: Array<Oven | RobotHoover>,
    totalPages: number,
    page: number,
    perPage: number,
    addResourse: (p: Oven | RobotHoover) => AddDeviceAction,
    offDevices: () => void,
    deviceToggle: (id: number) => void,
    loadDevices: (p: Array<Oven | RobotHoover>) => SetDevicesAction,
    showLoader: () => void,
    hideLoader: () => void
}

interface Resp {
 data: Array<Oven | RobotHoover>,
 totalPages: number,
 page: number,
 perPage: number
}

class Devices extends Component<Props> {

    state = {
        showModal: false,
        isLoading: false,
        currentPage: 1,
        totalPages: 1
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        const devs: any = await devicesAPI.serverDevices(1);
        this.props.loadDevices(devs.data);
        this.setState({ isLoading: false });
        this.setState({totalPages: devs.totalPages})
    };

    handleToggleDialog = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    private onChangePage = async (number: number) => {
        this.setState({ isLoading: true });
        const devs: any = await devicesAPI.serverDevices(number);
        this.props.loadDevices(devs.data);
        this.setState({ isLoading: false });
    }

    private devices = (): JSX.Element[] =>
    this.props.devices.map(device => (
        <Fragment key={device.id} >
            <Link to={`device/${device.id}`}>
                <Card  device={device} 
                deviceToggle={this.props.deviceToggle} />
            </Link>
        </Fragment>
    ))

    render() {
        const { showModal } = this.state;
        const pageNumbers = [];
        for (let i = 1; i <= this.state.totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <Button 
          className={style.button} 
          variant="outlined" 
          color="secondary" 
          key={number} 
          onClick={()=>{this.onChangePage(number)}} >
            {number}
            </Button>
        );
      });

        return (
            <div>
                 <DevicesHeader loadDevices={this.props.loadDevices} />
                <div className={style.filter}> 
                    <Filter offDevices={this.props.offDevices} loadDevices={this.props.loadDevices} />
                </div>
                <div className={style.fab}>
                    <Fab color="secondary" aria-label="add" onClick={this.handleToggleDialog}>
                        <AddIcon color='inherit' />
                    </Fab>
                </div>
                {showModal ? ReactDOM.createPortal(
                    <AddDeviceContainer handleToggleDialog={this.handleToggleDialog} addDevice={this.props.addResourse} />,
                    document.getElementById('modal-root') as HTMLInputElement
                ) : null}
                <div className={style.collection}>
                    {
                        this.state.isLoading ?
                            <Loader /> : null
                    }
                    {this.devices()}
                </div>
                {pageNumbers.length <= 1 ? null : 
                <div className={style.pagination_buttons}>
                    {renderPageNumbers}
                </div>}
                
            </div>
        )
    }
}

export default Devices;