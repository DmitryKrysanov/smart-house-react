import React, { useState, useEffect } from 'react';
import style from './../Filter.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { setDevicesType, filterSagaDevices } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps<{ deviceType: string }> & ReturnType<typeof mapDispatchToProps>

const Filter: React.FC<Props> = (props) => {

  const [value, setValue] = useState('');

  let type = '';

  (props.match.params.deviceType !== 'all') ?
    type = `${props.match.params.deviceType}` : type = '';

  const loadAllDevices = async () => {
    props.setDevicesType(type);
    props.filterSagaDevices({ page: 1, type: type });
  }

  useEffect(() => {
    loadAllDevices()
  }, []);

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
  setDevicesType: (p: string) => {
    return dispatch(setDevicesType(p))
  },
  filterSagaDevices: (p: { page: number, type: string }) => {
    return dispatch(filterSagaDevices(p))
  }
})

const filterWithRouter = withRouter(Filter);

export default connect(null, mapDispatchToProps)(filterWithRouter);