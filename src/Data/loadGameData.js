import gamedata from "../Data/gamedata.csv";

export default function loadCSV() {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        const dataArray = [];

        xhr.onload = function (e) {
            const bigString = e.target.responseText;
            const lines = bigString.split("\n");

            lines.slice(1, -1).forEach(function (line) {
                const tmpArray = line.split(";");
                const property = {};

                property.name = tmpArray[0];
                property.cost = Number.parseFloat(tmpArray[1]);
                property.color = tmpArray[2];
                property.baseRent = Number.parseFloat(tmpArray[3]);
                property.rentPrice_2 = Number.parseFloat(tmpArray[5]);
                property.rentPrice_1 = Number.parseFloat(tmpArray[4]);
                property.rentPrice_3 = Number.parseFloat(tmpArray[6]);
                property.rentPrice_4 = Number.parseFloat(tmpArray[7]);
                property.rentPrice_5 = Number.parseFloat(tmpArray[8]);
                property.rentPrice_6 = Number.parseFloat(tmpArray[9]);
                property.rentPrice_7 = Number.parseFloat(tmpArray[10]);
                property.rentPrice_8 = Number.parseFloat(tmpArray[11]);
                property.housePrice = Number.parseFloat(tmpArray[12]);
                property.skyScraperPrice = Number.parseFloat(tmpArray[13]);
                property.monopolyTowerPrice = Number.parseFloat(tmpArray[14]);
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
