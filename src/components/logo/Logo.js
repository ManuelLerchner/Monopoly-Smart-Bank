import React from "react";

import LogoPNG from "../../images/Logo2.png";
import "./Logo.css";

export default function Logo() {
    return (
        <div className="container center logoContainer hide-on-med-and-down">
            <img className="logo" src={LogoPNG} alt="logo" />
        </div>
    );
}
