import { Chart as ChartJS, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

import "chartjs-adapter-moment";

ChartJS.register(...registerables, zoomPlugin);
