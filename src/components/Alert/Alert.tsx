import React from 'react';
import style from './Alert.module.scss';

interface Props {
    text: string
}

const Alert = (props: Props) => {
    return (
        <div className={style.alert}>
            {props.text}
        </div>
    )
}

export default Alert;