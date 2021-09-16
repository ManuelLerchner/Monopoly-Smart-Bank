import React from "react";

import PropertyCard from "../propertyCard/PropertyCard";

import "./Modal.css";

export default function BuyModal({
    title,
    description,
    properties,
    setselectedProperty,
    clickCallback,
}) {
    if (properties === null) {
        return <></>;
    }

    function renderCards(property) {
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
            return <>empty</>;
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
                {properties.map((property) => renderCards(property))}
            </div>
        </div>
    );
}
