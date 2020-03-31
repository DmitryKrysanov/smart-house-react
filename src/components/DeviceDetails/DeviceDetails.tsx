import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import './DeviceDetails.scss'

const modesList: string[] = [
    'mode1', 'mode2', 'mode3'
]

const DeviceDetails = () => {

    const modeItems = modesList.map((item, index) => (
        <MenuItem key={index} value={item}>{item}</MenuItem>
        )
    )

    return (
        <div className='device-details'>
            <div className='device-details__image'>
                <img src="http://placehold.it/600" alt="sdf" />
            </div>
            <div className='device-details__content'>
                <div className='general-info'>
                    <div className='info'>
                        <h5>Device Name</h5>
                        <p>Oven</p>
                    </div>
                    <Switch edge="end" />
                </div>
                <h6>Temperature</h6>
                <div className='range'>
                    <h2>100</h2>
                    <div className='range__buttons'>
                        <button className='btn__outlined' > - </button>
                        <button className='btn__outlined' > + </button>
                    </div>
                </div>
                <h6>Modes</h6>
                <div className='modes'>
                    <FormControl fullWidth={true}>
                        <InputLabel>Current Mode</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        //   value={age}
                        //   onChange={handleChange}
                        >
                            {modeItems}
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default DeviceDetails;