import React, { useState, useEffect } from "react";

import LobbyScreen from "./LobbyScreen";
import Navbar from "../components/navbar/Navbar";
import BottomBar from "../components/bottomBar/BottomBar";
import MainScreen from "./MainScreen";

import { PlayerClass } from "./../Data/PlayerClass";

import "./App.css";
import PayScreen from "./PayScreen";

export default function App() {
    //Player List
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        setPlayers([
            new PlayerClass("Manuel", setPlayers),
            new PlayerClass("Cringo", setPlayers)
        ]);
    }, []);

    //Game State
    const [gameState, setgameState] = useState("createGame");

    // Determine which main Content to load
    function Content() {
        if (gameState === "createGame")
            return (
                <LobbyScreen
                    players={players}
                    setPlayers={setPlayers}
                    setgameState={setgameState}
                />
            );
        else if (gameState === "main")
            return <MainScreen setgameState={setgameState} />;
        else if (gameState === "pay")
            return <PayScreen players={players} setPlayers={setPlayers} />;
    }

    return (
        <header className="App-header">
            <BottomBar players={players} />
            <Navbar setgameState={setgameState} />
            <Content />
        </header>
    );
}
