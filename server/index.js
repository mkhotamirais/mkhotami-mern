const express = require("express");
const { port } = require("./config/constants");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config");
const { log } = require("console");
const cookieParser = require("cookie-parser");
const { credentials, corsOptions } = require("./config/cred");
const { join } = require("path");

app.use(morgan("tiny"));

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("homepage mkhotami-mern");
});

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use("/api/product", require("./routes/productRouter"));
app.use("/api/category", require("./routes/categoryRouter"));
app.use("/api/note", require("./routes/noteRouter"));

db.then(() => {
  log(`connect to mongodb`);
  app.listen(port, () => log(`server is listening on port ${port}`));
}).catch((err) => console.log(err));
