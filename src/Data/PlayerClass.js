const { v4: uuidv4 } = require("uuid");
export class PlayerClass {
    constructor(name) {
        this.id = uuidv4();

        this.name = name;

        this.balance = 5.352 * 10 ** 6;
        this.properties = 0;
        this.houses = 0;
        this.skyscraper = 0;
        this.estimatedValue = 0;

        this.img = `https://avatars.dicebear.com/api/open-peeps/${name}.svg`;

        this.calcEstimatedValue = this.calcEstimatedValue.bind(this);

        this.calcEstimatedValue();
    }

    static formatMoney(balance) {
        const sign = balance < 0 ? "-" : "";
        let postFix = "";
        let balanceAbs = Math.abs(balance);

        if (balanceAbs > 10 ** 6) {
            postFix = "M";
            balanceAbs /= 10 ** 6;
        } else if (balanceAbs > 10 ** 3) {
            postFix = "k";
            balanceAbs /= 10 ** 3;
        }

        return sign + String(balanceAbs.toFixed(3)) + postFix;
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
        const balanceMoved = PlayerClass.parseMoney(amount);

        if (isNaN(balanceMoved)) {
            return false;
        }

        if (sender.id === receiver.id) {
            return false;
        }

        sender.balance -= balanceMoved;
        receiver.balance += balanceMoved;

        sender.calcEstimatedValue();
        receiver.calcEstimatedValue();

        return true;
    }

    calcEstimatedValue() {
        this.estimatedValue = this.balance;
    }
}
