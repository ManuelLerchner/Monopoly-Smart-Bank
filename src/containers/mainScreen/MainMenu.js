import React from "react";

import "./MainMenu.css";

export default function MainMenu({ setGameState }) {
    const handlePay = () => {
        setGameState("pay");
    };

    const handleBuy = () => {
        setGameState("buy");
    };

    const handleBank = () => {
        setGameState("bank");
    };

    const handleStocks = () => {
        setGameState("stocks");
    };

    return (
        <div className="row ">
            <div className="col l6 offset-l3 m8 offset-m2 s12 ">
                <div className="card cardColor-main">
                    <div className="card-content white-text">
                        <div className="ButtonBox">
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main red darken-2"
                                    href="#!"
                                    onClick={handlePay}
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
                                    onClick={handleBuy}
                                >
                                    <i className="material-icons right hide-on-med-and-down">
                                        account_balance
                                    </i>
                                    Buy
                                </a>
                            </div>
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main green darken-1"
                                    href="#!"
                                    onClick={handleBank}
                                >
                                    <i className="material-icons right hide-on-med-and-down">
                                        double_arrow
                                    </i>
                                    Bank
                                </a>
                            </div>
                            <div className="">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-main light-blue darken-3"
                                    href="#!"
                                    onClick={handleStocks}
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
