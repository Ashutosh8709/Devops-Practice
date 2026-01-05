const express = require("express");
const app = express();

const PORT = process.env.PORT || 5100;
const VERSION = process.env.APP_VERSION || "v1.0.0";

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "devops-demo",
  });
});

app.get("/version", (req, res) => {
  res.status(200).json({
    service: "devops-demo",
    version: VERSION,
  });
});

app.get("/error", (req, res) => {
  res.status(500).json({
    message: "Intentional error for testing",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DevOps demo app running on port ${PORT}`);
});
