import express from "express";
import recettesRouter from "./src/route/index.js";

const app = express();
app.use(express.json());

app.use("/", recettesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
