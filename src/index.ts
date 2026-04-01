import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import gameRoutes from "./routes/gameRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", gameRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});