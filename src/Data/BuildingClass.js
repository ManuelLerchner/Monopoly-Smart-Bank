const { v4: uuidv4 } = require("uuid");

export class BuildingClass {
    constructor(name, img, slotsTaken, type, negativeSpace) {
        this.id = uuidv4();

        this.name = name;
        this.img = img;
        this.slotsTaken = slotsTaken;
        this.type = type;
        this.negativeSpace = negativeSpace;
        this.className = "BuildingClass";
    }
}
