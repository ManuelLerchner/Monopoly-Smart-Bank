import React, { useState } from "react";

import CreateGameScreen from "./CreateGameScreen";
import Navbar from "../components/Navbar";
import BottomBar from "../components/bottomBar/BottomBar";
import MainScreen from "./MainScreen";

import { PlayerClass } from "./../Data/PlayerClass";

import "./App.css";

export default function App() {
    //Player List
    const [players, setPlayers] = useState([
        new PlayerClass("Manuel", "TestIcon")
    ]);

    //Game State
    const [gameState, setgameState] = useState("createGame");

    // Determine which main Content to load
    function Content() {
        if (gameState === "createGame")
            return (
                <CreateGameScreen
                    players={players}
                    setPlayers={setPlayers}
                    setgameState={setgameState}
                />
            );
        else if (gameState === "main") return <MainScreen />;
    }

    return (
        <header className="App-header">
            <Navbar setgameState={setgameState} />
            <Content />
            <BottomBar players={players} />
        </header>
    );
}
