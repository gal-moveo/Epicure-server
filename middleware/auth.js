const jwt = require('jsonwebtoken')
const config = require('config')
// a middleware for chack a valid json web token 
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).json({ massege: 'no toten, authorization denied' })
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ massege: 'token is not valid' })
    }
}