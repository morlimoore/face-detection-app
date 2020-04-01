import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain2.png';

const Logo = () => {
    return (
        <div className='ma4 mt0 ontop' style={{width: 'fit-content'}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img alt='logo' src={brain} style={{paddingTop: '20px'}}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;