import { Link } from "react-router-dom";
import {
    Button,
    Typography,
    Container,
    Box,
    Card,
    CardContent,
    CardHeader,
} from "@mui/material";
import { motion } from "framer-motion";

const features = [
    {
        title: "Manual Expense and Revenue Entries",
        description:
            "Manually input expenses and revenues, categorize them, and specify details like date, amount, and payment method.",
    },
    {
        title: "Expense Categories",
        description:
            "Create a list of expense categories (e.g., Travel, Office Supplies) that users can assign to each expense, with custom category options.",
    },
    {
        title: "Reporting",
        description:
            "Generate expense and revenue reports with filtering options, allowing export in CSV, PDF, or Excel formats.",
    },
    {
        title: "Audit Logs",
        description: "Maintain a detailed log of expense-related activities for transparency and auditing.",
    },
    {
        title: "Real-Time Tracking",
        description: "Allow employees to track expenses in real-time, providing managers with better financial visibility.",
    },
    {
        title: "User Interface",
        description:
            "Design a simple, intuitive UI that supports easy data entry and report generation, optimized for both desktop and mobile views.",
    },
];


const Home = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        sx={{
                            width: "90vw",
                            maxWidth: "1100px",
                            py: 6,
                            px: 3,
                            textAlign: "center",
                            borderRadius: "12px",
                            boxShadow: "0 8px 16px rgba(255, 255, 255, 0.2)",
                        }}
                    >
                        <Typography
                            variant="h2"
                            component="h1"
                            fontWeight="bold"
                            sx={{
                                color: "white",
                                textShadow: "0 4px 8px rgba(255, 255, 255, 0.3)",
                            }}
                        >
                            Welcome to Gastos Rastreador
                        </Typography>
                        <Typography variant="h5" color="white" paragraph>
                            Simplify your expense management and gain financial insights
                        </Typography>
                    </Box>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        color="white"
                        textAlign="center"
                        mt={6}
                        mb={4}
                        fontWeight="bold"
                        sx={{ textShadow: "0 2px 6px rgba(255, 255, 255, 0.4)" }}
                    >
                        Features and Workflow
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: 3,
                        }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Card
                                    sx={{
                                        background: "rgba(255, 255, 255, 0.1)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: "12px",
                                        boxShadow: "0 8px 16px rgba(255, 255, 255, 0.2)",
                                        color: "white",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow: "0 12px 25px rgba(255, 255, 255, 0.3)",
                                        },
                                    }}
                                >
                                    <CardHeader
                                        title={feature.title}
                                        titleTypographyProps={{ variant: "h6", color: "white" }}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="white">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Home;
