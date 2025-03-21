import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('followers', 'name specialty verified profileImage')
      .populate('following', 'name specialty verified profileImage');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/profile', protect, upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, specialty, location, hospital, bio } = req.body;
    const user = await User.findById(req.user._id);

    if (req.files) {
      if (req.files.profileImage) {
        const b64 = Buffer.from(req.files.profileImage[0].buffer).toString('base64');
        const dataURI = `data:${req.files.profileImage[0].mimetype};base64,${b64}`;
        const uploadResponse = await cloudinary.uploader.upload(dataURI);
        user.profileImage = uploadResponse.secure_url;
      }

      if (req.files.coverImage) {
        const b64 = Buffer.from(req.files.coverImage[0].buffer).toString('base64');
        const dataURI = `data:${req.files.coverImage[0].mimetype};base64,${b64}`;
        const uploadResponse = await cloudinary.uploader.upload(dataURI);
        user.coverImage = uploadResponse.secure_url;
      }
    }

    user.name = name || user.name;
    user.specialty = specialty || user.specialty;
    user.location = location || user.location;
    user.hospital = hospital || user.hospital;
    user.bio = bio || user.bio;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/follow/:id', protect, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(userToFollow._id);
    if (isFollowing) {
      currentUser.following = currentUser.following.filter(id => id.toString() !== userToFollow._id.toString());
      userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== currentUser._id.toString());
    } else {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }

    await Promise.all([currentUser.save(), userToFollow.save()]);
    res.json({ message: isFollowing ? 'Unfollowed' : 'Followed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;