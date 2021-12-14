const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    telefono: { type: String },
    productos: { type: String },
    descripcion: { type: String },
    cantidad: { type: String },
    fecha: { type: String },
    hora: { type: String },




});

module.exports = mongoose.model('Pedidos', userSchema);