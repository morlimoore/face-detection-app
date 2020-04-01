import React from 'react';
import './imageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className='ontop'>
            <p className='f3'>
                {'This app would detect all of the faces in your picture.'}
            </p>
            <i>
                {'Give it a try. Enter your image URL below.'}
            </i>
            
            <div className='center' style={{marginTop:'20px'}}>
                <div className='pa4 br3 shadow-5 form center'>
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;