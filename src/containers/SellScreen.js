import React from "react";
import Logo from "../components/logo/Logo";
import $ from "jquery";
import SellMenu from "./sellScreen/SellMenu";

export default function SellScreen({
    players,
    setPlayers,
    setGameState,
    bank,
    setBank,
}) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").removeClass("selected");
    $("#navbar_bank").removeClass("selected");
    $("#navbar_stocks").removeClass("selected");
    $("#navbar_overview").removeClass("selected");
    $("#navbar_sell").addClass("selected");

    $(".carousel").show();
    return (
        <>
            <Logo setGameState={setGameState} />
            <SellMenu players={players} setPlayers={setPlayers} bank={bank} />
        </>
    );
}
