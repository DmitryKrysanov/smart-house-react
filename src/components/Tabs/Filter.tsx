import React, { useState, useEffect } from 'react';
import style from './Filter.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { devicesAPI } from '../../api/api';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { setDevices, setDevicesType, setTotalItems, fetchDevices, filterSagaDevices } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { routes } from '../../routes';

type Props = RouteComponentProps<{ deviceType: string }> & ReturnType<typeof mapDispatchToProps>

const Filter: React.FC<Props> = (props) => {

  const [value, setValue] = useState('');

  console.log(props.match.params.deviceType);

  let type = '';

  (props.match.params.deviceType !== 'all') ?
    type = `${props.match.params.deviceType}` : type = '';

  const loadAllDevices = async () => {
    props.setDevicesType(type);
    props.filterSagaDevices({ page: 1, type: type });
    // const respOvens: any = await devicesAPI.filter(1, type);
    // props.loadDevices(respOvens.data);
    // props.setTotalItems(respOvens.totalItems);
  }

  useEffect(() => {
    loadAllDevices()
  }, [type]);

  const handleChange = async (event: React.ChangeEvent<{}>, value: string) => {
    setValue(value);
  };


  return (
    <div className={style.filter}>
      <Tabs
        value={type}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
      >

        <Tab value={''} label="All" component={NavLink} to='/home/devices/all' />
        <Tab value={'&type=Oven'} label="Oven" component={NavLink} to='/home/devices/&type=Oven' />
        <Tab value={'&type=Robot-hoover'} label="Robot" component={NavLink} to='/home/devices/&type=Robot-hoover' />

      </Tabs>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // loadDevices: (p: Array<Oven | RobotHoover>) => {
  //   return dispatch(setDevices(p));
  // },
  setDevicesType: (p: string) => {
    return dispatch(setDevicesType(p))
  },
  filterSagaDevices: (p: { page: number, type: string }) => {
    return dispatch(filterSagaDevices(p))
  }
  // setTotalItems: (p: number) => {
  //   return dispatch(setTotalItems(p))
  // }
  // // getAllDevices: () => {
  //   return dispatch(fetchDevices());
  // }
})

const filterWithRouter = withRouter(Filter);

export default connect(null, mapDispatchToProps)(filterWithRouter);
//export default connect(null, mapDispatchToProps)(Filter);