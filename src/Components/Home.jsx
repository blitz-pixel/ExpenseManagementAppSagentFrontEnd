import { Link } from "react-router-dom";
import {
    Button,
    Typography,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardHeader,
    useTheme
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
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.background.default})`,
                animation: "gradientBG 6s ease infinite",
                py: 8,
                px: 3,
                textAlign: "center"
            }}
        >
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box mb={8}>
                        <Typography
                            variant="h2"
                            component="h1"
                            color="gold"
                            fontWeight="bold"
                            sx={{ textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
                        >
                            Welcome to Expense Tracker
                        </Typography>
                        <Typography
                            variant="h5"
                            color="white"
                            paragraph
                        >
                            Simplify your expense management and gain financial insights
                        </Typography>
                        <Box mt={4}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ display: "inline-block", marginRight: "10px" }}
                            >
                                <Button
                                    component={Link}
                                    to="/registration"
                                    variant="contained"
                                    color="warning"
                                    size="large"
                                    sx={{
                                        fontWeight: "bold",
                                        boxShadow: "0px 4px 12px rgba(255, 215, 0, 0.5)"
                                    }}
                                >
                                    Register
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ display: "inline-block" }}
                            >
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        fontWeight: "bold",
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)"
                                    }}
                                >
                                    Login
                                </Button>
                            </motion.div>
                        </Box>
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
                        color="gold"
                        textAlign="center"
                        mb={4}
                        fontWeight="bold"
                        sx={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)" }}
                    >
                        Features and Workflow
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Card
                                        sx={{
                                            height: "100%",
                                            background: "rgba(255, 255, 255, 0.1)",
                                            backdropFilter: "blur(10px)",
                                            borderRadius: "12px",
                                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                                            color: "white",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: "0 12px 25px rgba(0, 0, 0, 0.3)"
                                            }
                                        }}
                                    >
                                        <CardHeader
                                            title={feature.title}
                                            titleTypographyProps={{ variant: "h6", color: "gold" }}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="white">
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Home;
