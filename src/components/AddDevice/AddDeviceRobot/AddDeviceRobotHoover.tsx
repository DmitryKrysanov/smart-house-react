import React, { Component } from 'react';
import { AddDeviceAction } from '../../../redux/actions/deviceActions/deviceActions';
import { RobotHoover } from '../../../redux/reducers/deviceReducer';
import TextField from '@material-ui/core/TextField';
import style from './AddDeviceRobotHoover.module.scss';
import Button from '@material-ui/core/Button';
import { devicesAPI, PostRobot } from '../../../api/api';
import AddModes from '../AddDeviceOven/AddModes';

interface State {
    device: PostRobot,
    errors: {
        nameError: boolean
    }
}

interface Props {
    handleToggleDialog: () => void,
    addDevice: (p: RobotHoover) => AddDeviceAction,
    handleContent: (count: number) => void
}

class AddDeviceRobot extends Component<Props, State> {
    public state: State = {
        device: {
            type: 'oven',
            name: '',
            image: 'https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png',
            status: false,
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

    private handleModeAdd = (mode: string): void => {
        this.setState({
            device: {
                ...this.state.device,
                modes: [...this.state.device.modes, mode]
            }
        })
    }

    private onSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        const respRobot = await devicesAPI.postRobot(this.state.device);
        this.props.addDevice(respRobot);
        this.props.handleToggleDialog();
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

        const{name, modes} = this.state.device;

        return (
            <div className={style.add_device_dialog__inner}>
                <h5>Add Device (Robot Hoover)</h5>
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
                    <AddModes 
                    modes={modes}
                    handleModeAdd={this.handleModeAdd} 
                    handleModeDelete={this.handleModeDelete} />
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

export default AddDeviceRobot;