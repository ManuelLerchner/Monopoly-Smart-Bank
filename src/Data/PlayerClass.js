import BankIMG from "../images/Bank.png";

const { v4: uuidv4 } = require("uuid");

export class PlayerClass {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;

        this.balance = 5.35231 * 10 ** 6;
        this.properties = [];
        this.houses = 0;
        this.skyscraper = 0;
        this.estimatedValue = 0;
        this.hasMonopolyTower = false;

        this.hasSkyScraperOn = {};

        this.history = [];

        this.history.push({
            msg: `Received Start Money`,
            time: new Date().toLocaleTimeString(),
            amount: this.balance,
            total: this.balance,
            direction: "+",
        });

        this.changes = {
            balance: "",
            properties: "",
            houses: "",
            skyscraper: "",
        };

        this.img = `https://avatars.dicebear.com/api/open-peeps/${name}.svg`;

        if (this.name === "Bank") {
            this.img = BankIMG;
        }

        this.calcEstimatedValue = this.calcEstimatedValue.bind(this);
        this.calcEstimatedValue();
    }

    static formatMoney(balance) {
        const sign = balance < 0 ? "-" : "";
        let postFix = "";
        let balanceAbs = Math.abs(balance);

        if (balanceAbs >= 10 ** 6) {
            postFix = "M";
            balanceAbs /= 10 ** 6;
        } else if (balanceAbs >= 10 ** 3) {
            postFix = "K";
            balanceAbs /= 10 ** 3;
        }

        return sign + String(balanceAbs.toPrecision(4)) + postFix;
    }

    static parseMoney(money) {
        const lastLetter = money.charAt(money.length - 1);
        const hasPostfix = ["k", "M"].includes(lastLetter);
        const postFix = lastLetter;

        let amountPart = hasPostfix
            ? money.substring(0, money.length - 1)
            : money;

        amountPart = amountPart.replace(",", ".");

        const number = parseFloat(amountPart);

        if (isNaN(number)) {
            return NaN;
        }

        let balance = number;
        if (postFix === "M" || !hasPostfix) {
            balance *= 10 ** 6;
        } else if (postFix === "k") {
            balance *= 10 ** 3;
        }

        return balance;
    }

    static sendMoney(sender, receiver, amount) {
        const balanceMoved =
            typeof amount === "string"
                ? PlayerClass.parseMoney(amount)
                : amount;

        if (isNaN(balanceMoved)) {
            return [false, "Invalid Money Format"];
        }

        if (sender.id === receiver.id) {
            return [false, "Sender is Receiver"];
        }

        if (sender.balance < balanceMoved) {
            return [false, "Not enought Money"];
        }

        sender.balance -= balanceMoved;
        receiver.balance += balanceMoved;

        sender.calcEstimatedValue();
        receiver.calcEstimatedValue();

        sender.changes["balance"] = "-";
        receiver.changes["balance"] = "+";

        sender.history.push({
            msg: `Paid Money to ${receiver.name}`,
            time: new Date().toLocaleTimeString(),
            amount: balanceMoved,
            total: sender.balance,
            direction: "-",
        });

        receiver.history.push({
            msg: `Received Money from ${sender.name}`,
            time: new Date().toLocaleTimeString(),
            amount: balanceMoved,
            total: receiver.balance,
            direction: "+",
        });

        return [true, "Successfull"];
    }

    static buyProperty(buyer, property) {
        const cost = property.cost;

        if (buyer.balance < cost) {
            return [false, "Not enought Money"];
        }

        buyer.balance -= cost;
        buyer.properties.push(property);

        buyer.calcEstimatedValue();

        buyer.changes["balance"] = "-";
        buyer.changes["properties"] = "+";

        buyer.history.push({
            msg: `Bought ${property.name}`,
            time: new Date().toLocaleTimeString(),
            amount: cost,
            total: buyer.balance,
            direction: "-",
        });

        property.owner = buyer;

        return [true, "Successfull"];
    }

    static builtBuilding(buyer, property, building, price) {
        if (buyer.balance < price) {
            return [false, "Not enought Money"];
        }

        switch (building.name) {
            case "1 House":
                buyer.houses += 1;
                buyer.changes["houses"] = "+";
                break;
            case "2 Houses":
                buyer.houses += 2;
                buyer.changes["houses"] = "+";
                break;
            case "3 Houses":
                buyer.houses += 3;
                buyer.changes["houses"] = "+";
                break;
            case "Skyscraper":
                buyer.skyscraper += 1;
                buyer.changes["skyscraper"] = "+";
                buyer.hasSkyScraperOn[property.color] = true;
                break;
            case "Monopoly Tower":
                buyer.hasMonopolyTower = true;
                break;
            default:
                return [false, "Error while building"];
        }

        buyer.balance -= price;
        buyer.changes["balance"] = "-";

        buyer.history.push({
            msg: `Bought ${building.name} on ${property.name}`,
            time: new Date().toLocaleTimeString(),
            amount: price,
            total: buyer.balance,
            direction: "-",
        });

        buyer.calcEstimatedValue();

        return [true, "Successfull"];
    }

    calcEstimatedValue() {
        let estimated = this.balance;

        this.properties.forEach((property) => {
            estimated += property.cost + property.buildingsWorth;
        });

        this.estimatedValue = estimated;
    }
}
