import { Router } from "express";

const app = Router();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/date", (req, res) => {
  res.json({ now: new Date() });
});

app.get("/config", (req, res) => {
  res.json({ samples: 32, multiplicationFactor: 45 });
});

export const api = app;
