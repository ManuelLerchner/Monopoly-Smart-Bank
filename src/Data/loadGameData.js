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
