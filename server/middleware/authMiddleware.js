import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('Authorization header:', req.headers.authorization);
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('token extracted:', token); // add this

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decoded:', decoded); // add this

            req.user = await User.findById(decoded.id).select('-password');
            console.log('user found:', req.user); // add this

            next();
        } catch (error) {
            console.error('protect error:', error.message); // change this to error.message
            res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token.' });
    }
};