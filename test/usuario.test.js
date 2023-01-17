'use-strict';
const supertest = require('supertest');
const {app, server} = require('./../index');
const api = supertest(app);
const {loginUsuario, obtenerUsuario} = require('./../database/usuario');

// inicializacion de database
jest.mock('./../database/usuario', ()=>({
    loginUsuario: jest.fn(),
    obtenerUsuario: jest.fn(),
}));

const mockLoginUsuario = loginUsuario;
mockLoginUsuario.mockImplementation((usuario, password)=>{
    if(usuario==='edwin' && password === '123'){
        return [{activo: 1}];
    }
    return [];
});

const mockObtenerUsuario = obtenerUsuario;
mockObtenerUsuario.mockImplementation((id)=>{
    if(+id === 1){
        return [{activo: 1, username: 'edwin', password: '123'}];
    }
    return [];
});
//

describe('Usuario', function () {
    test('buscar usuario', async () => {
        const res = await api.get('/usuario/1').expect(200);
        expect(res.body).toEqual([{activo: 1, username: 'edwin', password: '123'}]);
    });

    test('buscar usuario (failed)', async () => {
        const res = await api.get('/usuario/100').expect(400);
        expect(res.body).toEqual({'mensaje': 'cliente no encontrado'});
    });

    test('login', async()=>{
        await api.post('/usuario').send({
            'username': 'edwin',
            'password': '123'
        }).expect(200);
    });

    test('login (failed)', async()=>{
        const res = await api.post('/usuario').send({
            'username': 'edwin',
            'password': '12332'
        }).expect(400);
        expect(res.body).toEqual([]);
    });

    test('throw error', async()=>{
        const res = await api.get('/usuario/1?dot=hola').expect(500);
    });
});

afterAll(() => {
    server.close();
});

afterEach(()=>{
    jest.clearAllMocks();
});