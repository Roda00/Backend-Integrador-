const jws = require('jsonwebtoken');
const SECRET = process.env.SECRET_JWT


function isAuth(req, res, next) {

    const token = req.headers.access_token 
    if (!token) {
        return res.status(401).send({ message: 'No tienes accseso a estar ruta' });
    }
    jws.verify(token, SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).send({ message: 'Token no valido' });
        }

        req.user = decoded;
        
        next();
    })

}
function isAdmin(req, res, next) {

    const token = req.headers.access_token 
    if (!token) {
        return res.status(401).send({ message: 'No tienes accseso a estar ruta' });
    }
    jws.verify(token, SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).send({ message: 'Token no valido' });
        }

        req.user = decoded;
        if (decoded.role !== 'admin') {
            return res.status(403).send({ message: 'No tienes permisos para acceder a esta ruta' });
        }

        next();
    })

}


module.exports = {isAuth, isAdmin};