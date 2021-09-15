import React from "react";
import Logo from "../components/logo/Logo";
import PayScreen from "../components/payScreen/PayScreen";

export default function Pay({ players, setPlayers }) {
    return (
        <>
            <Logo />
            <PayScreen players={players} setPlayers={setPlayers} />
        </>
    );
}
