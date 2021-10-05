import { BuildingClass } from "./BuildingClass";
import { PlayerClass } from "./PlayerClass";
import { PropertyClass } from "./PropertyClass";
import { StockClass } from "./StockClass";

const CircularJSON = require("circular-json");

export const loadPlayers = () => {
    let array = [];
    try {
        let loadedPlayers = CircularJSON.parse(localStorage.getItem("players"));

        loadedPlayers.forEach((player) => {
            let res = Object.assign(new PlayerClass(), player);
            //res.balance = Number.parseFloat(res.balance);
            array.push(res);
        });
    } catch (e) {
        console.log("No Players Loaded from Local Storage");
    }

    return array;
};

export const loadAvailableProperties = () => {
    let array = [];
    try {
        let loadedProperties = CircularJSON.parse(
            localStorage.getItem("availableProperties")
        );

        loadedProperties.forEach((prop) => {
            let res = Object.assign(new PropertyClass(), prop);
            res.loadImage(res.name);
            array.push(res);
        });
    } catch (e) {
        console.log("No Properties Loaded from Local Storage");
    }
    return array;
};

export const loadBuildings = () => {
    let array = [];
    try {
        let loadedProperties = CircularJSON.parse(
            localStorage.getItem("buildings")
        );

        loadedProperties.forEach((prop) => {
            let res = Object.assign(new BuildingClass(), prop);
            array.push(res);
        });
    } catch (e) {
        console.log("No Buildings Loaded from Local Storage");
    }
    return array;
};

export const loadBank = () => {
    let bank = null;
    try {
        let loadedBank = CircularJSON.parse(localStorage.getItem("bank"));

        if (loadedBank === null) {
            throw new Error("");
        }

        let res = Object.assign(new PlayerClass(), loadedBank);

        //res.balance = Number.parseFloat(res.balance);
        bank = res;
    } catch (e) {
        console.log("No Bank Loaded from Local Storage");
    }

    return bank;
};

export const loadStocks = () => {
    let array = [];
    try {
        let loadedStocks = CircularJSON.parse(localStorage.getItem("stocks"));

        if (loadedStocks === null) {
            throw new Error("");
        }

        loadedStocks.forEach((stock) => {
            let res = Object.assign(new StockClass(), stock);
            array.push(res);
        });
    } catch (e) {
        console.log("No Stocks Loaded from Local Storage");
    }
    return array;
};