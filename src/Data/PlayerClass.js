export class PlayerClass {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;

        this.balance = 5.352 * 10 ** 6;
        this.properties = 0;
        this.houses = 0;
        this.skyscraper = 0;
        this.estimatedValue = 0;

        this.formatMoney = this.formatMoney.bind(this);
    }

    formatMoney() {
        let balance = this.balance;

        let postFix = "";

        if (balance > 10 ** 6) {
            postFix = "M";
            balance /= 10 ** 6;
        } else if (balance > 10 ** 3) {
            postFix = "k";
            balance /= 10 ** 3;
        }

        return String(balance.toFixed(3)) + postFix;
    }
}
