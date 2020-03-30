import React, {Component} from 'react';
import IMode from '../../models/IMode';
import './ModeView.scss'

const ModeView = (props: { modes: IMode})  =>  {
    // const handleChange = (event: { target: { name: string, value: string | number; }; }) => {
    //     // this.setState({value: event.target.value});
    //   }

        return(
            <div className='modes'>
                <h5>Modes</h5>
                <div className='modes__control'>
                    <button className='btn__outlined' onClick={props.modes.prev}>Prev</button>
                    <h1>{props.modes.getCurrentMode()}</h1>
                    <button className='btn__outlined' onClick={props.modes.next}>Next</button>
                </div>
            </div>
        )
    }


export default ModeView;