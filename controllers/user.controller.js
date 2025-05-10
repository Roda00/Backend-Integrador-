
// modelo
const User = require('../models/user.model.js');

// librerias
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//Token
const SECRET = "Algun@secreto";

// obtener todos los usuarios
async function getUsers(req, res) {
    
    try {

        const users = await User.find({}).select({password: 0, __v: 0}).sort({nomnbrecompleto: 1}).collation({ locale: 'es', strength: 2 });
        
        res.status(200).send({
            message: 'Usuarios encontrados',
            users
        });
        
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send({ message: 'Error al obtener los usuarios' });
    }
    
}

// crear usuario
async function createUser(req, res) {

try {

const user = new User(req.body);

user.role = 'user';

user.password = await bcrypt.hash(user.password, saltRounds);

const newUser = await user.save();


res.status(201).send({
    message: 'Usuario creado',
    user: newUser
});

} catch (error) {

    console.error('Error al crear el usuario:', error);
    res.status(500).send({ message: 'Error al crear el usuario' });

}


}

// obtener usuario por id
async function getUserById(req, res) {

    try {
        const userId = await User.findById(req.params.id).select({password: 0, __v: 0});
        if (!userId) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        res.status(200).send({
            message: 'Usuario encontrado',
            userId
        });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).send({ message: 'Error al obtener el usuario' });
    }
}   

// Eliminar usuario por id
async function deleteUserById(req, res) {

    try {
        const userDeleted = await User.findByIdAndDelete(req.params.id)
        if (!userDeleted) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        res.status(200).send({
            message: `el usuario ${userDeleted.nombrecompleto} con id ${userDeleted._id} ha sido borrado`,
            userDeleted
        });

    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send({ message: 'Error al eliminar el usuario' });
    }

}

// Actualizar usuario por id
async function updateUserById(req, res) {
    
    try {

        const id = req.params.id;

        const data = req.body;

        data.password = undefined; 

        data.updatedAt = Date.now();

        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });


        if (!updatedUser) {
            return res.status(404).send({ message: 'No se pudo actualizar el usuario' });
        }

        res.status(200).send({
            message: 'Usuario actualizado',
            user: updatedUser
        });


    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send({ message: 'Error al actualizar el usuario' });
    }


}

// login

async function loginUser(req, res) { 

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: 'Email y contraseña son requeridos' });
        }

        const user = await User.findOne({ email})
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        const isVerified = await bcrypt.compare(password, user.password);
        if (!isVerified) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }

        user.password = undefined;

        const token = jwt.sign(user.toJSON(), SECRET, {expiresIn: '1h'});

        return res.status(200).send({
            message: 'Usuario logueado',
            user,
            token
        }); 
        

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send({ message: 'Error al iniciar sesión' });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    loginUser
}