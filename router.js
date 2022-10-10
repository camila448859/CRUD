import express from 'express';

export const router = express.Router();

import { con } from './data/playlist.js'

router.get('/', (req, res) => {
    con.query('Select * from canciones', (error, result) => {
        if (error) {
            console.error(error);
        } else {
            res.render('index', { result: result });
        }
    })
});

router.post('/Consultar', (req, res) => {
    con.query(`Select * from canciones`, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            res.render('consultar', { result: result });
        }
    })
});

router.get('/agregar', (req, res) => {
    res.render('agregar')
});

router.post('/agregar-cancion', (req, res) => {
    const nombre = req.body.nombre;
    con.query("INSERT INTO `canciones` (`nombre`) VALUES ('"+nombre+"');", (error, result) => {
        if (error) {
            console.error(error);
        } else {
            con.query('Select * from canciones', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    res.render('index', { result: result });
                }
            })
        }
    })
});

router.post('/eliminar', (req, res) => {
    con.query("DELETE FROM `canciones` WHERE (`nombre` = '"+req.body.nombre+"')", (error, result) => {
        if (error) {
            console.error(error);
        } else {
            con.query('Select * from canciones', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    res.render('index', { result: result });
                }
            })
        }
    })
});

router.post('/editar', (req, res) => {
    const result = { 
        id: req.body.id,
        nombre: req.body.nombre,
    }
    res.render('editar', {result : result})
});

router.post('/editar-nombre', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    con.query("UPDATE `nombre` SET `nombre` = '"+nombre+"');", (error, result) => {
        if (error) {
            console.error(error);
        } else {
            con.query('Select * from canciones', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    res.render('index', { result: result });
                }
            })
        }
    })
});