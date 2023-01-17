'use-strict';
const usuarioDatabase = require('./../database/usuario');

class Usuario {
    static async obtenerUsuario(id) {
        try {
            let user = [];
            user = await usuarioDatabase.obtenerUsuario(id);
            if(!user.length){
                return {status: 400,body: {'mensaje': 'cliente no encontrado'}};
            }
            return {status: 200,body: user};
        } catch (e) {
            throw e;
        }
    }

    static async login(user) {
        try {
            const {username, password} = user;
            const usuario = await usuarioDatabase.loginUsuario(username, password);
            if(!usuario.length){
                return {status:400, body:[]};
            }
            return {status:200, body:usuario};
        } catch (e) {
            throw e;
        }
    }
}

module.exports = Usuario;
