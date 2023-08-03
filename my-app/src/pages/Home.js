import React from "react";
import "../styles/App.css";
import DropFileInput from "../components/drop-file-input/DropFileInput";


const Home = () => {

    const onFileChange =(files) => {
        console.log(files);
    }
    return (
        <>
        <section className="box">
            <h2 className="title">
                Wygeneruj Transkrypt
            </h2>
            <p className="subtitle">
                Uzyskaj tekst z pliku audio MP3
            </p>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
        </section>
        </>
    )
}

export default Home