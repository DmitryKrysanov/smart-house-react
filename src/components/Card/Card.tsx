import React from 'react';
import style from './Card.module.scss';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import Switch from '@material-ui/core/Switch';

interface Props {
    device: Oven | RobotHoover,
    deviceToggle: (id: number) => void
}

const Card = (props: Props) => {

    const { device } = props;

    return (
        <div>
            <div className={style.card} >
                <div className={style.card__image}>
                    <img src={device.image} alt={device.name} />
                </div>
                <div className={style.card__content}>
                    <div>
                        <h5>{device.name}</h5>
                        <p>{props.device.type}</p>
                    </div>
                    {/* <Switch edge="end"
                        onChange={() => { props.deviceToggle(props.device.id) }}
                        checked={props.device.status} /> */}
                </div>
            </div>
        </div>
    )
}

export default Card;