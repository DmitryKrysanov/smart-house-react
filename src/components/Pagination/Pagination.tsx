import React, { Component } from 'react';
import style from './Pagination.module.scss'
import { Device, RobotHoover, Oven } from '../../redux/reducers/deviceReducer';


interface State {
  devices: Array<Oven | RobotHoover>,
  totalPages: number,
  page: number,
  perPage: number,
}


class Pagination extends Component<{}, State> {

    state: State = {
      devices: [],
      totalPages: 1,
      page: 1,
      perPage: 8,
    }

    private handleClick = (event: any) => {
        this.setState({
          page: +event.target.innerText
        });
      }

    render() {
        const { devices, page, perPage, totalPages } = this.state;

        const indexOfLastDevice: number = page * perPage;
        const indexOfFirstDevice: number = indexOfLastDevice - perPage;
        const currentDevices: Device[] = devices.slice(indexOfFirstDevice, indexOfLastDevice);

        const renderDevices = currentDevices.map((device, index) => {
            return <li key={index}>{device}</li>;
          });

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li key={number} onClick={this.handleClick}>
            {number}
          </li>
        );
      });

        return (
            <div>
                <ul>
                    {renderDevices}
                </ul>
                <ul id="page-numbers" className={style.page_numbers}>
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}

export default Pagination;