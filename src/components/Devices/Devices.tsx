import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { DevicesState, Device } from '../../redux/reducers/deviceReducer'
import { connect } from "react-redux";
import Card from '../Card/Card'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Tabs';
import { addDevice, setDevices, loadDevicesThunk } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import DevicesHeader from '../DevicesHeader/DevicesHeader'
import Pagination from '../Pagination/Pagination';
import Fab from '@material-ui/core/Fab';
import { showLoader } from '../../redux/actions/loaderActions/loaderActions';
import { LoaderState } from '../../redux/reducers/loaderReducer';
import { Loader } from '../Loader/Loader';
import { devicesAPI } from '../../api/api';

export interface ConnectedProps {
    devices: Device[],
    isLoading: boolean
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;

class Devices extends Component<ComponentProps> {

    state = {
        showModal: false,
        term: '',
        isLoading: false
    }

    componentDidMount = async () => {
        console.log("вызвался компонент дид маунт");
        // this.props.showLoader(true);
        // const response = await fetch("https://my-json-server.typicode.com/SvetaShmalko/json-server/devices")
        //     .then(resp => {
        //         console.log(resp);
        //         return resp.json();
        //     });
        // this.props.loadDevices(response);

    };


    //     componentDidMount(){
    //     this.props.showLoader(true);
    //  //   console.log(this.state.isLoading);
    //     const response = devicesAPI.serverDevices();
    //     this.props.loadDevices(response);
    //     this.props.showLoader(false);
    // };

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
                <Card device={device} />
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
                        <Loader /> : console.log(this.state.isLoading)

                    }
                    {this.devices()}
                </div>
                {/* <Pagination /> */}
            </div>
        )
    }
}

const mapStateToProps = (state: { deviceReducer: DevicesState, loaderReducer: LoaderState}): ConnectedProps => {
    return { 
        devices: state.deviceReducer.devices,
        isLoading: state.loaderReducer.isLoad
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addResourse: (p: Device) => {
        return dispatch(addDevice(p));
    },
    showLoader: (p: boolean) => {
        return dispatch(showLoader(p));
    },
    loadDevices: () => {
        return loadDevicesThunk();
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Devices);