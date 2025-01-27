import express from "express";
import cors from "cors";
import { createAccount, editProfile, getAllUsers, getProfile, login } from "./controllers/user";
import { addToList, getListDetails, getListsByUserId } from "./controllers/list";
import { newReview } from "./controllers/review";

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.json());

const corsOptions = {
  origin: `${process.env.LIVE_APP_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

router.post('/create-account', createAccount);
router.post('/login', login);
router.get('/users', getAllUsers);
router.put('/profile', editProfile);
router.get('/profile', getProfile);
router.post('/add-to-list', addToList);
router.get('/list/:listSlug', getListDetails);
router.get('/lists', getListsByUserId);
router.post('/add-review', newReview);

app.use(router);

const startServer = async () => {
  try {
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