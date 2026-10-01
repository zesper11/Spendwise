const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || process.env.MONGO_URL;

const auth = (req, res, next) => {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Please sign in to continue' });

    try {
        const payload = jwt.verify(token, jwtSecret);
        req.userId = payload.userId;
        next();
    } catch {
        return res.status(401).json({ message: 'Your session has expired. Please sign in again.' });
    }
};

module.exports = auth;