const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  name:{
    type: String,
    require: [true, 'Ingresa tu nombre.']
  },
  email:{
    type: String,
    require: [true, 'Ingresa tu email.'],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail, 'Por favor ingresa un email válido.'],
  },
  photo: String,
  password:{
    type: String,
    required: [true, 'Ingresa una contraseña de al menos 8 caracteres.'],
    minlength: 8,
    select: false //para que no se muestren los passwords en ningún lado
  },
  passwordConfirm:{
    type: String,
    required:[true, 'Por favor confirma tu contraseña.'],
    validate: {
      //Solo funciona al CREAR un nuevo objeto o en SAVE
      validator: function(elem){
        return elem === this.password;
      },
      message: 'Las contraseñas no coinciden.'
    }
  }
});

//encriptando el password
userSchema.pre('save', async function(next){

  //se ejecuta si el password se modificó
  if(!this.isModified('password')) return next();

    //Hace un hash al password con un costo de 12
    this.password = await bcrypt.hash(this.password, 12)

    //Borra el campo passwordConfirm para que no persista en la bd
    this.passwordConfirm = undefined;
    next();
})

//un método de instancia, disponible en todos los docuementos de usuario
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema)

module.exports = User

