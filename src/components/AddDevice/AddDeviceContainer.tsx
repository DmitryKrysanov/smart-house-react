import React, { Component } from 'react';
import AddDeviceOven from './AddDeviceOven/AddDeviceOven';
import AddDeviceRobot from './AddDeviceRobot/AddDeviceRobotHoover';
import style from './AddDeviceContainer.module.scss';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer'
import { AddDeviceAction } from '../../redux/actions/deviceActions/deviceActions'
import SelectDevice from './SelectDevice';

interface Props {
    handleToggleDialog: () => void,
    addDevice: (p: Oven | RobotHoover) => AddDeviceAction
}

export default class AddDeviceContainer extends Component<Props> {

    public state = {
        content: 0
    }

    componentDidMount() {
        window.addEventListener("keyup", this.handleKeyUp, false);
        document.addEventListener("click", this.handleOutsideClick, false);
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.handleKeyUp, false);
        document.removeEventListener("click", this.handleOutsideClick, false);
        document.body.style.overflow = 'unset';
    }

    private handleKeyUp = (event: { keyCode: number; preventDefault: () => void; }): void => {
        if (event.keyCode === 27) {
            event.preventDefault();
            this.props.handleToggleDialog();
        }
    };

    private handleOutsideClick = (event: { target: any }): void => {
        if (event.target.classList.contains(`${style.dialog}`)) {
            this.props.handleToggleDialog();
        }
    }

    private handleContent = (count: number): void => {
        this.setState({
            content: count
        })
    }

    private renderContent = (): JSX.Element | null => {
        const {addDevice, handleToggleDialog} = this.props;
        switch (this.state.content) {
            case 0:
                return <SelectDevice 
                handleToggleDialog={handleToggleDialog} 
                handleContent={this.handleContent} />;
            case 1:
                return <AddDeviceOven 
                handleToggleDialog={handleToggleDialog} 
                handleContent={this.handleContent} 
                addDevice={addDevice} />;
            case 2:
                return <AddDeviceRobot 
                handleToggleDialog={handleToggleDialog} 
                handleContent={this.handleContent} 
                addDevice={addDevice} />;
            default:
                return null;
        }
    }

    render() {
        return (
            <div className={style.dialog}>
                {this.renderContent()}
            </div>
        )
    }
}