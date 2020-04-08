import React, { FC } from 'react';
import style from './Image.module.scss';

interface Props {
    image: string
}

const Image = (props: Props) => {
        return (
                <div className={style.device_details__image}>
                    <img src={props.image} alt={props.image} />
                </div>
        );
}

export default Image;