import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import style from './DevicesHeader.module.scss';
import { devicesAPI } from '../../api/api';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer';

interface Props {
  loadDevices: (p: Array<Oven | RobotHoover>) => void
}

class DevicesHeader extends React.Component<Props> {

  state = {
    term: ''
  }

  public onSearchChange = (event: { currentTarget: { value: any; }; }) => {
    this.setState({
      term: event.currentTarget.value
    })
  }

  public onSearchClick = async () => {
    const search: any = await devicesAPI.search(this.state.term);
    this.props.loadDevices(search.data);
  }

render() {
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
          <h6>Home</h6>
          <div className={style.search}>
            <input type='text' className={style.search__input} placeholder='Search' onChange={this.onSearchChange}></input>
            <button className={style.search__btn} onClick={this.onSearchClick} ><SearchIcon /></button>
          </div>
      </div>
    </header>
  );
}
}

export default DevicesHeader;
