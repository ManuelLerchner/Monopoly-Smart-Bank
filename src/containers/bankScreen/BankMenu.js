import React, { useEffect, useRef } from "react";

import "./BankMenu.css";

import $ from "jquery";
import { PlayerClass } from "../../Data/PlayerClass";
import PlayerList from "../../components/playerList/PlayerList";

import BankImg from "../../images/Bank.png"; //

export default function BankScreen({ players, setPlayers }) {
    const amountRef = useRef();
    //Rerender Materialize on rerender
    useEffect(() => {
        try {
            // eslint-disable-next-line no-undef
            M.updateTextFields();

            var elems = document.querySelectorAll(".collapsible");
            // eslint-disable-next-line no-undef
            M.Collapsible.init(elems, {});
        } catch (e) {
            console.log();
        }
    });

    const transfer = (direction) => {
        const customerID = $("input:radio[name=Customer]:checked").val();

        const amount = amountRef.current.value;

        if (customerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Customer selected",
                classes: "rounded red black-text",
            });
            return;
        }

        if (amount === "") {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Amount selected",
                classes: "rounded red black-text",
            });
            return;
        }

        const customer = players.find((player) => player.id === customerID);

        let Bank = new PlayerClass("Bank");
        Bank.balance = 10 ** 16;

        const [succesfull, paymentMSG] =
            direction === "send"
                ? PlayerClass.sendMoney(customer, Bank, amount)
                : PlayerClass.sendMoney(Bank, customer, amount);

        if (!succesfull) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: paymentMSG,
                classes: "rounded red black-text",
            });
            return;
        }

        let clone = players.map((player) => {
            if (player.id === customer.id) {
                return customer;
            }

            return player;
        });

        setPlayers([...clone]);

        // eslint-disable-next-line no-undef
        M.toast({
            html: paymentMSG,
            classes: "rounded green  black-text",
        });
    };

    return (
        <div className="row">
            <div className="col l3 offset-l1 s4 ">
                <div className="card cardColor-pay ">
                    <div className="card-content white-text">
                        {/* Title */}

                        <div className="section">
                            <div className="card-title yellow-text text-darken-2 center title">
                                Customer
                            </div>
                        </div>

                        <PlayerList players={players} type={"Customer"} />
                    </div>
                </div>
            </div>

            <div className="col l2 offset-l1 s4">
                <div className="card cardColor-pay ">
                    <div className="card-content white-text">
                        {/* Title */}
                        <div className="section">
                            <div className="card-title white-text center title">
                                Amount
                            </div>
                        </div>

                        <div className="row smallRow">
                            <div className="input-field col l8 offset-l2 s10 offset-s1  ">
                                <input
                                    id="first_name"
                                    type="text"
                                    className="validate"
                                    autoComplete="off"
                                    ref={amountRef}
                                />
                                <label htmlFor="first_name">Amount</label>
                            </div>
                        </div>

                        <div className="row center paddingBot">
                            <button
                                className=" btn-large btn-large-amount waves-effect waves-light red darken-2"
                                type="submit"
                                onClick={() => {
                                    transfer("send");
                                }}
                            >
                                Send
                                <i className="material-icons right hide-on-small-only ">
                                    keyboard_double_arrow_right
                                </i>
                            </button>
                        </div>
                        <div className="row center paddingBot">
                            <button
                                className=" btn-large btn-large-amount waves-effect waves-light green darken-1"
                                type="submit"
                                onClick={() => {
                                    transfer("receive");
                                }}
                            >
                                Receive
                                <i className="material-icons right hide-on-small-only ">
                                    keyboard_double_arrow_left
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col l3 offset-l1 s4 ">
                <div className="card cardColor-pay ">
                    <div className="card-content white-text">
                        {/* Title */}

                        <div className="section">
                            <div className="card-title  center title">Bank</div>
                        </div>

                        <div className="row center">
                            <div className="l10">
                                <img
                                    className="bankImg"
                                    src={BankImg}
                                    alt="Bank"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
