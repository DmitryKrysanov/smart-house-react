import React, { Fragment, Component } from 'react';
import style from './Temperature.module.scss';
import Button from '@material-ui/core/Button';

interface Props {
    temp: {
        min: number,
        max: number,
        current: number,
        step: number
    },
    handleTempChange: (name: string, value: number) => void
}

class Temperature extends Component<Props> {

    state = {
        temp: {...this.props.temp}
    }

    public increase = () => {
        const { max, current, step } = this.state.temp;
        if (current !== max) {
            if ((current + step) >= max) {
                this.setState({
                    temp: {
                        ...this.state.temp,
                        current: max
                    }
                })
                this.props.handleTempChange('current', max)
            } else {
                this.setState({
                    temp: {
                        ...this.state.temp,
                        current: current + step
                    }
                })
                this.props.handleTempChange('current', current + step)
            }
        }
    }

    public decrease = () => {
        const { min, current, step } = this.state.temp;
        if (current !== min) {
            if ((current - step) <= min) {
                this.setState({
                    temp: {
                        ...this.state.temp,
                        current: min
                    }
                })
                this.props.handleTempChange('current', min)
            } else {
                this.setState({
                    temp: {
                        ...this.state.temp,
                        current: current - step
                    }
                })
                this.props.handleTempChange('current', current - step)
            }
        }
    }

    render() {
        return (
            <Fragment>
            <h6>Temperature</h6>
            <div className={style.range}>
                <h2>{this.state.temp.current}</h2>
                <div className={style.range__buttons}>
                    <Button 
                    variant='outlined' 
                    color='secondary' 
                    onClick={this.decrease}
                    > - </Button>
                    <Button 
                    variant='outlined' 
                    color='secondary' 
                    onClick={this.increase}
                    > + </Button>
                </div>
            </div>
        </Fragment>
        );
}
}

export default Temperature;