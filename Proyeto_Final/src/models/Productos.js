const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    nombreProducto: { type: String },
    Descripcion: { type: String },
    Precio: { type: String },





});

module.exports = mongoose.model('Productos', userSchema);