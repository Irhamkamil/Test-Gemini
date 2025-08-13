import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({});

app.post("/chat", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Tidak ada request body nih !");
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send("Tidak ada prompt yang diberikan nih !");
  }

  try {
    const aiResponse = await ai.models.generateContent({
      models: "gemini-2.0-flash",
      contents: prompt
    });
    return res.status(200).send(aiResponse);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send(error.message);
  }
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words"
//   });
//   console.log(response.text);
// }

// await main();
