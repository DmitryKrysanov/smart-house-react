import React from 'react';
import './DeviceDetailsDialog.scss';
import WashingMachine from '../../models/WashingMachine';
import Oven from '../../models/Oven';
import ModeView from '../Mode/ModeView';
import TemperatureView from '../Range/TemperatureView';

const DeviceDetailsDialog = (props: {device: Oven | WashingMachine, handleToggleDialog: () => void}) =>  {
    return (
        <div className='dialog'>
            <div className='card-dialog__inner'>
                <div className='card-dialog__image'>
                    <img src={props.device.getImage()} alt={props.device.getName()} />
                </div>
                <div className='card-dialog__content'>
                    <h1>{props.device.getName()}</h1>
                    <div className='card-dialog__row'>
                        <ModeView modes={props.device.getModes()}/>
                    </div>
                    <div className='card-dialog__row'>
                        <TemperatureView temperature={props.device.getTemperature()} />
                    </div>
                    <div className='action-btns'>
                        <button className='btn__text' onClick={props.handleToggleDialog}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceDetailsDialog;