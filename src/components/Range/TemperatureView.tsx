import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './TemperatureView.scss';
import IRange from '../../models/IRange';

interface IProps {
    temperature: IRange
    // setTemp: (min: number, max: number, current: number, step: number) => void
}

export default class Temperature extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);
    }

    state = {
        min: this.props.temperature.getMin(),
        max: this.props.temperature.getMax(),
        current: this.props.temperature.getCurrent(),
        step: this.props.temperature.getStep(),

        isEdit: false,
        decreaseDisabled: false,
        increaseDisabled: false
    }

    // handleSetTemp = (min: number, max: number, current: number, step: number) => {
    //     this.props.setTemp(min, max, current, step)
    // }

    public increase = () => {
        const { max, current, step } = this.state;
        if (current !== max) {
            if ((current + step) >= max) {
                this.setState({
                    current: max,
                    increaseDisabled: true
                })
            } else {
                this.setState({
                    current: current + step,
                    decreaseDisabled: false
                })
            }
        }
    }

    public decrease = () => {
        const { min, current, step } = this.state;
        if (current !== min) {
            if ((current - step) <= min) {
                this.setState({
                    current: min,
                    decreaseDisabled: true
                })
            } else {
                this.setState({
                    current: current - step,
                    increaseDisabled: false
                })
            }
        }
    }

    public handleInputChange = (event: { target: { name: string, value: string | number; }; }) => {
        this.setState({
            ...this.state,
            [event.target.name]: +event.target.value
        })
    }

    public handleEditOpen = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    render() {

        const { min, max, current, step, decreaseDisabled, increaseDisabled, isEdit} = this.state;

        // this.handleSetTemp(min, max, current, step)


        const editBox = <div className='edit_box'>
            <TextField className='textfield' name='min' label="Min" type="number" value={min} onChange={this.handleInputChange}></TextField>
            <TextField className='textfield' name='max' label="Max" type="number" value={max} onChange={this.handleInputChange}></TextField>
            <TextField className='textfield' name='current' label="Current" type="number" value={current} onChange={this.handleInputChange}></TextField>
            <TextField className='textfield' name='step' label="Step" type="number" value={step} onChange={this.handleInputChange}></TextField>
        </div>

        return (
            <div>
                <div className='temperature__header'>
                    <h5>Temperature</h5>
                    <button className='btn__outlined' onClick={this.handleEditOpen}>Edit</button>
                </div>
                {isEdit ? editBox : null} 
                <div className='temperature'>
                    <h3>{min}</h3>
                    <button disabled={decreaseDisabled} 
                        className={`btn__outlined ${decreaseDisabled ? 'btn--disabled' : ''}`} 
                        onClick={this.decrease}>
                            -
                    </button>
                    <h1>{current}</h1>
                    <button disabled={increaseDisabled} 
                        className={`btn__outlined ${increaseDisabled ? 'btn--disabled' : ''}`} 
                        onClick={this.increase}>
                            +
                    </button>
                    <h3>{max}</h3>
                </div>
            </div>
        )
    }
}