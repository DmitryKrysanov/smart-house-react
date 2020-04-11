import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { RobotHoover, Oven, DevicesState } from '../../redux/reducers/deviceReducer'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Filter';
import { addDevice, turnOffAllDevices, turnOnOffDevice, setDevices, removeDevice, SetCurrentPage } from '../../redux/actions/deviceActions/deviceActions';
import DevicesHeader from '../DevicesHeader/DevicesHeader'
import Fab from '@material-ui/core/Fab';
import { devicesAPI } from '../../api/api';
import { Loader } from '../Loader/Loader';
import { Dispatch } from '../../redux/store';
import { showLoader, hideLoader } from '../../redux/actions/loaderActions/loaderActions';
import { connect } from 'react-redux';
import DevicesList from './DevicesList';
import EmptyState from './EmptyState';

interface ConnectedProps {
    devices: Array<Oven | RobotHoover>,
    totalPages: number,
    page: number,
    perPage: number
  }
  
  type ComponentProps = ConnectedProps & ReturnType<typeof mapDispatchToProps>;


class Devices extends Component<ComponentProps> {

    public state = {
        showModal: false,
        isLoading: false,
        currentPage: 1,
        totalPages: 1
    }

    async componentDidMount () {
        this.setState({ isLoading: true });
        const devs: any = await devicesAPI.serverDevices(1);
        this.props.loadDevices(devs.data);
        this.setState({ isLoading: false });
        this.setState({ totalPages: devs.totalPages })
    };

    private handleToggleDialog = (): void => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    private onChangePage = async (number: number): Promise<void> => {
        this.setState({ isLoading: true });
        const devs: any = await devicesAPI.serverDevices(number);
        this.props.loadDevices(devs.data);
        this.setState({ isLoading: false });
        this.props.setCurrentPage(number);
        this.setState({page: devs.page})
    }

    render() {

        const { showModal } = this.state;

        const pageNumbers = [];
        for (let i = 1; i <= this.state.totalPages; i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button className={number === this.props.page 
                    ? `${style.pagination_btn} ${style.active}` 
                    : style.pagination_btn} 
                    onClick={() => { this.onChangePage(number) }} >
                        {number}
                </button>
            );
        });

        return (
            <div>
                <DevicesHeader />
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
                {this.props.devices.length === 0 ?
                    <EmptyState /> :
                    <Fragment>
                        <div>
                            {
                                this.state.isLoading ?
                                    <Loader /> : null
                            }
                            <DevicesList devices={this.props.devices} />
                        </div>
                        {pageNumbers.length <= 1 ? null :
                            <div className={style.pagination_buttons}>
                                {renderPageNumbers}
                            </div>}
                    </Fragment>}
            </div>
        )
    }
}

const mapStateToProps = (state: { deviceReducer: DevicesState }): ConnectedProps => {
    return ({
      devices: state.deviceReducer.devices,
      totalPages: state.deviceReducer.totalPages,
      page: state.deviceReducer.page,
      perPage: state.deviceReducer.perPage
    });
  }
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    addResourse: (p: Oven | RobotHoover) => {
      return dispatch(addDevice(p));
    },
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
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Devices);