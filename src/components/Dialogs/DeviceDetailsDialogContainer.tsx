import React, { Component } from 'react';
import DeviceDetailsDialog from './DeviceDetailsDialog';
import Oven from '../../models/Oven';
import WashingMachine from '../../models/WashingMachine';

interface IProps {
    device: Oven | WashingMachine,
    handleToggleDialog: () => void
}

export default class DeviceDetailsDialogContainer extends Component<IProps> {

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

      handleKeyUp = (event: { keyCode: number; preventDefault: () => void; }) => {
        if (event.keyCode === 27) {
            event.preventDefault();
            this.props.handleToggleDialog();
        }
    };

    handleOutsideClick = (event: { target: any }) => {
        if (event.target.classList.contains('dialog')) {
            this.props.handleToggleDialog();
        }
      }

    render() {
        return (
            <div>
                <DeviceDetailsDialog handleToggleDialog={this.props.handleToggleDialog} device={this.props.device}/>
            </div>
        )
    }
}