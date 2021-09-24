import React from "react";
import Logo from "../components/logo/Logo";

import $ from "jquery";
import SettingsMenu from "./settingsScreen/SettingsMenu";

export default function SettingScreen({
    setGameState,
    startMoney,
    setStartMoney,
}) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").removeClass("selected");
    $("#navbar_bank").removeClass("selected");
    $("#navbar_stocks").removeClass("selected");
    $("#navbar_overview").removeClass("selected");
    $("#navbar_sell").removeClass("selected");
    $("#navbar_settings").addClass("selected");

    $(".carousel").show();
    return (
        <>
            <Logo setGameState={setGameState} />
            <SettingsMenu
                startMoney={startMoney}
                setStartMoney={setStartMoney}
            />
        </>
    );
}
