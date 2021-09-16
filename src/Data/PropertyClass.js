const { v4: uuidv4 } = require("uuid");

export class PropertyClass {
    constructor(name, cost, color, rentPrices, buildingPrice) {
        this.id = uuidv4();

        this.name = name;
        this.cost = cost;
        this.color = color;

        this.rentPrices = rentPrices;
        this.buildingPrice = buildingPrice;

        this.skyScraperBuilt = false;

        this.buildingSlotsTaken = 0;

        this.img = "https://picsum.photos/100/160";
    }

    static builtBuilding(property, building) {
        let newSlotsNeeded = 0;

        console.log(property, building);

        switch (building.name) {
            case "1 House":
                newSlotsNeeded = 1;
                break;
            case "2 Houses":
                newSlotsNeeded = 2;
                break;
            case "3 Houses":
                newSlotsNeeded = 3;
                break;
            case "Skyscraper":
                newSlotsNeeded = 1;
                break;
            case "Monopoly Tower":
                newSlotsNeeded = 1;
                break;
            default:
                return [false, "Error while building"];
        }

        if (property.buildingSlotsTaken + newSlotsNeeded > 8) {
            return [
                false,
                `Not Enought Slots available,missing ${
                    8 - property.buildingSlotsTaken - newSlotsNeeded
                }`,
            ];
        }

        if (property.skyScraperBuilt === true && building === "Skyscraper") {
            return [false, "Skyscraper is already built here"];
        }

        property.buildingSlotsTaken += newSlotsNeeded;
        console.log("slots increaset to", property.buildingSlotsTaken);

        if (building === "Skyscraper") {
            property.skyScraperBuilt = true;
        }

        return [true, "Successfull"];
    }
}
