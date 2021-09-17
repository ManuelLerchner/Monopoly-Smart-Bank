const { v4: uuidv4 } = require("uuid");

export class PropertyClass {
    constructor(name, cost, color, baseRent, rentPrices, buildingPrice) {
        this.id = uuidv4();

        this.name = name;
        this.cost = cost;
        this.color = color;
        this.owner = null;

        this.rentPrices = rentPrices;
        this.buildingPrice = buildingPrice;
        this.baseRent = baseRent;

        this.skyScraperBuilt = false;
        this.buildingSlotsTaken = 0;

        this.housesCount = 0;

        this.buildingsWorth = 0;

        this.img = "https://picsum.photos/100/160";
    }

    static builtBuilding(property, building) {
        let newSlotsNeeded = 0;

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

        if (building.name === "Skyscraper") {
            property.skyScraperBuilt = true;
            property.buildingsWorth += property.buildingPrice["skyscraper"];
        } else if (building.name === "Monopoly Tower") {
            property.buildingsWorth += property.buildingPrice["monopolyTower"];
        } else {
            property.housesCount += 1;
            property.buildingsWorth +=
                property.buildingPrice["house"] * newSlotsNeeded;
        }

        return [true, "Successfull"];
    }

    calcRentCost() {
        let rentPrice = this.baseRent;

        if (this.housesCount > 0) {
            rentPrice += this.rentPrices[this.housesCount];
        }

        if (this.skyScraperBuilt === true || this.owner.hasMonopolyTower) {
            rentPrice *= 2;
        }

        return rentPrice;
    }
}
