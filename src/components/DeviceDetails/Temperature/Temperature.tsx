import React, { Fragment } from 'react';
import style from './Temperature.module.scss';
import Button from '@material-ui/core/Button';

interface Props {
    temp: {
        min: number,
        max: number,
        current: number,
        step: number
    }
}

const Temperature = (props: Props) => {
    console.log(props)
        return (
            <Fragment>
            <h6>Temperature</h6>
            <div className={style.range}>
                <h2>{props.temp.current}</h2>
                <div className={style.range__buttons}>
                    <Button 
                    variant='outlined' 
                    color='secondary' 
                    // onClick={this.decrease}
                    > - </Button>
                    <Button 
                    variant='outlined' 
                    color='secondary' 
                    // onClick={this.increase}
                    > + </Button>
                </div>
            </div>
        </Fragment>
        );
}

export default Temperature;