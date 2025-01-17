import express from "express";
import { sequelize } from "./database";
import { createAccount, editProfile, getAllUsers, getProfile } from "./controllers/user";

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.json());

router.post('/create-account', createAccount);
router.get('/users', getAllUsers);
router.put('/profile/:userId', editProfile);
router.get('/profile/:userId', getProfile);

app.use(router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    if (process.env.NODE_ENV) {
      console.log(`Environment: ${process.env.NODE_ENV}`);
    } else {
      console.warn("NODE_ENV is not set.");
    }

    app.listen(port, () => {
      console.log(`🚀 Server is running at: http://localhost:${port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unable to connect to the database:", error.message);
    } else {
      console.error("Unable to connect to the database:", error);
    }
  }
};

startServer();