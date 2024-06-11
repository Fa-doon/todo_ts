import express, { Application } from "express";
import { PORT } from "./config/env";
import sequelize from "./config/db";

// Importing routes
import todoRoute from "./routes/todoRoute";
import authRoute from "./routes/authRoute";

const app: Application = express();
const port = PORT || 3000;

// Middlewares
app.use(express.json());

app.use("/api/todo", todoRoute);
app.use("/api/auth", authRoute);



app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);


// Test database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Models synced");
  })
  .catch((err) => {
    console.log("An error occured", err);
  });

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
