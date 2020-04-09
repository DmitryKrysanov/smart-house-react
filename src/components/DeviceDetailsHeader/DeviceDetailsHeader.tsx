import React from 'react';
import style from './DeviceDetailsHeader.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';


const DeviceDetailsHeader = () => {
    return (
        <header className={style.header}>
        <div className='wrapper'>
            <div className={style.header__inner}>
                <Link to={'/home/devices'}>
                    <IconButton><ArrowBackIcon /></IconButton>
                </Link>
            </div>
        </div>
      </header>
    );
}

export default DeviceDetailsHeader;