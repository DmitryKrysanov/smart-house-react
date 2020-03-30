import React, { Component } from 'react';
import DeviceDetailsHeader from '../DeviceDetailsHeader/DeviceDetailsHeader';
import './DeviceDetails.scss'

const DeviceDetails = () => {
    return (
        <div>
        <DeviceDetailsHeader />
        <div className='device-details'>
            <div className='device-details__image'>
                <img src="http://placehold.it/600" alt="sdf"/>
            </div>
            <div className='device-details__content'>
                <h3>Device Name</h3>
                <p>Oven</p>
                <div>
                <div className='temperature__header'>
                    <h5>Temperature</h5>
                    <button className='btn__outlined'>Edit</button>
                </div>
             
                <div className='temperature'>
                    <h3>10</h3>
                    <button
                        className='btn__outlined' >
                            -
                    </button>
                    <h1>100</h1>
                    <button
                        className='btn__outlined' >
                            +
                    </button>
                    <h3>240</h3>
                </div>
            </div>

            </div>
        </div>
        </div>
    )
}

export default DeviceDetails;