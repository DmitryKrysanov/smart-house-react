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

interface State {
    currentMode: string
}

class Modes extends Component<Props, State> {

    public state: State = {
        currentMode: this.props.currentMode
    }

    private modeItems = (): JSX.Element[] => {
        return this.props.modes.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
        ))
    }

    private handleCurrentMode = (event: React.ChangeEvent<{ value: any }>): void => {
        this.setState({
            currentMode: event.target.value 
        });
        this.props.handleCurrentMode(event.target.value);
    }

    render() {

        const {currentMode} = this.state;
        
        return (
            <Fragment>
                <h6>Modes</h6>
                <div className={style.modes}>
                    <FormControl fullWidth={true}>
                        <InputLabel>Current Mode</InputLabel>
                        <Select
                            value={currentMode}
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