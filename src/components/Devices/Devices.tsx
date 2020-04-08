import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { RobotHoover, Oven } from '../../redux/reducers/deviceReducer'
import Card from '../Card/Card'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Filter';
import { AddDeviceAction } from '../../redux/actions/deviceActions/deviceActions';
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

interface Resp {
 data: Array<Oven | RobotHoover>,
 totalPages: number,
 page: number,
 perPage: number
}

class Devices extends Component<Props> {

    state = {
        showModal: false,
        term: '',
        isLoading: false
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true });

        const devs: any = await devicesAPI.serverDevices();
        this.props.loadDevices(devs.data);
     

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
        return (
            <div>
                 <DevicesHeader onSearchState={this.onSearchState} />
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
                {/* <Pagination /> */}
            </div>
        )
    }
}


export default Devices;