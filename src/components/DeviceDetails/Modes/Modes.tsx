import React, { Component, Fragment } from 'react';
import style from './Modes.module.scss';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

interface Props {
    modes: string[],
    currentMode: string,
    handleCurrentMode: (currentMode: string) => void
}

class Modes extends Component<Props> {

    state = {
        currentMode: this.props.currentMode
    }

    private modeItems = (): JSX.Element[] => {
        return this.props.modes.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
        ))
    }

    private handleCurrentMode = (event: { target: { value: any; }; }) => {
            this.setState({
                currentMode: event.target.value 
            });
            this.props.handleCurrentMode(this.state.currentMode);
        }

    render() {
        return (
            <Fragment>
                <h6>Modes</h6>
                <div className={style.modes}>
                    <FormControl fullWidth={true}>
                        <InputLabel>Current Mode</InputLabel>
                        <Select
                            value={this.state.currentMode}
                            onChange={this.handleCurrentMode}
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