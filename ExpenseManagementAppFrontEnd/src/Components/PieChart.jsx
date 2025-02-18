import { Card, CardContent, Typography, Divider, List, ListItem, ListItemText } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

const PieChartCard = ({ title, data, color }) => {
    return (
        <Card raised sx={{ bgcolor: `${color}.light`, color: `${color}.contrastText` }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="amount"
                        >
                            {data.map((_, i) => (
                                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <List dense>
                    {data.map((item, i) => (
                        <ListItem key={i}>
                            <ListItemText primary={item.name} secondary={`$${item.amount}`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default PieChartCard;
