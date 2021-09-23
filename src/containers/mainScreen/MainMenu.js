import React from "react";

import "./MainMenu.css";

export default function MainMenu({ setGameState }) {
    return (
        <div className="row ">
            <div className="col l10 offset-l1 m8 offset-m2 s12 ">
                <div className="card cardColor-main">
                    <div className="card-content white-text">
                        <div className="ButtonBox">
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main red darken-2"
                                    href="#!"
                                    onClick={() => {
                                        setGameState("pay");
                                    }}
                                >
                                    <i className="material-icons right hide-on-med-and-down">
                                        attach_money
                                    </i>
                                    Pay
                                </a>
                            </div>
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main deep-orange darken-1"
                                    href="#!"
                                    onClick={() => {
                                        setGameState("buy");
                                    }}
                                >
                                    <i className="material-icons right hide-on-med-and-down">
                                        account_balance
                                    </i>
                                    Buy
                                </a>
                            </div>
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main light-green darken-3"
                                    href="#!"
                                    onClick={() => {
                                        setGameState("rent");
                                    }}
                                >
                                    <i className="material-icons right hide-on-med-and-down">
                                        receipt_long
                                    </i>
                                    Rent
                                </a>
                            </div>
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main teal darken-1"
                                    href="#!"
                                    onClick={() => {
                                        setGameState("bank");
                                    }}
                                >
                                    <i className="material-icons right hide-on-med-and-down">
                                        sell
                                    </i>
                                    Sell
                                </a>
                            </div>
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main light-blue darken-2"
                                    href="#!"
                                    onClick={() => {
                                        setGameState("bank");
                                    }}
                                >
                                    <i className="material-icons right hide-on-med-and-down">
                                        account_balance
                                    </i>
                                    Bank
                                </a>
                            </div>
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main deep-purple darken-1"
                                    href="#!"
                                    onClick={() => {
                                        setGameState("stocks");
                                    }}
                                >
                                    <i className="material-icons right hide-on-med-and-down">
                                        trending_up
                                    </i>
                                    Stock
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
