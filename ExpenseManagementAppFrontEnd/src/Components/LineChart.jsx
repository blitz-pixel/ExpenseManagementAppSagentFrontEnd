import { Paper, Typography } from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const LineChartCard = ({ title, data, color, stroke }) => {
    const formatData = (data) => {

        const allWeeks = Array.from({length: 52}, (_, i) => i + 1); // Weeks 1 to 52
        const allMonths = Array.from({length: 12}, (_, i) => i + 1); // Months 1 to 12
        const dataMap = {};

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

// Week ranges for each month (this is a common approach, adjust as needed)
        const monthWeekRanges = [
            {month: 1, startWeek: 1, endWeek: 4}, // January
            {month: 2, startWeek: 5, endWeek: 8}, // February
            {month: 3, startWeek: 9, endWeek: 12}, // March
            {month: 4, startWeek: 13, endWeek: 16}, // April
            {month: 5, startWeek: 17, endWeek: 20}, // May
            {month: 6, startWeek: 21, endWeek: 24}, // June
            {month: 7, startWeek: 25, endWeek: 28}, // July
            {month: 8, startWeek: 29, endWeek: 32}, // August
            {month: 9, startWeek: 33, endWeek: 36}, // September
            {month: 10, startWeek: 37, endWeek: 40}, // October
            {month: 11, startWeek: 41, endWeek: 44}, // November
            {month: 12, startWeek: 45, endWeek: 52}  // December
        ];


        data.forEach((entry) => {
            let timeLabel = "";
            let timeKey = "";
            if (entry.week) {
                let assignedMonth = null;

                // Find the month that corresponds to the week
                for (const range of monthWeekRanges) {
                    if (entry.week >= range.startWeek && entry.week <= range.endWeek) {
                        assignedMonth = range.month;
                        break;
                    }
                }

                // If a valid month is found
                if (assignedMonth !== null) {
                    timeLabel = `${monthNames[assignedMonth - 1]} Week ${entry.week}`;
                    timeKey = entry.week;
                }
            } else if (entry.month) {
                timeLabel = `${monthNames[entry.month - 1]}`;
                timeKey = entry.month;
            } else if (entry.year) {
                timeLabel = `Year ${entry.year}`;
                timeKey = entry.year;
            }


            if (timeKey) {
                dataMap[timeKey] = {name: timeLabel, amount: entry.totalAmount};
            }
        });


        const formattedData = [];
        if (data[0]?.week) {
            allWeeks.forEach((week) => {
                let assignedMonth = null;
                for (const range of monthWeekRanges) {
                    if (week >= range.startWeek && week <= range.endWeek) {
                        assignedMonth = range.month;
                        break;
                    }
                }


                const weekData = dataMap[week] ? dataMap[week] : {amount: 0};
                if (assignedMonth !== null) {
                    formattedData.push({
                        name: `${monthNames[assignedMonth - 1]} Week ${week}`,
                        amount: weekData.amount,
                    });
                }
            });
        } else if (data[0]?.month) {
            allMonths.forEach((month) => {
                const monthData = dataMap[month] ? dataMap[month] : {amount: 0};
                formattedData.push({
                    name: monthNames[month - 1],
                    amount: monthData.amount,
                });
            });
        } else if (data[0]?.year) {
            const years = [...new Set(data.map((entry) => entry.year))];
            years.forEach((year) => {
                const yearData = dataMap[year] ? dataMap[year] : {amount: 0};
                formattedData.push({
                    name: `Year ${year}`,
                    amount: yearData.amount,
                });
            });
        }

        return formattedData;
    }
        const formattedData = formatData(data);


    return (
        <Paper sx={{ p: 2, textAlign: "center", bgcolor: "background.paper", width: "100%" }}>
            <Typography variant="h6" color={color} gutterBottom>
                {title}
            </Typography>
            <ResponsiveContainer width="100%" height={400}> {/* Full width for responsiveness */}
                <LineChart data={formattedData}  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor:  "grey+",  // Custom background color
                            borderRadius: "8px", // Optional: adds rounded corners
                            padding: "10px", // Optional: adjusts padding inside the tooltip
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Optional: adds shadow for better visibility
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke={stroke} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};

LineChartCard.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            week: PropTypes.number,
            month: PropTypes.number,
            year: PropTypes.number,
            type: PropTypes.string.isRequired,
            totalAmount: PropTypes.number.isRequired,
        })
    ).isRequired,
    color: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
};

export default LineChartCard;
