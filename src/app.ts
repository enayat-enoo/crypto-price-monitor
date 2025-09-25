import express from "express";
import fetcherRoutes from "./routes/fetchRoutes";
import alertRoutes from "./routes/alertRoutes";

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Crypto Price Monitor")
})
app.use("/api", fetcherRoutes);
app.use("/api/alerts", alertRoutes);

export default app;
