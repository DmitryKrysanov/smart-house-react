import React from 'react';
import Switch from '@material-ui/core/Switch';
import style from './GeneralInfo.module.scss';

interface Props {
    type: string,
    name: string,
    status: boolean
    handleToggle: () => void
}

const generalInfo = (props: Props) => {

    const {type, name, status, handleToggle} = props;
    
    return (
        <div className={style.general_info}>
            <div className={style.info}>
                <h5>{name}</h5>
                <p>{type}</p>
            </div>
            <Switch edge="end"
                onChange={handleToggle}
                checked={status} />
        </div>
    )
}

export default generalInfo;