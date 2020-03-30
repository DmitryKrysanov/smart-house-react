import React, { Component } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './DeviceDetailsHeader.scss';

const options = [
    'None',
    'Atria'
  ];

class DeviceDetailsHeader extends Component {
    state ={
        show: false,
        anchorMenu: null
    }

    private onBackClick = () => {
        console.log('back')
    }

    private onOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            show: !this.state.show,
            anchorMenu: event.currentTarget
        })
      };

    private handleClose = () => {
        this.setState({
            show: !this.state.show
        })
      };

      render() {

    return (
        <header className='device-details-header'>
            <div className='wrapper'>
                <button className='action-btn' type='button' onClick={this.onBackClick}><ArrowBackIcon /></button>
                <button className='action-btn options' type='button' onClick={this.onOptionsClick}><MoreVertIcon /></button>
                    <Menu anchorEl={this.state.anchorMenu} open={this.state.show} onClose={this.handleClose}>
                        {options.map(option => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
                            {option}
                        </MenuItem>
                        ))}
                    </Menu>
            </div>
      </header>
    );
}
}

export default DeviceDetailsHeader;