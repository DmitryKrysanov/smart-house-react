import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { DevicesState, Device, deviceReducer } from '../../redux/reducers/deviceReducer'
import { connect } from "react-redux";
import Card from '../Card/Card'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Tabs';
import { addDevice, setDevices, requestDevices } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import DevicesHeader from '../DevicesHeader/DevicesHeader'
import Pagination from '../Pagination/Pagination';
import Fab from '@material-ui/core/Fab';
import { showLoader, hideLoader } from '../../redux/actions/loaderActions/loaderActions';
import { LoaderState } from '../../redux/reducers/loaderReducer';
import { Loader } from '../Loader/Loader';
import { devicesAPI } from '../../api/api';
import axios from 'axios';

export interface ConnectedProps {
    devices: Device[],
    // isLoading: boolean
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;

class Devices extends Component<ComponentProps> {

    state = {
        showModal: false,
        term: '',
        isLoading: false
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true });

        const devs = await devicesAPI.serverDevices();
        this.props.loadDevices(devs);

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

    private search = (devices: Device[], term: string) => {
        if (term.length === 0) {
            return devices;
        }
        return devices.filter((device: Device) => {
            return device.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    private devices = (): JSX.Element[] =>
        this.search(this.props.devices, this.state.term).map(device => (
            <div >
                <Card device={device} key={device.id} />
            </div>
        ))

    render() {
        //  console.log(this.state)
        const { showModal } = this.state;
        return (
            <div>
                <DevicesHeader onSearchState={this.onSearchState} />
                <div className={style.filter}>

                    <Filter />
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

type MapStatePropsType = {
    devices: Device[]
}

type MapDispatchPropsType = {
    loadDevices: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: { deviceReducer: DevicesState }): ConnectedProps => {
    return {
        devices: state.deviceReducer.devices
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addResourse: (p: Device) => {
        return dispatch(addDevice(p));
    },
    showLoader: () => {
        return dispatch(showLoader());
    },
    hideLoader: () => {
        return dispatch(hideLoader());
    },
    loadDevices: (p: Device[]) => {
        return dispatch(setDevices(p));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Devices);