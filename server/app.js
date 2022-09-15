require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const router = require("./routers/index");
const errHandler = require("./middelware/errHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
