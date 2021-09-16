const { v4: uuidv4 } = require("uuid");

export class PropertyClass {
    constructor(name, cost, color, housePrices, hotelPrice) {
        this.id = uuidv4();

        this.name = name;
        this.cost = cost;
        this.color = color;

        this.housePrices = housePrices;
        this.hotelPrice = hotelPrice;

        this.wolkenkratzerCount = 0;

        this.img = "https://picsum.photos/100/160";

       
    }
}
