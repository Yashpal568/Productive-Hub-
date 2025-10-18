const express = require("express");
require("dotenv").config(); // Load .env
const connectDB = require("./connections/db");
const cors = require("cors");
const path = require("path");

const auth = require("./routes/auth");
const list = require("./routes/list");

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cors());

// ===== CONNECT DATABASE =====
connectDB();

// ===== API ROUTES =====
app.use("/api/v1", auth);
app.use("/api/v2", list);

// ===== SERVE FRONTEND (VITE BUILD) =====
const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"));
});

// ===== START SERVER =====
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
