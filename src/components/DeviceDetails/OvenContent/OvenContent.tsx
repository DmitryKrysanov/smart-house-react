import React, { Component, Fragment } from 'react';
import style from './OvenContent.module.scss';
import { Oven } from '../../../redux/reducers/deviceReducer';
import Image from '../Image/Image';
import GeneralInfo from '../GeneralInfo/GeneralInfo';
import Modes from '../Modes/Modes';
import DeleteIcon from '@material-ui/icons/Delete';
import { devicesAPI } from '../../../api/api';
import Button from '@material-ui/core/Button';
import Temperature from '../Temperature/Temperature';
import { Redirect } from 'react-router-dom';

interface Props {
    device: Oven,
    deviceToggle: (id: number) => void,
    removeDevice: (id: number) => void
}

interface Temp {
    min: number,
    max: number,
    current: number,
    step: number
}

interface PostOven {
    type: string,
    name: string,
    image: string,
    status: boolean,
    temp: Temp,
    modes: string[],
    currentMode: string
}

interface State {
    device: PostOven,
    redirect: boolean
}

class OvenContent extends Component<Props, State> {

    state: State = {
        device: {
            type: this.props.device.type,
            name: this.props.device.name,
            image: this.props.device.image,
            status: this.props.device.status,
            temp: this.props.device.temp,
            modes: this.props.device.modes,
            currentMode: this.props.device.currentMode
        },
        redirect: false
    }

    public handleSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        await devicesAPI.updateOven(this.state.device, this.props.device.id);
    }

    public handleDelete = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        if (typeof this.props.device != 'undefined') {
            await devicesAPI.deleteDevice(this.props.device.id);
            this.props.removeDevice(this.props.device.id);
            this.redirect()
        } else {
            console.log('nothing to delete');
        }
    }

    public handleTempChange = (name: string, value: number): void => {
        this.setState({
            device: {
                ...this.state.device,
                temp: {
                    ...this.state.device.temp,
                    [name]: value
                }
            }
        })
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

    private redirect = () => {
        this.setState({
            redirect: true
        })
    }

    render() {

        console.log(this.state)

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home/devices'/>;
        }

        const {type, image, name, status, temp, modes, currentMode} = this.state.device;

        return (
            <Fragment>
                <Image image={image} />
                <div className={style.device_details__content}>
                    <GeneralInfo type={type}
                        name={name}
                        status={status}
                        handleToggle={this.handleToggle} />
                    <Temperature temp={temp} handleTempChange={this.handleTempChange} />
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

export default OvenContent;