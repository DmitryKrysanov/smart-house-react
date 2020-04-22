import React, { useState, useEffect } from 'react';
import style from './Filter.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { devicesAPI } from '../../api/api';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { setDevices, setDevicesType, setTotalItems } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { routes } from '../../routes';

type Props = ReturnType<typeof mapDispatchToProps>;

const Filter = (props: Props & RouteComponentProps) => {

  const [value, setValue] = useState('');

  const loadAllDevices = async () => {
    props.setDevicesType(value);
    const respOvens: any = await devicesAPI.filter(1, value);
    props.loadDevices(respOvens.data);
    props.setTotalItems(respOvens.totalItems);
  }

  useEffect(() => {
    loadAllDevices();
  })

  const handleChange = async (event: React.ChangeEvent<{}>, value: string) => {
    setValue(value);
  };

  return (
    <div className={style.filter}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
      >

        <Tab value={''} label="All" component={NavLink} to={`${props.match.url}/all`} />
        <Tab value={'&type=Oven'} label="Oven" component={NavLink} to={`${props.match.url}/ovens`} />
        <Tab value={'&type=Robot-hoover'} label="Robot" component={NavLink} to={`${props.match.url}/robots`} />

      </Tabs>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadDevices: (p: Array<Oven | RobotHoover>) => {
    return dispatch(setDevices(p));
  },
  setDevicesType: (p: string) => {
    return dispatch(setDevicesType(p))
  },
  setTotalItems: (p: number) => {
    return dispatch(setTotalItems(p))
  }
})

const filterWithConnect = connect(null, mapDispatchToProps)(Filter);

export default withRouter(filterWithConnect);
//export default connect(null, mapDispatchToProps)(Filter);