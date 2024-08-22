const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', "");

    if (!token) {
        return res.status(200).json({ message: 'No token, authorization denied' })
    }

    try {   
      const decode = jwt.verify(token, process.env.jwt_key);
      req.user = decode.user;
      next();
    } catch (error) {
        return res.status(401).json({ message: "Token is Not valid" })
    }

}

module.exports = authMiddleware