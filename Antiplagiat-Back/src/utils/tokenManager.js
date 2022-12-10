import jwt from 'jsonwebtoken';

export function generateToken(userId, userRole) {
    return jwt.sign({id: userId, role: userRole}, "qweqwe", {expiresIn: '48h'});
}