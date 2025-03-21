import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { content } = req.body;
    let imageUrl = '';

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const uploadResponse = await cloudinary.uploader.upload(dataURI);
      imageUrl = uploadResponse.secure_url;
    }

    const post = await Post.create({
      author: req.user._id,
      content,
      image: imageUrl
    });

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name specialty verified profileImage');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name specialty verified profileImage')
      .sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const alreadyLiked = post.likes.includes(req.user._id);
    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    const updatedPost = await Post.findById(req.params.id).populate('author', 'name specialty verified profileImage');
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/comment', protect, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.user._id,
      content,
      createdAt: new Date()
    });

    await post.save();
    const updatedPost = await Post.findById(req.params.id).populate('author', 'name specialty verified profileImage').populate('comments.user', 'name profileImage');
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;