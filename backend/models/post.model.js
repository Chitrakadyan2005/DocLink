import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
		},
		img: {
			type: String,
		},
		imageEmbedding: { type: Array, default: [] }, // Storing image embeddings
	    textEmbedding: { type: Array, default: [] },
		likes: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				verified: {
					type: Boolean,
					default: false, // Will be populated from the User model
				},
			},
		],
		comments: [
			{
				text: {
					type: String,
					required: true,
				},
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				verified: {
					type: Boolean,
					default: false, // Will be populated from the User model
				},
			},
		],
	},
	{ timestamps: true }
);

postSchema.pre("save", async function (next) {
	// Fetch user verification statuses for likes
	for (let like of this.likes) {
		const user = await mongoose.model("User").findById(like.user);
		if (user) like.verified = user.isVerified;
	}

	// Fetch user verification statuses for comments
	for (let comment of this.comments) {
		const user = await mongoose.model("User").findById(comment.user);
		if (user) comment.verified = user.isVerified;
	}

	next();
});

// Sort comments & likes based on verified status before returning
postSchema.virtual("sortedComments").get(function () {
	return [...this.comments].sort((a, b) => b.verified - a.verified || b.createdAt - a.createdAt);
});

postSchema.virtual("sortedLikes").get(function () {
	return [...this.likes].sort((a, b) => b.verified - a.verified);
});

const Post = mongoose.model("Post", postSchema);

export default Post;
