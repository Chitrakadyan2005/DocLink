import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	console.log("Generated Token:", token); // ✅ Token aa raha hai ya nahi check karo

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		httpOnly: true, 
		sameSite: "lax", // strict se lax kar de
		secure: false,  // Localhost ke liye false kar
	});
	

	console.log("Cookie Set:", res.getHeaders()["set-cookie"]); // ✅ Check karo cookie set ho rahi hai ya nahi

};
