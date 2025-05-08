import express from "express";
import cors from "cors";
import fs from "fs/promises";
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/health", (req, res) => {
  res.json({ message: "API is running" });
});

async function readJsonFile(filepath, encoding = "utf8") {
  const file = await fs.readFile(filepath, encoding);
  return JSON.parse(file);
}

app.get("/api/getdata", async (req, res) => {
  try {
    const data = await fs.readFile("./data.json", "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    console.error("Error reading or parsing data.json:", err);
    res.status(500).send("Error reading or parsing data");
  }
});
