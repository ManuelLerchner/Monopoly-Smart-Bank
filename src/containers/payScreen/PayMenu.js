import React, { useEffect, useRef } from "react";

import "./PayMenu.css";

import $ from "jquery";
import { PlayerClass } from "../../Data/PlayerClass";
import PlayerList from "../../components/playerList/PlayerList";

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
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Players selected",
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

        const sender = players.find((player) => player.id === senderID);
        const receiver = players.find((player) => player.id === receiverID);

        const [succesfull, paymentMSG] = PlayerClass.sendMoney(
            sender,
            receiver,
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
                            <div className="card-title red-text center title">
                                Sender
                            </div>
                        </div>

                        <PlayerList players={players} type={"Sender"} />
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
                                className=" btn-large waves-effect waves-light blue darken-1"
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

                        <PlayerList players={players} type={"Receiver"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
