const app = require("./api/src/app");
const { connectToMongoose } = require("./api/src/config/mongoose");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server running on ", port);
  connectToMongoose();
});
