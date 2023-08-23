import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types'

import "./drop-file-input.css";
import "../../styles/App.css";

import Mp3 from '../../assets/mp3.png';
import UploadImg from '../../assets/upload.svg';
import {getTranscriptionFromOpenAI} from "../../scripts/OpenAiFunctions";

import { useNavigate } from 'react-router-dom';


const DropFileInput = () => {

    const wrapperRef = useRef(null);

    const [file, setFile] = useState(null);
    const [hideFileInput, setHideFileInput] = useState(false);
    const [isDisabled, setDisabled] = useState(true);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const navigate = useNavigate();

    const onTokenInput = (event) => {
        const input = event.target.value;
        if (input.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const onFileDrop = (e) => {
        const allowedExtensions = /(\.mp3)$/i;
        const newFile = e.target.files[0];

        if (!allowedExtensions.exec(newFile.name)) {
            alert('Invalid file type');
            return false;
        }

        setHideFileInput(true);
        setFile(newFile);
        return true;
    }

    const fileRemove = () => {
        setFile(null);
        setHideFileInput(false);
        setHideFileInput(false);
        setFile(null);
    }

    const getFileSize = (_size) => {
        let i = 0;
        const fSExt = ['Bytes', 'KB', 'MB', 'GB'];

        while (_size > 900) {
            _size /= 1024;
            i++;
        }
        return (Math.round(_size * 100) / 100) + ' ' + fSExt[i];
    }

    function handleSubmit(event) {
        event.preventDefault();

        const apiKey = event.target["apiKey"].value;
        getTranscriptionFromOpenAI(file, apiKey)
            .then(response => {
                navigate('/whisper-transcript/download', { state: { transcript: response.data } });
            })
            .catch(error => {
                console.log(error);
                // TODO - wyswietl blad
            });
    }

    return (
        <>
            {
                !hideFileInput
                    ?
                    <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onFileDrop={onFileDrop}
                    >
                        <div className="drop-file-input__label">
                            <button className='button button__download'>
                                <img src={UploadImg} alt="Upload Icon" className="download_icon"/>
                                <p>Wgraj Plik</p>
                            </button>
                            <p className='podpis'>kliknij aby przeglądać, lub <br />przeciągnij i upuść tutaj</p>
                        </div>
                        <input type="file" value="" onChange={onFileDrop}  disabled={hideFileInput}/>
                    </div>
                    :
                    <></>
            }
            {
                file !== null ? (
                    <div className="drop-file-preview">
                            <div className="drop-file-preview__item ">
                                <img src={Mp3} className='img_mp3' alt={"mp3"}/>
                                <div className="drop-file-preview__item__info">
                                    <p>{file.name}</p>
                                    <p>{getFileSize(file.size)}</p>
                                </div>
                                <span className="drop-file-preview__item__del" onClick={() => fileRemove()}>x</span>
                            </div>
                        <p className="drop-file-preview__title">Wprowadź token</p>
                        <form className="container" onSubmit={handleSubmit} method="POST">
                            <input type="text" name="apiKey" onChange={onTokenInput} className="input__token" placeholder="Bearer token"/><br />
                            <button className="button button__send" disabled={isDisabled} type="submit">Generuj</button>
                        </form>
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