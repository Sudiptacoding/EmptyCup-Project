const express = require("express");
const app = express();
const techList = require("./db/techData");
const port = 5000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/tech", (req, res) => {
  res.send(techList);
});
app.get("/tech/:id", (req, res) => {
  const { id } = req.params;
  const techItem = techList.find((item) => item.id == id);
  if (techItem) {
    res.send(techItem);
  } else {
    res.status(404).send({ message: "Tech item not found" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}/tech`);
});
