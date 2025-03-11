//// filepath: e:\Github\watches-web\server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");

// Nạp mảng từ file Data.js
const data = require("../Data.js").default;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/watches", (req, res) => {
  res.json(data);
});

app.post("/api/watches", (req, res) => {
  data.push(req.body);
  // Ghi lại file Data.js theo định dạng “export default [...]”
  fs.writeFileSync(
    "e:/Github/watches-web/baitap4/src/Data.js",
    "export default " + JSON.stringify(data, null, 2)
  );
  res.json({ status: "ok" });
});

app.listen(3001, () => console.log("Server running on port 3001"));