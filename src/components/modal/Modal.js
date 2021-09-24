import React, { useEffect } from "react";

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
    showType,
}) {
    useEffect(() => {
        var modalElems = document.querySelectorAll(".modal");
        // eslint-disable-next-line no-undef
        M.Modal.init(modalElems, {});
    }, []);

    function renderCards(property, i) {
        if (property.className === "PropertyClass") {
            return (
                <PropertyCard
                    key={property.id}
                    property={property}
                    setselectedProperty={setselectedProperty}
                    clickCallback={clickCallback}
                    showType={showType}
                />
            );
        }
        if (property.className === "BuildingClass") {
            if (selectedProperty === null) {
                return <div key={property.id}></div>;
            }

            let type = property.type;

            let priceMultiplier = property.type === "house" ? property.slotsTaken : 1;

            return (
                <BuildingCard
                    key={property.id}
                    building={property}
                    price={selectedProperty.buildingPrice[type] * priceMultiplier}
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
                {properties.length === 0 && (
                    <h5>Player doesn't own any properties</h5>
                )}
                {properties.map((property, i) => renderCards(property, i))}
            </div>
        </div>
    );
}
