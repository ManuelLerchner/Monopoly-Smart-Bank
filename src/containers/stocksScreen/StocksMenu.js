import React, { useEffect, useRef, useState } from "react";
import { Scatter } from "react-chartjs-2";
import PlayerList from "../../components/playerList/PlayerList";
import { PlayerClass } from "../../Data/PlayerClass";

import { options } from "./Plot";

import $ from "jquery";

import "./StocksMenu.css";

export default function StocksMenu({ stocks, setPlayers, players, bank }) {
    const [selectedPlayer, setselectedPlayer] = useState(players[0] || null);
    const [chartData, setChartData] = useState({});

    const amountRef = useRef(0);
    const stockRef = useRef(null);

    const [data, setData] = useState([]);

    useEffect(() => {
        var elems = document.querySelectorAll("select");
        // eslint-disable-next-line no-undef
        M.FormSelect.init(elems, {});
    }, []);

    useEffect(() => {
        let datasets = [];

        const colors = [
            "DarkOrange",
            "DeepSkyBlue",
            "MediumVioletRed",
            "Gold",
            "Chartreuse",
            "MintCream",
            "lime",

            "blue",
        ];

        datasets = data.map((stock, i) => {
            return {
                data: stock.data,
                label: stock.name,
                showLine: true,
                backgroundColor: "black",
                borderColor: colors[i % colors.length],
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
            };
        });

        setChartData({
            datasets: datasets,
        });
    }, [data]);

    useEffect(() => {
        const Intervall = setInterval(() => {
            setData([...stocks]);
        }, 5000);

        setData([...stocks]);

        return () => {
            clearInterval(Intervall);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectPlayer = (player) => {
        setselectedPlayer(player);
    };

    const interact = (type) => {
        const buyerID = $("input:radio[name=Buyer]:checked").val();
        const stockName = stockRef.current.value;
        let amount = amountRef.current.value;
        if (buyerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Buyer selected",
                classes: "rounded red black-text",
            });
            return;
        }

        if (stockName === "") {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Stock selected",
                classes: "rounded red black-text",
            });
            return;
        }

        if (amount === "") {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Amount set",
                classes: "rounded red black-text",
            });
            return;
        }

        let stock = stocks.find((stock) => stock.name === stockName);

        if (stock.data.length === 0) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "Stock has no values yet",
                classes: "rounded red black-text",
            });
            return;
        }

        const buyer = players.find((player) => player.id === buyerID);

        const stockPrice = stock.data.at(-1).y;

        if (type === "buy") {
            const [succesfull, paymentMSG] = PlayerClass.sendMoney(
                buyer,
                bank,
                amount
            );

            if (!succesfull) {
                // eslint-disable-next-line no-undef
                M.toast({
                    html: paymentMSG,
                    classes: "rounded red black-text",
                });
                return;
            }

            const amountStocksBought =
                PlayerClass.parseMoney(amount) / stockPrice;

            if (!(stockName in buyer.stocks)) {
                buyer.stocks[stockName] = 0;
            }

            buyer.stocks[stockName] += amountStocksBought;
        } else {
            if (!(stockName in buyer.stocks)) {
                // eslint-disable-next-line no-undef
                M.toast({
                    html: "Player doesn't own that stock",
                    classes: "rounded red black-text",
                });
                return;
            }

            let amountStocksSold = PlayerClass.parseMoney(amount) / stockPrice;

            if (amountStocksSold > buyer.stocks[stockName]) {
                // eslint-disable-next-line no-undef
                M.toast({
                    html: "Not enough Stocks",
                    classes: "rounded red black-text",
                });
                return;
            }

            if (PlayerClass.parseMoney(amount) === 0) {
                amountStocksSold = buyer.stocks[stockName];
                amount = amountStocksSold * stockPrice;
            }

            buyer.stocks[stockName] -= amountStocksSold;

            const [succesfull, paymentMSG] = PlayerClass.sendMoney(
                bank,
                buyer,
                amount
            );

            if (!succesfull) {
                // eslint-disable-next-line no-undef
                M.toast({
                    html: paymentMSG,
                    classes: "rounded red black-text",
                });
                return;
            }
        }

        let clone = players.map((player) => {
            if (player.id === buyer.id) {
                return buyer;
            }

            return player;
        });

        setPlayers([...clone]);
    };

    return (
        <>
            <div className="row">
                <div className="col l2 offset-l1 s4 ">
                    <div className="card cardColor-lobby ">
                        <div className="card-content white-text">
                            {/* Title */}

                            <div className="section">
                                <div className="card-title yellow-text center title">
                                    Buyer
                                </div>
                            </div>

                            <PlayerList
                                players={players}
                                type={"Buyer"}
                                callback={selectPlayer}
                            />
                        </div>
                    </div>
                </div>

                <div className="col l4 offset-l1 hide-on-med-and-down ">
                    <div className="card cardColor-lobby">
                        <Scatter
                            data={chartData}
                            options={options}
                            height={200}
                        />
                    </div>
                </div>

                <div className="col l2 offset-l1 s4 offset-s4">
                    <div className="card cardColor-lobby ">
                        <div className="card-content white-text">
                            <div className="row center padding10 noMarginBot">
                                <div className="input-field col l6 offset-l1">
                                    <select ref={stockRef} defaultValue={""}>
                                        <option value="" disabled>
                                            Stock
                                        </option>

                                        {Object.keys(stocks).map((key, i) => {
                                            return (
                                                <option
                                                    key={key}
                                                    value={stocks[key].name}
                                                >
                                                    {stocks[key].name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className="col l4  s8 offset-s2 input-field">
                                    <input
                                        id="first_name"
                                        type="text"
                                        className="validate"
                                        autoComplete="off"
                                        ref={amountRef}
                                    />
                                    <label htmlFor="first_name">Price</label>
                                </div>
                            </div>
                            <div className="row center marginBottom padding10">
                                <div className="col l4 offset-l1 s12 ">
                                    <button
                                        className=" btn-large btn waves-effect waves-light green darken-1"
                                        onClick={() => {
                                            interact("buy");
                                        }}
                                    >
                                        Buy
                                        <i className="material-icons right hide-on-med-and-down ">
                                            place
                                        </i>
                                    </button>
                                </div>
                                <div className="col l4 offset-l1 s12">
                                    <button
                                        className=" btn-large btn-rent waves-effect waves-light red darken-2 "
                                        onClick={() => {
                                            interact("sell");
                                        }}
                                    >
                                        Sell
                                        <i className="material-icons right hide-on-med-and-down ">
                                            send
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {selectedPlayer !== null && (
                            <div className="tableContainer">
                                <table className={`white-text fullHeigth`}>
                                    <thead className="thead-scrollable light-blue-text">
                                        <tr className="tr-scrollable">
                                            <th className="align-center">
                                                Stock
                                            </th>
                                            <th className="align-center">
                                                Value
                                            </th>
                                            <th className="align-center">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody-scrollable  ">
                                        {selectedPlayer &&
                                            Object.keys(
                                                selectedPlayer.stocks
                                            ).map((key, i) => {
                                                return (
                                                    <tr
                                                        className=" scrollable"
                                                        key={i + key}
                                                    >
                                                        <td className="align-center">
                                                            {key}
                                                        </td>
                                                        <td className="align-center">
                                                            {PlayerClass.formatMoney(
                                                                PlayerClass.calcStockPrice(
                                                                    selectedPlayer,
                                                                    key,
                                                                    stocks
                                                                )
                                                            )}
                                                        </td>
                                                        <td className="align-center">
                                                            {selectedPlayer
                                                                .stocks[key] &&
                                                                selectedPlayer.stocks[
                                                                    key
                                                                ].toFixed(2)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
