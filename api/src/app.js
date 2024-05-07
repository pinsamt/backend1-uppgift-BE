const Express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "API",
    p: process.env.MONGODB_URI,
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

module.exports = app;
