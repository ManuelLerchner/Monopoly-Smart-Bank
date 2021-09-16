import React, { useEffect, useRef } from "react";

import "./BuyMenu.css";

import $ from "jquery";
import { PlayerClass } from "../../Data/PlayerClass";
import BuyModal from "./BuyModal";

export default function BuyMenu({
    players,
    setPlayers,
    properties,
    setProperties,
}) {
    const amountRef = useRef();
    //Rerender Materialize on rerender
    useEffect(() => {
        try {
            // eslint-disable-next-line no-undef
            M.updateTextFields();

            var modalElems = document.querySelectorAll(".modal");
            // eslint-disable-next-line no-undef
            M.Modal.init(modalElems, {});
        } catch (e) {
            console.log();
        }
    }, []);

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

        // eslint-disable-next-line no-undef
        M.toast({
            html: "Success",
            classes: "rounded green  black-text",
        });
    };

    return (
        <div className="row">
            <div className="col l3 offset-l1 s4 ">
                <div className="card cardColor-buy ">
                    <div className="card-content white-text">
                        {/* Title */}

                        <div className="section">
                            <div className="card-title green-text center title">
                                Buyer
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
                <div className="card cardColor-buy ">
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

            <div className="col l3 offset-l1 s4">
                <div className="card cardColor-buy ">
                    <div className="card-content white-text">
                        {/* Title */}
                        <div className="section">
                            <div className="card-title grey-text text-lighten-3 center title">
                                Type
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12">
                                <div className="flexContainer">
                                    <div className="buttonBox">
                                        <div className="buttonFlex">
                                            <button
                                                className=" btn waves-effect waves-light orange darken-2  modal-trigger"
                                                href="#modalBuyHome"
                                            >
                                                <i class="material-icons right  hide-on-small-only">
                                                    home
                                                </i>
                                                House
                                            </button>

                                            <a
                                                class="waves-effect waves-light btn green darken-1 modal-trigger"
                                                href="#modalBuyProperties"
                                            >
                                                <i class="material-icons right  hide-on-small-only">
                                                    texture
                                                </i>
                                                Site
                                            </a>
                                        </div>
                                    </div>
                                    <div className="hide-on-med-and-down">
                                        <div className="flexItem-Preview ">
                                            <img
                                                className="responsive-img"
                                                src="https://picsum.photos/400/200"
                                                alt="Preview"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="modalBuyHome" class="modal">
                <BuyModal
                    title={"Houses"}
                    description="Buy a House!"
                    properties={[]}
                />
            </div>

            <div id="modalBuyProperties" class="modal">
                <BuyModal
                    title={"Properties:"}
                    description="Buy a Property!"
                    properties={properties}
                />
            </div>
        </div>
    );
}
