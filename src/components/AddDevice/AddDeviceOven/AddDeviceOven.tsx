import React, { Component } from 'react';
import { AddDeviceAction } from '../../../redux/actions/deviceActions/deviceActions';
import { Oven } from '../../../redux/reducers/deviceReducer';
import TextField from '@material-ui/core/TextField';
import style from './AddDeviceOven.module.scss';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { devicesAPI } from '../../../api/api';

interface State {
    type: string,
    name: string,
    image: string,
    status: boolean,
    temp: {},
    modes: string[],
    currentMode: string
}

const initialState: State = {
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
}

interface Props {
    handleToggleDialog: () => void,
    addDevice: (p: Oven) => AddDeviceAction,
    handleContent: (count: number) => void
}

class AddDeviceOven extends Component<Props, State> {
    public state: State = initialState;

    private _form = React.createRef<HTMLFormElement>();

    private handleStringInputChange = (event: { currentTarget: { name: string, value: string; }; }): void => {
        this.setState({
            ...this.state,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    private handleNumberInputChange = (event: { currentTarget: { name: string, value: string; }; }): void => {
        this.setState({
            temp: {
                ...this.state.temp,
                [event.currentTarget.name]: +event.currentTarget.value
            }
        })
    }

    private handleModeInputChange = (event: { currentTarget: { value: string; }; }): void => {
        this.setState({
            currentMode: event.currentTarget.value
        })
    }

    private handleModeInputClick = (event: { preventDefault: () => void; }): void => {
        event.preventDefault();
        this.setState({
            modes: [...this.state.modes, this.state.currentMode],
            currentMode: ''
        })
    }

    private onSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        const respOven = await devicesAPI.postOven(this.state);
        this.props.addDevice(respOven);
        this.props.handleToggleDialog();
    }

    private handleDelete = (mode: string): void => {
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

        const {name, currentMode} = this.state;
        
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