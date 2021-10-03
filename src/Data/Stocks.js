import moment from "moment";
const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";

export class Stock {
    constructor(name, startValue, risk, percentage) {
        this.name = name;
        this.startValue = startValue;
        this.risk = risk;

        this.data = [];
        this.latestVal = startValue;
        this.percentage = percentage;

        setInterval(() => {
            this.calcNew();
        }, 4000);
        this.calcNew();

        function randomB(min, max) {
            return Math.random() * (max - min + 1) + min;
        }

        this.valueShould = randomB(0.2 * 10 ** 6, 0.8 * 10 ** 6);
    }

    calcNew() {
        let r = Math.random();

        const distfactor = this.latestVal / this.valueShould - 1;

        let factor = 1;
        if (r < this.percentage + 0.05 * distfactor) {
            factor = -1;
        }

        let newVal =
            this.latestVal + factor * this.risk * this.latestVal * 0.01;
        this.latestVal = newVal;

        let time = moment(new Date()).format(DATE_RFC2822);

        if (this.data.length > 600) {
            this.data.shift();
        }

        this.data.push({ x: time, y: newVal });
    }
}
