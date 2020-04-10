import React from 'react';

export const Loader: React.FC = () => {
    return (

        <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
            <img src="https://thumbs.gfycat.com/ColossalMeekCygnet-size_restricted.gif" alt='loading'/>


        </div>
    )
}