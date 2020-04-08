import React, { Component, Fragment } from 'react';
import style from './Modes.module.scss';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

interface Props {
    modes: string[]
}

class Modes extends Component<Props> {

    state = {
        currentMode: ''
    }

    modeItems = (): JSX.Element[] => {
        return this.props.modes.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
        ))
    }

    currentMode = (event: { currentTarget: { value: any; }; }) => {
            this.setState({
                currentMode: event.currentTarget.value 
            })
        }


    render() {
        // console.log(this.state)
        return (
            <Fragment>
                <h6>Modes</h6>
                <div className={style.modes}>
                    <FormControl fullWidth={true}>
                        <InputLabel>Current Mode</InputLabel>
                        <Select
                            value={this.state.currentMode}
                            onChange={this.currentMode}
                        >
                            {this.modeItems()}
                        </Select>
                    </FormControl>
                </div>
            </Fragment>
        );
    }

}

export default Modes;