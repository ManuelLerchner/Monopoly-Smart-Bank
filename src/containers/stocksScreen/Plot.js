import { PlayerClass } from "../../Data/PlayerClass";

export const options = {
    layout: {
        padding: 10,
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
                font: {
                    size: 10,
                },
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
                    size: 15,
                },
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
                overScaleMode: "y",
            },
            pan: {
                enabled: true,
                mode: "xy",
            },
        },
    },
};
