import React, { useState, useEffect } from "react";

import { PlayerClass } from "./../Data/PlayerClass";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import LobbyScreen from "./LobbyScreen";
import MainScreen from "./MainScreen";
import PayScreen from "./PayScreen";
import BuyScreen from "./BuyScreen";
import BankScreen from "./BankScreen";
import StocksScreen from "./StocksScreen";
import RentScreen from "./RentScreen";
import SellScreen from "./SellScreen";
import Overview from "./OverviewScreen";

import "./App.css";
import BottomBar from "../components/bottomBar/BottomBar";

import { loadBuildingData, loadPropertyData } from "../Data/loadGameData";

import SettingScreen from "./SettingsScreen";
import { loadAvailableProperties, loadPlayers } from "../Data/loadLocalStorage";

export default function App() {
    //Player List,  Game State
    const [players, setPlayers] = useState(loadPlayers() || []);
    const [availableProperties, setAvailableProperties] = useState(
        loadAvailableProperties() || []
    );

    const [buildings, setBuildings] = useState([]);

    const [startMoney, setStartMoney] = useState(
        localStorage.getItem("startMoney") || 55 * 10 ** 6
    );
    const [maxHouses, setMaxHouses] = useState(
        localStorage.getItem("maxHouses") || 25
    );

    const [gameState, setGameState] = useState(
        localStorage.getItem("gameState") || "lobby"
    );
    const [bank, setbank] = useState(new PlayerClass("Bank"));

    //Update Local Storage
    useEffect(() => {
        const playerJson = JSON.stringify(players, function (key, value) {
            if (key === "owner") {
                return value.id;
            } else {
                return value;
            }
        });

        localStorage.setItem("players", playerJson);

        localStorage.setItem(
            "availableProperties",
            JSON.stringify(availableProperties)
        );
        localStorage.setItem("buildings", JSON.stringify(buildings));
        localStorage.setItem("startMoney", startMoney);
        localStorage.setItem("maxHouses", maxHouses);
        localStorage.setItem("gameState", gameState);
    }, [
        players,
        availableProperties,
        buildings,
        startMoney,
        maxHouses,
        gameState,
        bank,
    ]);

    useEffect(() => {
        setbank(() => {
            let bank = new PlayerClass("Bank");
            bank.balance = 10 ** 10;
            return bank;
        });

        if (availableProperties.length === 0) {
            loadPropertyData().then((data) => {
                setAvailableProperties(data);
            });
        }

        if (buildings.length === 0) {
            setBuildings(loadBuildingData());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Determine which main Content to load
    function Content() {
        switch (gameState) {
            case "lobby":
                return (
                    <LobbyScreen
                        players={players}
                        setPlayers={setPlayers}
                        setGameState={setGameState}
                        startMoney={startMoney}
                    />
                );
            case "main":
                return (
                    <MainScreen setGameState={setGameState} players={players} />
                );
            case "overview":
                return (
                    <Overview setGameState={setGameState} players={players} />
                );
            case "settings":
                return (
                    <SettingScreen
                        startMoney={startMoney}
                        setStartMoney={setStartMoney}
                        setGameState={setGameState}
                        maxHouses={maxHouses}
                        setMaxHouses={setMaxHouses}
                    />
                );
            case "pay":
                return (
                    <PayScreen
                        players={players}
                        setPlayers={setPlayers}
                        setGameState={setGameState}
                    />
                );
            case "buy":
                return (
                    <BuyScreen
                        players={players}
                        setPlayers={setPlayers}
                        setGameState={setGameState}
                        availableProperties={availableProperties}
                        setAvailableProperties={setAvailableProperties}
                        buildings={buildings}
                        setBuildings={setBuildings}
                        bank={bank}
                        maxHouses={maxHouses}
                    />
                );
            case "rent":
                return (
                    <RentScreen
                        players={players}
                        setPlayers={setPlayers}
                        setGameState={setGameState}
                    />
                );

            case "sell":
                return (
                    <SellScreen
                        players={players}
                        setPlayers={setPlayers}
                        setGameState={setGameState}
                        bank={bank}
                    />
                );
            case "bank":
                return (
                    <BankScreen
                        players={players}
                        setPlayers={setPlayers}
                        setGameState={setGameState}
                        bank={bank}
                    />
                );
            case "stocks":
                return (
                    <StocksScreen
                        players={players}
                        setPlayers={setPlayers}
                        setGameState={setGameState}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div id="main">
            <div className="wallpaper">
                <Navbar setGameState={setGameState} />

                <Content />
                <BottomBar players={players} />
            </div>
            <Footer />
        </div>
    );
}
