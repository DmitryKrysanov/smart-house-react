import React from 'react';
import style from './Filter.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { devicesAPI } from '../../api/api';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { SetDevicesAction } from '../../redux/actions/deviceActions/deviceActions';

interface Props {
  offDevices: () => void,
  loadDevices: (p: Array<Oven | RobotHoover>) => SetDevicesAction
}
const Filter = (props: Props) => {

    const [value, setValue] = React.useState(0);
  
  const handleChange = async (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    let type = ''
    if(newValue === 1) {
      type = '?type=oven'
    } if(newValue === 2) {
      type = '?type=robot-hoover'
    }
    const respOvens: any = await devicesAPI.filter(type);
    props.loadDevices(respOvens.data);
  };

  return (
    <div className={style.filter}>
      <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          >
            <Tab label="All" />
            <Tab label="Oven" />
            <Tab label="Robot Hoover" />
      </Tabs>
      <Button variant='outlined' color={'secondary'} onClick={props.offDevices}>Turn off all devices</Button>
    </div>
  );
}

export default Filter;