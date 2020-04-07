import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { DevicesState, Device, RobotHoover, Oven } from '../../redux/reducers/deviceReducer'
import { connect } from "react-redux";
import Card from '../Card/Card'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Filter';
import { addDevice, turnOffAllDevices, turnOnOffDevice, AddDeviceAction } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import DevicesHeader from '../DevicesHeader/DevicesHeader'
import Pagination from '../Pagination/Pagination';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import { devicesAPI } from '../../api/api';
import { Loader } from '../Loader/Loader';


interface Props {
    devices: Array<Oven | RobotHoover>,
    addResourse: (p: Oven | RobotHoover) => AddDeviceAction,
    offDevices: () => void,
    deviceToggle: (id: number) => void,
    loadDevices: (p: Array<Oven | RobotHoover>) => void
    showLoader: () => void,
    hideLoader: () => void
}

class Devices extends Component<Props> {

    state = {
        showModal: false,
        term: '',
        isLoading: false
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true });

        const devs = await devicesAPI.serverDevices();
    
        this.props.loadDevices(devs);
        console.log(devs);
     

        this.setState({ isLoading: false });
    };

    handleToggleDialog = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    onSearchState = (term: string) => {
        this.setState({
            term
        })
    }

    // private search = (devices: Array<Oven | RobotHoover>, term: string) => {
    //     if(term.length === 0) {
    //         return devices;
    //     }
    //     return devices.filter((device: Oven | RobotHoover) => {
    //         return device.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    //     })
    // }

    private devices = (): JSX.Element[] =>
    this.props.devices.map(device => (
            <div >
                <Link to={`device/${device.id}`}>
                    <Card device={device} 
                    deviceToggle={this.props.deviceToggle} />
                </Link>
            </div>
        ))

    render() {
        const { showModal } = this.state;
        return (
            <div>
                 <DevicesHeader onSearchState={this.onSearchState} />
                <div className={style.filter}> 
                    <Filter offDevices={this.props.offDevices} />
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
                {/* <Pagination /> */}
            </div>
        )
    }
}


export default Devices;