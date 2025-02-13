// import { WalletCards, Receipt, FileText, FolderKanban } from "lucide-react"
// import { Link } from "react-router-dom";
// import { Grid2, Box , Paper,Typography} from "@mui/material";
//
// function Dashboard() {
//       return (
//         <Box
//   sx={{
//     display: "grid",
//     position: "relative",
//     border: '1px dashed grey' ,
//     justifyContent: "center",
//     gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // Two columns on medium screens
//     gridTemplateRows: { xs: "auto", md: "200px 200px" }, // Two rows on medium screens
//     rowGap: "70px",
//     columnGap: "20px",
//     // padding: "20px",
//     width: "800px",
//     height: "520px",
//
//   }}
// >
//
// <Link to="/income">
//
//   <Paper
//     sx={{
//       height: "250px",
//       width: "398px",
//       display: "flex",
//
//       alignItems: "center",
//       justifyContent: "center",
//       gridColumn: { xs: "1", md: "1 / span 1" }, // First column on medium screens
//       gridRow: { xs: "1", md: "1" }, // First row on medium screens
//     }}
//   >
//     <Typography variant="h4">Income</Typography>
//     <Box sx={{
//       border: '1px dashed grey',
//       position: 'absolute',
//       right: '510px',
//     }}>
//       <WalletCards />
//     </Box>
//   </Paper>
//   </Link>
//
//
//        <Link to="/expense">
//
//
//
//
//   <Paper
//     sx={{
//        height: "250px",
//       width: "380px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gridColumn: { xs: "1", md: "2" }, // Second column on medium screens
//       gridRow: { xs: "2", md: "1" }, // First row on medium screens
//     }}
//   >
//     <Typography variant="h4">Revenue</Typography>
//     <Box sx={{
//       border: '1px dashed grey',
//       position: 'absolute',
//       right: '90px',
//     }}>
//     <Receipt/>
//     </Box>
//   </Paper>
//  </Link>
//   <Paper
//     sx={{
//       height: "250px",
//       width: "398px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gridColumn: { xs: "1", md: "1" }, // First column on medium screens
//       gridRow: { xs: "3", md: "2" }, // Second row on medium screens
//     }}
//   >
//     <Typography variant="h4">3</Typography>
//   </Paper>
//
//
//   <Paper
//     sx={{
//       height: "250px",
//       width: "380px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gridColumn: { xs: "1", md: "2" }, // Second column on medium screens
//       gridRow: { xs: "4", md: "2" }, // Second row on medium screens
//     }}
//   >
//     <Typography variant="h4">4</Typography>
//   </Paper>
// </Box>
//       );
//
//   // return (
//   //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//   //     <Link to="/income">
//   //       <div className="group bg-[#ffd9d1] rounded-lg p-8 transition-all hover:shadow-lg">
//   //         <div className="flex items-center justify-between mb-4">
//   //           <h2 className="text-2xl font-bold">INCOME OVERVIEW</h2>
//   //           <WalletCards className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform" />
//   //         </div>
//   //       </div>
//   //     </Link>
//
//
//   //     <Link to="/report">
//   //       <div className="group bg-[#ffd9d1] rounded-lg p-8 transition-all hover:shadow-lg">
//   //         <div className="flex items-center justify-between mb-4">
//   //           <h2 className="text-2xl font-bold">REPORT</h2>
//   //           <FileText className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform" />
//   //         </div>
//   //       </div>
//   //     </Link>
//
//   //     <Link to="/categories">
//   //       <div className="group bg-[#ffd9d1] rounded-lg p-8 transition-all hover:shadow-lg">
//   //         <div className="flex items-center justify-between mb-4">
//   //           <h2 className="text-2xl font-bold">CATEGORIES</h2>
//   //           <FolderKanban className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform" />
//   //         </div>
//   //       </div>
//   //     </Link>
//   //   </div>
//   // )
// }
//
// export default Dashboard;


import { WalletCards, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";

function Dashboard() {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                justifyContent: "center",
                padding: 3,
                height: "100%",
            }}
        >
            <Grid container spacing={3}>
                {/* Income Overview Card */}
                <Grid item xs={12} sm={6}>
                    <Link to="/Revenue" style={{ textDecoration: "none" }}>
                        <Paper
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 2,
                                boxShadow: 3,
                                borderRadius: 2,
                                backgroundColor: "white",
                            }}
                        >
                            <img
                                src="/docs/images/blog/image-1.jpg"
                                alt="Income Overview"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    marginBottom: "16px",
                                }}
                            />
                            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                                Income Overview
                            </Typography>
                            <Typography sx={{ marginBottom: 2 }}>
                                Manage and track all your income streams here.
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ padding: "8px 20px" }}>
                                View Details
                            </Button>
                        </Paper>
                    </Link>
                </Grid>

                {/* Expense Overview Card */}
                <Grid item xs={12} sm={6}>
                    <Link to="/Expense" style={{ textDecoration: "none" }}>
                        <Paper
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 2,
                                boxShadow: 3,
                                borderRadius: 2,
                                backgroundColor: "white",
                            }}
                        >
                            <img
                                src="/docs/images/blog/image-1.jpg"
                                alt="Expense Overview"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    marginBottom: "16px",
                                }}
                            />
                            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                                Expense Overview
                            </Typography>
                            <Typography sx={{ marginBottom: 2 }}>
                                Keep track of your expenses and manage your budgets.
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ padding: "8px 20px" }}>
                                View Details
                            </Button>
                        </Paper>
                    </Link>
                </Grid>

                {/* Report Card */}
                <Grid item xs={12} sm={6}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 2,
                            boxShadow: 3,
                            borderRadius: 2,
                            backgroundColor: "white",
                        }}
                    >
                        <img
                            src="/docs/images/blog/image-1.jpg"
                            alt="ReportImg"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                marginBottom: "16px",
                            }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                            Report
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            Get transaction report here.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ padding: "8px 20px" }}>
                            View Details
                        </Button>
                    </Paper>
                </Grid>

                {/* Recent Transactions Card */}
                <Grid item xs={12} sm={6}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 2,
                            boxShadow: 3,
                            borderRadius: 2,
                            backgroundColor: "white",
                        }}
                    >
                        <img
                            src="/docs/images/blog/image-1.jpg"
                            alt="Recent Transactions"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                marginBottom: "16px",
                            }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                            Recent Transactions
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            View most recent Transactions here.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ padding: "8px 20px" }}>
                            View Details
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;