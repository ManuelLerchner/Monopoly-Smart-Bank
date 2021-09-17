import React from "react";
import Logo from "../components/logo/Logo";
import PayMenu from "./payScreen/PayMenu";
import $ from "jquery";

export default function StocksScreen({ players, setPlayers, setGameState }) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").removeClass("selected");
    $("#navbar_bank").removeClass("selected");
    $("#navbar_stocks").addClass("selected");
    return <></>;
}
