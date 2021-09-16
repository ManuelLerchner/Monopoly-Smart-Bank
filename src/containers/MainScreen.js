import React from "react";
import Logo from "../components/logo/Logo";
import MainMenu from "./mainScreen/MainMenu";

import $ from "jquery";

export default function MainScreen({ setGameState }) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").addClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_start").removeClass("selected");
    $("#navbar_stock").removeClass("selected");

    return (
        <>
            <Logo setGameState={setGameState} />
            <MainMenu setGameState={setGameState} />
        </>
    );
}
