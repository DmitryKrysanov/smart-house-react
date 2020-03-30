import React, { Component } from 'react';
import style from './Card.module.scss';
// import Oven from '../../models/Oven';
// import WashingMachine from '../../models/WashingMachine';
// import DeviceDetailsDialogContainer from '../Dialogs/DeviceDetailsDialogContainer'
// import ReactDOM from 'react-dom';
import { Device } from '../../redux/reducers/deviceReducer';

interface Props {
    device: Device 
}

class Card extends Component<Props> {

    state = {
        showModal: false
    }

    handleToggleDialog = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        // const {showModal} = this.state;
        const {device} = this.props;

        return (
            <div>
                <div className={style.card} >
                    <div className={style.card__image}>
                        <img src={device.image} alt={device.name} />
                    </div>
                    <div className={style.card__content}>
                        <h3>{device.name}</h3>
                        {/* <button className='btn__outlined' onClick={this.handleToggleDialog}>Details</button>
                        {showModal ? ReactDOM.createPortal(
                            <DeviceDetailsDialogContainer device={device} handleToggleDialog={this.handleToggleDialog}/>,
                            document.getElementById('modal-root') as HTMLInputElement
                            ) : null  */}

                        <button className='btn__outlined'>Details</button>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;