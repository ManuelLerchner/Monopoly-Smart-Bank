import React from "react";
import Logo from "../components/logo/Logo";

import $ from "jquery";

import BuyMenu from "./buyScreen/BuyMenu";

export default function BuyScreen({
    players,
    setPlayers,
    setGameState,
    properties,
    setProperties,
    buildings,
}) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").addClass("selected");
    $("#navbar_start").removeClass("selected");
    $("#navbar_stock").removeClass("selected");
    return (
        <>
            <Logo setGameState={setGameState} />
            <BuyMenu
                players={players}
                setPlayers={setPlayers}
                properties={properties}
                setProperties={setProperties}
                buildings={buildings}
            />
        </>
    );
}
