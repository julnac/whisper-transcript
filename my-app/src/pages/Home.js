import React from "react";
import "../styles/App.css";
import DropFileInput from "../components/drop-file-input/DropFileInput";
import Header from "../components/Header/Header.js";


const Home = () => {

    return (
        <>
        <Header />
        <section className="box">
            <h2 className="title">
                Wygeneruj Transkrypt
            </h2>
            <p className="subtitle">
                Uzyskaj tekst z pliku audio MP3
            </p>
            <DropFileInput/>
        </section>
        </>
    )
}

export default Home