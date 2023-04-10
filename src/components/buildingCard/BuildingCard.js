import React from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./BuildingCard.css";

export default function BuildingCard({ building, price, clickCallback }) {
    const handleClick = () => {
        clickCallback(building, price);
    };

    let style = `gridBox ${
        building.type === "house"
            ? "green darken-3"
            : building.type === "industrial"
            ? "blue-grey darken-4"
            : building.type === "negative"
            ? "red darken-2"
            : ""
    }`;

    return (
        <a className={style} onClick={handleClick}>
            <div className="flexContainerProperty">
                <div className="descriptionFlex">
                    <p className="propertyTitle">{building.name}</p>

                    <p className="propertyDescription">
                        {building.negativeSpace !== undefined
                            ? "Slots: " + building.negativeSpace
                            : building.slotsTaken > 0
                            ? "Slots: " + building.slotsTaken
                            : ""}
                        <br />
                        <br />
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
