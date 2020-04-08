import React from 'react';
import { Oven, RobotHoover } from '../../../redux/reducers/deviceReducer';
import Switch from '@material-ui/core/Switch';
import style from './GeneralInfo.module.scss';

interface Props {
    device: Oven | RobotHoover,
    deviceToggle: (id: number) => void
}

const generalInfo = (props: Props) => {
    return (
        <div className={style.general_info}>
            <div className={style.info}>
                <h5>{props.device.name}</h5>
                <p>{props.device.type}</p>
            </div>
            <Switch edge="end"
                onChange={() => { props.deviceToggle(props.device.id) }}
                checked={props.device.status} />
        </div>
    )
}

export default generalInfo;