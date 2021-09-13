import React from "react";

import AddPlayersForm from "../components/home/AddPlayersForm";
import Logo from "../components/home/Logo";

export default function CreateGame({ setPlayers, setgameState }) {
    return (
        <>
            <Logo />
            <AddPlayersForm
                setPlayers={setPlayers}
                setgameState={setgameState}
                key="AddPlayerForm"
            />
        </>
    );
}
