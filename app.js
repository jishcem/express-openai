import 'dotenv/config'
import express from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG_ID,
  project: process.env.OPENAI_PROJECT_ID,
});

const app = express();
const port = 3000;

const messages = [{ role: "system", content: "You are a funny assistant" }];

app.get("/completion", async (req, res) => {
  if (req.query['query']) {
    messages.push({ role: "user", content: req.query['query'] });
  }  
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });
  res.send(completion.choices[0]['message']['content']);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});