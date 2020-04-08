import React from 'react';
import { Oven, RobotHoover } from '../../../redux/reducers/deviceReducer';
import Switch from '@material-ui/core/Switch';
import style from './GeneralInfo.module.scss';

interface Props {
    type: string,
    name: string,
    status: boolean

    handleToggle: () => void
}

const generalInfo = (props: Props) => {
    return (
        <div className={style.general_info}>
            <div className={style.info}>
                <h5>{props.name}</h5>
                <p>{props.type}</p>
            </div>
            <Switch edge="end"
                onChange={props.handleToggle}
                checked={props.status} />
        </div>
    )
}

export default generalInfo;