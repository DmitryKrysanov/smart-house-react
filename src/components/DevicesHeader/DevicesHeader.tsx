import React from 'react';
import style from './DevicesHeader.module.scss';
import Search from './Search';

const DevicesHeader = () => {
    return (
      <header className={style.header}>
        <div className='wrapper'>
          <div className={style.header__inner}>
            <h6>Home</h6>
            <Search />
          </div>
        </div>
      </header>
    );
  }

export default DevicesHeader;
