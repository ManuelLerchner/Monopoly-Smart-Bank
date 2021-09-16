import React from "react";

import Lobby from "./lobbyScreen/LobbyScreen";
import Logo from "../components/logo/Logo";

import $ from "jquery";

export default function LobbyScreen({ setPlayers, setGameState }) {
    $("#navbar_lobby").addClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_start").removeClass("selected");
    $("#navbar_stock").removeClass("selected");

    return (
        <>
            <Logo setGameState={setGameState} />
            <Lobby setPlayers={setPlayers} setGameState={setGameState} />
        </>
    );
}
