import bodyParser = require("body-parser");
import * as express from "express";
import connection from "./db/index";
import * as jwt from "jsonwebtoken";
import envs from "./config";
import authMiddleware from "./middlewares/authMiddleware";
import userRouter from "./route/userRoutes";
import blogRouter from "./route/blogRutes";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

connection.then((_) => {
  app.listen(port, () => {
    // const token = jwt.sign({ id: 23 }, envs.jwtSecret as string);
    // console.log(token);

    // const tokenData = jwt.verify(token, envs.jwtSecret as string);
    // console.log('tokr',tokenData);
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
