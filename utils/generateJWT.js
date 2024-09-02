import jwt from 'jsonwebtoken';
export const generateJWT = async (payload = {}) => {
    const token = await jwt.sign(payload,process.env.SECRET_TOKEN_KEY,{expiresIn:'1d'});
    return token;
}
