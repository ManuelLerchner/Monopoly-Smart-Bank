import React, { useEffect, useRef } from "react";

import "./PayMenu.css";
import PlayerRow from "./PlayerRow";

import $ from "jquery";
import { PlayerClass } from "../../Data/PlayerClass";

export default function PayScreen({ players, setPlayers }) {
    const amountRef = useRef();
    //Rerender Materialize on rerender
    useEffect(() => {
        try {
            // eslint-disable-next-line no-undef
            M.updateTextFields();
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

        setPlayers((prev) => {
            const filtered = prev.filter(
                (player) => player.id !== sender.id && player.id !== receiver.id
            );
            return [...filtered, sender, receiver];
        });

        $("input:radio[name=Sender]:checked")[0].checked = false;
        $("input:radio[name=Receiver]:checked")[0].checked = false;
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
                                <PlayerRow
                                    key={player.id + "sender"}
                                    role={"Sender"}
                                    player={player}
                                />
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
                                <PlayerRow
                                    key={player.id + "receiver"}
                                    role={"Receiver"}
                                    player={player}
                                />
                            ))}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
