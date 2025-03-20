import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";



dotenv.config({ path: "../.env" });

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express(); // ✅ Pehle app ko initialize karo!
const PORT = process.env.PORT || 6001;
const __dirname = path.resolve();

// ✅ Ab CORS middleware lagao
app.use(
	cors({
		origin: "http://localhost:3000", // ✅ Frontend URL
		credentials: true, // ✅ Cookies allow karega
	})
);

app.use(express.json({ limit: "5mb" })); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/api/auth/me", (req, res) => {
    console.log("GET /api/auth/me hit!");  // Debugging ke liye

    res.json({ message: "User authenticated!" });
});


// ✅ Windows-compatible environment variable check
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});
