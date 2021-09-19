import React from "react";
import Logo from "../components/logo/Logo";
import BankMenu from "./bankScreen/BankMenu";

import $ from "jquery";

export default function BankScreen({ players, setPlayers, setGameState }) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").removeClass("selected");
    $("#navbar_bank").addClass("selected");
    $("#navbar_stocks").removeClass("selected");
    $("#navbar_overview").removeClass("selected");
    $("#navbar_sell").removeClass("selected");

    $(".carousel").show();
    return (
        <>
            <Logo setGameState={setGameState} />
            <BankMenu players={players} setPlayers={setPlayers} />
        </>
    );
}
