import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import style from './DeviceDetails.module.scss'
import DeviceDetailsHeader from '../DeviceDetailsHeader/DeviceDetailsHeader';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { useRouteMatch, useParams } from 'react-router-dom';

interface Props {
    devices: Array<Oven | RobotHoover>
    deviceToggle: (id: number) => void
}

interface MatchParams {

}

const DeviceDetails = (props: Props) => {

    const match: any = useParams();
    const deviceId = +match.deviceId;
    const device = props.devices.find(( {id} ) => id === deviceId);

    const modes = () => {
        if(device !== undefined) {
        const modeItems = device.modes.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
            )
        )
        return modeItems;
    }
}

   

    return (
        <div>
            <DeviceDetailsHeader />
            {device !== undefined ? 
            <div className={style.device_details}>
            <div className={style.device_details__image}>
                <img src={device.image} alt={device.name} />
            </div>
            <div className={style.device_details__content}>
                <div className={style.general_info}>
                    <div className={style.info}>
                        <h5>{device.name}</h5>
                        <p>{device.type}</p>
                    </div>
                    <Switch edge="end"
                        onChange={() => { props.deviceToggle(device.id) }}
                        checked={device.status} />
                </div>
                <h6>Temperature</h6>
                <div className={style.range}>
                    <h2> - </h2>
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
                            {modes}
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
        </div> : <h5>Device not found</h5>}
            
        </div>
        
    )
}

export default DeviceDetails;