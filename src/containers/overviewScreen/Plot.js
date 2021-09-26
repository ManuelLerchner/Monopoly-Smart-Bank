import { PlayerClass } from "./../../Data/PlayerClass";

export const options = (name) => {
    return {
        layout: {
            padding: 20,
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    callback: function (value, index, values) {
                        return PlayerClass.formatMoney(value);
                    },
                },
                suggestedMin: 0,
            },
            x: {
                ticks: {
                    color: "white",
                },
                type: "time",
                time: { displayFormats: { minute: "HH:mm" } },
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "white",
                    align: "end",
                    font: {
                        size: 14,
                    },
                },
            },

            title: {
                display: true,
                text: `${name}'s Money Plot`,
                color: "orange",
                font: {
                    size: 32,
                },
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "xy",
                },
                pan: {
                    enabled: true,
                    mode: "xy",
                },
                limits: {
                    y: { min: 0, max: 250*10**6 },
                },
            },
        },
    };
};
