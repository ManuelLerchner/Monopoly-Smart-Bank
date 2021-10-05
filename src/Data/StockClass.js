import moment from "moment";
const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";

export class StockClass {
    constructor(name) {
        this.name = name;

        this.startValue = this.randomB(0.45 * 10 ** 6, 0.55 * 10 ** 6);
        this.valueShould = this.randomB(0.2 * 10 ** 6, 0.8 * 10 ** 6);
        this.risk = this.randomB(5, 8);

        this.data = [];
        this.latestVal = this.startValue;
        this.percentage = 0.5;

        this.paused = false;
        this.counter = 0;

        setInterval(() => {
            if (!this.paused) {
                this.calcNew();
            }
        }, 4000);
        this.calcNew();
    }

    randomB(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    calcNew() {
        let r = Math.random();

        const distfactor = this.latestVal / this.valueShould - 1;

        let factor = 1;
        if (r < this.percentage + 0.1 * distfactor) {
            factor = -1;
        }

        let newVal =
            this.latestVal + factor * this.risk * this.latestVal * 0.01;
        this.latestVal = newVal;

        let time = moment(new Date()).format(DATE_RFC2822);

        if (this.data.length > 450) {
            this.data.shift();
        }

        if (this.counter > 450) {
            this.valueShould = this.randomB(0.4 * 10 ** 6, 0.8 * 10 ** 6);
            this.counter = 0;
        }

        this.data.push({ x: time, y: newVal });
        this.counter++;
    }
}
