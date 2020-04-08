import React, { Component } from 'react';
import { AddDeviceAction } from '../../../redux/actions/deviceActions/deviceActions';
import { RobotHoover } from '../../../redux/reducers/deviceReducer';
import TextField from '@material-ui/core/TextField';
import style from './AddDeviceRobotHoover.module.scss';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { devicesAPI } from '../../../api/api';


interface State {
    type: string,
    name: string,
    image: string,
    status: boolean,
    modes: string[],
    currentMode: string
}

const initialState: State = {
    type: 'robot-hoover',
    name: '',
    image: 'http://placehold.it/400px',
    status: false,
    modes: [],
    currentMode: ''
}

interface Props {
    handleToggleDialog: () => void,
    addDevice: (p: RobotHoover) => AddDeviceAction,
    handleContent: (count: number) => void
}

class AddDeviceRobot extends Component<Props, State> {
    public state: State = initialState;

    private _form = React.createRef<HTMLFormElement>();

    public handleStringInputChange = (event: { currentTarget: { name: string, value: string; }; }) => {
        this.setState({
            ...this.state,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    public handleModeInputChange = (event: { currentTarget: { value: string; }; }) => {
        this.setState({
            currentMode: event.currentTarget.value
        })
    }

    public handleModeInputClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.setState({
            modes: [...this.state.modes, this.state.currentMode],
            currentMode: ''
        })
    }

    private onSubmit = async (e: { preventDefault: () => void; }) => {
        const { type, name, image, status, modes, currentMode } = this.state;
        e.preventDefault();

        const respRobot = await devicesAPI.postRobot(this.state);
        this.props.addDevice(respRobot);
        this.props.handleToggleDialog();
    }


    private handleDelete = (mode: string) => {
        const newModes = this.state.modes;
        const index: number = this.state.modes.indexOf(mode);
        newModes.splice(index, 1);
        this.setState({
            modes: newModes
        })
    }

    private chips = (): JSX.Element[] =>
        this.state.modes.map((mode, index) => (
            <Chip key={index} className={style.chip__item} label={mode} onDelete={() => this.handleDelete(mode)} />
        ))

    render() {
        return (
            <div className={style.add_device_dialog__inner}>
                <h5>Add Device (Robot)</h5>
                <form className={style.form} ref={this._form}>
                    <div className={style.general}>
                        <div className={style.row}>
                            <TextField
                                required
                                fullWidth={true}
                                type='text'
                                value={this.state.name}
                                name='name'
                                label="Name"
                                color='secondary'
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
                    <h6>Modes</h6>
                    <div className={style.modes}>
                        <div className={style.row}>
                            <TextField
                                fullWidth={true}
                                type='text'
                                name='image'
                                label='Mode'
                                color='secondary'
                                value={this.state.currentMode}
                                onChange={this.handleModeInputChange} />
                            <Button className={style.button} variant="outlined" color="secondary" onClick={this.handleModeInputClick}>+</Button>
                        </div>
                        <div className={style.chips}>
                            {this.chips()}
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
                                disabled={!this.state.name}
                                onClick={this.onSubmit}>Add Device</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


export default AddDeviceRobot;