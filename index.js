const express = require("express");
const app = express();

app.get("/", (req, res) => res.json({ status: "ok" }));

const route = (param, filename) => {
  app.get(param, require("./routes/" + filename));
};

route("/post", "post");
route("/related", "related");
route("/image-size", "image-size");

app.listen(3000, () => console.log("Example app listening on port 3000!"));
