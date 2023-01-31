const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

var rolesValidos = {
  values: ['ADMIN_ROLE', 'STUDENT_ROLE', 'USER_ROLE' ],
  message: '{VALUE} no es un rol permitido'
};

const userSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  cedula: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique:true },
  idInstitucion: { type: String, required: true, trim: false, unique:false },
  password: { type: String, required: true, trim: true },
  role: {type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
}, {
    timestamps: true
  });

module.exports = userSchema;
