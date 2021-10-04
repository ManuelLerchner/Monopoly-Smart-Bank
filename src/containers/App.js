import React, { useState, useEffect } from "react";

import { PlayerClass } from "./../Data/PlayerClass";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BottomBar from "../components/bottomBar/BottomBar";

import LobbyScreen from "./LobbyScreen";
import MainScreen from "./MainScreen";
import PayScreen from "./PayScreen";
import BuyScreen from "./BuyScreen";
import BankScreen from "./BankScreen";
import StocksScreen from "./StocksScreen";
import RentScreen from "./RentScreen";
import SellScreen from "./SellScreen";
import SpectateScreen from "./SpectateScreen";
import OverviewScreen from "./OverviewScreen";
import SettingScreen from "./SettingsScreen";

import io from "socket.io-client";

import {
    createStocks,
    loadBuildingData,
    loadPropertyData,
} from "../Data/loadGameData";

import {
    loadAvailableProperties,
    loadBank,
    loadBuildings,
    loadPlayers,
    loadStocks,
} from "../Data/loadLocalStorage";

import "./App.css";

const serverconfig = require("../serverconfig.json");
const CircularJSON = require("circular-json");

export default function App() {
    //Player List,  Game State
    const [players, setPlayers] = useState(loadPlayers() || []);

    const [availableProperties, setAvailableProperties] = useState(
        loadAvailableProperties() || []
    );

    const [buildings, setBuildings] = useState(loadBuildings() || []);

    const [startMoney, setStartMoney] = useState(
        localStorage.getItem("startMoney") || 55 * 10 ** 6
    );
    const [maxHouses, setMaxHouses] = useState(
        localStorage.getItem("maxHouses") || 25
    );

    const [gameState, setGameState] = useState(
        localStorage.getItem("gameState") || "lobby"
    );
    const [bank, setBank] = useState(loadBank() || null);

    const [gameID, setGameID] = useState(
        localStorage.getItem("gameID") || "null"
    );

    const [spectateID, setSpectateID] = useState(
        localStorage.getItem("spectateID") || "/"
    );

    const [stocks, setStocks] = useState(loadStocks() || []);

    const [socket, setSocket] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);

    //Update Local Storage
    useEffect(() => {
        const playerJson = CircularJSON.stringify(players);
        const bankJson = CircularJSON.stringify(bank);
        const availablePropertiesJSON =
            CircularJSON.stringify(availableProperties);

        const buildingsJson = CircularJSON.stringify(buildings);

        localStorage.setItem("players", playerJson);
        localStorage.setItem("availableProperties", availablePropertiesJSON);
        localStorage.setItem("buildings", buildingsJson);
        localStorage.setItem("startMoney", startMoney);
        localStorage.setItem("maxHouses", maxHouses);
        localStorage.setItem("gameState", gameState);
        localStorage.setItem("bank", bankJson);
        localStorage.setItem("gameID", gameID);
        localStorage.setItem("spectateID", spectateID);
        localStorage.setItem("spectateID", spectateID);
    }, [
        players,
        availableProperties,
        buildings,
        startMoney,
        maxHouses,
        gameState,
        bank,
        gameID,
        socket,
        socketConnected,
        spectateID,
        stocks,
    ]);

    //Send updates to spectators
    useEffect(() => {
        if (socket && socketConnected) {
            socket.emit("Data", {
                groupID: gameID,
                players: CircularJSON.stringify(players),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameID, players, socketConnected]);

    useEffect(() => {
        if (bank === null) {
            setBank(() => {
                return new PlayerClass("Bank", 10 ** 10);
            });
        }

        if (availableProperties.length === 0) {
            loadPropertyData().then((data) => {
                setAvailableProperties(data);
            });
        }

        if (stocks.length === 0) {
            let stocks = createStocks();
            setStocks(stocks);
        }

        if (buildings.length === 0) {
            setBuildings(loadBuildingData());
        }
        if (gameID === "null") {
            const zeroPad = (num, places) => String(num).padStart(places, "0");
            setGameID(zeroPad(Math.round(Math.random() * 10 ** 6), 6));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const newSocket = io(
            `http://${window.location.hostname}:${serverconfig.BACKEND_PORT}`
        );
        setSocket(newSocket);

        try {
            (async function () {
                const checkIfOnline = () =>
                    new Promise((resolve) => {
                        newSocket.on("connect", (data) => {
                            newSocket.emit("checkIfOnline");
                            newSocket.on("isOnlineResponse", (response) => {
                                resolve(response);
                            });
                        });
                        setTimeout(() => {
                            resolve(false);
                        }, 5000);
                    });

                setSocketConnected(await checkIfOnline());
            })();
        } catch (e) {
            setSocketConnected(false);
        }

        return () => newSocket.close();
    }, [setSocket]);

    // Determine which main Content to load
    function Content() {
        switch (gameState) {
            case "lobby":
                return (
                    <LobbyScreen
                        players={players}
                        setPlayers={setPlayers}
                        setGameState={setGameState}
                        setBuildings={setBuildings}
                        setAvailableProperties={setAvailableProperties}
                        setBank={setBank}
                        startMoney={startMoney}
                        setGameID={setGameID}
                        gameID={gameID}
                        setSpectateID={setSpectateID}
                        setStocks={setStocks}
                    />
                );
            case "main":
                return (
                    <MainScreen setGameState={setGameState} players={players} />
                );
            case "overview":
                return (
                    <OverviewScreen
                        setGameState={setGameState}
                        players={players}
                    />
                );
            case "spectate":
                return (
                    <SpectateScreen
                        setGameState={setGameState}
                        socket={socket}
                        socketConnected={socketConnected}
                        spectateID={spectateID}
                        setSpectateID={setSpectateID}
                    />
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
                        stocks={stocks}
                        setStocks={setStocks}
                        bank={bank}
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
