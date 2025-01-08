import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const jwtSecretKey = process.env.JWT_SECRET || "";
dotenv.config();

const generateToken = (user: any) => {
    try {
        const payload = {
            user_id: user.id,
            email: user.email
        }
        const options = { expiresIn: '1d' };
        const token = jwt.sign(payload, jwtSecretKey, options);
        return token;
    } catch (error) {
        return `Error : ${error}`
    }
};
const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

module.exports = { generateToken, hashPassword, verifyPassword }