import React, { useEffect } from "react";

import "./Navbar.css";

export default function Navbar({ setGameState }) {
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
                        id="logoText"
                        href="#!"
                        className="brand-logo center "
                        onClick={() => {
                            setGameState("main");
                        }}
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
                                onClick={() => {
                                    setGameState("lobby");
                                }}
                                className=""
                            >
                                <i className="material-icons left">home</i>
                                Lobby
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_spectate"
                                href="#!"
                                onClick={() => {
                                    setGameState("spectate");
                                }}
                                className=""
                            >
                                <i className="material-icons left">
                                    visibility
                                </i>
                                Spectate
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_overview"
                                href="#!"
                                onClick={() => {
                                    setGameState("overview");
                                }}
                                className=""
                            >
                                <i className="material-icons left">insights</i>
                                Stats
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_settings"
                                href="#!"
                                onClick={() => {
                                    setGameState("settings");
                                }}
                                className=""
                            >
                                <i className="material-icons left">settings</i>
                                Settings
                            </a>
                        </li>
                    </ul>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <a
                                id="navbar_pay"
                                href="#!"
                                onClick={() => {
                                    setGameState("pay");
                                }}
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
                                onClick={() => {
                                    setGameState("buy");
                                }}
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
                                onClick={() => {
                                    setGameState("rent");
                                }}
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
                                id="navbar_sell"
                                href="#!"
                                onClick={() => {
                                    setGameState("sell");
                                }}
                                className=""
                            >
                                <i className="material-icons left">sell</i>
                                Sell
                            </a>
                        </li>
                        <li>
                            <a
                                id="navbar_bank"
                                href="#!"
                                onClick={() => {
                                    setGameState("bank");
                                }}
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
                                onClick={() => {
                                    setGameState("stocks");
                                }}
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
                        onClick={() => {
                            setGameState("lobby");
                        }}
                        className=""
                    >
                        <i className="material-icons left">home</i>
                        Lobby
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_spectate"
                        href="#!"
                        onClick={() => {
                            setGameState("spectate");
                        }}
                        className=""
                    >
                        <i className="material-icons left">visibility</i>
                        Spectate
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_overview"
                        href="#!"
                        onClick={() => {
                            setGameState("overview");
                        }}
                        className=""
                    >
                        <i className="material-icons left">insights</i>
                        Overview
                    </a>
                </li>

                <li>
                    <a
                        id="navbar_settings"
                        href="#!"
                        onClick={() => {
                            setGameState("settings");
                        }}
                        className=""
                    >
                        <i className="material-icons left">settings</i>
                        Settings
                    </a>
                </li>

                <li>
                    <a
                        id="navbar_pay"
                        href="#!"
                        onClick={() => {
                            setGameState("pay");
                        }}
                        className=""
                    >
                        <i className="material-icons left">attach_money</i>
                        Pay
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_buy"
                        href="#!"
                        onClick={() => {
                            setGameState("buy");
                        }}
                        className=""
                    >
                        <i className="material-icons left">credit_card</i>
                        Buy
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_rent"
                        href="#!"
                        onClick={() => {
                            setGameState("rent");
                        }}
                        className=""
                    >
                        <i className="material-icons left">receipt_long</i>
                        Rent
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_sell"
                        href="#!"
                        onClick={() => {
                            setGameState("sell");
                        }}
                        className=""
                    >
                        <i className="material-icons left">sell</i>
                        Sell
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_bank"
                        href="#!"
                        onClick={() => {
                            setGameState("bank");
                        }}
                        className=""
                    >
                        <i className="material-icons left">account_balance</i>
                        Bank
                    </a>
                </li>
                <li>
                    <a
                        id="navbar_stocks"
                        href="#!"
                        onClick={() => {
                            setGameState("stocks");
                        }}
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
