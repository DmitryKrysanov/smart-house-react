import React from 'react';
import style from './Filter.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { devicesAPI } from '../../api/api';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';
import { setDevices } from '../../redux/actions/deviceActions/deviceActions';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';

type Props = ReturnType<typeof mapDispatchToProps>;

const Filter = (props: Props) => {

  const [value, setValue] = React.useState(0);

  const handleChange = async (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    let type = ''
    if (newValue === 1) {
      type = '?type=oven'
    } if (newValue === 2) {
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
        <Link to={routes.allDevices}>
          {/* <button>All</button> */}
          <Tab label="All" />
        </Link>
        <Link to={routes.ovens}>
          <Tab label="Oven" />
          {/* <button>Oven</button> */}
        </Link>
        <Link to={routes.robots}>
          <Tab label="Robot Hoover" />
        </Link>
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