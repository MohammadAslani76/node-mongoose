import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Invalid token'});
    }

    try {
        const tokenPayload = token.split(' ')[1];

        const decodedToken = jwt.verify(tokenPayload, process.env.JWT_SECRET_KEY);

        req.userId = decodedToken._id;

        next();
    } catch (error) {
        // Token verification failed
        return res.status(401).json({message: 'Invalid token'});
    }
};