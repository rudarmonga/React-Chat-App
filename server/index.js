import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURl = process.env.MONGODB_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use('/uploads/profiles', express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', routes)
const server = app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});

mongoose.connect(databaseURl)
.then(() => console.log(`Mongo DB connected`))
.catch(err => console.log(err.message));
