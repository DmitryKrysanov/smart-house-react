import React from 'react';
import style from './DeviceDetailsHeader.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { routes } from '../../../routes';


const DeviceDetailsHeader = (props: RouteComponentProps) => {
    return (
        <header className={style.header}>
            <div className='wrapper'>
                <div className={style.header__inner}>
                    <Link to={`${routes.allDevices}`}>
                        <IconButton><ArrowBackIcon /></IconButton>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default withRouter(DeviceDetailsHeader);