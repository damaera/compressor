const express = require("express");
const app = express();

const route = (param, filename) => {
  app.get(param, require("./routes/" + filename));
};

app.get("/", (req, res) => res.json({ status: "ok" }));
route("/post", "post");

app.listen(3000, () => console.log("Example app listening on port 3000!"));
