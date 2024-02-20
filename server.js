const express = require("express");         // Express.js framework: used to build web applications
const cors    = require("cors");            // CORS middleware: Cross-Origin Resource Sharing to handle requests from different origins
const dotenv  = require("dotenv");          // dotenv: load environment variables from a .env file into process.env
const colors  = require("colors");          // colors: provides colors to console output
const morgan  = require("morgan");          // Morgan middleware: used to log HTTP requests
const connectDB = require("./config/db");   // Connect to MongoDB database

// DOTENV
// To store configuration information in a separate file
dotenv.config();

// MONGODB CONNECTION
connectDB();

// Create Express application: used to define routes and handle HTTP requests
const app = express();

// Set up Middlewares
app.use(cors());            // Adds the CORS middleware to allow cross-origin requests
app.use(express.json());    // Parses incoming requests with JSON payloads: to make the data available in req.body
app.use(morgan("dev"));     // Configure Morgan to log HTTP requests in development mode

// Define ROUTES
// Mount the userRoutes and postRoute
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/post", require("./routes/postRoutes"));
app.use("/api/v1/dailydiary", require("./routes/dailyDiaryRoutes"));
app.use("/api/v1/diymealkit", require("./routes/diyRoutes"));
app.use("/api/v1/redeem", require("./routes/redeemRoutes"));
app.use("/api/v1/dailyStreak", require("./routes/dailyStreakRoutes"));
app.use("/api/v1/vendorDIY", require("./routes/vendorDIYRoutes"));
app.use("/api/v1/healthhacks", require("./routes/healthhackRoutes"));
app.use("/api/v1/bookings", require("./routes/consultationRoutes"));
app.get("/", (req, res)=>{
    res.status(200).send({
        "success": true,
        "msg": "Node Server Running!"
    })
})

// Set-up Server PORT
// Define the server port: uses the value from the environment variable PORT if available; if not, it defaults to port 5000
const PORT = process.env.PORT || 5000;

// Start Server
// Makes Express app listen on the specified port (PORT)
// When server has successfully started, it logs a message to the console to indicate the port on which the server is running
app.listen(PORT, () => {    
    console.log(`Server Running ${PORT}`.bgGreen.white);
});





