import React from "react";
import Logo from "../components/logo/Logo";
import $ from "jquery";
import StocksMenu from "./stocksScreen/StocksMenu";

export default function StocksScreen({ players, setPlayers, setGameState }) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").removeClass("selected");
    $("#navbar_bank").removeClass("selected");
    $("#navbar_stocks").addClass("selected");
    $("#navbar_overview").removeClass("selected");
    $("#navbar_sell").removeClass("selected");
    $("#navbar_settings").removeClass("selected");

    $(".carousel").show();

    return (
        <>
            <Logo setGameState={setGameState} />
            <StocksMenu />
        </>
    );
}
