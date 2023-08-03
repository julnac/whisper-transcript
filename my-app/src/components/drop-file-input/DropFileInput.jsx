import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'

import "./drop-file-input.css";

import Mp3 from '../../assets/mp3.png'; 
import UploadImg from '../../assets/upload.svg';


const DropFileInput = () => {

    const wrapperRef = useRef(null);

    const [file, setFile] = useState(null);
    const [disableFileInput, setDisableFileInput] = useState(false);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const allowedExtensions = /(\.mp3)$/i;
        // const fileInput = document.getElementById('file');
        // const filePath = fileInput.value;
        const newFile = e.target.files[0];

        wrapperRef.current.classList.add('dragover');

        if (!allowedExtensions.exec(newFile.name)) {
            alert('Invalid file type');
            return false;
        }

        if(newFile !== undefined && newFile !== null){
            // validate
            setDisableFileInput(true);
            setFile(newFile);
            return true;
        }
    }

    const fileRemove = () => {
        setFile(null);
        setDisableFileInput(false);
        wrapperRef.current.classList.remove('dragover');
        
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onFileDrop={onFileDrop}
            >
                <div className="drop-file-input__label">
                    <button className='button'>
                        <img src={UploadImg} alt="Upload Icon" className="download_icon"/>
                        <p>Wgraj Plik</p>
                    </button>
                    <p className='podpis'>kliknij aby przeglądać, lub <br />przeciągnij i upuść tutaj</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}  disabled={disableFileInput}/>
            </div>
            {
                file !== null ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Gotowe do przesłania
                        </p>
                            <div className="drop-file-preview__item ">
                                <img src={Mp3} className='img_mp3'/>
                                <div className="drop-file-preview__item__info">
                                    <p>{file.name}</p>
                                    <p>{file.size}B</p>
                                </div>
                                <span className="drop-file-preview__item__del" onClick={() => fileRemove()}>x</span>
                            </div>
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;