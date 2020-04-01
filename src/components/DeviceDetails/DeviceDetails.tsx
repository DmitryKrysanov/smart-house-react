import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import style from './DeviceDetails.module.scss'

const modesList: string[] = [
    'mode1', 'mode2', 'mode3'
]

const DeviceDetails = () => {

    const modeItems = modesList.map((item, index) => (
        <MenuItem key={index} value={item}>{item}</MenuItem>
        )
    )

    return (
        <div className={style.device_details}>
            <div className={style.device_details__image}>
                <img src="http://placehold.it/600" alt="sdf" />
            </div>
            <div className={style.device_details__content}>
                <div className={style.general_info}>
                    <div className={style.info}>
                        <h5>Device Name</h5>
                        <p>Oven</p>
                    </div>
                    <Switch edge="end" />
                </div>
                <h6>Temperature</h6>
                <div className={style.range}>
                    <h2>100</h2>
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
                <h6>Modes</h6>
                <div className={style.modes}>
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
                <div className={style.row}>
                    <h6>Delete device</h6>
                    <Button 
                        variant='outlined' 
                        color='secondary' 
                        // onClick={this.increase}
                        ><DeleteIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeviceDetails;