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
    const [properties, setProperties] = useState([]);
    const [buildings, setBuildings] = useState([]);

    const [gameState, setGameState] = useState("lobby");

    useEffect(() => {
        setPlayers([new PlayerClass("Manuel"), new PlayerClass("Cringo")]);

        let name = "Bachla Street";
        let cost = 2.8 * 10 ** 5;
        let color = "Orange";
        let housePrices = {
            1: 1 * 10 ** 6,
            2: 2 * 10 ** 6,
            3: 3 * 10 ** 6,
            4: 4 * 10 ** 6,
            5: 5 * 10 ** 6,
            6: 6 * 10 ** 6,
            7: 7 * 10 ** 6,
            8: 8 * 10 ** 6,
        };

        let hotelPrice = 10 * 10 ** 6;

        setProperties([
            new PropertyClass(name, cost, color, housePrices, hotelPrice),
            new PropertyClass("a", cost, "Lightblue", housePrices, hotelPrice),
            new PropertyClass(name, cost, "Black", housePrices, hotelPrice),
            new PropertyClass(
                "Cringe Street",
                cost,
                "Pink",
                housePrices,
                hotelPrice
            ),
            new PropertyClass(name, cost, "Lime", housePrices, hotelPrice),

            new PropertyClass(name, cost, "Lime", housePrices, hotelPrice),
            new PropertyClass(name, cost, "Grey", housePrices, hotelPrice),
            new PropertyClass(name, cost, "Grey", housePrices, hotelPrice),
            new PropertyClass(name, cost, "White", housePrices, hotelPrice),
            new PropertyClass(name, cost, "Lime", housePrices, hotelPrice),
            new PropertyClass(name, cost, "Grey", housePrices, hotelPrice),
            new PropertyClass(name, cost, "Orange", housePrices, hotelPrice),
            new PropertyClass(name, cost, "Grey", housePrices, hotelPrice),
            new PropertyClass(name, cost, "White", housePrices, hotelPrice),
            new PropertyClass(name, cost, "Orange", housePrices, hotelPrice),
        ]);

        let img = "https://picsum.photos/200/460";

        setBuildings([
            new BuildingClass("1 House", img),
            new BuildingClass("2 Houses", img),
            new BuildingClass("3 Houses", img),
            new BuildingClass("4 Houses", img),
            new BuildingClass("5 Houses", img),
            new BuildingClass("6 Houses", img),
            new BuildingClass("7 Houses", img),
            new BuildingClass("8 Houses", img),
            new BuildingClass("Skyscraper", img),
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
                    properties={properties}
                    setProperties={setProperties}
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
