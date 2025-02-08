import { Link } from "react-router-dom"
import { Button, Typography, Container, Box, Grid, Card, CardContent, CardHeader, useTheme } from "@mui/material"
import { motion } from "framer-motion"

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
]

const Home = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.background.default})`,
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Box textAlign="center" mb={8}>
                        <Typography variant="h2" component="h1" gutterBottom color="primary.main" fontWeight="bold">
                            Welcome to Expense Tracker
                        </Typography>
                        <Typography variant="h5" color="text.secondary" paragraph>
                            Simplify your expense management and gain financial insights
                        </Typography>
                        <Box mt={4}>
                            <Button
                                component={Link}
                                to="/registration"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ mr: 2 }}
                            >
                                Register
                            </Button>
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="text.primary" mb={4}>
                        Features and Workflow
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Card raised sx={{ height: "100%" }}>
                                        <CardHeader title={feature.title} titleTypographyProps={{ variant: "h6", color: "primary" }} />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
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
    )
}

export default Home
