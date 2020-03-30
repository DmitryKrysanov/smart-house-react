import React, { Component } from 'react';
import { AddDeviceAction } from '../../redux/actions/deviceActions/deviceActions';
import { Device } from '../../redux/reducers/deviceReducer';
import TextField from '@material-ui/core/TextField';
import style from './AddDevice.module.scss';

interface State {
    name: string,
    id: number,
    image: string,
    temp: {
        min: number,
        max: number,
        current: number,
        step: number
    },
    modes: string[]
}

const initialState: State = {
    name: '',
    id: 0,
    image: 'https://placehold.it/400px',
    temp: {
        min: 0,
        max: 0,
        current: 0,
        step: 0
    },
    modes: ['mode24', 'mode23'],
}

interface Props {
    handleToggleDialog: () => void,
    addDevice: (p: Device) => AddDeviceAction
}

class AddDevice extends Component<Props, State> {
    public state: State = initialState;

    private _form = React.createRef<HTMLFormElement>();

    public handleStringInputChange = (event: { currentTarget: {name: string, value: string; }; }) => {
        this.setState({
                ...this.state,  
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    public handleNumberInputChange = (event: { currentTarget: {name: string, value: string; }; }) => {
        this.setState({
            temp: {
                ...this.state.temp,  
            [event.currentTarget.name]: +event.currentTarget.value
            }
        })
    }

    private onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.setState({
            id: Math.round(Math.random() * 100)
        });
       this.props.addDevice(this.state);
    }

    render() {
        console.log(this.state)
        return (
            <div className={style.add_device_dialog__inner}>
                <h2>Add Device</h2>
                <form className={style.form} ref={this._form}>
                    <div className={style.row}>
                        <TextField
                            required
                            fullWidth={true}
                            type='text'
                            value={this.state.name}
                            name='name'
                            label="Name"
                            onChange={this.handleStringInputChange} />
                    </div>
                    <div className={style.row}>
                        <TextField
                            fullWidth={true}
                            type='text'
                            name='image'
                            label='Image'
                            onChange={this.handleStringInputChange} />
                    </div>
                    <div className={`${style.row} ${style.items}`}>
                        <TextField
                            type='number'
                            placeholder='0'
                            name='min'
                            label="Min"
                            onChange={this.handleNumberInputChange} />
                        <TextField
                            type='number'
                            placeholder='0'
                            name='max'
                            label="Max"
                            onChange={this.handleNumberInputChange} />
                        <TextField
                            type='number'
                            placeholder='0'
                            name='current'
                            label="Current"
                            onChange={this.handleNumberInputChange} />
                        <TextField
                            type='number'
                            placeholder='0'
                            name='step'
                            label="Step"
                            onChange={this.handleNumberInputChange} />
                    </div>
                    <div className={style.row}>
                    <button
                            className='btn__outlined'
                            type='button'
                            onClick={this.props.handleToggleDialog}>
                                Cancel
                        </button>
                        <button
                            className={`btn__outlined ${!this.state.name ? 'btn--disabled' : ''}`}
                            type='submit'
                            disabled={!this.state.name}
                            onClick={this.onSubmit}>
                                Add Device
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


export default AddDevice;