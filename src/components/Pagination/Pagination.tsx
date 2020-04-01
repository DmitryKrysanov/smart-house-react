import React, { Component } from 'react';
import style from './Pagination.module.scss'

interface State {
    devices: any[],
    totalCount: number,
    pageSize: number,
    currentPage: number
}

class Pagination extends Component<{}, State> {

    state: State = {
        devices: ['a','b','c','d','e','f','g','h','i','j','k'],
        totalCount: 11,
        pageSize: 4,
        currentPage: 1
    }

    private handleClick = (event: any) => {
        this.setState({
          currentPage: +event.target.innerText
        });
      }

    render() {
        const { devices, currentPage, pageSize, totalCount } = this.state;

        const indexOfLastDevice: number = currentPage * pageSize;
        const indexOfFirstDevice: number = indexOfLastDevice - pageSize;
        const currentDevices: string[] = devices.slice(indexOfFirstDevice, indexOfLastDevice);

        const renderDevices = currentDevices.map((device, index) => {
            return <li key={index}>{device}</li>;
          });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalCount / pageSize); i++) {
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