import React, { useEffect } from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./BuyModal.css";

export default function BuyModal({ title, description, properties }) {
    return (
        <div class="modal-content">
            <div className="section">
                <h3>{title}</h3>
            </div>

            <div class="gridWrapper">
                {properties.map((property) => {
                    let style = `gridBox ${property.color}`;
                    return (
                        <div class={style}>
                            <div className="flexContainerProperty">
                                <div className="descriptionFlex">
                                    <p className="propertyTitle">
                                        {property.name}
                                    </p>
                                    <p className="propertyDescription">
                                        {PlayerClass.formatMoney(property.cost)}
                                    </p>
                                </div>

                                <div className="imageFlex">
                                    <img
                                        class="responsive-img"
                                        src={property.img}
                                        alt="img"
                                    ></img>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
