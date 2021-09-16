import React from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./PropertyCard.css";

export default function PropertyCard({
    property,
    setselectedProperty,
    clickCallback,
}) {
    let style = ` gridBox ${property.color}`;
    const handleClick = () => {
        clickCallback(property);
    };

    return (
        <a className={style} href="#!" onClick={handleClick}>
            <div className="flexContainerProperty">
                <div className="descriptionFlex">
                    <p className="propertyTitle">{property.name}</p>

                    <p className="propertyDescription">
                        {PlayerClass.formatMoney(property.cost)}
                    </p>
                </div>

                <div className="imageFlex hide-on-med-and-down">
                    <img src={property.img} alt="img"></img>
                </div>
            </div>
        </a>
    );
}
