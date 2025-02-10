import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export const PieChart = ({ data, title }) => {
    const chartData = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                data: data.map((item) => item.amount),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.label || ""
                        if (label) {
                            label += ": "
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(context.parsed)
                        }
                        return label
                    },
                },
            },
        },
    }

    return (
        <div className="pie-chart">
            <h2>{title}</h2>
            <Pie data={chartData} options={options} />
        </div>
    )
}