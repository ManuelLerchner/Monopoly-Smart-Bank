import React from "react";

import $ from "jquery";
import OverviewMenu from "./overviewScreen/OverviewMenu";

export default function Overview({ setGameState, players }) {
    $("#navbar_lobby").removeClass("selected");
    $("#navbar_main").removeClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").removeClass("selected");
    $("#navbar_bank").removeClass("selected");
    $("#navbar_stocks").removeClass("selected");
    $("#navbar_overview").addClass("selected");
    $("#navbar_sell").removeClass("selected");
    $("#navbar_settings").removeClass("selected");

    $(".carousel").hide();
    return (
        <>
            <OverviewMenu players={players} />
        </>
    );
}
