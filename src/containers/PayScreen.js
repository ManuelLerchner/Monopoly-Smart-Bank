import React from "react";
import Logo from "../components/logo/Logo";
import PayMenu from "./payScreen/PayMenu";
import $ from "jquery";

export default function PayScreen({ players, setPlayers, setGameState }) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").addClass("selected");
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
            <PayMenu players={players} setPlayers={setPlayers} />
        </>
    );
}
