import 'dotenv/config'
import app from "./app.js";
import { db } from "./db/index.js";
import { visitShortUrl } from "./controllers/url.controller.js";

const port = process.env.PORT ?? 8000;

app.get("/", async (_, res) => {
  res.status(200).json({ data: "welcome to the url shortner project!!" })
})

app.get("/:shortCode", visitShortUrl)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
