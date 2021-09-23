import React from "react";

import LogoPNG from "../../images/Logo2.png";
import "./Logo.css";

export default function Logo({ setGameState }) {
    return (
        <div className="container center logoContainer hide-on-med-and-down">
            <a
                href="#!"
                onClick={() => {
                    setGameState("main");
                }}
            >
                <img className="logo" src={LogoPNG} alt="logo" />
            </a>
        </div>
    );
}
