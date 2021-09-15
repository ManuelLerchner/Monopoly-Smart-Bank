import React from "react";
import Logo from "../components/logo/Logo";
import PayMenu from "../components/payScreen/PayMenu";
import $ from "jquery";

export default function PayScreen({ players, setPlayers }) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").addClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_start").removeClass("selected");
    $("#navbar_stock").removeClass("selected");
    return (
        <>
            <Logo />
            <PayMenu players={players} setPlayers={setPlayers} />
        </>
    );
}