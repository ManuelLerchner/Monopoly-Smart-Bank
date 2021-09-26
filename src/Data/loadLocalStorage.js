import { BuildingClass } from "./BuildingClass";
import { PlayerClass } from "./PlayerClass";
import { PropertyClass } from "./PropertyClass";

export const loadPlayers = () => {
    let array = [];
    try {
        let loadedPlayers = JSON.parse(localStorage.getItem("players"));

        loadedPlayers.forEach((player) => {
            let res = Object.assign(new PlayerClass(), player);

            res.properties = res.properties.map((prop) => {
                let obj = Object.assign(new PropertyClass(), prop);
                obj.owner = res;
                return obj;
            });

            res.balance = Number.parseFloat(res.balance);
            array.push(res);
            console.log(res);
        });
    } catch (e) {
        console.log("No Players Loaded from Local Storage");
    }

    return array;
};

export const loadAvailableProperties = () => {
    let array = [];
    try {
        let loadedProperties = JSON.parse(
            localStorage.getItem("availableProperties")
        );

        loadedProperties.forEach((prop) => {
            let res = Object.assign(new PropertyClass(), prop);
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
        let loadedProperties = JSON.parse(localStorage.getItem("buildings"));

        loadedProperties.forEach((prop) => {
            let res = Object.assign(new BuildingClass(), prop);
            array.push(res);
        });
    } catch (e) {
        console.log("No Buildings Loaded from Local Storage");
    }
    return array;
};
