import React from "react";

import Lobby from "./lobbyScreen/LobbyScreen";
import Logo from "../components/logo/Logo";

import $ from "jquery";

export default function LobbyScreen({
    setPlayers,
    setGameState,
    startMoney,
    setBuildings,
    setAvailableProperties,
    setBank,
    setGameID,
    gameID,
    setSpectateID,
    setStocks,
}) {
    $("#navbar_lobby").addClass("selected");
    $("#navbar_spectate").removeClass("selected");
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
                setBuildings={setBuildings}
                setAvailableProperties={setAvailableProperties}
                setBank={setBank}
                startMoney={startMoney}
                setGameID={setGameID}
                gameID={gameID}
                setSpectateID={setSpectateID}
                setStocks={setStocks}
            />
        </>
    );
}
