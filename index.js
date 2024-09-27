import express from "express";
import cors from "cors";
import recettesRouter from "./src/route/index.js";

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/", recettesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
