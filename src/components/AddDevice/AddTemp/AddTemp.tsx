import React, { Component, Fragment } from 'react';
import style from './AddTemp.module.scss';
import TextField from '@material-ui/core/TextField';
import { Temp } from '../../../api/api';

interface Props {
    temp: Temp,
    setTemp: (temp: Temp) => void
}
class AddTemp extends Component<Props> {
    state = {
        min: 0,
        max: 0,
        current: 0,
        step: 0
    }

    private onTempChange = (event: { currentTarget: { name: string, value: string; }; }): void => {
        this.setState({
            [event.currentTarget.name]: +event.currentTarget.value
        })
    }

    private onBlur = (): void => {
        this.props.setTemp(this.state)
    }


    render() {

        return (
            <Fragment>
                <h6>Temperature, <sup>0</sup>C</h6>
                <div className={`${style.row} ${style.items}`}>
                    <TextField
                        type='number'
                        placeholder='0'
                        name='min'
                        label="Min"
                        color='secondary'
                        onBlur={this.onBlur}
                        onChange={this.onTempChange} />
                    <TextField
                        type='number'
                        placeholder='0'
                        name='max'
                        label="Max"
                        color='secondary'
                        onBlur={this.onBlur}
                        onChange={this.onTempChange} />
                    <TextField
                        type='number'
                        placeholder='0'
                        name='current'
                        label="Current"
                        color='secondary'
                        onBlur={this.onBlur}
                        onChange={this.onTempChange} />
                    <TextField
                        type='number'
                        placeholder='0'
                        name='step'
                        label="Step"
                        color='secondary'
                        onBlur={this.onBlur}
                        onChange={this.onTempChange} />
                </div>
            </Fragment>
        );
    }
}

export default AddTemp;