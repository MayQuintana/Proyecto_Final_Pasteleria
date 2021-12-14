const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');
const cursoPas = require('../models/cPastel');
const CursoPay = require('../models/cPays');
const CursoC = require('../models/cCupcakes');
const order = require('../models/Pedidos');
const event = require('../models/Eventos');
const party = require('../models/Fiesta');
const products = require('../models/Productos');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/registro', (req, res, next) => {
    res.render('registro');
});




router.post('/registro', passport.authenticate('local-registro', {

    successRedirect: '/login',
    failureRedirect: '/registro',
    passReqToCallback: true
}));



router.get('/login', (req, res, next) => {
    res.render('login');
});


router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});
/*
//todos las rutas debajo estaran dentro de la seguridad de las sessions
router.use((req, res, next)=>{
  isAuthenticated(req, res, next);
  next();
});
*/
router.get('/', isAuthenticated, (req, res, next) => {
    res.render('index');
});

router.get('/catalogo', isAuthenticated, async(req, res, next) => {
    const product = await products.find();
    //console.log(productos);
    res.render('catalogo', { product });

});

router.get('/categorias', isAuthenticated, (req, res, next) => {

    res.render('categorias');
});



router.get('/servicios', isAuthenticated, (req, res, next) => {
    res.render('servicios');
});


router.get('/pedidos', isAuthenticated, (req, res, next) => {
    res.render('pedidos');
});

router.post('/registrarPedidos', isAuthenticated, async(req, res, next) => {

    const pedidoo = new order();
    pedidoo.nombre = req.body.nombre;
    pedidoo.apellido = req.body.apellido;
    pedidoo.telefono = req.body.telefono;
    pedidoo.productos = req.body.productos;
    pedidoo.descripcion = req.body.descripcion;
    pedidoo.cantidad = req.body.cantidad;
    pedidoo.fecha = req.body.fecha;
    pedidoo.hora = req.body.hora;

    console.log(pedidoo)
    await pedidoo.save();
    res.redirect('/pedidos');


});

router.get('/recetas', isAuthenticated, (req, res, next) => {
    res.render('recetas');
});

router.get('/cursos', isAuthenticated, (req, res, next) => {
    res.render('cursos');
});
router.get('/cursoPastel', isAuthenticated, (req, res, next) => {
    res.render('cursoPastel');
});

router.post('/registrarCursoP', isAuthenticated, async(req, res, next) => {

    const cursoP = new cursoPas();
    cursoP.nombre = req.body.nombre;
    cursoP.apellido = req.body.apellido;
    cursoP.correo = req.body.correo;
    cursoP.telefono = req.body.telefono;
    console.log(cursoP)
    await cursoP.save();
    res.redirect('/cursos');



});


router.get('/cursoCupcakes', isAuthenticated, (req, res, next) => {
    res.render('cursoCupcakes');
});

router.post('/registrarCursoC', isAuthenticated, async(req, res, next) => {

    const cursoCup = new CursoC();
    cursoCup.nombre = req.body.nombre;
    cursoCup.apellido = req.body.apellido;
    cursoCup.correo = req.body.correo;
    cursoCup.telefono = req.body.telefono;
    console.log(cursoCup)
    await cursoCup.save();
    res.redirect('/cursos');



});

router.get('/cursoPays', isAuthenticated, (req, res, next) => {
    res.render('cursoPays');
});


router.post('/registrarCursoPay', isAuthenticated, async(req, res, next) => {

    const cursoPa = new CursoPay();
    cursoPa.nombre = req.body.nombre;
    cursoPa.apellido = req.body.apellido;
    cursoPa.correo = req.body.correo;
    cursoPa.telefono = req.body.telefono;
    console.log(cursoPa)
    await cursoPa.save();
    res.redirect('/cursos');



});


router.get('/eventos', isAuthenticated, (req, res, next) => {
    res.render('eventos');
});

router.post('/registrarEvento', isAuthenticated, async(req, res, next) => {

    const eventt = new event();
    eventt.nombre = req.body.nombre;
    eventt.apellido = req.body.apellido;
    eventt.telefono = req.body.telefono;
    eventt.evento = req.body.telefono;
    eventt.productos = req.body.productos;
    eventt.descripcion = req.body.descripcion;
    eventt.cantidad = req.body.cantidad;
    eventt.fecha = req.body.fecha;
    eventt.hora = req.body.hora;

    console.log(eventt)
    await eventt.save();
    res.redirect('/eventos');


});

router.get('/fiestas', isAuthenticated, (req, res, next) => {
    res.render('fiestas');
});

router.post('/registrarFiesta', isAuthenticated, async(req, res, next) => {

    const partyy = new party();
    partyy.nombre = req.body.nombre;
    partyy.apellido = req.body.apellido;
    partyy.telefono = req.body.telefono;
    partyy.tematica = req.body.tematica;
    partyy.productos = req.body.productos;
    partyy.descripcion = req.body.descripcion;
    partyy.cantidad = req.body.cantidad;
    partyy.fecha = req.body.fecha;
    partyy.hora = req.body.hora;

    console.log(partyy)
    await partyy.save();
    res.redirect('/fiestas');


});








function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

module.exports = router;