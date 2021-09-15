import React from "react";
import Logo from "../components/logo/Logo";
import MainMenu from "../components/mainScreen/MainScreen";

export default function MainScreen({ setgameState }) {
    return (
        <>
            <Logo />
            <MainMenu setgameState={setgameState} />
        </>
    );
}
