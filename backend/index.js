const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/database.js');
const userRouter = require('./routes/userRoute.js');
const subjectRouter = require('./routes/subjectRoutes.js');
const lectureRouter = require('./routes/lectureRoutes.js');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');


// Load .env file
dotenv.config();

const app = express()

const _dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-type", "Authorization"]
}))


//routes
app.use("/v1/user", userRouter);
app.use("/v1/subjects", subjectRouter);
app.use("/v1/lectures", lectureRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(process.env.PORT, () => {
  connectDB();
})
