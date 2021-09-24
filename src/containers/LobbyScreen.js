import React from "react";

import Lobby from "./lobbyScreen/LobbyScreen";
import Logo from "../components/logo/Logo";

import $ from "jquery";

export default function LobbyScreen({ setPlayers, setGameState, startMoney }) {
    $("#navbar_lobby").addClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").removeClass("selected");
    $("#navbar_bank").removeClass("selected");
    $("#navbar_stocks").removeClass("selected");
    $("#navbar_overview").removeClass("selected");
    $("#navbar_sell").removeClass("selected");
    $("#navbar_settings").removeClass("selected");

    $(".carousel").show();
    return (
        <>
            <Logo setGameState={setGameState} />
            <Lobby
                setPlayers={setPlayers}
                setGameState={setGameState}
                startMoney={startMoney}
            />
        </>
    );
}
