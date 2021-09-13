import React from "react";

import "./PlayerCard.css";

export default function PlayerCard({ player }) {
    const {
        name,
        icon,
        balance,
        properties,
        houses,
        skyscraper,
        estimatedValue
    } = player;

    const imageSrc = `https://avatars.dicebear.com/api/open-peeps/${
        name + icon
    }.svg`;

    return (
        <div className="carousel-item">
            <div className="playerCard">
                <div className="row centerRow ">
                    <div className="col s8">
                        <h4>
                            <b>{name}</b>
                        </h4>
                    </div>
                    <div className="col s4">
                        <img className="icon" src={imageSrc} alt="Avatar" />
                    </div>
                </div>

                <div className="row">
                    <table className="col l12 ">
                        <tbody>
                            <tr>
                                <td>Balance</td>
                                <td>
                                    <b>{balance}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Properties</td>
                                <td>
                                    <b>{properties}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Houses</td>
                                <td>
                                    <b>{houses}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Skyscraper</td>
                                <td>
                                    <b>{skyscraper}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Estimated Value</td>
                                <td>
                                    <b>{estimatedValue}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
