import React from "react";
import "../styles/App.css";
import Header from "../components/Header/Header.js";
import { useLocation } from 'react-router-dom';
import DownloadButton from "../components/download_button/DownloadButton.js";

const downloadTranscript = (text) => {

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transkrypt.txt';
    link.click();
    URL.revokeObjectURL(url);
  };
  

const Download = () => {

    const location = useLocation();
    const transcript = location.state?.transcript;

    const handleDownload = () => {
        if(transcript !== null && transcript !== undefined){
            downloadTranscript(transcript);
        }
        else{
            alert("dodaj plik.");
        }
    }

    return (
        <>
        <Header />
        <section className="box"> 
            <h2 className="title">
                Gotowe !
            </h2>
            <p className="subtitle">
                Pobierz plik z transkryptem
            </p>
            <div className="button__download" >
                <DownloadButton
                    onHandleDownload={handleDownload}
                />
                Pobierz Transkrypt
            </div>
        </section> 
        </>
    )
}

export default Download