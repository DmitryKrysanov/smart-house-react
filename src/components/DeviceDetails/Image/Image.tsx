import React from 'react';
import style from './Image.module.scss';

interface Props {
    image: string
}

const Image = (props: Props) => {

    const {image} = props;
    return (
        <div className={style.device_details__image}>
            <img src={image} alt={image} />
        </div>
    );
}

export default Image;