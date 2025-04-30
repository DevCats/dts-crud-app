import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoute.js";

const app = express();
const port = 3000;

app.use(cors({
    origin: "https://dts-crud-app-backend.vercel.app",
    methods: "POST,PUT,GET,DELETE",
    allowedHeaders: ["Content-Type"], 
    credentials: true
}));
app.use(express.json());

app.use("/api", taskRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});