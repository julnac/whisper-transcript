import React from "react";
import "../../styles/App.css";
import"./header.css";


const Header = () => {
    return (
        <>
        <header className="header">
            <nav className="nav container">
                <a href="/" className="nav__logo"><h1>Subtitlio</h1></a>
                <a href="/" className="nav__item">Jak to działa?</a>
            </nav>
        </header>
        </>
    )
}

export default Header