import React, { useState, useEffect } from "react";

import Navbar from "../components/navbar/Navbar";
import BottomBar from "../components/bottomBar/BottomBar";
import Footer from "../components/footer/Footer";

import { PlayerClass } from "./../Data/PlayerClass";
import { PropertyClass } from "../Data/PropertyClass";
import { BuildingClass } from "../Data/BuildingClass";

import LobbyScreen from "./LobbyScreen";
import MainScreen from "./MainScreen";
import PayScreen from "./PayScreen";
import BuyScreen from "./BuyScreen";

import "./App.css";

export default function App() {
    //Player List,  Game State
    const [players, setPlayers] = useState([]);
    const [availableProperties, setAvailableProperties] = useState([]);
    const [buildings, setBuildings] = useState([]);

    const [gameState, setGameState] = useState("lobby");

    useEffect(() => {
        setPlayers([new PlayerClass("Manuel"), new PlayerClass("Cringo")]);

        let name = "Bachla Street";
        let cost = 2.8 * 10 ** 5;
        let color = "Orange";
        let rentPrice = {
            1: 1 * 10 ** 6,
            2: 2 * 10 ** 6,
            3: 3 * 10 ** 6,
            4: 3 * 10 ** 6,
            5: 3 * 10 ** 6,
            6: 3 * 10 ** 6,
            7: 3 * 10 ** 6,
            8: 3 * 10 ** 6,
        };

        let buildingPrice = {
            house: 1 * 10 ** 6,
            skyscraper: 2 * 10 ** 6,
            monopolyTower: 10 * 10 ** 6,
        };

        setAvailableProperties([
            new PropertyClass(name, cost, color, rentPrice, buildingPrice),
            new PropertyClass("a", cost, "Lightblue", rentPrice, buildingPrice),
            new PropertyClass(name, cost, "Black", rentPrice, buildingPrice),
            new PropertyClass("Lit", cost, "Pink", rentPrice, buildingPrice),
        ]);

        let img = "https://picsum.photos/100/160";

        setBuildings([
            new BuildingClass("1 House", img),
            new BuildingClass("2 Houses", img),
            new BuildingClass("3 Houses", img),
            new BuildingClass("Skyscraper", img),
            new BuildingClass("Monopoly Tower", img),
        ]);
    }, []);

    // Determine which main Content to load
    function Content() {
        if (gameState === "lobby")
            return (
                <LobbyScreen
                    players={players}
                    setPlayers={setPlayers}
                    setGameState={setGameState}
                />
            );
        if (gameState === "main")
            return <MainScreen setGameState={setGameState} />;
        if (gameState === "pay")
            return (
                <PayScreen
                    players={players}
                    setPlayers={setPlayers}
                    setGameState={setGameState}
                />
            );
        if (gameState === "buy")
            return (
                <BuyScreen
                    players={players}
                    setPlayers={setPlayers}
                    setGameState={setGameState}
                    availableProperties={availableProperties}
                    setAvailableProperties={setAvailableProperties}
                    buildings={buildings}
                />
            );
    }

    return (
        <>
            <div className="wallpaper">
                <Navbar setGameState={setGameState} />

                <Content />
                <BottomBar players={players} />
            </div>
            <Footer />
        </>
    );
}
