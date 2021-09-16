import React, { useEffect, useRef } from "react";

import "./PayMenu.css";

import $ from "jquery";
import { PlayerClass } from "../../Data/PlayerClass";

export default function PayScreen({ players, setPlayers }) {
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

    const transfer = () => {
        const senderID = $("input:radio[name=Sender]:checked").val();
        const receiverID = $("input:radio[name=Receiver]:checked").val();

        const amount = amountRef.current.value;

        if (senderID === undefined || receiverID === undefined) {
            return;
        }

        if (amount === "") {
            return;
        }

        const sender = players.find((player) => player.id === senderID);
        const receiver = players.find((player) => player.id === receiverID);

        const succesfull = PlayerClass.sendMoney(sender, receiver, amount);
        if (!succesfull) {
            return;
        }

        let clone = players.map((player) => {
            if (player.id === sender.id) {
                return sender;
            }
            if (player.id === receiver.id) {
                return receiver;
            }
            return player;
        });

        setPlayers([...clone]);

        $("input:radio[name=Sender]:checked")[0].checked = false;
        $("input:radio[name=Receiver]:checked")[0].checked = false;

        // eslint-disable-next-line no-undef
        M.toast({
            html: "Success",
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
                            <div className="card-title red-text center title">
                                Sender
                            </div>
                        </div>

                        <form action="#">
                            {players.map((player, i) => (
                                <div className="row centerRow ">
                                    <div className="col l8 offset-l1">
                                        <label>
                                            <div className="Sender">
                                                <input
                                                    name="Sender"
                                                    type="radio"
                                                    value={player.id}
                                                />
                                                <span className="name">
                                                    {player.name}
                                                </span>
                                            </div>
                                        </label>
                                    </div>

                                    <img
                                        className="iconSmall hide-on-med-and-down"
                                        src={player.img}
                                        alt="Avatar"
                                    />
                                </div>
                            ))}
                        </form>
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
                                className=" btn waves-effect waves-light"
                                type="submit"
                                onClick={transfer}
                            >
                                Send
                                <i className="material-icons right hide-on-small-only ">
                                    send
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
                            <div className="card-title light-green-text text-accent-4 center title">
                                Receiver
                            </div>
                        </div>

                        <form action="#">
                            {players.map((player, i) => (
                                <div className="row centerRow ">
                                    <div className="col l8 offset-l1">
                                        <label>
                                            <div className="Receiver">
                                                <input
                                                    name="Receiver"
                                                    type="radio"
                                                    value={player.id}
                                                />
                                                <span className="name">
                                                    {player.name}
                                                </span>
                                            </div>
                                        </label>
                                    </div>

                                    <img
                                        className="iconSmall hide-on-med-and-down"
                                        src={player.img}
                                        alt="Avatar"
                                    />
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
