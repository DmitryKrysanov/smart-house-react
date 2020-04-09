import React, { Component, Fragment } from 'react';
import style from './RobotHooverContent.module.scss';
import { RobotHoover } from '../../../redux/reducers/deviceReducer';
import Image from '../Image/Image';
import GeneralInfo from '../GeneralInfo/GeneralInfo';
import Modes from '../Modes/Modes';
import DeleteIcon from '@material-ui/icons/Delete';
import { devicesAPI } from '../../../api/api';
import Button from '@material-ui/core/Button';

interface Props {
    device: RobotHoover,
    deviceToggle: (id: number) => void,
    removeDevice: (id: number) => void
}

interface PostRobot {
    type: string,
    name: string,
    image: string,
    status: boolean,
    modes: string[],
    currentMode: string
}

class RobotHooverContent extends Component<Props> {

    state: PostRobot = {
        type: this.props.device.type,
        name: this.props.device.name,
        image: this.props.device.image,
        status: this.props.device.status,
        modes: this.props.device.modes,
        currentMode: this.props.device.currentMode
    }

    public handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await devicesAPI.updateRobotHoover(this.state, this.props.device.id);
    }

    public handleDelete = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (typeof this.props.device != 'undefined') {
            await devicesAPI.deleteDevice(this.props.device.id);
            this.props.removeDevice(this.props.device.id);
        } else {
            console.log('nothing to delete');
        }
    }

    private handleToggle = () => {
        this.setState({
            status: !this.state.status
        })
    }

    private handleCurrentMode = (currentMode: string) => {
        this.setState({
            currentMode: currentMode
        })
    }

    render() {
        return (
            <Fragment>
                <Image image={this.state.image} />
                <div className={style.device_details__content}>
                <GeneralInfo type={this.state.type}
                            name={this.state.name}
                            status={this.state.status}
                            handleToggle={this.handleToggle}/>
                    <Modes modes={this.state.modes} currentMode={this.state.currentMode} handleCurrentMode={this.handleCurrentMode} />
                    <div className={style.row}>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={this.handleDelete}>
                            <DeleteIcon />
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default RobotHooverContent;