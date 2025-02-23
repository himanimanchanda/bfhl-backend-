require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get("/", async (req, res) => {
  try {
    const operationCode = { operation_code: 1 };
    const sampleData = { data: ["A", "1", "B", "2"] };

    const numbers = sampleData.data.filter((item) => typeof item === 'string' && !isNaN(item));
    const alphabets = sampleData.data.filter((item) => /^[a-zA-Z]$/.test(item));

    const highest_alphabet = alphabets.length > 0 
      ? [alphabets.reduce((max, curr) => curr.toLowerCase() > max.toLowerCase() ? curr : max)]
      : [];

    const postResponse = {
      is_success: true,
      user_id: "Himani_Manchanda_12-12-2003", 
      email: "22BCS10543@cuchd.in",
      roll_number: "22BCS10543",
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json({ operationCode, postResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ is_success: false, message: "Internal Server Error", error: error.toString() });
  }
});

// GET route
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST route
app.post("/bfhl", (req, res) => {
  try {
    console.log("Incoming Request:", req.body);
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid JSON format! 'data' must be an array." });
    }

    const numbers = data.filter((item) => typeof item === 'string' && !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    // Correct logic for highest alphabet (case insensitive)
    const highest_alphabet = alphabets.length > 0 
      ? [alphabets.reduce((max, curr) => curr.toLowerCase() > max.toLowerCase() ? curr : max)]
      : [];

    const response = {
      is_success: true,
      user_id: "Himani_Manchanda_12-12-2003",
      email: "22BCS10543@cuchd.in",
      roll_number: "22BCS10543",
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ is_success: false, message: "Internal Server Error", error: error.toString() });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
