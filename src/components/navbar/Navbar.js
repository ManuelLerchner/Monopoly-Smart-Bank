import React, { useEffect } from "react";

import "./Navbar.css";

export default function Navbar({ setGameState }) {
    const toLobby = () => {
        setGameState("lobby");
    };

    const toMain = () => {
        setGameState("main");
    };

    const toPay = () => {
        setGameState("pay");
    };

    const toBuy = () => {
        setGameState("buy");
    };

    const toRent = () => {
        setGameState("rent");
    };

    const toBank = () => {
        setGameState("bank");
    };

    const toStocks = () => {
        setGameState("stocks");
    };

    useEffect(() => {
        try {
            var elemsSidenav = document.querySelectorAll(".sidenav");
            // eslint-disable-next-line no-undef
            M.Sidenav.init(elemsSidenav);
        } catch (e) {
            console.log();
        }
    });

    return (
        <>
            <nav>
                <div className="nav-wrapper grey darken-4">
                    <a
                        href="#!"
                        data-target="mobile-demo"
                        className="sidenav-trigger"
                    >
                        <i className="material-icons">menu</i>
                    </a>
                    <a
                        href="!#"
                        className="brand-logo center "
                        onClick={toMain}
                    >
                        <i className="material-icons right hide-on-small-only">
                            apartment
                        </i>
                        Smart-Bank
                    </a>

                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li>
                            <a
                                id="navbar_lobby"
                                href="#!"
                                onClick={toLobby}
                                className=""
                            >
                                <i className="material-icons left">home</i>
                                Lobby
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_main"
                                href="#!"
                                onClick={toMain}
                                className=""
                            >
                                <i className="material-icons left">
                                    sports_esports
                                </i>
                                Main
                            </a>
                        </li>
                    </ul>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <a
                                id="navbar_pay"
                                href="#!"
                                onClick={toPay}
                                className=""
                            >
                                <i className="material-icons left">
                                    attach_money
                                </i>
                                Pay
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_buy"
                                href="#!"
                                onClick={toBuy}
                                className=""
                            >
                                <i className="material-icons left">
                                    credit_card
                                </i>
                                Buy
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_rent"
                                href="#!"
                                onClick={toRent}
                                className=""
                            >
                                <i className="material-icons left">
                                    receipt_long
                                </i>
                                Rent
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_bank"
                                href="#!"
                                onClick={toBank}
                                className=""
                            >
                                <i className="material-icons left">
                                    account_balance
                                </i>
                                Bank
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_stocks"
                                href="#!"
                                onClick={toStocks}
                                className=""
                            >
                                <i className="material-icons left">
                                    trending_up
                                </i>
                                Stocks
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav grey" id="mobile-demo">
                <li>
                    <a
                        id="navbar_lobby"
                        href="#!"
                        onClick={toLobby}
                        className=""
                    >
                        <i className="material-icons left">home</i>
                        Lobby
                    </a>
                </li>
                <li>
                    <a id="navbar_main" href="#!" onClick={toMain} className="">
                        <i className="material-icons left">sports_esports</i>
                        Main
                    </a>
                </li>
                <li>
                    <a id="navbar_pay" href="#!" onClick={toPay} className="">
                        <i className="material-icons left">attach_money</i>
                        Pay
                    </a>
                </li>
                <li>
                    <a id="navbar_buy" href="#!" onClick={toBuy} className="">
                        <i className="material-icons left">credit_card</i>
                        Buy
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_start"
                        href="#!"
                        onClick={toBank}
                        className=""
                    >
                        <i className="material-icons left">start</i>
                        Start
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_stocks"
                        href="#!"
                        onClick={toStocks}
                        className=""
                    >
                        <i className="material-icons left">trending_up</i>
                        Stocks
                    </a>
                </li>
            </ul>
        </>
    );
}
