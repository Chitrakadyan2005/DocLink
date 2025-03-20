import { OpenAI } from "openai";
import faiss from "faiss-node";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/Post.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// FAISS Index
let index = new faiss.IndexFlatL2(512);

/** 
 * 🔍 Search by Image Similarity
 */
export const searchByImage = async (req, res) => {
	try {
		const { img } = req.body;
		if (!img) return res.status(400).json({ error: "Image is required" });

		// Upload image temporarily
		const uploadedResponse = await cloudinary.uploader.upload(img, { quality: "auto", format: "jpg" });
		const imageUrl = uploadedResponse.secure_url;

		// Generate embedding for the query image
		const imageResponse = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: imageUrl,
		});
		const queryEmbedding = imageResponse.data[0].embedding;

		// Search in FAISS
		const D = 5; // Number of nearest neighbors
		const [distances, indices] = index.search(queryEmbedding, D);

		// Fetch posts from DB based on indices
		const similarPosts = await Post.find().skip(indices[0]).limit(D);
		res.json({ similarPosts });
	} catch (error) {
		console.error("Error in searchByImage:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**
 * 🔍 Search by Text Similarity
 */
export const searchByText = async (req, res) => {
	try {
		const { query } = req.body;
		if (!query) return res.status(400).json({ error: "Search query is required" });

		// Generate embedding for text query
		const textResponse = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: query,
		});
		const queryEmbedding = textResponse.data[0].embedding;

		// Search in FAISS
		const D = 5; // Number of nearest neighbors
		const [distances, indices] = index.search(queryEmbedding, D);

		// Fetch posts from DB based on indices
		const similarPosts = await Post.find().skip(indices[0]).limit(D);
		res.json({ similarPosts });
	} catch (error) {
		console.error("Error in searchByText:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
