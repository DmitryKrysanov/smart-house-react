import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { DevicesState, Device, RobotHoover, Oven } from '../../redux/reducers/deviceReducer'
import { connect } from "react-redux";
import Card from '../Card/Card'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Filter';
import { addDevice, turnOffAllDevices, turnOnOffDevice } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import DevicesHeader from '../DevicesHeader/DevicesHeader'
import Pagination from '../Pagination/Pagination';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';


interface ConnectedProps {
    devices: Array<Oven | RobotHoover>
}

type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;

class Devices extends Component<ComponentProps> {

    state = {
        showModal: false,
        term: ''
    }

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

    private search = (devices: Array<Oven | RobotHoover>, term: string) => {
        if(term.length === 0) {
            return devices;
        }
        return devices.filter((device: Oven | RobotHoover) => {
            return device.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    private devices = (): JSX.Element[] =>
    this.search(this.props.devices, this.state.term).map(device => (
            <div >
                <Link to={`id/${device.id}`}>
                    <Card device={device} deviceToggle={this.props.deviceToggle} />
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
                    <Fab  color="secondary" aria-label="add" onClick={this.handleToggleDialog}>
                        <AddIcon color='inherit'/>
                    </Fab>
                </div>
                {showModal ? ReactDOM.createPortal(
                    <AddDeviceContainer handleToggleDialog={this.handleToggleDialog} addDevice={this.props.addResourse}/>,
                    document.getElementById('modal-root') as HTMLInputElement
                ) : null}

                <div className={style.collection}>
                    {this.devices()}
                </div>
                {/* <Pagination /> */}
            </div>
        )
    }
}

const mapStateToProps = (state: { deviceReducer: DevicesState }): ConnectedProps => {
    return ({
        devices: state.deviceReducer.devices
    });
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addResourse: (p: Oven | RobotHoover) => {
        return dispatch(addDevice(p));
    },
    offDevices: () => {
        return dispatch(turnOffAllDevices());
    },
    deviceToggle: (id: number) => {
        return dispatch(turnOnOffDevice(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Devices);