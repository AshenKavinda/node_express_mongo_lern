import app from "./app.js";
import connectDB from "./config/db.js";
import "dotenv/config";

const port = process.env.PORT || 3000;

await connectDB();

app.listen(port,() => {
    console.log(`The app running on http://localhost:${port}`);
});
