import React from "react";
import Logo from "../components/logo/Logo";

import $ from "jquery";
import SpectateMenu from "./spectateScreen/SpectateMenu";


export default function SpectateScreen({
    socket,
    socketConnected,
    spectateID,
    setSpectateID,
}) {
=======

    $("#navbar_lobby").removeClass("selected");
    $("#navbar_spectate").addClass("selected");
    $("#navbar_pay").removeClass("selected");
    $("#navbar_buy").removeClass("selected");
    $("#navbar_rent").removeClass("selected");
    $("#navbar_bank").removeClass("selected");
    $("#navbar_stocks").removeClass("selected");
    $("#navbar_overview").removeClass("selected");
    $("#navbar_sell").removeClass("selected");
    $("#navbar_settings").remove("selected");


    $(".carousel").hide();
    return (
        <>
            <SpectateMenu
                socket={socket}
                socketConnected={socketConnected}
                spectateID={spectateID}
                setSpectateID={setSpectateID}
            />
        </>
    );
}
