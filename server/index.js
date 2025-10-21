import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/test", (req, res) => {
    res.json({ message: "Hi from backend"});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})