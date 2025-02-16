const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1]
    if (!token) return res.status(403).json({ error: 'Acesso negado' });
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado' });
        console.log(error)
    }
}

module.exports = { authenticateToken };