import React, { Component } from 'react';
import style from './Card.module.scss';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

interface Props {
    device: Oven | RobotHoover,
    deviceToggle: (id: number) => void
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
        console.log(this.props.device)

        return (
            <div>
                <div className={style.card} >
                    <div className={style.card__image}>
                        <img src={device.image} alt={device.name} />
                    </div>
                    <div className={style.card__content}>
                        <div>
                            <h5>{device.name}</h5>
                            <p>{this.props.device.type}</p>
                        </div>
                        <Switch edge="end" onChange={() => {this.props.deviceToggle(this.props.device.id)}} checked={this.props.device.status} />
                        {/* <button className='btn__outlined' onClick={this.handleToggleDialog}>Details</button>
                        {showModal ? ReactDOM.createPortal(
                            <DeviceDetailsDialogContainer device={device} handleToggleDialog={this.handleToggleDialog}/>,
                            document.getElementById('modal-root') as HTMLInputElement
                            ) : null  */}

                        {/* <button className='btn__outlined'>Details</button> */}
                        
                        {/* {this.props.device.type === 'oven' ? 
                            <div className={style.range}>
                                <h2>{this.props.device.temp.current}</h2>
                                <div className={style.range__buttons}>
                                    <Button 
                                    variant='outlined' 
                                    color='secondary' 
                                    // onClick={this.decrease}
                                    > - </Button>
                                    <Button 
                                    variant='outlined' 
                                    color='secondary' 
                                    // onClick={this.increase}
                                    > + </Button>
                                </div>
                            </div> : null
                        } */}
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;