import React from "react";

import "./PlayerCard.css";

export default function PlayerCard({ player }) {
    //temp Avatar Image
    const imageSrc = `https://avatars.dicebear.com/api/open-peeps/${
        player.name + player.icon
    }.svg`;

    return (
        <div className="carousel-item">
            {/*Card */}

            <div className="playerCard">
                {/*Name and Icon */}

                <div className="row centerRow ">
                    <div className="col s8">
                        <h4>
                            <b>{player.name}</b>
                        </h4>
                    </div>
                    <div className="col s4">
                        <img className="icon" src={imageSrc} alt="Avatar" />
                    </div>
                </div>

                {/*Table */}
                <div className="row">
                    <table className="col l12 ">
                        <tbody>
                            <tr>
                                <td>Balance</td>
                                <td>
                                    <b>{player.formatMoney()}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Properties</td>
                                <td>
                                    <b>{player.properties}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Houses</td>
                                <td>
                                    <b>{player.houses}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Skyscraper</td>
                                <td>
                                    <b>{player.skyscraper}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Estimated Value</td>
                                <td>
                                    <b>{player.estimatedValue}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
