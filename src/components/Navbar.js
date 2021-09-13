import React from "react";

export default function Navbar({ setgameState }) {
    const toHome = () => {
        setgameState("createGame");
    };
    return (
        <nav>
            <div className="nav-wrapper grey darken-4">
                <a href="!#" className="brand-logo center" onClick={toHome}>
                    <i className="material-icons right">apartment</i>
                    Smart-Bank
                </a>

                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li>
                        <a href="sass.html">Cringe1</a>
                    </li>
                    <li>
                        <a href="badges.html">Sus1</a>
                    </li>
                    <li>
                        <a href="collapsible.html">Gay1</a>
                    </li>
                </ul>

                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <a href="sass.html">Cringe2</a>
                    </li>
                    <li>
                        <a href="badges.html">Sus2</a>
                    </li>
                    <li>
                        <a href="collapsible.html">Gay2</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
