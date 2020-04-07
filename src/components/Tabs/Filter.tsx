import React, { Fragment } from 'react';
import style from './Filter.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

interface Props {
  offDevices: () => void
}
const Filter = (props: Props) => {

    const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
            <Tab label="Washing Machine" />
      </Tabs>
      <Button variant='outlined' color={'secondary'} onClick={props.offDevices}>Turn off all devices</Button>
    </div>
  );
}

export default Filter;