import React from 'react';
import style from './Filter.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { devicesAPI } from '../../api/api';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { setDevices } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { routes } from '../../routes';

type Props = ReturnType<typeof mapDispatchToProps>;

const Filter = (props: Props) => {

  const [value, setValue] = React.useState('');

  const handleChange = async (event: React.ChangeEvent<{}>, value: string) => {
    setValue(value);
    const respOvens: any = await devicesAPI.filter(`${value}`);
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

        <Tab value={''} label="All" component={NavLink} to={routes.allDevices} />
        <Tab value={'&type=Oven'} label="Oven" component={NavLink} to={routes.ovens} />
        <Tab value={'&type=Robot-hoover'} label="Robot" component={NavLink} to={routes.robots} />

      </Tabs>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadDevices: (p: Array<Oven | RobotHoover>) => {
    return dispatch(setDevices(p));
  }
})

export default connect(null, mapDispatchToProps)(Filter);