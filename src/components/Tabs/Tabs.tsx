import React from 'react';
import './Tabs.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const Filter = () => {

    const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
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
  );
}

export default Filter;