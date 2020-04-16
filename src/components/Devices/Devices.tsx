import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import style from './Devices.module.scss';
import { RobotHoover, Oven } from '../../redux/reducers/deviceReducer'
import AddIcon from '@material-ui/icons/Add';
import AddDeviceContainer from '../AddDevice/AddDeviceContainer'
import Filter from '../Tabs/Filter';
import { addDevice } from '../../redux/actions/deviceActions/deviceActions';
import DevicesHeader from '../DevicesHeader/DevicesHeader'
import Fab from '@material-ui/core/Fab';
import { Loader } from '../Loader/Loader';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';
import DevicesList from './DevicesList';
import { Switch, Route, Link } from 'react-router-dom';
import { routes } from '../../routes';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class Devices extends Component<ReturnType<typeof mapDispatchToProps>> {

  public state = {
    showModal: false,
    isLoading: false
  }

  private handleToggleDialog = (): void => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {

    const { showModal } = this.state;

    return (
      <div>
        <DevicesHeader />
        <div className={style.filter}>
          <Filter />
        </div>
        <div className={style.fab}>
          <Fab color="secondary" aria-label="add" onClick={this.handleToggleDialog}>
            <AddIcon color='inherit' />
          </Fab>
        </div>
        {showModal ? ReactDOM.createPortal(
          <AddDeviceContainer handleToggleDialog={this.handleToggleDialog} addDevice={this.props.addResourse} />,
          document.getElementById('modal-root') as HTMLInputElement
        ) : null}

        <Fragment>
          <div>
            {
              this.state.isLoading ?
                <Loader /> : null
            }

            <Switch>
              <Route exact path={routes.allDevices}>
                <DevicesList />
              </Route>

              <Route path={routes.ovens}>
                <DevicesList />
              </Route>

              <Route path={routes.robots}>
                <DevicesList />
              </Route>

              <Route path='/home/devices/:deviceId'>
                <div>
                  <Link to={routes.allDevices}>
                    <IconButton> <ArrowBackIcon /> </IconButton>
                  </Link>
                  <br />
                Details of some device...
              </div>
              </Route>

            </Switch>
          </div>
        </Fragment>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addResourse: (p: Oven | RobotHoover) => {
    return dispatch(addDevice(p))
  }
});

export default connect(() => ({}), mapDispatchToProps)(Devices);