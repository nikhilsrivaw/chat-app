import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/AuthRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8747;
const database = process.env.DATABASE_URL;


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    
}));

app.use(cookieParser());
app.use(express.json());




app.use("/api/auth",AuthRoutes)

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


mongoose.connect(database).then(() => console.log("DB connected"));