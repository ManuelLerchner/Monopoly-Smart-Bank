import React from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./PlayerCard.css";

export default function PlayerCard({ player }) {
    let style = player.balance < 0 ? ` isBroke` : "";

    return (
        <div className="carousel-item playerCard ">
            {/*Card */}

            <div className={style}>
                {/*Name and Icon */}

                <div className="row centerRow ">
                    <div className="col s8">
                        <h4>
                            <b>{player.name}</b>
                        </h4>
                    </div>
                    <div className="col s4">
                        <img className="icon " src={player.img} alt="Avatar" />
                    </div>
                </div>

                {/*Table */}
                <div className="row">
                    <table className="col l12 ">
                        <tbody>
                            <tr>
                                <td>Balance</td>
                                <td>
                                    <b>
                                        {PlayerClass.formatMoney(
                                            player.balance
                                        )}
                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td>Properties</td>
                                <td>
                                    <b>{player.properties.length}</b>
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
                                    <b>
                                        {PlayerClass.formatMoney(
                                            player.estimatedValue
                                        )}
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
