import React from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./PlayerCard.css";

import $ from "jquery";

export default function PlayerCard({ player }) {
    let style = player.balance < 0 ? ` isBroke` : "";

    const entries = Object.entries(player.changes);
    for (const [key, value] of entries) {
        $(`#${key}_${player.id}`).addClass(
            value === "+"
                ? "animationIncrease"
                : value === "-"
                ? "animationDecrease"
                : ""
        );
        setTimeout(() => {
            $(`#${key}_${player.id}`).removeClass("animationIncrease");
            $(`#${key}_${player.id}`).removeClass("animationDecrease");
        }, 2000);

        player.changes[key] = "";
    }

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
                                <td
                                    id={"balance_" + player.id}
                                    className=" valuePart"
                                >
                                    <b>
                                        {PlayerClass.formatMoney(
                                            player.balance
                                        )}
                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td>Properties</td>
                                <td
                                    id={"properties_" + player.id}
                                    className="valuePart"
                                >
                                    <b>{player.properties.length}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Houses</td>
                                <td
                                    id={"houses_" + player.id}
                                    className="valuePart"
                                >
                                    <b>{player.houses}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Skyscraper</td>
                                <td
                                    id={"skyscraper_" + player.id}
                                    className="valuePart"
                                >
                                    <b>{player.skyscraper}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Monopoly Tower</td>
                                <td className="valuePart">
                                    <b>
                                        {player.hasMonopolyTower ? "Yes" : "No"}
                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td>Net Worth</td>
                                <td className="valuePart">
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
