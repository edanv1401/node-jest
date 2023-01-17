'use-strict';
const usuarioModel = require('./../model/usuario');

class Usuario {
    constructor(router) {
        router.get('/usuario/:id', this.obtenerUsuario.bind(this));
        router.post('/usuario', this.registrarUsuario.bind(this));
    }

    async obtenerUsuario(req, res) {
        usuarioModel.obtenerUsuario(req.params['id'])
        .then((response)=>{
            res.status(response.status).send(response.body);
        }).catch((e)=>{
            res.status(500).send(e);
        });
    }

    async registrarUsuario(req, res){
        const response = await usuarioModel.login(req.body);
        res.status(response.status).send(response.body);
    }
}

module.exports = Usuario;
