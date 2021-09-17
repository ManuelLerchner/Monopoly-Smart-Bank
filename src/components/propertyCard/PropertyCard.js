import React from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./PropertyCard.css";

export default function PropertyCard({ property, clickCallback, showType }) {
    let style = ` gridBox ${property.color}`;
    const handleClick = () => {
        clickCallback(property);
    };

    return (
        <a className={style} href="#!" onClick={handleClick}>
            <div className="flexContainerProperty">
                <div className="descriptionFlex">
                    <p className="propertyTitle">{property.name}</p>

                    {showType === "cost" && (
                        <p className="propertyDescription">
                            {PlayerClass.formatMoney(property.cost)}
                        </p>
                    )}
                    {showType === "rent" && (
                        <>
                            <p className="propertyDescription">
                                {"Rent: " +
                                    PlayerClass.formatMoney(
                                        property.calcRentCost()
                                    )}
                            </p>
                            <p className="propertyDescription">
                                {"Houses: " + property.housesCount}
                            </p>
                            {property.owner.hasSkyScraperOn[property.color] && (
                                <p className="propertyDescription">
                                    {"Skyscraper: Yes"}
                                </p>
                            )}
                            {property.owner.hasMonopolyTower && (
                                <p className="propertyDescription">
                                    {"Monopoly Tower: Yes"}
                                </p>
                            )}
                        </>
                    )}
                </div>

                <div className="imageFlex hide-on-med-and-down">
                    <img src={property.img} alt="img"></img>
                </div>
            </div>
        </a>
    );
}
