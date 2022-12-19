import { Router } from "express";

const app = Router();

app.get("/date", (req, res) => {
  res.json({ now: new Date() });
});

export const api = app;
