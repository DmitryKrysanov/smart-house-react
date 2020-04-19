import React, { Component } from 'react';
import { AddDeviceAction } from '../../../redux/actions/deviceActions/deviceActions';
import { Oven } from '../../../redux/reducers/deviceReducer';
import style from './AddDeviceOven.module.scss';
import Button from '@material-ui/core/Button';
import { devicesAPI, PostOven, Temp } from '../../../api/api';
import AddModes from '../AddModes';
import NameTextfield from '../NameTextfield';
import ImageTextfield from '../ImageTextfield';
import AddTemp from '../AddTemp';

interface State {
    device: PostOven,
    errors: {
        isError: boolean
    }
}

interface Props {
    handleToggleDialog: () => void,
    addDevice: (p: Oven) => AddDeviceAction,
    handleContent: (count: number) => void
}

class AddDeviceOven extends Component<Props, State> {
    public state: State = {
        device: {
            type: 'oven',
            name: '',
            image: 'https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png',
            status: false,
            temp: {
                min: 0,
                max: 0,
                current: 0,
                step: 0,
            },
            modes: [],
            currentMode: ''
        },
        errors: {
            isError: false
        }
    }

    private _form = React.createRef<HTMLFormElement>();

    private setName = (name: string): void => {
        this.setState({
            ...this.state,
            device: {
                ...this.state.device,
                name: name
            }
        })
    }

    private setImageURL = (url: string): void => {
        this.setState({
            ...this.state,
            device: {
                ...this.state.device,
                image: url
            }
        })
    }

    private setTemp = (temp: Temp): void => {
        this.setState({
            ...this.state,
            device: {
                ...this.state.device,
                temp: temp
            }
        })
    }

    private handleModeAdd = (mode: string): void => {
        this.setState({
            device: {
                ...this.state.device,
                modes: [...this.state.device.modes, mode]
            }
        })
    }

    private handleModeDelete = (mode: string): void => {
        const { modes } = this.state.device;
        const newModes = modes;
        const index: number = modes.indexOf(mode);
        newModes.splice(index, 1);
        this.setState({
            device: {
                ...this.state.device,
                modes: newModes
            }
        })
    }

    handleIsError = (error: boolean) => {
        this.setState({
            errors: {
                ...this.state.device,
                isError: error
            }
        })
    }

    private onSubmit = async (event: { preventDefault: () => void; }): Promise<void> => {
        event.preventDefault();
        const respOven = await devicesAPI.postOven(this.state.device);
        this.props.addDevice(respOven);
        this.props.handleToggleDialog();
    }

    render() {

        const { name, modes } = this.state.device;

        return (
            <div className={style.add_device_dialog__inner}>
                <h5>Add Device (Oven)</h5>
                <form className={style.form} ref={this._form}>
                    <div className={style.general}>
                        <div className={style.row}>
                            <NameTextfield setName={this.setName}
                                handleIsError={this.handleIsError}
                                isError={this.state.errors.isError} />

                        </div>
                        <div className={style.row}>
                            <ImageTextfield setImageURL={this.setImageURL}
                                handleIsError={this.handleIsError}
                                isError={this.state.errors.isError} />
                        </div>
                    </div>
                    <div className={style.row}>
                        <AddTemp temp={this.state.device.temp} setTemp={this.setTemp} />
                    </div>
                    <div className={style.row}>
                        <AddModes
                            modes={modes}
                            handleModeAdd={this.handleModeAdd}
                            handleModeDelete={this.handleModeDelete} />
                    </div>
                    <div className={style.action_buttons}>
                        <Button color="secondary" onClick={() => this.props.handleContent(0)}>Back</Button>
                        <div>
                            <Button color="secondary" onClick={this.props.handleToggleDialog}>Cancel</Button>
                            <Button
                                className={style.right}
                                color="secondary"
                                type='submit'
                                disabled={!name || this.state.errors.isError}
                                onClick={this.onSubmit}>Add Device</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


export default AddDeviceOven;