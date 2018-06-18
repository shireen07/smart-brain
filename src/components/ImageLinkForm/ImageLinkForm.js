import React  from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onBtnSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This magic Brain will detect the faces in your pictures!! Give it a go!'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                            onClick={onBtnSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;