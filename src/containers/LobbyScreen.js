import React from "react";

import Lobby from "../components/createGameScreen/Lobby";
import Logo from "../components/logo/Logo";

import $ from "jquery";

export default function LobbyScreen({ setPlayers, setgameState }) {
    $("#navbar_lobby").addClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_start").removeClass("selected");
    $("#navbar_stock").removeClass("selected");
    
    return (
        <>
            <Logo />
            <Lobby
                setPlayers={setPlayers}
                setgameState={setgameState}
            />
        </>
    );
}
