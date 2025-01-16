import express from "express";
import { sequelize } from './dabatase';
import { getAllMovies } from "./controllers/movie";
import { createAccount, editProfile, getProfile } from "./controllers/user";

const app = express();
const router = express.Router();
const port = 3000;

router.post('/create-account', createAccount);
router.put('/profile/:userId', editProfile);
router.get('/profile/:userId', getProfile);
router.get('/movies', getAllMovies);
router.get('/movie/:movieId/reviews')
router.get('/user/:userId/reviews')

app.use(router);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error.original);
}