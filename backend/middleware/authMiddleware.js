import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Verify path to userModel

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            console.log('Received token:', token);

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }
            console.log('Found user:', req.user);

            // Proceed to next middleware
            next();
        } else {
            console.log('No token provided');
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
