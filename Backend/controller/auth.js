const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const jwtSecret = process.env.JWT_SECRET || process.env.MONGO_URL;

const publicUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || ''
});

const issueToken = (user) => jwt.sign(
    { userId: user._id.toString() },
    jwtSecret,
    { expiresIn: '7d' }
);

exports.signup = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;
        const avatar = req.body.avatar || '';

        if (!name || !email || typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({ message: 'Enter your name, a valid email, and a password with at least 8 characters.' });
        }
        if (avatar && (!avatar.startsWith('data:image/') || avatar.length > 2_500_000)) {
            return res.status(400).json({ message: 'Choose an image smaller than 1.8 MB.' });
        }
        if (await User.exists({ email })) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        const user = await User.create({ name, email, password: await bcrypt.hash(password, 12), avatar });
        return res.status(201).json({ token: issueToken(user), user: publicUser(user) });
    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: 'An account with this email already exists.' });
        return res.status(500).json({ message: 'Unable to create your account.' });
    }
};

exports.login = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;
        const user = await User.findOne({ email }).select('+password');

        if (!user || typeof password !== 'string' || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Email or password is incorrect.' });
        }
        return res.status(200).json({ token: issueToken(user), user: publicUser(user) });
    } catch {
        return res.status(500).json({ message: 'Unable to sign in right now.' });
    }
};

exports.getMe = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Account not found.' });
    return res.status(200).json(publicUser(user));
};

exports.updateAvatar = async (req, res) => {
    const avatar = req.body.avatar || '';
    if (avatar && (!avatar.startsWith('data:image/') || avatar.length > 2_500_000)) {
        return res.status(400).json({ message: 'Choose an image smaller than 1.8 MB.' });
    }
    const user = await User.findByIdAndUpdate(req.userId, { avatar }, { new: true });
    if (!user) return res.status(404).json({ message: 'Account not found.' });
    return res.status(200).json(publicUser(user));
};