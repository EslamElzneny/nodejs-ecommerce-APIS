import jwt from 'jsonwebtoken';
const generateJWT = async (payload = {}) => {
    const token = await jwt.sign(payload,process.env.SECRET_TOKEN_KEY,{expiresIn:'1d'});
    return token;
}
module.exports = generateJWT;
