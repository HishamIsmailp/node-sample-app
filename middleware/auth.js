const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, "upcode12345");
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
}