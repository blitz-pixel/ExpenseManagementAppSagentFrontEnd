import { Card } from "./Card"
import { PieChart } from "./PieChart"
import "./Report.css"

const Report = ({ data }) => {
    const totalRevenue = data.revenue.reduce((sum, item) => sum + item.amount, 0)
    const totalExpense = data.expenses.reduce((sum, item) => sum + item.amount, 0)

    return (
        <div className="report">
            <h1>Financial Report</h1>
            <div className="card-container">
                <Card title="Total Revenue" amount={totalRevenue} data={data.revenue} type="revenue" />
                <Card title="Total Expense" amount={totalExpense} data={data.expenses} type="expense" />
            </div>
            <div className="chart-container">
                <PieChart data={data.revenue} title="Revenue by Category" />
                <PieChart data={data.expenses} title="Expenses by Category" />
            </div>
        </div>
    )
}

export default Report
