import React from "react";
import Logo from "../components/logo/Logo";
import $ from "jquery";
import RentMenu from "./rentScreen/RentMenu";

export default function RentScreen({ players, setPlayers, setGameState }) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").addClass("selected");
    $("#navbar_bank").removeClass("selected");
    $("#navbar_stocks").removeClass("selected");
    $("#navbar_overview").removeClass("selected");
    $("#navbar_sell").removeClass("selected");

    $(".carousel").show();
    return (
        <>
            <Logo setGameState={setGameState} />
            <RentMenu players={players} setPlayers={setPlayers} />
        </>
    );
}
