import React, { Component } from 'react';
import { AddDeviceAction } from '../../../redux/actions/deviceActions/deviceActions';
import { Oven } from '../../../redux/reducers/deviceReducer';
import TextField from '@material-ui/core/TextField';
import style from './AddDeviceOven.module.scss';
import Button from '@material-ui/core/Button';
import { devicesAPI, PostOven } from '../../../api/api';
import Chips from './Chips';

interface State {
    device: PostOven,
    errors: {
        nameError: boolean
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
            nameError: false
        }
    }

    private _form = React.createRef<HTMLFormElement>();

    private handleStringInputChange = (event: { currentTarget: { name: string, value: string; }; }): void => {
        this.setState({
            ...this.state,
            device: {
                ...this.state.device,
                [event.currentTarget.name]: event.currentTarget.value
            }
        })
    }

    private handleNumberInputChange = (event: { currentTarget: { name: string, value: string; }; }): void => {
        this.setState({
            device: {
                ...this.state.device,
                temp: {
                    ...this.state.device.temp,
                    [event.currentTarget.name]: +event.currentTarget.value
                }
            }
        })
    }

    private handleModeInputChange = (event: { currentTarget: { value: string; }; }): void => {
        this.setState({
            device: {
                ...this.state.device,
                currentMode: event.currentTarget.value
            }
        })
    }

    private handleModeInputClick = (event: { preventDefault: () => void; }): void => {
        event.preventDefault();
        this.setState({
            device: {
                ...this.state.device,
                modes: [...this.state.device.modes, this.state.device.currentMode],
                currentMode: ''
            }
        })
    }

    private onSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        const respOven = await devicesAPI.postOven(this.state.device);
        this.props.addDevice(respOven);
        this.props.handleToggleDialog();
    }

    private handleDelete = (mode: string): void => {
        const newModes = this.state.device.modes;
        const index: number = this.state.device.modes.indexOf(mode);
        newModes.splice(index, 1);
        this.setState({
            device: {
                ...this.state.device,
                modes: newModes
            }
        })
    }

    validateName = () => {
        if (this.state.device.name.length < 3) {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    nameError: true
                }
            })
        } else {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    nameError: false
                }
            })
        }
    }

    render() {

        const { name, currentMode } = this.state.device;

        return (
            <div className={style.add_device_dialog__inner}>
                <h5>Add Device (Oven)</h5>
                <form className={style.form} ref={this._form}>
                    <div className={style.general}>
                        <div className={style.row}>
                            <TextField
                                required
                                fullWidth={true}
                                type='text'
                                value={name}
                                name='name'
                                label="Name"
                                color='secondary'
                                helperText={this.state.errors.nameError ? 'wrong name' : ''}
                                onBlur={this.validateName}
                                error={this.state.errors.nameError}
                                onChange={this.handleStringInputChange} />
                        </div>
                        <div className={style.row}>
                            <TextField
                                fullWidth={true}
                                type='text'
                                name='image'
                                label='Image'
                                color='secondary'
                                onChange={this.handleStringInputChange} />
                        </div>
                    </div>
                    <h6>Temperature, <sup>0</sup>C</h6>
                    <div className={`${style.row} ${style.items}`}>
                        <TextField
                            type='number'
                            placeholder='0'
                            name='min'
                            label="Min"
                            color='secondary'
                            onChange={this.handleNumberInputChange} />
                        <TextField
                            type='number'
                            placeholder='0'
                            name='max'
                            label="Max"
                            color='secondary'
                            onChange={this.handleNumberInputChange} />
                        <TextField
                            type='number'
                            placeholder='0'
                            name='current'
                            label="Current"
                            color='secondary'
                            onChange={this.handleNumberInputChange} />
                        <TextField
                            type='number'
                            placeholder='0'
                            name='step'
                            label="Step"
                            color='secondary'
                            onChange={this.handleNumberInputChange} />
                    </div>
                    <h6>Modes</h6>
                    <div className={style.modes}>
                        <div className={style.row}>
                            <TextField
                                fullWidth={true}
                                type='text'
                                name='image'
                                label='Mode'
                                color='secondary'
                                value={currentMode}
                                onChange={this.handleModeInputChange} />
                            <Button className={style.button} variant="outlined" color="secondary" onClick={this.handleModeInputClick}>+</Button>
                        </div>
                        <div className={style.chips}>
                            <Chips modes={this.state.device.modes} handleDelete={this.handleDelete} />
                        </div>
                    </div>
                    <div className={style.action_buttons}>
                        <Button color="secondary" onClick={() => this.props.handleContent(0)}>Back</Button>
                        <div>
                            <Button color="secondary" onClick={this.props.handleToggleDialog}>Cancel</Button>
                            <Button
                                className={style.right}
                                color="secondary"
                                type='submit'
                                disabled={!name}
                                onClick={this.onSubmit}>Add Device</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


export default AddDeviceOven;