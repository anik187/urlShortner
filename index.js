import 'dotenv/config'
import app from "./app.js";
import {db} from "./db/index.js";
import {visitShortUrl} from "./controllers/url.controller.js";

const port = process.env.PORT || 8001;

app.get("/", async (req, res) => {
    res.status(200).json({data: "welcome"})
})

app.get("/:shortCode", visitShortUrl)

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})
