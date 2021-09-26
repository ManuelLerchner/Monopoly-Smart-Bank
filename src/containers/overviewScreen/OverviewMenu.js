import React, { useEffect, useState } from "react";

import { PlayerClass } from "../../Data/PlayerClass";
import PlayerList from "../../components/playerList/PlayerList";

import "./OverviewMenu.css";
import PropertyCard from "../../components/propertyCard/PropertyCard";

export default function OverviewMenu({ players }) {
    const [selectedPlayer, setselectedPlayer] = useState(null);

    useEffect(() => {
        try {
            var elemsCarousell = document.querySelectorAll(".carousel");
            // eslint-disable-next-line no-undef
            M.Carousel.init(elemsCarousell, {
                dist: -100,
                padding: 10,
                numVisible: 10,
            });
        } catch (e) {}
    });

    const selectPlayer = (player) => {
        setselectedPlayer(player);
    };

    return (
        <>
            <div className="row marginTop">
                <div className="col l3 offset-l1 s4 ">
                    <div className="card cardColor-overview ">
                        <div className="card-content white-text">
                            {/* Title */}

                            <div className="section">
                                <div className="card-title yellow-text text-darken-2 center title">
                                    Player
                                </div>
                            </div>

                            <PlayerList
                                players={players}
                                type={"Player"}
                                callback={selectPlayer}
                            />
                        </div>
                    </div>
                </div>
                <div className="col l6 offset-l1  s8">
                    <div className="card cardColor-overview ">
                        <div className="card-content white-text">
                            {/* Title */}

                            <div className="section">
                                <div className="card-title yellow-text text-darken-2 center title">
                                    Properties
                                </div>
                            </div>

                            <div className="carousel carousel-small">
                                <h5 className="center">
                                    {selectedPlayer === null
                                        ? "No Player selected"
                                        : selectedPlayer.properties.length === 0
                                        ? "Player doesn't own any properties"
                                        : ""}
                                </h5>

                                {selectedPlayer &&
                                    selectedPlayer.properties.map(
                                        (property, i) => {
                                            return (
                                                <div
                                                    className="carousel-item carousel-item-small"
                                                    key={
                                                        property.id +
                                                        +selectedPlayer.id
                                                    }
                                                >
                                                    <div className="gridWrapper">
                                                        <PropertyCard
                                                            key={property.id}
                                                            property={property}
                                                            setselectedProperty={() => {}}
                                                            clickCallback={() => {}}
                                                            showType={"rent"}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className="row marginTop">
                        <div className="col l12   ">
                            <div className="card cardColor-overview padding10 ">
                                {/* Title */}

                                <div className="section">
                                    <div className="card-title yellow-text text-darken-2 center title">
                                        History
                                    </div>
                                </div>

                                <div className="tableContainer">
                                    <table className="table-scrollable  white-text">
                                        <thead className="thead-scrollable light-blue-text">
                                            <tr className="tr-scrollable">
                                                <th className="align-center">
                                                    Time
                                                </th>
                                                <th className="align-left">
                                                    Description
                                                </th>
                                                <th className="align-center">
                                                    Amount
                                                </th>
                                                <th className="align-center">
                                                    Total Money
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="tbody-scrollable  ">
                                            {selectedPlayer &&
                                                selectedPlayer.history
                                                    .sort((a, b) => {
                                                        return (
                                                            new Date(
                                                                "1970/01/01 " +
                                                                    b.time
                                                            ) -
                                                            new Date(
                                                                "1970/01/01 " +
                                                                    a.time
                                                            )
                                                        );
                                                    })
                                                    .map((data) => {
                                                        let style =
                                                            data.direction ===
                                                            "+"
                                                                ? "green-text"
                                                                : data.direction ===
                                                                  "-"
                                                                ? "red-text"
                                                                : "";
                                                        return (
                                                            <tr
                                                                className={
                                                                    style +
                                                                    " scrollable"
                                                                }
                                                                key={
                                                                    data.time +
                                                                    selectedPlayer.id+data.direction
                                                                }
                                                            >
                                                                <td className="align-center">
                                                                    {data.time}
                                                                </td>
                                                                <td className="align-left">
                                                                    {data.msg}
                                                                </td>
                                                                <td className="align-center">
                                                                    {PlayerClass.formatMoney(
                                                                        data.amount
                                                                    )}
                                                                </td>
                                                                <td className="align-center">
                                                                    {PlayerClass.formatMoney(
                                                                        data.total
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
