import React, { Component, Fragment } from 'react';
import style from './RobotHooverContent.module.scss';
import { RobotHoover } from '../../../redux/reducers/deviceReducer';
import Image from '../Image/Image';
import GeneralInfo from '../GeneralInfo/GeneralInfo';
import Modes from '../Modes/Modes';
import DeleteIcon from '@material-ui/icons/Delete';
import { devicesAPI, PostRobot } from '../../../api/api';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

interface Props {
    device: RobotHoover,
    deviceToggle: (id: number) => void,
    removeDevice: (id: number) => void
}

interface State {
    device: PostRobot,
    redirect: boolean
}

class RobotHooverContent extends Component<Props, State> {

    public state: State = {
        device: {
            type: this.props.device.type,
            name: this.props.device.name,
            image: this.props.device.image,
            status: this.props.device.status,
            modes: this.props.device.modes,
            currentMode: this.props.device.currentMode
        },
        redirect: false
    }

    private handleSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        const {id} = this.props.device;
        await devicesAPI.updateRobotHoover(this.state.device, id);
    }

    private handleDelete = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        const {id} = this.props.device;
        if (typeof this.props.device != 'undefined') {
            await devicesAPI.deleteDevice(id);
            this.props.removeDevice(id);
            this.redirect()
        } else {
            console.log('nothing to delete');
        }
    }

    private handleToggle = (): void => {
        this.setState({
            device: {
                ...this.state.device,
                status: !this.state.device.status
            }
        })
    }

    private handleCurrentMode = (currentMode: string): void => {
        this.setState({
            device: {
                ...this.state.device,
            currentMode: currentMode
            }
        })
    }

    private redirect = (): void => {
        this.setState({
            redirect: true
        })
    }

    render() {

        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/home/devices'/>;
        }

        const {type, image, name, status, modes, currentMode} = this.state.device;

        return (
            <Fragment>
                <Image image={image} />
                <div className={style.device_details__content}>
                <GeneralInfo type={type}
                            name={name}
                            status={status}
                            handleToggle={this.handleToggle}/>
                    <Modes modes={modes} currentMode={currentMode} handleCurrentMode={this.handleCurrentMode} />
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