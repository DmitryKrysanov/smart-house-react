import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { RobotHoover, Oven } from '../../redux/reducers/deviceReducer'
import Card from '../Card/Card'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Filter';
import { AddDeviceAction, SetDevicesAction, SetCurrentPageAction } from '../../redux/actions/deviceActions/deviceActions';
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
    hideLoader: () => void,
    setCurrentPage: (p: number) => SetCurrentPageAction
}

interface Resp {
    data: Array<Oven | RobotHoover>,
    totalPages: number,
    page: number,
    perPage: number
}

class Devices extends Component<Props> {

    public state = {
        showModal: false,
        isLoading: false,
        currentPage: 1,
        totalPages: 1
    }

    componentDidMount = async (): Promise<void> => {
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

    private devices = (): JSX.Element[] =>
        this.props.devices.map(device => (
            <Fragment key={device.id} >
                <Link to={`device/${device.id}`}>
                    <Card device={device}
                        deviceToggle={this.props.deviceToggle} />
                </Link>
            </Fragment>
        ))

    private emptyState = (): JSX.Element => {
        return (
            <div className={style.empty_state}>
                <svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 136 136">
                    <path fill="#6a696b" d="M133.715799,60.8678032 L122.226725,50.5018047 L122.226725,16.129173 C122.226725,13.942137 120.436148,12.1688361 118.227211,12.1688361 L90.571675,12.1688361 C88.363004,12.1688361 86.5721609,13.941874 86.5721609,16.129173 L86.5721609,18.3317275 L72.6969787,5.81262284 C70.0186828,3.39570471 65.9798562,3.39596773 63.3026229,5.81235982 L2.28380244,60.8680662 C0.138615762,62.8039153 -0.570337093,65.7865959 0.477818757,68.466537 C1.52624023,71.1464781 4.07889551,72.8779584 6.98137877,72.8779584 L16.7268907,72.8779584 L16.7268907,128.0394 C16.7268907,130.226436 18.5174681,132 20.7264048,132 L54.1720326,132 C56.3807037,132 58.1715467,130.226699 58.1715467,128.0394 L58.1715467,94.5471063 L77.8280549,94.5471063 L77.8280549,128.039663 C77.8280549,130.226699 79.6186323,132 81.8275689,132 L115.271869,132 C117.48054,132 119.271383,130.226962 119.271117,128.039663 L119.271117,72.8782214 L129.018754,72.8782214 C131.920972,72.8782214 134.473893,71.1464781 135.522314,68.4668 C136.570204,65.7865959 135.861517,62.8039153 133.715799,60.8678032 Z M115.271869,64.9575475 C113.063198,64.9575475 111.272355,66.7305854 111.272355,68.9178844 L111.272355,124.079326 L85.8273487,124.079326 L85.8273487,90.5867693 C85.8273487,88.3997333 84.0365056,86.6264324 81.8278346,86.6264324 L54.1720326,86.6264324 C51.9633616,86.6264324 50.1725185,88.3994703 50.1725185,90.5867693 L50.1725185,124.079326 L24.7256532,124.079326 L24.7256532,68.9178844 C24.7256532,66.7308484 22.9350758,64.9575475 20.7261392,64.9575475 L9.62753401,64.9575475 L68.0001992,12.2898267 L87.8785041,30.2256265 C89.0493787,31.2819267 90.7395499,31.5541555 92.1880025,30.9210592 C93.6367207,30.2871738 94.5714547,28.8663237 94.5714547,27.2981807 L94.5714547,20.08951 L114.228228,20.08951 L114.228228,52.2509075 C114.228228,53.3653358 114.702103,54.4276856 115.53404,55.1783532 L126.372333,64.9575475 L115.271869,64.9575475 Z" />
                </svg>
                <p>Nothing to show.</p>
            </div>
        )
    }

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
                 //   variant="outlined"
                    color="secondary"
                    key={number}
                    onClick={() => { this.onChangePage(number) }} >
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
                {this.props.devices.length === 0 ?
                    this.emptyState() :
                    <Fragment>
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
                    </Fragment>}
            </div>
        )
    }
}

export default Devices;