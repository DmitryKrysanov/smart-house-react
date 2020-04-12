import React, { Component } from 'react';
import { devicesAPI } from '../../api/api';
import style from './Pagination.module.scss';

interface Props {
    totalPages: number,
    page: number,
    onChangePage: (number: number) => void
}
const Pagination = (props: Props) => {

    const pageNumbers: number[] = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <button className={number === props.page
                ? `${style.pagination_btn} ${style.active}`
                : style.pagination_btn}
                onClick={() => { props.onChangePage(number) }} >
                {number}
            </button>
        );
    });

    return (
        <div>
            {pageNumbers.length <= 1 ? null : renderPageNumbers}
        </div>
        
    )

}

export default Pagination;

