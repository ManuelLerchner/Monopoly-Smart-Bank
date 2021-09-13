import React from "react";

import AddPlayersForm from "../components/createGameScreen/AddPlayersForm";
import Logo from "../components/logo/Logo";

export default function CreateGameScreen({ setPlayers, setgameState }) {
    return (
        <>
            <Logo />
            <AddPlayersForm
                setPlayers={setPlayers}
                setgameState={setgameState}
            />
        </>
    );
}
