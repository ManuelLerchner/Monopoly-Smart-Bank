import React, { useEffect, useState } from "react";
import CreateGame from "./Home";

import BottomBar from "../components/bottomBar/BottomBar";

import "./App.css";
import Navbar from "../components/Navbar";
import { PlayerClass } from "./../Data/PlayerClass";
import Main from "./Main";

export default function App() {
    const [players, setPlayers] = useState([
        new PlayerClass("Manuel", "TestIcon")
    ]);

    const [gameState, setgameState] = useState("createGame");

    useEffect(() => {
        try {
            var elems = document.querySelectorAll(".carousel");
            // eslint-disable-next-line no-undef
            M.Carousel.init(elems, {
                dist: 0,
                padding: 10,
                numVisible: 10
            });
        } catch (e) {}
    }, []);

    function Content() {
        if (gameState === "createGame")
            return (
                <CreateGame
                    players={players}
                    setPlayers={setPlayers}
                    setgameState={setgameState}
                />
            );

        if (gameState === "main") return <Main />;
    }

    return (
        <header className="App-header">
            <Navbar setgameState={setgameState} />
            <Content />
            <BottomBar players={players} />
        </header>
    );
}
