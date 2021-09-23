const { v4: uuidv4 } = require("uuid");

export class BuildingClass {
    constructor(name, img) {
        this.id = uuidv4();

        this.name = name;
        this.img = img;

        this.className = "BuildingClass";
    }
}
