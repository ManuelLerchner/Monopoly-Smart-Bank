import React from "react";

import BuildingCard from "../buildingCard/BuildingCard";
import PropertyCard from "../propertyCard/PropertyCard";

import "./Modal.css";

export default function BuyModal({
    title,
    description,
    properties,
    selectedProperty,
    setselectedProperty,
    clickCallback,
}) {
    function renderCards(property, i) {
        if (property.constructor.name === "PropertyClass") {
            return (
                <PropertyCard
                    key={property.id}
                    property={property}
                    setselectedProperty={setselectedProperty}
                    clickCallback={clickCallback}
                />
            );
        }
        if (property.constructor.name === "BuildingClass") {
            if (selectedProperty === null) {
                return <div key={property.id}></div>;
            }

            let type = i < 3 ? "house" : i < 4 ? "skyscraper" : "monopolyTower";
            let modifier = i < 3 ? i + 1 : 1;

            return (
                <BuildingCard
                    key={property.id}
                    building={property}
                    price={selectedProperty.buildingPrice[type] * modifier}
                    clickCallback={clickCallback}
                />
            );
        }
    }

    return (
        <div className="modal-content">
            <div className="section">
                <h3>{title}</h3>
                <h6>{description}</h6>
            </div>

            <div className="gridWrapper">
                {properties.length === 0 && <h5>(Player has no properties)</h5>}
                {properties.map((property, i) => renderCards(property, i))}
            </div>
        </div>
    );
}
