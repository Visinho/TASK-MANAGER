const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/rtasks");
require("dotenv").config();
const notFound = require("./middleware/not-Found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware routes
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
