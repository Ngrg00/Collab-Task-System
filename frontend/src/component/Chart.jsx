import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({labels, values, color, display=false}) {
    const data = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: color,
                borderWidth: 0
            }
        ]
    }; 
    const options = {
        cutout:"60%",
        plugins: {
            legend: {
                display,
                position: "bottom"
            }
        }
    };

    return <Doughnut data={data} options={options}/>
}

export default Chart;