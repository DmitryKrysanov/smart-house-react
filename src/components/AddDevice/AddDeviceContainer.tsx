import React, { Component } from 'react';
import AddDevice from './AddDevice';
import style from './AddDeviceContainer.module.scss';
import { Device } from '../../redux/reducers/deviceReducer'
import { AddDeviceAction } from '../../redux/actions/deviceActions/deviceActions'

interface Props {
    handleToggleDialog: () => void,
    addDevice: (p: Device) => AddDeviceAction
}

export default class AddDeviceContainer extends Component<Props> {

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
        if (event.target.classList.contains(`${style.dialog}`)) {
            this.props.handleToggleDialog();
        }
      }

    render() {
        return (
            <div className={style.dialog}>
                <AddDevice handleToggleDialog={this.props.handleToggleDialog} addDevice={this.props.addDevice} />
            </div>
        )
    }
}