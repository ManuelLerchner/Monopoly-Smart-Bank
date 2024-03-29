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
        this.buildings = [];

        this.buildingsWorth = 0;
        this.negativeBuildings = 0;
        this.mortage = false;

        this.idx = counter;

        this.className = "PropertyClass";

        this.loadImage(this.name);
        this.calcRentCost = this.calcRentCost.bind(this);
        this.loadImage = this.loadImage.bind(this);
    }

    loadImage = async (imageName) => {
        counter++;
        return await import(`../images/properties/${imageName}.jpg`)
            .then((image) => {
                this.img = image.default;
            })
            .catch((e) => {
                this.img = `https://picsum.photos/id/${0}/300/480`;
            });
    };

    static builtBuilding(property, building) {
        let newSlotsNeeded = building.slotsTaken;

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

        if (building.type === "skyscraper") {
            property.buildingsWorth += property.buildingPrice[building.type];
            property.skyScraperBuilt = true;
        } else if (building.type === "monopolyTower") {
            property.buildingsWorth += property.buildingPrice[building.type];
            property.monopolyTowerBuilt = true;
        } else {
            property.housesCount += newSlotsNeeded;
            property.buildingsWorth +=
                property.buildingPrice[building.type] * newSlotsNeeded;
        }

        property.buildings.push(building);

        return [true, "Successfull"];
    }

    calcRentCost() {
        let rentPrice = 0;

        let rentalHousesCount = this.buildings.filter(
            (property) => property.type === "house"
        ).length;

        if (this.housesCount > 0) {
            if (this.negativeBuildings > 0) {
                rentPrice += this.rentPrices[rentalHousesCount];
            } else {
                rentPrice += this.rentPrices[this.housesCount];
            }
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
