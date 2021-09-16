import React from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./BuildingCard.css";

export default function BuildingCard({ building, price, clickCallback }) {
    const handleClick = () => {
        clickCallback(building, price);
    };

    return (
        <a className="gridBox" href="#!" onClick={handleClick}>
            <div className="flexContainerProperty">
                <div className="descriptionFlex">
                    <p className="propertyTitle">{building.name}</p>

                    <p className="propertyDescription">
                        {PlayerClass.formatMoney(price)}
                    </p>
                </div>

                <div className="imageFlex hide-on-med-and-down">
                    <img src={building.img} alt="img"></img>
                </div>
            </div>
        </a>
    );
}
