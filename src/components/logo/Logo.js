import React from "react";

import LogoPNG from "../../images/Logo2.png";
import "./Logo.css";

export default function Logo() {
    return (
        <div className="container center logoContainer">
            <img className="logo" src={LogoPNG} alt="logo" />
        </div>
    );
}
