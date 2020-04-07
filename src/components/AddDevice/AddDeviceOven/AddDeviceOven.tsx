import React, { Component } from 'react';
import { AddDeviceAction } from '../../../redux/actions/deviceActions/deviceActions';
import { Device, Oven } from '../../../redux/reducers/deviceReducer';
import TextField from '@material-ui/core/TextField';
import style from './AddDeviceOven.module.scss';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';



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
    image: 'http://placehold.it/400px',
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

    public handleStringInputChange = (event: { currentTarget: { name: string, value: string; }; }) => {
        this.setState({
            ...this.state,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    public handleNumberInputChange = (event: { currentTarget: { name: string, value: string; }; }) => {
        this.setState({
            temp: {
                ...this.state.temp,
                [event.currentTarget.name]: +event.currentTarget.value
            }
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
        const { type, name, image, status, temp, modes, currentMode } = this.state;
        e.preventDefault();
        try {
            const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify({
                    type,
                    name,
                    image,
                    status,
                    temp,
                    modes,
                    currentMode
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(res => {
                this.setState(initialState);
                console.log(res);
                return res.json();
            });
            
            this.props.addDevice(resp);
        } catch (error) {
            this.setState(initialState);
            alert("An error occured");
        }
     
        // this.props.handleToggleDialog();
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
                <h5>Add Device (Oven)</h5>
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


export default AddDeviceOven;