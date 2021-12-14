const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    correo: { type: String },
    telefono: { type: String },

});

module.exports = mongoose.model('cCupckes', userSchema);