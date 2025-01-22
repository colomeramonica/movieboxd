import express from "express";
import cors from "cors";
import sequelize from './models/index';
import { createAccount, deleteAccount, editProfile, getAllUsers, getProfile, login } from "./controllers/user";
import { addToList, getListById, getListsByUserId } from "./controllers/list";

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.json());
app.use(cors());

router.post('/create-account', createAccount);
router.post('/login', login);
router.get('/users', getAllUsers);
router.put('/profile/:username', editProfile);
router.get('/profile/:username', getProfile);
router.delete('/:username', deleteAccount);
router.post('/add-to-list', addToList);
router.get('/list/:listId', getListById);
router.get('/lists', getListsByUserId);

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