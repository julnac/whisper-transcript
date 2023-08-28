import React from "react";
import "../../styles/App.css";
import"./header.css";


const Header = () => {
    return (
        <>
        <header className="header">
            <nav className="nav container">
                <a href="/whisper-transcript/" className="nav__logo"><h1>Subtitlio</h1></a>
                <a href="https://www.youtube.com/watch?v=Gd0JD2aHNDQ" target="_blank" rel="noreferrer" className="nav__item">Skąd wziąć bearer token?</a>
            </nav>
        </header>
        </>
    )
}

export default Header