import gamedata from "../Data/gamedata.csv";
import { PropertyClass } from "./PropertyClass";
import { BuildingClass } from "./BuildingClass";

import One_House from "../images/houses/1 House.jpg";
import Two_Houses from "../images/houses/2 Houses.jpg";
import Three_Houses from "../images/houses/3 Houses.jpg";
import One_Industrial from "../images/houses/1 Industrial.jpg";
import Two_Industrial from "../images/houses/2 Industrial.jpg";
import Three_Industrial from "../images/houses/3 Industrial.jpg";
import Skyscraper from "../images/houses/Skyscraper.jpg";
import MonopolyTower from "../images/houses/Monopoly Tower.jpg";

import Prison from "../images/houses/Prison.jpg";
import Dump from "../images/houses/Dump.jpg";
import Power from "../images/houses/Power.jpg";
import Sewage from "../images/houses/Sewage.jpg";
import { StockClass } from "./StockClass";

function loadCSV() {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        const dataArray = [];

        xhr.onload = function (e) {
            const bigString = e.target.responseText;
            const lines = bigString.split("\n");

            lines.slice(1, -1).forEach(function (line) {
                const tmpArray = line.split(";");
                const property = {};

                let M1 = 10 ** 6;

                property.name = tmpArray[0];
                property.cost =
                    Number.parseFloat(tmpArray[1].replace(",", ".")) * M1;
                property.color = tmpArray[2];
                property.baseRent =
                    Number.parseFloat(tmpArray[3].replace(",", ".")) * M1;
                property.rentPrice_2 =
                    Number.parseFloat(tmpArray[5].replace(",", ".")) * M1;
                property.rentPrice_1 =
                    Number.parseFloat(tmpArray[4].replace(",", ".")) * M1;
                property.rentPrice_3 =
                    Number.parseFloat(tmpArray[6].replace(",", ".")) * M1;
                property.rentPrice_4 =
                    Number.parseFloat(tmpArray[7].replace(",", ".")) * M1;
                property.rentPrice_5 =
                    Number.parseFloat(tmpArray[8].replace(",", ".")) * M1;
                property.rentPrice_6 =
                    Number.parseFloat(tmpArray[9].replace(",", ".")) * M1;
                property.rentPrice_7 =
                    Number.parseFloat(tmpArray[10].replace(",", ".")) * M1;
                property.rentPrice_8 =
                    Number.parseFloat(tmpArray[11].replace(",", ".")) * M1;
                property.housePrice =
                    Number.parseFloat(tmpArray[12].replace(",", ".")) * M1;
                property.skyScraperPrice =
                    Number.parseFloat(tmpArray[13].replace(",", ".")) * M1;
                property.industrialBuildingPrice =
                    Number.parseFloat(tmpArray[14].replace(",", ".")) * M1;
                property.img = tmpArray[15];
                dataArray.push(property);
            });

            resolve(dataArray);
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
            });
        };

        xhr.open("GET", gamedata, true);
        xhr.send();
    });
}

export async function loadPropertyData() {
    const data = await loadCSV();

    const properties = [];
    for (const id in data) {
        const property = data[id];

        let name = property.name;
        let cost = property.cost;
        let color = property.color;
        let rentPrice = {
            1: property.rentPrice_1,
            2: property.rentPrice_2,
            3: property.rentPrice_3,
            4: property.rentPrice_4,
            5: property.rentPrice_5,
            6: property.rentPrice_6,
            7: property.rentPrice_7,
            8: property.rentPrice_8,
        };

        let baseRent = property.baseRent;
        let buildingPrice = {
            house: property.housePrice,
            skyscraper: property.skyScraperPrice,
            monopolyTower: 10 * 10 ** 6,
            industrial: property.industrialBuildingPrice,
            negative: 0,
        };

        properties.push(
            new PropertyClass(
                name,
                cost,
                color,
                baseRent,
                rentPrice,
                buildingPrice
            )
        );
    }

    return properties;
}

export function loadBuildingData() {
    return [
        new BuildingClass("1 House", One_House, 1, "house"),
        new BuildingClass("2 Houses", Two_Houses, 2, "house"),
        new BuildingClass("3 Houses", Three_Houses, 3, "house"),
        new BuildingClass(
            "1 Industrial Building",
            One_Industrial,
            1,
            "industrial"
        ),
        new BuildingClass(
            "2 Industrial Buildings",
            Two_Industrial,
            2,
            "industrial"
        ),
        new BuildingClass(
            "3 Industrial Buildings",
            Three_Industrial,
            3,
            "industrial"
        ),
        new BuildingClass("Skyscraper", Skyscraper, 0, "skyscraper"),
        new BuildingClass("Monopoly Tower", MonopolyTower, 0, "monopolyTower"),
        new BuildingClass("Sewage Treatment", Sewage, 0, "negative", 1),
        new BuildingClass("Power Plant", Power, 0, "negative", 2),
        new BuildingClass("Dump", Dump, 0, "negative", 3),
        new BuildingClass("Prison", Prison, 0, "negative", 4),
    ];
}

export function createStocks() {
    function randomB(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
    const stocks = [];
    stocks.push(
        new StockClass("A", randomB(0.65, 0.9) * 10 ** 5, randomB(5, 12), 0.5)
    );
    stocks.push(
        new StockClass("B", randomB(0.65, 0.9) * 10 ** 5, randomB(5, 12), 0.5)
    );
    stocks.push(
        new StockClass("C", randomB(0.65, 0.9) * 10 ** 5, randomB(5, 12), 0.5)
    );
    stocks.push(
        new StockClass("D", randomB(0.65, 0.9) * 10 ** 5, randomB(5, 12), 0.5)
    );
    stocks.push(
        new StockClass("E", randomB(0.65, 0.9) * 10 ** 5, randomB(5, 12), 0.5)
    );
    return stocks;
}
