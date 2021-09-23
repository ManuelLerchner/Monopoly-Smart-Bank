const { v4: uuidv4 } = require("uuid");
let counter = 0;
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
        this.monopolyTowerBuilt = false;

        this.buildingSlotsTaken = 0;

        this.housesCount = 0;

        this.buildingsWorth = 0;

        this.img = `https://picsum.photos/id/${counter}/300/480`;
      

        this.mortage = false;

        this.className = "PropertyClass";

        this.loadImage(name);
    }

    loadImage = async (imageName) => {
        return await import(`../images/properties/${imageName}.jpg`)
            .then((image) => {
                this.img = image.default;
            })
            .catch((e) => {
                console.log(e);
            });
    };

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
            case "1 Industrial Building":
                newSlotsNeeded = 1;
                break;
            case "2 Industrial Building":
                newSlotsNeeded = 2;
                break;
            case "3 Industrial Building":
                newSlotsNeeded = 3;
                break;
            case "Skyscraper":
                newSlotsNeeded = 0;
                break;
            case "Monopoly Tower":
                newSlotsNeeded = 0;
                break;
            default:
                return [false, "Error while building"];
        }

        if (property.buildingSlotsTaken + newSlotsNeeded > 8) {
            return [
                false,
                `Not Enought Slots available,missing ${
                    property.buildingSlotsTaken + newSlotsNeeded - 8
                }`,
            ];
        }

        if (
            property.owner.hasSkyScraperOn[this.color] === true &&
            building.name === "Skyscraper"
        ) {
            return [false, "Skyscraper is already built on this color"];
        }

        property.buildingSlotsTaken += newSlotsNeeded;

        if (building.name === "Skyscraper") {
            property.buildingsWorth += property.buildingPrice["skyscraper"];
            property.skyScraperBuilt = true;
        } else if (building.name === "Monopoly Tower") {
            property.buildingsWorth += property.buildingPrice["monopolyTower"];
            property.monopolyTowerBuilt = true;
        } else {
            property.housesCount += newSlotsNeeded;
            property.buildingsWorth +=
                property.buildingPrice["house"] * newSlotsNeeded;
        }

        return [true, "Successfull"];
    }

    calcRentCost() {
        let rentPrice = 0;

        if (this.housesCount > 0) {
            rentPrice += this.rentPrices[this.housesCount];
        } else {
            rentPrice = this.baseRent;
        }

        if (
            this.owner.hasSkyScraperOn[this.color] ||
            this.owner.hasMonopolyTower
        ) {
            rentPrice *= 2;
        }

        return rentPrice;
    }
}
