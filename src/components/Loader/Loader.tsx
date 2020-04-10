import React from 'react';
import style from './Loader.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader: React.FC = () => {
    return (

        <div className={style.loader} role="status">
            <CircularProgress color="secondary" />
            <span className="sr-only">Loading...</span>
        </div>
    )
}