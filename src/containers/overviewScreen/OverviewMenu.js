import React, { useEffect, useState } from "react";

import { PlayerClass } from "../../Data/PlayerClass";
import PlayerList from "../../components/playerList/PlayerList";

import "./OverviewMenu.css";
import PropertyCard from "../../components/propertyCard/PropertyCard";

import $ from "jquery";

import { Chart, Scatter } from "react-chartjs-2";
import { options } from "./Plot";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

export default function OverviewMenu({ players }) {
    const [selectedPlayer, setselectedPlayer] = useState(players[0] || null);
    const [totalHistory, settotalHistory] = useState(
        new PlayerClass("Total History", 10)
    );

    const getData = () => {
        if (selectedPlayer === null) {
            return {};
        }

        const datasets = [];

        if (selectedPlayer.name === "Total History") {
            const colors = ["red", "green", "blue", "purple", "cyan"];

            players.forEach((player, i) => {
                const dataBalance = [];
                const dataNetWorth = [];
                const playerLabels = [];

                player.history.forEach(({ time, total, netWorth }, i) => {
                    playerLabels.push(time);
                    dataBalance.push({ x: time, y: total });
                    dataNetWorth.push(netWorth);
                });

                datasets.push({
                    label: player.name,
                    data: dataBalance.reverse(),

                    showLine: true,
                    backgroundColor: "yellow",
                    borderColor: colors[i % colors.length],
                    borderWidth: 3,
                    pointRadius: 4,
                    tension: 0.4,
                    cubicInterpolationMode: true,
                });
            });
        } else {
            const dataBalance = [];
            const dataNetWorth = [];
            const playerLabels = [];

            selectedPlayer.history.forEach(({ time, total, netWorth }, i) => {
                playerLabels.push(time);
                dataBalance.push({ x: time, y: total });
                dataNetWorth.push({ x: time, y: netWorth });
            });

            datasets.push({
                label: "Balance",
                data: dataBalance.reverse(),

                showLine: true,
                backgroundColor: "blue",
                borderColor: "lime",
                borderWidth: 3,
                pointRadius: 4,
                tension: 0.4,
            });

            datasets.push({
                label: "Net Worth",
                data: dataNetWorth.reverse(),

                showLine: true,
                backgroundColor: "black",
                borderColor: "yellow",
                borderWidth: 3,
                pointRadius: 4,
                tension: 0.4,
            });
        }

        return {
            datasets: datasets,
        };
    };

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

    useEffect(() => {
        $("#bottomBar").hide();

        try {
            var elems = document.querySelectorAll(".collapsible");
            // eslint-disable-next-line no-undef
            M.Collapsible.init(elems, {
                onOpenEnd: () => {
                    try {
                        var elemsCarousell =
                            document.querySelectorAll(".carousel");
                        // eslint-disable-next-line no-undef
                        M.Carousel.init(elemsCarousell, {
                            dist: -100,
                            padding: 10,
                            numVisible: 10,
                        });
                    } catch (e) {}
                },
            });
            // eslint-disable-next-line no-undef
            var instance = M.Collapsible.getInstance(elems[0]);
            instance.open(2);
        } catch (e) {}
    }, []);

    useEffect(() => {
        let history = [];
        players.forEach((player) => {
            history.push(...player.history);
        });

        let clone = { ...totalHistory };

        clone.history = history;

        settotalHistory(clone);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                players={[...players, totalHistory]}
                                type={"Player"}
                                callback={selectPlayer}
                            />
                        </div>
                    </div>
                </div>
                <div className="col l6 offset-l1  s8">
                    <ul className="collapsible ">
                        <li>
                            <div className="collapsible-header grey darken-4 white-text">
                                <i className="material-icons">apartment</i>
                                Properties
                            </div>
                            <div className="collapsible-body cardColor-overview sectionDescription ">
                                {selectedPlayer === null && (
                                    <h4 className="center padding10 orange-text">
                                        {selectedPlayer === null
                                            ? "No Player selected"
                                            : selectedPlayer.properties
                                                  .length === 0
                                            ? "Player doesn't own any properties"
                                            : ""}
                                    </h4>
                                )}

                                {selectedPlayer &&
                                    selectedPlayer.name === "Total History" && (
                                        <h4 className="center padding10 orange-text">
                                            /
                                        </h4>
                                    )}

                                {selectedPlayer !== null &&
                                    selectedPlayer.name !== "Total History" && (
                                        <div className="carousel carousel-small">
                                            {selectedPlayer.properties.map(
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
                                                                    key={
                                                                        property.id
                                                                    }
                                                                    property={
                                                                        property
                                                                    }
                                                                    setselectedProperty={() => {}}
                                                                    clickCallback={() => {}}
                                                                    showType={
                                                                        "rent"
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header grey darken-4 white-text">
                                <i className="material-icons">history</i>
                                History
                            </div>
                            <div className="collapsible-body cardColor-overview sectionDescription noMargin">
                                {selectedPlayer === null && (
                                    <h4 className="center padding10 orange-text">
                                        {selectedPlayer === null
                                            ? "No Player selected"
                                            : selectedPlayer.properties
                                                  .length === 0
                                            ? "Player doesn't own any properties"
                                            : ""}
                                    </h4>
                                )}

                                <div className="tableContainer">
                                    <table className={`white-text fullHeigth`}>
                                        <thead className="thead-scrollable light-blue-text">
                                            <tr className="tr-scrollable">
                                                <th className="align-center">
                                                    Time
                                                </th>
                                                <th className="align-left descriptionBox">
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
                                                            new Date(b.time) -
                                                            new Date(a.time)
                                                        );
                                                    })
                                                    .map((data, i) => {
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
                                                                    data.msg +
                                                                    i +
                                                                    data.time
                                                                }
                                                            >
                                                                <td className="align-center">
                                                                    {new Date(
                                                                        data.time
                                                                    ).toLocaleTimeString()}
                                                                </td>
                                                                <td className="align-left descriptionBox">
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
                        </li>

                        <li>
                            <div className="collapsible-header grey darken-4 white-text">
                                <i className="material-icons">trending_up</i>
                                Money Graph
                            </div>
                            <div className="collapsible-body grey darken-3 sectionDescription noMargin">
                                {selectedPlayer === null && (
                                    <h4 className="center padding10 orange-text">
                                        {selectedPlayer === null
                                            ? "No Player selected"
                                            : selectedPlayer.properties
                                                  .length === 0
                                            ? "Player doesn't own any properties"
                                            : ""}
                                    </h4>
                                )}

                                {/* {selectedPlayer &&
                                    selectedPlayer.name === "Total History" && (
                                        <h4 className="center padding10 orange-text">
                                            /
                                        </h4>
                                    )} */}

                                {selectedPlayer !== null && (
                                    <Scatter
                                        data={getData}
                                        options={options(selectedPlayer.name)}
                                    />
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
