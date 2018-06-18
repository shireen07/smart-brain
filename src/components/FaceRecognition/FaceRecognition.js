import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='pa2 ma center'>
            <div className='absolute mt2 mb5'>
                <img id='inputimage' src={imageURL} alt=' ' width='600px' height='auto'/>
                <div className='bounding-box' 
                     style={{top: box.topRow , right: box.rightCol , bottom: box.bottomRow , left: box.leftCol}}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;