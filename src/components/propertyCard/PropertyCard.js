import React from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./PropertyCard.css";

export default function PropertyCard({ property, clickCallback, showType }) {
    let style = `gridBox ${property.color} ${
        property.mortage === true ? "mortage" : ""
    }`;

    const handleClick = () => {
        try {
            clickCallback(property);
        } catch (e) {}
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
                            <table className="rent-table">
                                <tbody>
                                    <tr>
                                        <td>Base Rent:</td>
                                        <td className="valuePart">
                                            <b>
                                                {PlayerClass.formatMoney(
                                                    property.baseRent
                                                )}
                                            </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Houses:</td>
                                        <td className="valuePart">
                                            <b>{property.housesCount} </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Skyscraper:</td>
                                        <td className="valuePart">
                                            <b>
                                                {property.owner &&
                                                property.owner.hasSkyScraperOn[
                                                    property.color
                                                ]
                                                    ? "Yes"
                                                    : "No"}
                                            </b>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Disturbance Slots:</td>
                                        <td className="valuePart">
                                            <b>{property.negativeBuildings}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total Rent:</td>
                                        <td className="valuePart">
                                            <b>
                                                {PlayerClass.formatMoney(
                                                    property.calcRentCost()
                                                )}
                                            </b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

                <div className="imageFlex ">
                    <img src={property.img} alt="img"></img>
                </div>
            </div>
        </a>
    );
}
