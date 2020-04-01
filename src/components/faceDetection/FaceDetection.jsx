import React from 'react';
import './faceDetection.css';

const FaceDetection = ({ imageURL, faceBox }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageURL} width='500px' height='auto' />
                <div className='bounding-box' style={{top: faceBox.topRow, right: faceBox.rightCol, bottom: faceBox.bottomRow, left: faceBox.leftCol}}>

                </div>
            </div>
        </div>
    )
}

export default FaceDetection;