import jwt from 'jsonwebtoken';
const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: 'Nessun token, autorizzazione negata' });
}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
} catch (err) {
    res.status(401).json({ msg: 'Token non valido' });
}

export default auth;